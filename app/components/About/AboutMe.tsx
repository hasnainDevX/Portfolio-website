"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image2 from "../../assets/allingoodhans2.png";
import image1 from "../../assets/maceysmethod2.png";
import image3 from "../../assets/fruitysite2.jpeg";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

      // Images cascade in with their natural rotations preserved
      tl.fromTo(
        img1Ref.current,
        { opacity: 0, x: -60, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 0.9 },
        0
      )
        .fromTo(
          img3Ref.current,
          { opacity: 0, x: -40, y: 50 },
          { opacity: 1, x: 0, y: 0, duration: 0.9 },
          0.15
        )
        .fromTo(
          img2Ref.current,
          { opacity: 0, x: -20, y: 40, scale: 0.95 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
          0.3
        );

      // Right column
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      )
        .fromTo(
          dividerRef.current,
          { opacity: 0, scaleX: 0, transformOrigin: "left" },
          { opacity: 0.4, scaleX: 1, duration: 0.5 },
          "-=0.4"
        );

      // Paragraphs stagger
      if (parasRef.current) {
        const paras = parasRef.current.querySelectorAll("p");
        tl.fromTo(
          paras,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.14 },
          "-=0.2"
        );
      }

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.15"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-yellowish/80 md:bg-yellowish min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT: Stacked overlapping images */}
        <div className="relative h-[520px] sm:h-[600px] lg:h-[700px]">
          <div
            ref={img1Ref}
            className="absolute top-0 left-4 sm:left-10 w-[260px] sm:w-[320px] lg:w-[380px] shadow-2xl z-20 -rotate-6"
            style={{ opacity: 0 }}
          >
            <Image src={image1} alt="Project" className="w-full h-auto object-cover block"  />
          </div>

          <div
            ref={img2Ref}
            className="absolute top-[140px] sm:top-[160px] left-[100px] sm:left-[140px] lg:left-[160px] w-[260px] sm:w-[310px] lg:w-[360px] shadow-2xl z-30 rotate-3"
            style={{ opacity: 0 }}
          >
            <Image src={image2} alt="Project" className="w-full h-auto object-cover block" />
          </div>

          <div
            ref={img3Ref}
            className="absolute top-[300px] sm:top-[340px] left-0 w-[240px] sm:w-[290px] lg:w-[340px] shadow-2xl z-10 -rotate-[4deg]"
            style={{ opacity: 0 }}
          >
            <Image src={image3} alt="Project" className="w-full max-h-[80%] object-cover block"  />
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="flex flex-col gap-7">
          <h2
            ref={headingRef}
            className="font-libre-caslon italic text-[2.4rem] sm:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.1] tracking-tight md:mt-0 mt-4"
            style={{ opacity: 0 }}
          >
            Hi, I'm Hasnain.
          </h2>

          <div
            ref={dividerRef}
            className="w-10 h-px bg-[#1a1a1a]"
            style={{ opacity: 0 }}
          />

          <div ref={parasRef} className="flex flex-col gap-4">
            <p className="font-sans text-base sm:text-lg text-[#1a1a1a] leading-relaxed" style={{ opacity: 0 }}>
              Web development found me in 2022 — and it stuck. What started as
              curiosity quickly became building real things for real businesses,
              and I never looked back.
            </p>
            <p className="font-sans text-base sm:text-lg text-[#1a1a1a] leading-relaxed" style={{ opacity: 0 }}>
              I'm not your average freelancer. Studying software engineering
              means I understand how the web actually works — I build what no
              drag-and-drop builder can. Clean, custom, engineered to perform.
            </p>
            <p className="font-sans text-base sm:text-lg text-[#1a1a1a] leading-relaxed" style={{ opacity: 0 }}>
              Over two years of freelancing, I've delivered projects for clients
              across the globe — working with virtual assistants, Social media managers,
              coaches and other service based businesses in the UK, Canada, US, and beyond, building sites that don't just look good. They
              work.
            </p>
          </div>

          <Link ref={ctaRef} href="/portfolio" style={{ opacity: 0 }} aria-label="View my portfolio — see examples of my work">
            <button className="px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 my-4 max-w-xs">
              See My Work
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;