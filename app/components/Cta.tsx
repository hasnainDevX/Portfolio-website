'use client';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16, letterSpacing: "0.5em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.8 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          btnsRef.current?.children ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#2a2a2a] min-h-[80vh] flex items-center justify-center px-6"
    >
      <div className="max-w-6xl mx-auto text-center text-white">
        {/* Top Tagline */}
        <p
          ref={taglineRef}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-12 font-light"
          style={{ fontFamily: "sans-serif", opacity: 0 }}
        >
          ARE YOU READY TO REFINE YOUR BRAND?
        </p>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-16 font-light tracking-wide"
        >
          BOOK YOUR PROJECT
        </h1>

        {/* CTA Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <a href="/enquiry" className="group relative inline-block" style={{ opacity: 0 }}>
            <span
              className="text-base md:text-lg tracking-[0.15em] uppercase font-light transition-opacity duration-300 group-hover:opacity-70"
              style={{ fontFamily: "sans-serif" }}
            >
              BOOK YOUR DISCOVERY CALL
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </a>

          <Link href="/enquiry" className="group relative inline-block" style={{ opacity: 0 }}>
            <span
              className="text-base md:text-lg tracking-[0.15em] uppercase font-light transition-opacity duration-300 group-hover:opacity-70"
              style={{ fontFamily: "sans-serif" }}
            >
              APPLY TO WORK TOGETHER
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cta;