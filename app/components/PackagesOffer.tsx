// components/PackagesOffer.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PackagesOffer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const topHr = el.querySelector(".hr-top");
      const bottomHr = el.querySelector(".hr-bottom");
      const label = el.querySelector(".offer-label");
      const heading = el.querySelector(".offer-heading");
      const sub = el.querySelector(".offer-sub");
      const btn = el.querySelector(".offer-btn");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (topHr) {
        tl.fromTo(
          topHr,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.9 },
          0
        );
      }

      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 10, letterSpacing: "0.1em" },
          { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.6 },
          0.3
        );
      }

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.45
        );
      }

      if (sub) {
        tl.fromTo(
          sub,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.65
        );
      }

      if (btn) {
        tl.fromTo(
          btn,
          { opacity: 0, y: 12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          0.8
        );
      }

      if (bottomHr) {
        tl.fromTo(
          bottomHr,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.9 },
          0.9
        );
      }

      // subtle looping shimmer on the gold label, independent of scroll
      if (label) {
        gsap.to(label, {
          opacity: 0.55,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-8 px-8 lg:px-16 text-center">
      <hr className="hr-top border-t border-gray-500 mb-8" />

      <p
        className="offer-label text-xs tracking-[0.3em] uppercase mb-3"
        style={{ color: "#b5924c" }}
      >
        August Offer
      </p>

      <h3
        className="offer-heading text-2xl lg:text-3xl mb-2"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        25% off Foundation &amp; Signature sites,{" "}
        <span className="italic">booked this month.</span>
      </h3>

      <p className="offer-sub text-sm text-[#2a2a2a]/60 mb-6">
        Offer ends August 31st.
      </p>

      {/* <Link href="#packages-section">
        <button className="offer-btn px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
          See Packages
        </button>
      </Link> */}

      <hr className="hr-bottom border-t border-gray-500 mt-8" />
    </div>
  );
};

export default PackagesOffer;