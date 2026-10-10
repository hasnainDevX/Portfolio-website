"use client";

import { Fragment, useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

export type ShowcaseImage = {
  src: StaticImageData | string;
  alt: string;
  objectPosition?: string;
};

type ScrollShowcaseProps = {
  mode?: "both" | "text" | "images";
  heading?: string | string[];
  description?: string;
  images?: ShowcaseImage[];
  id?: string;
  label?: string;
  className?: string;
};

const IMAGE_LAYOUTS = [
  "relative col-span-5 col-start-1 row-start-1 mt-[12svh] aspect-[2/3] overflow-hidden md:col-span-3 md:mt-[8svh]",
  "relative col-span-6 col-start-7 row-start-1 aspect-[3/5] overflow-hidden md:col-span-4 md:col-start-5",
  "relative col-span-5 col-start-2 row-start-2 mt-10 aspect-[2/3] overflow-hidden md:col-span-3 md:col-start-10 md:row-start-1 md:mt-[18svh]",
  "relative col-span-8 col-start-5 row-start-1 aspect-[4/5] w-full overflow-hidden md:col-span-6 md:col-start-1 md:max-w-[480px]",
  "relative col-span-6 col-start-1 row-start-2 mt-10 aspect-[3/4] overflow-hidden md:col-span-4 md:col-start-8 md:row-start-1 md:mt-8",
];

const IMAGE_SIZES = [
  "(min-width: 1280px) 265px, (min-width: 768px) 23vw, 42vw",
  "(min-width: 1280px) 355px, (min-width: 768px) 32vw, 50vw",
  "(min-width: 1280px) 265px, (min-width: 768px) 23vw, 42vw",
  "(min-width: 1280px) 480px, (min-width: 768px) 46vw, 67vw",
  "(min-width: 1280px) 355px, (min-width: 768px) 32vw, 50vw",
];

export default function ScrollShowcase({
  mode = "both",
  heading = "",
  description,
  images = [],
  id,
  label,
  className = "bg-cream-bg text-charcoal",
}: ScrollShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const centerImageRef = useRef<HTMLElement>(null);

  const lines = (Array.isArray(heading) ? heading : [heading]).filter((line) => line.trim());
  const headingKey = JSON.stringify(lines);
  const showText = mode !== "images" && lines.length > 0;
  const showImages = mode !== "text" && images.length > 0;
  const combined = showText && showImages;
  const imageGroups = Array.from({ length: Math.ceil(images.length / 5) }, (_, index) => images.slice(index * 5, index * 5 + 5));

  useEffect(() => {
    const section = sectionRef.current;
    const headingElement = headingRef.current;
    if (!showText || !section || !headingElement) return;

    const paragraph = paragraphRef.current;
    const centerImage = centerImageRef.current;
    const revealWords = Array.from(headingElement.querySelectorAll<HTMLElement>("[data-word-reveal]"));
    const exitWords = Array.from(headingElement.querySelectorAll<HTMLElement>("[data-word-exit]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    let frame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      if (disposed) return;

      const vh = window.innerHeight;
      const staticLayout = reducedMotion.matches || vh <= 560;
      const sectionTop = section.getBoundingClientRect().top;
      const headingRect = headingElement.getBoundingClientRect();
      let reveal = 1;
      let exit = 0;

      if (!staticLayout) {
        // Text-only follows the heading through the viewport.
        reveal = combined
          ? clamp((vh * 0.6 - sectionTop) / (vh * 0.6))
          : clamp((vh * 0.85 - headingRect.top) / (vh * 0.35 + headingRect.height));

        if (combined && centerImage) {
          const imageRect = centerImage.getBoundingClientRect();
          exit = clamp((vh * 0.72 - imageRect.top) / (imageRect.height + vh * 0.37));
        }
      }

      revealWords.forEach((word, index) => {
        const progress = clamp(reveal * revealWords.length - index);
        word.style.opacity = String(0.24 + progress * 0.76);
      });

      exitWords.forEach((word, index) => {
        const progress = clamp(exit * exitWords.length - (exitWords.length - 1 - index));
        word.style.opacity = String(1 - progress);
      });

      if (paragraph) paragraph.style.opacity = String(1 - clamp(exit * 3));
    };

    const scheduleUpdate = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    document.fonts.ready.then(scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(section);
    resizeObserver.observe(headingElement);
    if (centerImage) resizeObserver.observe(centerImage);

    return () => {
      disposed = true;
      window.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      [...revealWords, ...exitWords].forEach((element) => element.style.removeProperty("opacity"));
      paragraph?.style.removeProperty("opacity");
    };
  }, [showText, combined, headingKey, description, images.length]);

  const renderImage = (item: ShowcaseImage, slot: number, groupIndex: number) => (
    <figure key={slot} ref={groupIndex === 0 && slot === (images.length === 1 ? 0 : 1) ? centerImageRef : undefined} className={IMAGE_LAYOUTS[slot]}>
      <Image src={item.src} alt={item.alt} fill sizes={IMAGE_SIZES[slot]} className="object-cover" style={{ objectPosition: item.objectPosition ?? (slot === 4 ? "center" : "top") }} />
    </figure>
  );

  return (
    <section ref={sectionRef} id={id} aria-label={label ?? (showText ? undefined : "Selected work")} className={`relative isolate ${className}`}>
      <div className="relative grid grid-cols-1">
        {showText && (
          <div className={combined ? "statement-stage sticky top-0 z-0 col-start-1 row-start-1 flex h-[100svh] self-start items-center justify-center px-5 py-10 sm:px-8 lg:px-12" : "relative px-5 py-20 sm:px-8 md:py-28 lg:px-12"}>
            <div className="mx-auto w-full max-w-[1080px] text-center">
              <h2 ref={headingRef} aria-label={lines.join(" ")} className="font-serif text-[clamp(2rem,8vw,6.75rem)] font-normal leading-[1.06] tracking-[-0.035em] md:text-[clamp(4rem,7.2vw,7.25rem)]">
                <span aria-hidden="true">
                  {lines.map((line, lineIndex) => (
                    <span key={lineIndex} className="block">
                      {line.trim().split(/\s+/).map((word, index) => (
                        <Fragment key={index}>
                          {index > 0 && " "}
                          <span data-word-exit className="inline-block">
                            <span data-word-reveal className="inline-block">{word}</span>
                          </span>
                        </Fragment>
                      ))}
                    </span>
                  ))}
                </span>
              </h2>
              {description && <p ref={paragraphRef} className="mx-auto mt-7 max-w-[660px] font-display text-[15px] leading-[1.65] sm:text-base md:mt-9 md:text-lg xl:text-xl">{description}</p>}
            </div>
          </div>
        )}

        {showImages && (
          <div className={combined ? "statement-collage pointer-events-none relative z-10 col-start-1 row-start-1 pt-[130svh] pb-20 md:pb-28 lg:pb-32" : "relative py-20 md:py-28 lg:py-32"}>
            <div className="mx-auto w-full max-w-[1180px] space-y-12 px-5 sm:px-8 md:space-y-16 lg:space-y-20 lg:px-10">
              {imageGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="grid grid-cols-12 items-start gap-x-4 md:gap-x-5">
                    {group.slice(0, 3).map((item, slot) => renderImage(item, slot, groupIndex))}
                  </div>
                  {group.length > 3 && (
                    <div className="mt-12 grid grid-cols-12 items-start gap-x-4 md:mt-16 md:gap-x-5 lg:mt-20">
                      {group.slice(3).map((item, index) => renderImage(item, index + 3, groupIndex))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce), (max-height: 560px) {
          .statement-stage {
            position: relative;
            top: auto;
            height: auto;
            grid-column: auto;
            grid-row: auto;
            padding-block: 5rem;
          }
          .statement-collage {
            grid-column: auto;
            grid-row: auto;
            padding-top: 0;
          }
        }
      `}</style>
    </section>
  );
}
