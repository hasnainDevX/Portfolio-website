"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PortfolioMarqueesProps = {
  marqueeText?: string;
  scrollText?: string;
  duration?: number;
  className?: string;
};

export default function PortfolioMarquees({ marqueeText = "What you build now determines where you go next", scrollText = "What you build now determines where you go next", duration = 59, className = "" }: PortfolioMarqueesProps) {
  const stripsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const strips = stripsRef.current;
    const marquee = marqueeRef.current;
    const row = rowRef.current;
    const track = trackRef.current;
    if (!strips || !marquee || !row || !track) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(track, { x: () => -Math.min(row.clientWidth * 0.3, 360) }, {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }, strips);

      const observer = new IntersectionObserver(([entry]) => {
        marquee.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      });
      observer.observe(marquee.parentElement!);

      return () => {
        observer.disconnect();
        marquee.style.animationPlayState = "paused";
        context.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={stripsRef} className={`relative w-full font-serif text-charcoal ${className}`} style={{ fontFamily: "var(--font-editors-note, var(--font-serif, serif))" }}>
      <p className="sr-only">{marqueeText}. {scrollText}.</p>

      {/* Continuous marquee */}
      <div aria-hidden="true" className="hw-portfolio-zigzag overflow-hidden bg-gold py-2 text-white">
        <div ref={marqueeRef} className="flex w-max animate-[hw-portfolio-marquee_59s_linear_infinite] motion-reduce:animate-none" style={{ animationDuration: `${duration}s`, animationPlayState: "paused" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex min-w-[100vw] shrink-0 items-center justify-around whitespace-nowrap text-[clamp(2rem,4vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.025em]">
              <span>{marqueeText}</span>
              <span className="mx-6 md:mx-10">—</span>
            </div>
          ))}
        </div>
      </div>

      {/* Moves only with scroll */}
      <div ref={rowRef} aria-hidden="true" className="overflow-hidden bg-transparent py-1 text-charcoal">
        <div ref={trackRef} className="flex w-max text-transparent" style={{ WebkitTextStroke: "1px #2a2a2a" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex min-w-[100vw] shrink-0 items-center justify-around whitespace-nowrap text-[clamp(2rem,4vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.025em]">
              {[0, 1].map((item) => (
                <span key={item} className="inline-flex items-center">{scrollText}<span className="mx-6 md:mx-10">—</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hw-portfolio-zigzag {
          --zigzag-top: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath d='M0 6L6 0L12 6Z' fill='black'/%3E%3C/svg%3E");
          --zigzag-bottom: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath d='M0 0H12L6 6Z' fill='black'/%3E%3C/svg%3E");
          -webkit-mask: var(--zigzag-top) left top / 12px 6px repeat-x, linear-gradient(#000 0 0) center / 100% calc(100% - 12px) no-repeat, var(--zigzag-bottom) left bottom / 12px 6px repeat-x;
          mask: var(--zigzag-top) left top / 12px 6px repeat-x, linear-gradient(#000 0 0) center / 100% calc(100% - 12px) no-repeat, var(--zigzag-bottom) left bottom / 12px 6px repeat-x;
        }

        @keyframes hw-portfolio-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
