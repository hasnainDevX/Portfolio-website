"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../Navbar";
import image1 from "../../assets/maceysmethod4.png";
import image2 from "../../assets/allingoodhans2.png";
import image3 from "../../assets/rlestatesite.png";
import image4 from "../../assets/lashedbytash.jpeg";

const images = [image1, image2, image3, image4];

const imageAlts = [
  "Macey's Method website design",
  "All In Good Hans website design",
  "Real estate website design",
  "Lashed By Tash website design",
];

const AboutHero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // Cycle through selected website projects.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Reveal hero content in sequence.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

      tl.fromTo(labelRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(imageRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.55")
        .fromTo(contentRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(circleRef.current, { opacity: 0, scale: 0.7, rotate: -30 }, { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.4)" }, "-=0.6");
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#F8F6F1] text-charcoal">
      <header className="relative z-50">
        <Navbar />
      </header>

      <section className="relative min-h-screen px-5 pb-20 pt-40 sm:px-8 sm:pt-44 md:px-10 md:pt-48 lg:px-12 lg:pb-28 lg:pt-52">
        <div className="relative mx-auto max-w-[1200px]">

          {/* Small intro label */}
          <p ref={labelRef} className="mb-7 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-charcoal/60 sm:text-xs" style={{ opacity: 0 }}>
            About Hasnain Webstudio
          </p>

          {/* Oversized editorial heading */}
          <h1 ref={headingRef} className="relative z-20 mx-auto max-w-[1100px] text-center font-display text-[clamp(3rem,9vw,6.5rem)] uppercase font-[300] leading-[0.82] tracking-[-0.055em] text-gold" style={{ opacity: 0 }}>
            Websites Designed
            <br />
            <span className="">Around Your Business.</span>
          </h1>

          {/* Project slideshow */}
          <div ref={imageRef} className="relative z-10 mx-auto -mt-[1.5rem] h-[330px] w-full max-w-[1020px] overflow-hidden sm:-mt-[2rem] sm:h-[430px] md:-mt-[2.5rem] md:h-[520px] lg:-mt-[3rem] lg:h-[620px]" style={{ opacity: 0 }}>
            {images.map((image, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? "opacity-100" : "opacity-0"}`}>
                <Image src={image} alt={imageAlts[idx]} fill priority={idx === 0} sizes="(max-width: 768px) 100vw, 1020px" className="object-cover object-center" />
              </div>
            ))}

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Sub content and CTA */}
          <div ref={contentRef} className="container mx-auto max-w-xl space-y-6 py-10" style={{ opacity: 0 }}>
            <h3 className="mt-8 font-playfair font-medium uppercase tracking-wide text-gray-700 md:text-lg text-center">
              For most service businesses, that first impression is the website.
            </h3>

            <p className="leading-relaxed text-charcoal text-center">
              Your future clients are comparing you with everyone else in their
              feed. We build websites that make that comparison easy: clear about
              what you offer, simple to book, and easy to find on Google. We start
              with a proper conversation about your business, then I design and
              build it myself, just for you, with you involved until launch day.
              No handoffs, and no stranger guessing what you meant.
            </p>

            <Link href="/enquiry" aria-label="Tell me about your business and start an enquiry" className="w-full flex items-center  justify-center">
              <button className=" button button-lavender cursor-pointer rounded-full border px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white">
                Tell me about your business
              </button>
            </Link>
          </div>

          {/* Rotating circular text */}
          <div ref={circleRef} className="absolute -right-[10vh] top-[24vh] z-10 hidden h-52 w-52 md:block 2xl:scale-125" style={{ opacity: 0 }}>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
              <svg width="224" height="224" viewBox="0 0 224 224" className="absolute inset-0">
                <defs>
                  <path id="circle" d="M 112,112 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
                </defs>

                <text fill="black" fontSize="16" fontWeight="300" letterSpacing="3px" fontFamily="'Inter', 'Helvetica Neue', sans-serif">
                  <textPath href="#circle">
                    • Hasnain Webstudio • Web Design and Development
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default AboutHero;