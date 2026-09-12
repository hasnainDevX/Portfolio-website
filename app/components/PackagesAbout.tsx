'use client'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/logo.jpeg";
import Link from "next/link";
import leftImage from "../assets/ecomsite1.jpeg";
import rightImage from "../assets/image2.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PackagesAbout = () => {
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Side images reveal inward
      tl.fromTo(
        leftImgRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1 },
        0,
      ).fromTo(
        rightImgRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1 },
        0,
      );

      // Logo drops in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.3,
      );

      // Heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.5,
      );

      // Paragraphs stagger
      if (parasRef.current) {
        const paras = parasRef.current.querySelectorAll("p");
        tl.fromTo(
          paras,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          0.75,
        );
      }

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col md:py-20">
      <div className="flex flex-1 overflow-hidden">
        {/* Left image */}
        <div
          ref={leftImgRef}
          className="md:block hidden w-[12%] relative overflow-hidden"
          style={{ opacity: 0 }}
        >
          <Image
            src={leftImage}
            alt="Left Image"
            fill
            className="object-cover" 
          
          />
        </div>

        {/* Center text */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-[4.5rem] py-16 text-center bg-white space-y-12">
          <Image
            ref={logoRef}
            src={logo}
            alt="Hasnain Webstudio logo"
            className="w-20 h-20"
            style={{ opacity: 0 }}
          />

          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.15] sm:leading-[1.12] md:leading-[1.1] mb-6 sm:mb-7 md:mb-8 px-2 sm:px-0 font-playfair md:capitalize uppercase tracking-wide text-charcoal"
            style={{ opacity: 0 }}
          >
            Your website should be working for you — not just sitting there
            looking pretty
          </h1>

          <div
            ref={parasRef}
            className="max-w-3xl space-y-5 text-gray-800 md:text-base text-sm leading-relaxed font-sans"
          >
            <p style={{ opacity: 0 }}>
              Most small business websites have the same problem — they were
              built quickly, on a budget, or on a builder that was never
              designed to grow with you. They look fine. But fine doesn't
              convert. Fine doesn't load in under two seconds. Fine doesn't make
              someone trust you enough to buy.
            </p>
            <p style={{ opacity: 0 }}>
              Every package here is custom-coded from scratch — no templates, no
              drag-and-drop shortcuts, no bloated plugins slowing things down.
              Just clean, intentional code built around what your business
              actually needs, and designed to give the kind of first impression
              that makes people stay.
            </p>
            <p style={{ opacity: 0 }}>
              Whether you're launching for the first time or ready to replace
              something that's been holding you back — there's a package built
              for where you are right now, and where you're going next.
            </p>
          </div>

          <Link
            ref={ctaRef}
            href="/enquiry"
            aria-label="Enquire about a website package"
            style={{ opacity: 0 }}
          >
            <button className="px-16 py-3 bg-soft-beige cursor-pointer border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
              Enquire Now
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div
          ref={rightImgRef}
          className="w-[12%] relative overflow-hidden md:block hidden"
          style={{ opacity: 0 }}
        >
          <Image
            src={rightImage}
            alt="Right Image"
            fill
            className="object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default PackagesAbout;
