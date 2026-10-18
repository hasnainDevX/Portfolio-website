"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ASSETS, CURRENCIES, DASHBOARD_OPTIONS, FEEDBACK_OPTIONS, GOALS, QUESTIONS, SCALES, STAGES, STEPS, emptyBrief, reviewBrief, selectedPosition, stepForField, validateBrief, type BriefData, type BriefErrors } from "../../lib/project-brief";
import { packages } from "../packages/PackagesContent";
import { DRAFT_KEY, newDraft, readDraft } from "./draft";
import "./project-brief.css";

const buttonCls = "button button-lavender border rounded-full px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-charcoal motion-reduce:transition-none";
const inputCls = "w-full min-w-0 border-0 border-b border-charcoal/60 bg-transparent pb-3 pt-2 font-body text-base leading-relaxed text-charcoal placeholder:text-charcoal/45 focus:border-gold focus:outline-2 focus:outline-offset-4 focus:outline-gold disabled:opacity-50";
const optionCls = "flex min-h-12 cursor-pointer items-start gap-3 border-b border-charcoal/25 px-3 py-4 text-base leading-relaxed has-[:checked]:border-gold has-[:checked]:bg-gold/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50";

function ErrorMessage({ id, errors }: { id: string; errors: BriefErrors }) {
  return errors[id] ? <p id={`error-${id}`} className="mt-3 text-sm font-semibold text-[#9b2929]">{errors[id]}</p> : null;
}

function Question({ number, helper, optional, children }: { number: number; helper?: string; optional?: boolean; children: ReactNode }) {
  return <fieldset className="min-w-0 space-y-5 border-0 p-0">
    <legend className="mb-3 w-full font-body text-lg font-medium leading-relaxed text-charcoal sm:text-xl"><span className="mr-3 text-sm tabular-nums text-charcoal/60">{String(number).padStart(2, "0")}</span>{QUESTIONS[number - 1]}{optional && <span className="ml-2 whitespace-nowrap text-sm font-normal text-charcoal/65">(optional)</span>}</legend>
    {helper && <p className="max-w-2xl text-sm leading-relaxed text-charcoal/75">{helper}</p>}
    {children}
  </fieldset>;
}

function TextField({ id, label, value, onChange, errors, required = false, paragraph = false, type = "text", autoComplete, helper }: { id: string; label: string; value: string; onChange: (value: string) => void; errors: BriefErrors; required?: boolean; paragraph?: boolean; type?: string; autoComplete?: string; helper?: string }) {
  const props = { id: `brief-${id}`, name: id, value, required, "aria-invalid": Boolean(errors[id]), "aria-describedby": [helper && `help-${id}`, errors[id] && `error-${id}`].filter(Boolean).join(" ") || undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value), className: inputCls };
  return <div className="min-w-0">
    <label htmlFor={`brief-${id}`} className="mb-2 block text-sm font-medium">{label}{required && <span className="ml-1 text-charcoal" aria-hidden="true">*</span>}</label>
    {helper && <p id={`help-${id}`} className="mb-2 text-sm leading-relaxed text-charcoal/70">{helper}</p>}
    {paragraph ? <textarea {...props} rows={4} maxLength={4000} /> : <input {...props} type={type} autoComplete={autoComplete} maxLength={type === "email" ? 254 : type === "url" ? 2000 : 160} />}
    <ErrorMessage id={id} errors={errors} />
  </div>;
}

function Choices({ id, options, selected, onChange, errors, multiple = false, limit }: { id: string; options: readonly string[]; selected: string | string[]; onChange: (value: string) => void; errors: BriefErrors; multiple?: boolean; limit?: number }) {
  const chosen = Array.isArray(selected) ? selected : [selected];
  return <div id={`brief-${id}`} tabIndex={-1} aria-describedby={errors[id] ? `error-${id}` : undefined}>
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => <label key={option} className={optionCls}>
        <input type={multiple ? "checkbox" : "radio"} name={id} value={option} checked={chosen.includes(option)} disabled={Boolean(limit && chosen.length >= limit && !chosen.includes(option))} onChange={() => onChange(option)} className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
        <span className="min-w-0">{option}</span>
      </label>)}
    </div>
    <ErrorMessage id={id} errors={errors} />
  </div>;
}

export default function ProjectBriefForm() {
  const [draft, setDraft] = useState(newDraft);
  const [ready, setReady] = useState(false);
  const [draftNotice, setDraftNotice] = useState("Your progress is saved on this browser so you can return later. Avoid using a shared device.");
  const [errors, setErrors] = useState<BriefErrors>({});
  const [focusTarget, setFocusTarget] = useState("");
  const [returnToReview, setReturnToReview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const token = useRef<{ value: string; created: number } | null>(null);
  const sendingRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const { data, step, review } = draft;

  useEffect(() => {
    let notice = "Your progress is saved on this browser so you can return later. Avoid using a shared device.";
    let restored = newDraft();
    restored.submissionId = crypto.randomUUID();
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const valid = readDraft(saved);
        if (valid) { restored = valid; notice = "Your saved draft has been restored on this browser."; }
        else notice = "The saved draft could not be read. A new brief is ready below.";
      }
    } catch { notice = "This browser cannot save drafts. Keep this page open until you submit."; }
    // Drafts are browser-only and must be restored after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(restored);
    setDraftNotice(notice);
    setReady(true);
    fetch("/api/project-brief", { cache: "no-store" }).then(async (response) => {
      if (response.ok) { const body = await response.json(); if (typeof body.token === "string") token.current = { value: body.token, created: Date.now() }; }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!ready || sent) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); }
    catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftNotice("Your answers are kept on this page, but this browser cannot save the draft. Keep the page open.");
    }
  }, [draft, ready, sent]);

  useEffect(() => {
    if (!focusTarget) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(focusTarget);
      const input = target?.matches("input, textarea, select, button") ? target : target?.querySelector<HTMLElement>("input:not(:disabled), textarea, select") || target;
      (input as HTMLElement | null)?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: "center", behavior: reduceMotion ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [focusTarget, step, review, sent, reduceMotion]);

  function update<K extends keyof BriefData>(key: K, value: BriefData[K]) {
    setDraft((previous) => ({ ...previous, data: { ...previous.data, [key]: value } }));
    setErrors((previous) => Object.fromEntries(Object.entries(previous).filter(([field]) => field !== key && !field.startsWith(`${key}.`))));
    setFailure("");
  }

  function focusErrors(nextErrors: BriefErrors) {
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      setDraft((previous) => ({ ...previous, step: stepForField(first), review: false }));
      setFocusTarget(`brief-${first}`);
      requestAnimationFrame(() => document.getElementById(`brief-${first}`)?.focus());
    }
  }

  function resetDraft() {
    if (!window.confirm("Delete this saved draft and start again? Your current answers will be cleared.")) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* Saving may be disabled. */ }
    setDraft({ ...newDraft(), submissionId: crypto.randomUUID() });
    setErrors({}); setFailure(""); setReturnToReview(false); setHoneypot("");
    setDraftNotice("A new draft is ready. Your progress will be saved on this browser when available.");
    setFocusTarget("brief-step-heading");
  }

  function toggleAsset(value: string) {
    let selected = data.assets.includes(value) ? data.assets.filter((item) => item !== value) : [...data.assets, value];
    if (!data.assets.includes(value) && value === ASSETS[7]) selected = selected.filter((item) => !ASSETS.slice(0, 6).includes(item));
    if (!data.assets.includes(value) && ASSETS.slice(0, 6).includes(value)) selected = selected.filter((item) => item !== ASSETS[7]);
    update("assets", selected);
  }

  async function sendBrief() {
    if (sendingRef.current) return;
    const nextErrors = validateBrief(data);
    if (Object.keys(nextErrors).length) { focusErrors(nextErrors); return; }
    sendingRef.current = true; setSending(true); setFailure("");
    try {
      if (!token.current || Date.now() - token.current.created > 23 * 60 * 60 * 1000) {
        const response = await fetch("/api/project-brief", { cache: "no-store", signal: AbortSignal.timeout(15000) });
        const body = await response.json();
        if (!response.ok || !body.token) throw new Error(body.message || "Submission is temporarily unavailable. Your answers are saved; please try again later.");
        token.current = { value: body.token, created: Date.now() };
      }
      const response = await fetch("/api/project-brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data, submissionId: draft.submissionId, token: token.current.value, websiteConfirmation: honeypot }), signal: AbortSignal.timeout(30000) });
      const result = await response.json();
      if (!response.ok || result.received !== true) {
        if (result.errors) focusErrors(result.errors);
        if (result.code === "TOKEN_EXPIRED") token.current = null;
        throw new Error(result.message || "Your brief could not be sent. Your answers are saved; please retry.");
      }
      let removed = true;
      try { localStorage.removeItem(DRAFT_KEY); } catch { removed = false; }
      setSent(true);
      if (!removed) setDraftNotice("Your brief was received, but this browser did not allow the saved draft to be removed. Clear this site’s browser data on a shared device.");
      else setDraftNotice("");
      setFocusTarget("brief-success");
    } catch (error) {
      setFailure(error instanceof Error && !["AbortError", "TimeoutError", "TypeError"].includes(error.name) ? error.message : "We couldn’t confirm delivery. Your answers are saved. Please contact Hasnain before retrying, as the email may already have arrived.");
      setFocusTarget("brief-submit-error");
    } finally { sendingRef.current = false; setSending(false); }
  }

  function continueStep(event: FormEvent) {
    event.preventDefault();
    if (review) { void sendBrief(); return; }
    const nextErrors = validateBrief(data, step);
    if (Object.keys(nextErrors).length) { focusErrors(nextErrors); return; }
    if (returnToReview || step === 3) {
      const allErrors = validateBrief(data);
      if (Object.keys(allErrors).length) { focusErrors(allErrors); return; }
      setDraft((previous) => ({ ...previous, step: 3, review: true })); setReturnToReview(false);
    } else setDraft((previous) => ({ ...previous, step: previous.step + 1 }));
    setErrors({}); setFocusTarget("brief-step-heading");
  }

  if (!ready) return <div role="status" className="border-t border-charcoal/20 py-12">Preparing your brief…</div>;
  if (sent) return <section id="brief-success" tabIndex={-1} className="border-y border-charcoal/20 py-16 outline-none">
    <p className="mb-5 text-xs uppercase tracking-[0.2em] text-charcoal/70">Project brief received</p>
    <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Thank you—your project brief has been received.</h2>
    <p className="mt-6 text-lg leading-relaxed">I’ll review your answers and get back to you with the next steps.</p>
    {draftNotice && <p className="mt-6 text-sm">{draftNotice}</p>}
  </section>;

  return <div className="font-body">
    <div className="mb-10">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm"><p className="font-medium">{STEPS[step]}{review ? " · Review" : ""}</p><p className="tabular-nums text-charcoal/70">Step {step + 1} of 4</p></div>
      <div role="progressbar" aria-label="Project brief progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of 4: ${STEPS[step]}`} className="grid grid-cols-4 gap-2">
        {STEPS.map((name, position) => <div key={name} className={`h-1 ${position <= step ? "bg-gold" : "bg-charcoal/15"}`} />)}
      </div>
    </div>

    <form noValidate onSubmit={continueStep} aria-busy={sending}>
      <fieldset disabled={sending} className="min-w-0 border-0 p-0">
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden"><label htmlFor="websiteConfirmation">Leave this field empty</label><input id="websiteConfirmation" name="websiteConfirmation" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></div>
        <h2 id="brief-step-heading" tabIndex={-1} className="mb-3 font-serif text-4xl leading-tight tracking-[-0.025em] outline-none sm:text-5xl">{review ? "Review your brief" : STEPS[step]}</h2>
        <p className="mb-10 text-sm leading-relaxed text-charcoal/70">{review ? "Check your answers before sending. You can edit any step without losing your progress." : "Fields marked * are required. If you’re unsure, say so—we can work through it together."}</p>

        <motion.div key={`${step}-${review}`} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} className="space-y-12 sm:space-y-14">
          {review ? reviewBrief(data).map((group, groupIndex) => <section key={group.title} className="border-t border-charcoal/20 pt-6">
            <div className="mb-6 flex items-center justify-between gap-4"><h3 className="font-serif text-2xl sm:text-3xl">{groupIndex + 1}. {group.title}</h3><button type="button" aria-label={`Edit ${group.title}`} className={`${buttonCls} text-sm`} onClick={() => { setDraft((previous) => ({ ...previous, step: groupIndex, review: false })); setReturnToReview(true); setFocusTarget("brief-step-heading"); }}>Edit</button></div>
            <dl className="space-y-5">{group.answers.map((answer) => <div key={answer.label}><dt className="text-sm font-semibold leading-relaxed">{answer.label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-base leading-relaxed text-charcoal/80 [overflow-wrap:anywhere]">{answer.value}</dd></div>)}</dl>
          </section>) : <>
            {step === 0 && <>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <TextField id="name" label="Your name" required value={data.name} onChange={(value) => update("name", value)} errors={errors} autoComplete="name" />
                <TextField id="businessName" label="Business name" required value={data.businessName} onChange={(value) => update("businessName", value)} errors={errors} autoComplete="organization" />
                <TextField id="email" label="Email" type="email" required value={data.email} onChange={(value) => update("email", value)} errors={errors} autoComplete="email" />
                <TextField id="currentLink" label="Current website or social media link (optional)" type="url" value={data.currentLink} onChange={(value) => update("currentLink", value)} errors={errors} helper="Use the full link, including https://." />
              </div>
              <Question number={1}><TextField id="businessDescription" label="About your business" paragraph required value={data.businessDescription} onChange={(value) => update("businessDescription", value)} errors={errors} /></Question>
              <Question number={2}><p className="text-sm">Choose one. *</p><Choices id="businessStage" options={STAGES} selected={data.businessStage} onChange={(value) => update("businessStage", value)} errors={errors} />{data.businessStage === "Other" && <TextField id="businessStageOther" label="Tell me a little more" required value={data.businessStageOther} onChange={(value) => update("businessStageOther", value)} errors={errors} />}</Question>
            </>}

            {step === 1 && <>
              <Question number={3} helper="Tell me who they are, where they’re based and what they come to you for."><TextField id="audience" label="Your ideal clients or customers" paragraph required value={data.audience} onChange={(value) => update("audience", value)} errors={errors} /></Question>
              <Question number={4} helper="If yes, tell me about the products and how you’d like to sell them."><TextField id="services" label="Your services and any products" paragraph required value={data.services} onChange={(value) => update("services", value)} errors={errors} /></Question>
              <Question number={5} helper="Select up to four."><p id="goals-limit" role="status" className="text-sm text-charcoal/70">{data.goals.length} of 4 selected. {data.goals.length === 4 ? "Uncheck a goal before choosing another." : "Choose at least one goal. Use Other if you’re unsure."}</p><Choices id="goals" options={GOALS} selected={data.goals} multiple limit={4} onChange={(value) => update("goals", data.goals.includes(value) ? data.goals.filter((item) => item !== value) : data.goals.length < 4 ? [...data.goals, value] : data.goals)} errors={errors} />{data.goals.includes("Other") && <TextField id="goalsOther" label="Your other goal" required value={data.goalsOther} onChange={(value) => update("goalsOther", value)} errors={errors} />}</Question>
            </>}

            {step === 2 && <>
              <Question number={6} helper="For example: services, portfolio, testimonials, booking calendar, inquiry form, blog or online payments. Mention any tools you already use that should connect with your website.">
                <TextField id="websiteNeeds" label="Pages, features and integrations" paragraph required value={data.websiteNeeds} onChange={(value) => update("websiteNeeds", value)} errors={errors} />
                <div className="border-l-2 border-gold pl-5"><p className="mb-2 font-medium">Would you like a dashboard?</p><p className="text-sm leading-relaxed text-charcoal/80">A dashboard lets you update content such as services, prices, products and images yourself. It’s an optional paid add-on, most useful when you expect frequent updates or need to manage content or products regularly. A simple service website with occasional changes may not need one. If you’re unsure, I can recommend the right approach.</p></div>
                <fieldset className="min-w-0"><legend className="mb-3 text-sm font-medium">Dashboard preference *</legend><Choices id="dashboard" options={DASHBOARD_OPTIONS} selected={data.dashboard} onChange={(value) => update("dashboard", value)} errors={errors} /></fieldset>
              </Question>
              <Question number={7} helper="Please share your budget or a comfortable range and include the currency. If you haven’t decided yet, let me know.">
                <div className="border-l-2 border-gold pl-5 text-sm leading-relaxed"><p className="font-medium">Starting prices (USD)</p><ul className="mt-2 space-y-1">{packages.map((item) => <li key={item.id}>{item.name}: from {item.price.split(/[-–]/)[0].replace("+", "")} USD</li>)}</ul><p className="mt-2 text-charcoal/75">Your proposal will reflect the agreed scope. Domain and hosting renewals are additional.</p></div>
                <label className={optionCls}><input type="checkbox" checked={data.budgetUndecided} onChange={(event) => update("budgetUndecided", event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-gold" /><span>I haven’t decided yet</span></label>
                {!data.budgetUndecided && <div className="grid gap-6 sm:grid-cols-[2fr_1fr]">
                  <TextField id="budget" label="Amount or comfortable range" required value={data.budget} onChange={(value) => update("budget", value)} errors={errors} />
                  <div><label htmlFor="brief-budgetCurrency" className="mb-2 block text-sm font-medium">Currency *</label><select id="brief-budgetCurrency" value={data.budgetCurrency} onChange={(event) => update("budgetCurrency", event.target.value)} required aria-invalid={Boolean(errors.budgetCurrency)} aria-describedby={errors.budgetCurrency ? "error-budgetCurrency" : undefined} className={inputCls}><option value="">Choose currency</option>{CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}</select><ErrorMessage id="budgetCurrency" errors={errors} /></div>
                  {data.budgetCurrency === "Other" && <TextField id="budgetOtherCurrency" label="Currency name or code" required value={data.budgetOtherCurrency} onChange={(value) => update("budgetOtherCurrency", value)} errors={errors} />}
                </div>}
              </Question>
            </>}

            {step === 3 && <Question number={8} optional helper="Share a few words describing the style you have in mind. You can add up to two website references below and select what you like about each.">
              <TextField id="styleDescription" label="Overall direction and anything to avoid (optional)" paragraph value={data.styleDescription} onChange={(value) => update("styleDescription", value)} errors={errors} />
              <fieldset className="min-w-0 space-y-6 border-t border-charcoal/20 pt-8">
                <legend className="pt-8 font-serif text-3xl">How should your website feel?</legend>
                <p className="text-sm leading-relaxed text-charcoal/75">Choose where you’d like your website to sit on each scale. There are no right or wrong answers. A scale stays unanswered until you select a position.</p>
                <label className={optionCls}><input type="checkbox" checked={data.styleRecommend} onChange={(event) => update("styleRecommend", event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-gold" /><span>Not sure—recommend a direction</span></label>
                {SCALES.map((scale) => {
                  const value = data.styleScales[scale.id];
                  const unanswered = value === null || data.styleRecommend;
                  return <div key={scale.id} className="min-w-0 border-b border-charcoal/15 pb-5">
                    <div className="mb-3 flex justify-between gap-4 text-sm font-medium"><span className="max-w-[45%]">{scale.left}</span><span className="max-w-[45%] text-right">{scale.right}</span></div>
                    <input id={`brief-styleScales.${scale.id}`} type="range" min={1} max={5} step={1} value={value ?? 3} disabled={data.styleRecommend} aria-label={`${scale.left} to ${scale.right}`} aria-valuetext={unanswered ? "Unanswered; use arrow keys or tap the scale to choose." : selectedPosition(scale.left, scale.right, value)} aria-describedby={`scale-status-${scale.id}`} onChange={(event) => update("styleScales", { ...data.styleScales, [scale.id]: Number(event.target.value) })} onPointerUp={(event) => { if (!data.styleRecommend) update("styleScales", { ...data.styleScales, [scale.id]: Number(event.currentTarget.value) }); }} onKeyUp={(event) => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", " "].includes(event.key) && !data.styleRecommend) update("styleScales", { ...data.styleScales, [scale.id]: Number(event.currentTarget.value) }); }} className={`brief-range block h-11 w-full cursor-pointer accent-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed ${unanswered ? "opacity-45" : "opacity-100"}`} />
                    <div aria-hidden="true" className="flex justify-between px-1 text-xs tabular-nums text-charcoal/60">{[1, 2, 3, 4, 5].map((position) => <span key={position} className={!unanswered && value === position ? "font-bold text-charcoal" : ""}>{position}</span>)}</div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p id={`scale-status-${scale.id}`} className="text-sm text-charcoal/70">{data.styleRecommend ? "Recommendation requested" : selectedPosition(scale.left, scale.right, value)}</p>{value !== null && !data.styleRecommend && <button type="button" className={`${buttonCls} text-xs`} aria-label={`Clear ${scale.left} to ${scale.right} preference`} onClick={() => update("styleScales", { ...data.styleScales, [scale.id]: null })}>Clear</button>}</div>
                  </div>;
                })}
              </fieldset>

              <div className="space-y-8 border-t border-charcoal/20 pt-8">
                <h3 className="font-serif text-3xl">Your references</h3>
                <p className="text-sm leading-relaxed text-charcoal/75">Add up to two references. Each entry includes the website link and what you like about it. Both are optional.</p>
                {data.ownReferences.map((reference, referenceIndex) => <fieldset key={referenceIndex} className="min-w-0 space-y-5 border-t border-charcoal/20 pt-6">
                  <legend className="pr-3 text-sm font-medium">Reference {referenceIndex + 1}</legend>
                  <TextField id={"ownReferences." + referenceIndex + ".url"} label="Reference — website URL" type="url" value={reference.url} onChange={(value) => update("ownReferences", data.ownReferences.map((item, position) => position === referenceIndex ? { ...item, url: value } : item))} errors={errors} helper="Include https://." />
                  <fieldset className="min-w-0"><legend className="mb-3 text-sm font-medium">What do you like in it?</legend><Choices id={"ownReferences." + referenceIndex + ".likes"} options={FEEDBACK_OPTIONS} selected={reference.likes} multiple onChange={(value) => update("ownReferences", data.ownReferences.map((item, position) => position === referenceIndex ? { ...item, likes: item.likes.includes(value) ? item.likes.filter((like) => like !== value) : [...item.likes, value] } : item))} errors={errors} /></fieldset>
                </fieldset>)}
              </div>
            </Question>}

            {step === 3 && <>
              <Question number={9} optional helper="Select all that apply."><Choices id="assets" options={ASSETS} selected={data.assets} multiple onChange={toggleAsset} errors={errors} /><p className="text-sm leading-relaxed text-charcoal/70">You can need help with some assets while having others ready. Choosing “Nothing ready yet” clears the specific ready assets.</p></Question>
            </>}
          </>}
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/20 pt-6">
          <button type="button" disabled={step === 0 && !review || sending} className={buttonCls} onClick={() => { setDraft((previous) => ({ ...previous, review: false, step: review ? 3 : Math.max(0, previous.step - 1) })); setErrors({}); setFocusTarget("brief-step-heading"); }}>Back</button>
          <button type="submit" disabled={sending} className={`${buttonCls} ml-auto`}>{sending ? "Sending your brief…" : review ? "Send Project Brief" : returnToReview ? "Save and return to review" : step === 3 ? "Review your brief" : "Continue"}</button>
        </div>
      </fieldset>
      {failure && <div id="brief-submit-error" role="alert" tabIndex={-1} className="mt-6 border-l-2 border-[#9b2929] bg-[#9b2929]/5 p-5 text-sm leading-relaxed outline-none"><p>{failure}</p>{review && <button type="button" disabled={sending} onClick={() => void sendBrief()} className={`${buttonCls} mt-4`}>Retry submission</button>}</div>}
      <p className="mt-5 text-sm leading-relaxed text-charcoal/65">Your answers are used to prepare your proposal. Submitting this brief does not reserve a project slot.</p>
      <div className="mt-10 flex flex-col gap-4 border-t border-charcoal/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="max-w-xl text-sm leading-relaxed text-charcoal/75">{draftNotice}</p>
      <button type="button" onClick={resetDraft} disabled={sending} className={`${buttonCls} shrink-0 self-start text-sm`}>Reset draft</button>
      </div>
    </form>
  </div>;
}
