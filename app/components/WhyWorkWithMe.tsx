"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    heading: ["A personal,", "collaborative process."],
    description: "You work directly with me throughout the project. We start by talking, then you see your site take shape section by section, with room to ask questions, share feedback, and refine the details together.",
  },
  {
    heading: ["A website that feels", "like your business."],
    description: "Your brand, your audience, and what you want your website to do shape the design. Every page is built around those decisions, with a clear path for visitors to explore your work and get in touch.",
  },
  {
    heading: ["Built with care,", "down to the code."],
    description: "I design and develop your website myself, so the details carry through from the first layout to the finished build. That means attention to loading speed, mobile usability, and how easily your site can grow with you.",
  },
];

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    let disposed = false;

    media.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767.98px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduceMotion) return;

        const desktop = context.conditions?.desktop;
        const distance = () => desktop ? Math.min(160, section.clientWidth * 0.12) : 20;

        // Each heading and paragraph move as a pair.
        section.querySelectorAll<HTMLElement>("[data-benefit-row]").forEach((row) => {
          const left = row.querySelector<HTMLElement>("[data-slide-left]");
          const right = row.querySelector<HTMLElement>("[data-slide-right]");
          if (!left || !right) return;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              end: "top 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          timeline.fromTo(left, { x: () => -distance() }, { x: 0, duration: 1, ease: "none" }, 0);
          timeline.fromTo(right, { x: distance }, { x: 0, duration: 1, ease: "none" }, 0);
        });
      },
      section,
    );

    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      media.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Why work with Hasnain Webstudio" className="relative overflow-x-clip bg-white px-6 py-20 text-charcoal sm:px-10 md:px-12 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-14 md:gap-20 lg:gap-24">
        {POINTS.map((point, index) => (
          <div key={index} data-benefit-row className="grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-x-16 lg:gap-x-28">
            <h2 data-slide-left className="max-w-[580px] font-serif text-[clamp(2.25rem,3.65vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.035em]">
              {point.heading.map((line, lineIndex) => (
                <span key={lineIndex} className="block">{line}</span>
              ))}
            </h2>
            <p data-slide-right className="max-w-[380px] font-display text-base leading-[1.7] md:justify-self-end md:text-lg lg:text-[19px]">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
