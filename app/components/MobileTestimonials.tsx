"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
};


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

  function changeTestimonial(step: number) {
    setDirection(step);
    setIndex(
      (previous) =>
        (previous + step + testimonials.length) % testimonials.length
    );
  }

  const arrowClass =
    "flex h-12 w-12 items-center justify-center rounded-full " +
    "border border-[#2a2a2a]/25 text-2xl transition-colors " +
    "hover:bg-[#2a2a2a] hover:text-[#FFFCF9] " +
    "focus-visible:outline focus-visible:outline-2 " +
    "focus-visible:outline-offset-4 focus-visible:outline-[#2a2a2a] " +
    "disabled:cursor-default disabled:opacity-30";

  return (
    <section
      aria-label="Client testimonials"
      className="w-full min-w-0 bg-[#FFFCF9] px-5 py-16 text-[#2a2a2a] md:hidden"
    >
      <div className="mx-auto w-full max-w-md">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.2em]">
          Kind words
        </p>

        <h2 className="mb-8 text-center font-serif text-4xl leading-tight">
          From my clients.
        </h2>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          className="overflow-hidden rounded-[1.5rem]"
        >
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}
          >
            <motion.figure
              key={current.id}
              custom={direction}
              variants={{
                enter: (step: number) => ({
                  opacity: 0,
                  x: reduceMotion ? 0 : step * 32,
                }),
                visible: {
                  opacity: 1,
                  x: 0,
                },
                exit: (step: number) => ({
                  opacity: 0,
                  x: reduceMotion ? 0 : step * -32,
                }),
              }}
              initial="enter"
              animate="visible"
              exit="exit"
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: "easeOut",
              }}
              className="m-0 flex h-[420px] w-full flex-col overflow-hidden rounded-[1.5rem] border border-[#2a2a2a]/15 bg-[#F5F0E9] p-7"
            >
              <span
                aria-hidden="true"
                className="h-12 font-serif text-7xl leading-none text-[#B49732]"
              >
                “
              </span>

              <blockquote className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
                <p className="break-words font-serif text-2xl leading-relaxed">
                  {current.quote}
                </p>
              </blockquote>

              <figcaption className="mt-6 shrink-0 border-t border-[#2a2a2a]/15 pt-5">
                <p className="text-sm font-semibold">{current.name}</p>

                {current.role && (
                  <p className="mt-1 text-sm text-[#2a2a2a]/70">
                    {current.role}
                  </p>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={testimonials.length < 2}
            onClick={() => changeTestimonial(-1)}
            className={arrowClass}
          >
            <span aria-hidden="true">←</span>
          </button>

          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm tracking-widest"
          >
            <span className="sr-only">Testimonial </span>
            {currentIndex + 1} / {testimonials.length}
          </p>

          <button
            type="button"
            aria-label="Next testimonial"
            disabled={testimonials.length < 2}
            onClick={() => changeTestimonial(1)}
            className={arrowClass}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}