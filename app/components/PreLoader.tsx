"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import logo from "../assets/logo.jpeg";

function PageReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const logoElement = logoRef.current;
    if (!overlay || !logoElement) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const restoreScroll = () => {
      document.body.style.overflow = previousOverflow;
    };

    const context = gsap.context(() => {
      const panels = Array.from(overlay.querySelectorAll<HTMLElement>("[data-reveal-panel]")).filter((panel) => panel.offsetWidth > 0);

      const timeline = gsap.timeline({
        onComplete: () => {
          restoreScroll();
          setDone(true);
        },
      });

      timeline
        .to(logoElement, { opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(logoElement, { opacity: 0, duration: 0.18, ease: "power2.in" }, "+=0.2")
        .to(panels, {
          yPercent: -101,
          duration: 1.2,
          stagger: { each: 0.055, from: "start" },
          ease: "power3.inOut",
        }, "-=0.03");
    }, overlay);

    return () => {
      context.revert();
      restoreScroll();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} aria-hidden="true" className="fixed inset-0 z-[10000] overflow-hidden motion-reduce:hidden">
      {/* Stepped curtain */}
      <div className="absolute inset-0 grid grid-cols-5 md:grid-cols-10">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} data-reveal-panel className={`-mx-px h-full bg-charcoal will-change-transform ${index >= 5 ? "hidden md:block" : ""}`} />
        ))}
      </div>

      {/* Your logo */}
      <div ref={logoRef} className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
        <Image src={logo} alt="" priority sizes="(min-width: 768px) 224px, 176px" className="h-auto w-44 md:w-56" />
      </div>
    </div>
  );
}

export default function Preloader() {
  const pathname = usePathname();

  return <PageReveal key={pathname} />;
}
