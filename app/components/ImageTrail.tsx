"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";

type TrailImage = {
  src: StaticImageData | string;
  alt: string;
};

type ImageTrailProps = {
  items: TrailImage[];
  children: ReactNode;
  className?: string;
  imageWidth?: number;
  threshold?: number;
};

const TRAIL_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function ImageTrail({ items, children, className = "", imageWidth = 170, threshold = 96 }: ImageTrailProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const images = imageRefs.current.slice(0, items.length).filter((image): image is HTMLDivElement => image !== null);
    if (!area || !images.length) return;

    const media = gsap.matchMedia();

    media.add(TRAIL_QUERY, () => {
      const timelines = new Map<HTMLDivElement, gsap.core.Timeline>();
      let previous: { x: number; y: number } | null = null;
      let index = 0;
      let layer = 1;
      let lastSpawn = 0;

      const reset = () => {
        timelines.forEach((timeline) => timeline.kill());
        timelines.clear();
        gsap.set(images, { clearProps: "transform,opacity,zIndex" });
        previous = null;
        lastSpawn = 0;
        layer = 1;
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

        const bounds = area.getBoundingClientRect();
        const current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };

        if (!previous) {
          previous = current;
          return;
        }

        const dx = current.x - previous.x;
        const dy = current.y - previous.y;
        const now = performance.now();
        if (Math.hypot(dx, dy) < threshold || now - lastSpawn < 60) return;

        const image = images[index];
        index = (index + 1) % images.length;
        timelines.get(image)?.kill();

        const x = current.x - image.offsetWidth / 2;
        const y = current.y - image.offsetHeight / 2;
        const driftX = gsap.utils.clamp(-28, 28, dx * 0.2);
        const driftY = gsap.utils.clamp(-28, 28, dy * 0.2);

        // A short reveal, then a quiet fade.
        const timeline = gsap.timeline({
          onComplete: () => {
            timelines.delete(image);
            if (!timelines.size) layer = 1;
          },
        });

        timelines.set(image, timeline);
        timeline
          .set(image, { x: x - driftX, y: y - driftY, scale: 0.88, opacity: 0, zIndex: layer++ })
          .to(image, { opacity: 1, scale: 1, duration: 0.18, ease: "power1.out" }, 0)
          .to(image, { x, y, duration: 0.35, ease: "power2.out" }, 0)
          .to(image, { opacity: 0, scale: 0.72, duration: 0.5, ease: "power2.in" }, 0.55);

        previous = current;
        lastSpawn = now;
      };

      const onLeave = () => { previous = null; };
      const onVisibility = () => { if (document.hidden) reset(); };
      const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) reset(); });

      observer.observe(area);
      area.addEventListener("pointermove", onMove, { passive: true });
      area.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        observer.disconnect();
        area.removeEventListener("pointermove", onMove);
        area.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        reset();
      };
    });

    return () => media.revert();
  }, [items, threshold]);

  return (
    <div ref={areaRef} className={`relative isolate overflow-hidden ${className}`}>
      {children}

      {/* Desktop trail */}
      <div aria-hidden="true" className="hw-image-trail-layer pointer-events-none absolute inset-0 z-10 hidden">
        {items.map((item, index) => (
          <div key={`${item.alt}-${index}`} ref={(element) => { imageRefs.current[index] = element; }} className="absolute left-0 top-0 aspect-[1.55] overflow-hidden opacity-0" style={{ width: imageWidth }}>
            <Image src={item.src} alt="" fill sizes={`${imageWidth}px`} className="object-cover object-center" draggable={false} />
          </div>
        ))}
      </div>

      {/* Mobile and reduced motion */}
      {items.length > 0 && (
        <div className="hw-image-trail-still mx-auto mt-10 grid w-full max-w-md grid-cols-3 items-center gap-3 pb-4 md:mt-12 md:gap-4">
          {items.slice(0, 3).map((item, index) => (
            <div key={`${item.alt}-${index}`} className={`relative aspect-[1.25] overflow-hidden ${index === 1 ? "-translate-y-3" : index === 2 ? "translate-y-3" : ""}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 480px) 28vw, 140px" className="object-cover object-center" />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media ${TRAIL_QUERY} {
          .hw-image-trail-layer { display: block; }
          .hw-image-trail-still { display: none; }
        }
      `}</style>
    </div>
  );
}
