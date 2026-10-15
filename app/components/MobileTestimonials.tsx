"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
};

const CARD_HEIGHT = 560;
const MAX_QUOTE_SIZE = 17;

function FittedQuote({ quote }: { quote: string }) {
  const containerRef = useRef<HTMLQuoteElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    let active = true;

    const fitText = () => {
      if (!active || container.clientHeight === 0) return;

      // Start at the preferred size, then reduce only when needed.
      let size = MAX_QUOTE_SIZE;
      text.style.fontSize = `${size}px`;

      while (
        text.getBoundingClientRect().height > container.clientHeight &&
        size > 10
      ) {
        size -= 0.25;
        text.style.fontSize = `${size}px`;
      }
    };

    fitText();

    const observer = new ResizeObserver(fitText);
    observer.observe(container);

    document.fonts.ready.then(() => {
      if (active) fitText();
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [quote]);

  return (
    <blockquote ref={containerRef} className="mt-4 min-h-0 flex-1">
      <p
        ref={textRef}
        className="font-display text-[17px] font-normal leading-[1.55] [overflow-wrap:anywhere]"
      >
        {quote}
      </p>
    </blockquote>
  );
}

export default function MobileTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  if (!testimonials.length) return null;

  const currentIndex = index % testimonials.length;
  const current = testimonials[currentIndex];
  const hasMultiple = testimonials.length > 1;

  function changeTestimonial(step: number) {
    setDirection(step);
    setIndex(
      (previous) =>
        (previous + step + testimonials.length) % testimonials.length,
    );
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-12 w-11 -translate-y-1/2 items-center justify-center text-white transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white";

  return (
    <section
      aria-label="Client testimonials"
      className="hw-testimonials-band relative h-[90vh]! w-full min-w-0 bg-gold px-2 py-12 text-white md:hidden"
    >
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-8 px-6 text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-cream-bg">
            Kind words
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,10vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.03em]">
            From my clients.
          </h2>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client stories"
          className={`w-full ${hasMultiple ? "px-11" : "px-4"}`}
        >
          {/* Previous */}
          {hasMultiple && (
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => changeTestimonial(-1)}
              className={`${arrowClass} left-2`}
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m14 5-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </button>
          )}

          {/* Fixed card area */}
          <div
            className="min-w-0 overflow-hidden"
            style={{ height: CARD_HEIGHT }}
          >
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.figure
                key={current.id}
                custom={direction}
                variants={{
                  enter: (step: number) => ({
                    opacity: 0,
                    x: reduceMotion ? 0 : step * 16,
                  }),
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                  exit: (step: number) => ({
                    opacity: 0,
                    x: reduceMotion ? 0 : step * -16,
                  }),
                }}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  ease: "easeOut",
                }}
                className="m-0 flex h-full w-full flex-col px-1 py-7 text-white"
              >
                <span
                  aria-hidden="true"
                  className="block h-9 shrink-0 font-serif text-[4rem] leading-none text-white/80"
                >
                  “
                </span>

                <FittedQuote quote={current.quote} />

                <figcaption className="mt-5 shrink-0 border-t border-white/30 pt-4">
                  <p className="font-display text-xs font-semibold uppercase leading-snug tracking-[0.1em] [overflow-wrap:anywhere]">
                    {current.name}
                  </p>

                  {current.role && (
                    <p className="mt-2 font-display text-xs leading-[1.45] text-white/90 [overflow-wrap:anywhere]">
                      {current.role}
                    </p>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Next */}
          {hasMultiple && (
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => changeTestimonial(1)}
              className={`${arrowClass} right-2`}
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m10 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </button>
          )}
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Testimonial {currentIndex + 1} of {testimonials.length}, from{" "}
          {current.name}.
        </p>
      </div>

      <style>{`
  .hw-testimonials-band {
    --edge-top: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath d='M0 6L6 0L12 6Z' fill='black'/%3E%3C/svg%3E");
    --edge-bottom: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath d='M0 0H12L6 6Z' fill='black'/%3E%3C/svg%3E");

    -webkit-mask:
      var(--edge-top) left top / 12px 6px repeat-x,
      linear-gradient(#000 0 0) center / 100% calc(100% - 12px) no-repeat,
      var(--edge-bottom) left bottom / 12px 6px repeat-x;

    mask:
      var(--edge-top) left top / 12px 6px repeat-x,
      linear-gradient(#000 0 0) center / 100% calc(100% - 12px) no-repeat,
      var(--edge-bottom) left bottom / 12px 6px repeat-x;
  }
`}</style>
    </section>
  );
}
