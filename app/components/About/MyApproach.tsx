"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import cardBg from "../../assets/image.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Higher values mean more scrolling.
const SCROLL_PACE = 1.15;

const approaches = [
  { number: "01", title: "Listen", image: cardBg, background: "#b5973a", description: "We start by talking. What you love, what you don't, and who you're trying to win over, so I'm never guessing what you want." },
  { number: "02", title: "Design", image: cardBg, background: "#b5973a", description: "A website that feels like the next version of your brand, not a template with your logo dropped in." },
  { number: "03", title: "Collaborate", image: cardBg, background: "#b5973a", description: "You see the site take shape section by section and tell me what you think as it goes, so there are no surprises at the end." },
  { number: "04", title: "Refine", image: cardBg, background: "#b5973a", description: "Revisions while I'm building. We move forward when you're happy with it, not when the clock runs out." },
  { number: "05", title: "Build", image: cardBg, background: "#b5973a", description: "Built by hand just for you, not stitched together from a template. Fast, clean, and made to last, so you're not rebuilding in two years." },
];

export default function MyApproach() {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !scroll || !stage || !viewport || !track || !progress) return;

    const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-step]"));
    const media = window.matchMedia("(min-height: 560px) and (prefers-reduced-motion: no-preference)");
    let context: gsap.Context | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;

    const reset = () => {
      context?.revert();
      context = undefined;
      scroll.removeAttribute("data-horizontal");
      scroll.style.removeProperty("height");
      scroll.style.removeProperty("--panel-width");
      scroll.style.removeProperty("--panel-edge");
    };

    const setup = () => {
      if (disposed) return;
      reset();
      if (!media.matches) {
        ScrollTrigger.refresh();
        return;
      }

      const width = scroll.clientWidth;
      const panelWidth = width < 768 ? Math.min(440, width - 32) : 480;
      scroll.style.setProperty("--panel-width", `${panelWidth}px`);
      scroll.style.setProperty("--panel-edge", `${(width - panelWidth) / 2}px`);
      scroll.setAttribute("data-horizontal", "true");

      // Keep enlarged text fully readable.
      if (track.getBoundingClientRect().height > viewport.clientHeight - 8 || panels.some((panel) => (panel.querySelector<HTMLElement>("[data-step-content]")?.offsetHeight ?? 0) > panel.clientHeight)) {
        reset();
        ScrollTrigger.refresh();
        return;
      }

      const distance = panels[panels.length - 1].offsetLeft - panels[0].offsetLeft;
      const travel = distance * SCROLL_PACE;
      scroll.style.height = `${stage.offsetHeight + travel}px`;

      context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scroll,
            start: "top top",
            end: () => `+=${travel}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        timeline.fromTo(track, { x: 0 }, { x: -distance, duration: 1, ease: "none" }, 0);
        timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0);
      }, section);

      ScrollTrigger.refresh();
    };

    const scheduleSetup = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(setup, 150);
    };

    setup();
    window.addEventListener("resize", scheduleSetup);
    media.addEventListener("change", scheduleSetup);
    document.fonts.ready.then(() => {
      if (!disposed) setup();
    });

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", scheduleSetup);
      media.removeEventListener("change", scheduleSetup);
      reset();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby={headingId} className="relative isolate bg-white text-charcoal">
      {/* Introduction */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-12 md:px-12 md:pt-28 md:pb-16 lg:px-20">
        <p className="mb-8 font-display text-[11px] uppercase tracking-[0.24em] text-charcoal/70">My process</p>
        <h2 id={headingId} className="max-w-[1000px] font-serif text-[clamp(2.75rem,6.8vw,6.75rem)] font-normal leading-[1.02] tracking-[-0.035em]">
          What working<br className="hidden sm:block" /> with me is like.
        </h2>
      </div>

      {/* Scrolling steps */}
      <div ref={scrollRef} className="approach-scroll relative">
        <div ref={stageRef} className="approach-stage relative">
          <div className="approach-caption relative z-10 items-center justify-between px-6 font-display text-[10px] uppercase tracking-[0.2em] text-charcoal/70 md:px-12 lg:px-20" aria-hidden="true">
            <span>A considered process</span>
            {/* <span>01 — 05</span> */}
          </div>

          <div ref={viewportRef} className="approach-window relative z-10 text-white">
            <ol ref={trackRef} className="approach-track">
              {approaches.map((item) => (
                <li key={item.number} data-step className="approach-step" style={{ backgroundColor: item.background }}>
                  {/* Card background */}
                  <Image src={item.image} alt="" fill sizes="(max-width: 767px) calc(100vw - 32px), 480px" className="pointer-events-none object-cover object-center opacity-20" />
                  <div data-step-content className="relative z-10 w-full shrink-0 p-6">
                    <span className="mb-4 block font-display text-xs tracking-[0.2em] text-white" aria-hidden="true">{item.number} / 05</span>
                    <h3 className="mb-4 font-serif text-[clamp(2.5rem,4vw,3rem)] font-normal leading-[1.02] tracking-[-0.035em]">{item.title}</h3>
                    <p className="font-display text-[15px] leading-[1.65] text-white">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="approach-footer relative z-10 px-6 md:px-12 lg:px-20" aria-hidden="true">
            <div className="mb-4 flex justify-between font-display text-[10px] uppercase tracking-[0.2em] text-charcoal/70">
              <span>Your vision</span>
              <span>Your website</span>
            </div>
            <div className="h-px bg-charcoal/20">
              <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .approach-caption, .approach-footer { display: none; }
        .approach-track { position: relative; display: grid; gap: 24px; max-width: 528px; margin: 0 auto; padding: 32px 16px; list-style: none; }
        .approach-step { position: relative; display: flex; align-items: flex-end; min-height: 560px; overflow: hidden; border-radius: 12px; background: transparent; }
        .approach-scroll[data-horizontal] .approach-stage { position: sticky; top: 0; display: flex; flex-direction: column; height: 100svh; padding: 88px 0 24px; }
        .approach-scroll[data-horizontal] .approach-caption { display: flex; flex-shrink: 0; }
        .approach-scroll[data-horizontal] .approach-window { display: flex; flex: 1; min-height: 0; align-items: center; overflow: hidden; margin: 16px 0; }
        .approach-scroll[data-horizontal] .approach-track { display: flex; flex-shrink: 0; align-items: stretch; gap: 24px; width: max-content; max-width: none; margin: 0; padding: 0 var(--panel-edge); will-change: transform; }
        .approach-scroll[data-horizontal] .approach-step { box-sizing: border-box; flex: 0 0 var(--panel-width); width: var(--panel-width); height: min(640px, calc(100svh - 208px)); min-height: 0; }
        .approach-scroll[data-horizontal] .approach-footer { display: block; flex-shrink: 0; }
        @media (min-width: 768px) {
          .approach-track { padding-block: 40px; }
          .approach-scroll[data-horizontal] .approach-track { gap: 32px; }
          .approach-scroll[data-horizontal] .approach-stage { padding-bottom: 24px; }
        }
      `}</style>
    </section>
  );
}
