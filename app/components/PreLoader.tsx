"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import logo from "../assets/logo.jpeg"

/**
 * First-load intro: wordmark fades up, holds, fades out, then the whole
 * panel lifts away (curtain-style) to reveal the page underneath.
 *
 * Mounted once in app/layout.tsx, so it plays once per fresh page load —
 * it will not replay on client-side navigations between pages, since the
 * root layout isn't remounted for those.
 */
const Preloader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDone(true);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
        setDone(true);
      },
    });

    tl.fromTo(
      wordRef.current,
      { opacity: 0, y: 16, letterSpacing: "0.35em" },
      { opacity: 1, y: 0, letterSpacing: "0.15em", duration: 1.1 }
    )
      .to(wordRef.current, { opacity: 0, y: -12, duration: 0.6 }, "+=0.5")
      .to(
        overlayRef.current,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        "-=0.15"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="bg-charcoal fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden="true"
    >
      <div ref={wordRef} className="flex flex-col items-center gap-2 opacity-0">
        <Image src={logo} width={400} height={400} alt="logo" className="w-40"/>
      </div>
    </div>
  );
};

export default Preloader;