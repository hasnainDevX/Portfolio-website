"use client"
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  "Virtual Assistants",
  "E-commerce Stores",
  "Coaches & Consultants",
  "Cleaning Services",
  "Fitness & Wellness",
  "Internet Service Providers",
  "Real Estate",
  "Social Media Managers",
  "Restaurants & Cafes",
  "Creative Agencies",
  "Personal Brands",
  "E Books & Courses",
  "Crowdfunding Platforms",
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Left column — staggered fade-up
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.35"
        )
        .fromTo(
          ruleRef.current,
          { opacity: 0, scaleX: 0, transformOrigin: "left" },
          { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.25"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F8F3] px-6 md:px-16 lg:px-24 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
          {/* Left — heading column */}
          <div className="lg:w-2/5 lg:sticky lg:top-32">
            <p
              ref={eyebrowRef}
              className="text-xs tracking-[0.4em] uppercase text-[#b5973a] font-sans mb-6"
              style={{ opacity: 0 }}
            >
              Experience
            </p>

            <h2
              ref={headingRef}
              className="font-normal leading-[1.1] text-[#1a1a1a] font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ opacity: 0 }}
            >
              Industries I've Worked With
            </h2>

            <div
              ref={ruleRef}
              className="mt-8"
              style={{
                opacity: 0,
                height: "1px",
                width: "48px",
                backgroundColor: "#d6c9b8",
              }}
            />

            <p
              ref={subtitleRef}
              className="text-charcoal font-sans leading-relaxed max-w-xs mt-6"
              style={{ opacity: 0 }}
            >
              From solopreneurs to established studios — if you have a vision,
              we know how to bring it to life online.
            </p>

            <div ref={ctaRef} className="mt-10" style={{ opacity: 0 }}>
              <Link href="/portfolio" aria-label="See portfolio — view all projects">
                <button className="px-16 py-3 bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer">
                  See Portfolio
                </button>
              </Link>
            </div>
          </div>

          {/* Right — tag cloud */}
          <div className="lg:w-3/5">
            <div className="flex flex-wrap gap-3">
              {industries.map((industry, idx) => (
                <div key={idx} className="tag-item group">
                  <span
                    className="inline-flex items-center gap-2 px-5 py-3 border font-sans text-sm cursor-default select-none
                      transition-all duration-300
                      hover:border-[#1a1a1a] hover:bg-gold hover:text-white!"
                    style={{
                      borderColor: "#d6c9b8",
                      color: "#3a2a2a",
                      borderRadius: "100px",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-white bg-gold" />
                    {industry}
                  </span>
                </div>
              ))}

              {/* "& more" pill */}
              <div className="tag-item" style={{ opacity: 0 }}>
                <span
                  className="inline-flex items-center px-5 py-3 font-sans text-sm italic"
                  style={{ color: "#b5973a", borderRadius: "100px" }}
                >
                  & so much more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;