export const STEPS = ["Your business", "Your customers & goals", "Your website needs", "Your style", "Final details"];
export const STAGES = ["Just getting started and building my presence.", "Established and ready for a fresh look.", "Growing, but my current website is holding me back.", "Established, but I don’t have a website yet.", "Other"];
export const GOALS = ["Attract more qualified inquiries.", "Get more bookings.", "Build trust and reflect the quality of my business.", "Showcase my work and results.", "Explain my services more clearly.", "Sell products or services online.", "Make my booking or inquiry process easier.", "Other"];
export const DASHBOARD_OPTIONS = ["Yes, I’d like to update content myself.", "No, I don’t expect to need one.", "Not sure—please recommend."];
export const CURRENCIES = ["USD", "GBP", "CAD", "AUD", "PKR", "Other"];
export const ASSETS = ["Logo.", "Brand colours and fonts / brand guidelines.", "Professional photos or headshots.", "Portfolio images or videos.", "Written website content.", "Testimonials or case studies.", "I’ll need help preparing some of these.", "Nothing ready yet."];
export const FEEDBACK_OPTIONS = ["Typography", "Colours", "Layout", "Imagery", "Animations", "Overall feel"];
export const REFERENCE_IDS = ["amr", "tash", "hans"] as const;
export const SCALES = [
  { id: "tone", left: "Playful", right: "Serious" },
  { id: "era", left: "Classic", right: "Contemporary" },
  { id: "presence", left: "Understated", right: "Bold" },
  { id: "density", left: "Minimal", right: "Visually rich" },
  { id: "approach", left: "Familiar", right: "Experimental" },
  { id: "movement", left: "Subtle movement", right: "Expressive animation" },
] as const;

export type ScaleId = typeof SCALES[number]["id"];
export type ReferenceId = typeof REFERENCE_IDS[number];
export type BriefErrors = Record<string, string>;
export type BriefData = {
  name: string; businessName: string; email: string; currentLink: string;
  businessDescription: string; businessStage: string; businessStageOther: string;
  audience: string; services: string; goals: string[]; goalsOther: string; customerJourney: string;
  websiteNeeds: string; dashboard: string; budget: string; budgetCurrency: string; budgetOtherCurrency: string; budgetUndecided: boolean;
  styleDescription: string; styleRecommend: boolean; styleScales: Record<ScaleId, number | null>;
  referenceFeedback: Record<ReferenceId, { likes: string[]; avoid: string }>;
  referenceChoice: string; referenceWhy: string; ownReferences: { url: string; likes: string }[];
  assets: string[]; additionalNotes: string;
};

export const QUESTIONS = [
  "What does your business do, and how long have you been running it?",
  "Which best describes your business right now?",
  "Who are your ideal clients or customers?",
  "What services do you offer? Are you planning to sell any physical or digital products through your website?",
  "What would you most like your website to help you achieve?",
  "How do customers currently find you, and what happens when someone wants to work with you?",
  "What pages or features would you like your website to include? Would you need a dashboard to update content yourself?",
  "How much are you willing to invest in your website?",
  "How would you like your website to look and feel?",
  "What do you already have ready for the website?",
  "Is there anything else that could affect the project or that you’d like included in the proposal?",
];

export function emptyBrief(): BriefData {
  return {
    name: "", businessName: "", email: "", currentLink: "", businessDescription: "", businessStage: "", businessStageOther: "",
    audience: "", services: "", goals: [], goalsOther: "", customerJourney: "", websiteNeeds: "", dashboard: "", budget: "", budgetCurrency: "", budgetOtherCurrency: "", budgetUndecided: false,
    styleDescription: "", styleRecommend: false, styleScales: { tone: null, era: null, presence: null, density: null, approach: null, movement: null },
    referenceFeedback: { amr: { likes: [], avoid: "" }, tash: { likes: [], avoid: "" }, hans: { likes: [], avoid: "" } },
    referenceChoice: "", referenceWhy: "", ownReferences: Array.from({ length: 3 }, () => ({ url: "", likes: "" })), assets: [], additionalNotes: "",
  };
}

const fieldSteps: Record<string, number> = {
  name: 0, businessName: 0, email: 0, currentLink: 0, businessDescription: 0, businessStage: 0, businessStageOther: 0,
  audience: 1, services: 1, goals: 1, goalsOther: 1, customerJourney: 1,
  websiteNeeds: 2, dashboard: 2, budget: 2, budgetCurrency: 2, budgetOtherCurrency: 2, budgetUndecided: 2,
  styleDescription: 3, styleRecommend: 3, styleScales: 3, referenceFeedback: 3, referenceChoice: 3, referenceWhy: 3, ownReferences: 3,
  assets: 4, additionalNotes: 4,
};
export function stepForField(field: string) { return fieldSteps[field.split(".")[0]] ?? 0; }
export function webUrl(value: string) {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) && Boolean(url.hostname) && !url.username && !url.password; } catch { return false; }
}
export function selectedPosition(left: string, right: string, value: number | null) {
  if (value === null) return "Unanswered";
  return [`1 of 5 — ${left}`, `2 of 5 — leaning ${left.toLowerCase()}`, "3 of 5 — balanced", `4 of 5 — leaning ${right.toLowerCase()}`, `5 of 5 — ${right}`][value - 1];
}

export function validateBrief(data: BriefData, step?: number): BriefErrors {
  const errors: BriefErrors = {};
  const required = (key: keyof BriefData, message: string) => { if (!(data[key] as string).trim()) errors[key] = message; };
  required("name", "Enter your name."); required("businessName", "Enter your business name."); required("email", "Enter your email address.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.currentLink && !webUrl(data.currentLink)) errors.currentLink = "Use a complete website or social link, starting with https://.";
  required("businessDescription", "Tell me what your business does, or share what you are planning.");
  if (!STAGES.includes(data.businessStage)) errors.businessStage = "Choose the stage that fits your business best.";
  if (data.businessStage === "Other") required("businessStageOther", "Describe your current stage, or write ‘not sure’.");
  required("audience", "Tell me about your audience, or write ‘not sure yet’.");
  required("services", "Tell me about your services or products, or write ‘not sure yet’.");
  if (data.goals.length < 1 || data.goals.length > 3 || data.goals.some((goal) => !GOALS.includes(goal))) errors.goals = "Choose between one and three goals. Use Other if you’re unsure.";
  if (data.goals.includes("Other")) required("goalsOther", "Tell me about your other goal, or write ‘not sure yet’.");
  required("websiteNeeds", "Describe the pages or features you need, or write ‘please recommend’.");
  if (!DASHBOARD_OPTIONS.includes(data.dashboard)) errors.dashboard = "Choose a dashboard preference. ‘Not sure’ is welcome.";
  if (!data.budgetUndecided) {
    required("budget", "Share an amount or range, or select ‘I haven’t decided yet’.");
    if (!CURRENCIES.includes(data.budgetCurrency)) errors.budgetCurrency = "Choose a currency.";
    if (data.budgetCurrency === "Other") required("budgetOtherCurrency", "Enter the currency name or code.");
  }
  data.ownReferences.forEach((reference, index) => {
    if (reference.url && !webUrl(reference.url)) errors[`ownReferences.${index}.url`] = "Use a complete URL starting with https://.";
    if (reference.likes.trim() && !reference.url.trim()) errors[`ownReferences.${index}.url`] = "Add the website link for this reference.";
  });
  if (data.assets.includes(ASSETS[7]) && data.assets.some((asset) => ASSETS.slice(0, 6).includes(asset))) errors.assets = "‘Nothing ready yet’ cannot be combined with ready assets.";
  return step === undefined ? errors : Object.fromEntries(Object.entries(errors).filter(([key]) => stepForField(key) === step));
}

function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }

// Shared by draft restoration and server validation; never trust a cast from JSON.
export function parseBrief(value: unknown): { data: BriefData; errors: BriefErrors } {
  const data = emptyBrief();
  const errors: BriefErrors = {};
  if (!record(value)) return { data, errors: { name: "Invalid form data. Please review your answers." } };
  const text = (input: unknown, key: string, limit = 4000) => {
    if (input === undefined) return "";
    if (typeof input !== "string" || input.length > limit) { errors[key] = `Use text of no more than ${limit} characters.`; return ""; }
    return input.trim();
  };
  const selection = (input: unknown, key: string, options: readonly string[], max: number) => {
    if (input === undefined) return [];
    if (!Array.isArray(input) || input.length > max || input.some((item) => typeof item !== "string" || !options.includes(item)) || new Set(input).size !== input.length) { errors[key] = "Review these selections."; return []; }
    return input as string[];
  };
  for (const key of Object.keys(data) as (keyof BriefData)[]) {
    if (typeof data[key] === "string") {
      const limit = ["name", "businessName"].includes(key) ? 160 : key === "email" ? 254 : key === "currentLink" ? 2000 : key.startsWith("budget") ? 160 : 4000;
      (data as unknown as Record<string, unknown>)[key] = text(value[key], key, limit);
    }
  }
  for (const key of ["budgetUndecided", "styleRecommend"] as const) {
    if (value[key] !== undefined && typeof value[key] !== "boolean") errors[key] = "Review this selection.";
    data[key] = value[key] === true;
  }
  data.goals = selection(value.goals, "goals", GOALS, 3);
  data.assets = selection(value.assets, "assets", ASSETS, 8);
  if (value.styleScales !== undefined && !record(value.styleScales)) errors.styleScales = "Review the style scales.";
  if (record(value.styleScales)) for (const scale of SCALES) {
    const position = value.styleScales[scale.id];
    if (position === null || position === undefined) continue;
    if (typeof position !== "number" || !Number.isInteger(position) || position < 1 || position > 5) errors[`styleScales.${scale.id}`] = "Choose a position from 1 to 5.";
    else data.styleScales[scale.id] = position;
  }
  if (value.referenceFeedback !== undefined && !record(value.referenceFeedback)) errors.referenceFeedback = "Review the example feedback.";
  if (record(value.referenceFeedback)) for (const id of REFERENCE_IDS) {
    const feedback = value.referenceFeedback[id];
    if (feedback === undefined) continue;
    if (!record(feedback)) { errors.referenceFeedback = "Review the example feedback."; continue; }
    data.referenceFeedback[id] = { likes: selection(feedback.likes, `referenceFeedback.${id}`, FEEDBACK_OPTIONS, 6), avoid: text(feedback.avoid, `referenceFeedback.${id}.avoid`) };
  }
  if (data.referenceChoice && ![...REFERENCE_IDS, "combination", "none"].includes(data.referenceChoice)) errors.referenceChoice = "Choose an available reference option.";
  if (value.ownReferences !== undefined) {
    if (!Array.isArray(value.ownReferences) || value.ownReferences.length > 3) errors.ownReferences = "Add up to three references.";
    else value.ownReferences.forEach((reference, index) => {
      if (!record(reference)) { errors.ownReferences = "Review your reference links."; return; }
      data.ownReferences[index] = { url: text(reference.url, `ownReferences.${index}.url`, 2000), likes: text(reference.likes, `ownReferences.${index}.likes`) };
    });
  }
  return { data, errors };
}

export type ReviewGroup = { title: string; answers: { label: string; value: string }[] };
export function reviewBrief(data: BriefData, references: readonly { id: string; name: string; url: string }[]): ReviewGroup[] {
  const answer = (label: string, value: string) => ({ label, value: value || "Not answered" });
  const selectedReference = references.find((reference) => reference.id === data.referenceChoice)?.name ?? ({ combination: "A combination", none: "None of these" }[data.referenceChoice] || "Not answered");
  return [
    { title: STEPS[0], answers: [answer("Your name", data.name), answer("Business name", data.businessName), answer("Email", data.email), answer("Current website or social media link", data.currentLink), answer(`1. ${QUESTIONS[0]}`, data.businessDescription), answer(`2. ${QUESTIONS[1]}`, data.businessStage === "Other" ? `Other: ${data.businessStageOther}` : data.businessStage)] },
    { title: STEPS[1], answers: [answer(`3. ${QUESTIONS[2]}`, data.audience), answer(`4. ${QUESTIONS[3]}`, data.services), answer(`5. ${QUESTIONS[4]}`, data.goals.map((goal) => goal === "Other" ? `Other: ${data.goalsOther}` : goal).join("\n")), answer(`6. ${QUESTIONS[5]}`, data.customerJourney)] },
    { title: STEPS[2], answers: [answer(`7. ${QUESTIONS[6]}`, data.websiteNeeds), answer("Dashboard preference", data.dashboard), answer(`8. ${QUESTIONS[7]}`, data.budgetUndecided ? "I haven’t decided yet" : `${data.budget} — ${data.budgetCurrency === "Other" ? data.budgetOtherCurrency : data.budgetCurrency}`)] },
    { title: STEPS[3], answers: [answer(`9. ${QUESTIONS[8]}`, data.styleDescription), answer("Recommend a direction", data.styleRecommend ? "Yes — not sure; please recommend a direction." : "Not selected"), ...SCALES.map((scale) => answer(`${scale.left} ↔ ${scale.right}`, data.styleRecommend ? "Unanswered — recommendation requested" : selectedPosition(scale.left, scale.right, data.styleScales[scale.id]))), ...references.flatMap((reference) => { const feedback = data.referenceFeedback[reference.id as ReferenceId]; return [answer(`Example: ${reference.name}`, reference.url), answer(`${reference.name} — what I like`, feedback?.likes.join(", ") || ""), answer(`${reference.name} — change or avoid`, feedback?.avoid || "")]; }), answer("Closest example", selectedReference), answer("Why this direction?", data.referenceWhy), ...data.ownReferences.flatMap((reference, index) => [answer(`My reference ${index + 1}`, reference.url), answer(`My reference ${index + 1} — what I like`, reference.likes)])] },
    { title: STEPS[4], answers: [answer(`10. ${QUESTIONS[9]}`, data.assets.join("\n")), answer(`11. ${QUESTIONS[10]}`, data.additionalNotes)] },
  ];
}

export function formatBrief(data: BriefData, references: readonly { id: string; name: string; url: string }[], id: string) {
  return `WEBSITE PROJECT BRIEF\nSubmission: ${id}\n\n${reviewBrief(data, references).map((group, index) => `STEP ${index + 1} — ${group.title.toUpperCase()}\n\n${group.answers.map((item) => `${item.label}\n${item.value}`).join("\n\n")}`).join("\n\n────────────────────────\n\n")}`;
}
