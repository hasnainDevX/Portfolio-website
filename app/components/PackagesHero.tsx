"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";
import packagesHero from "../assets/vasite2.jpeg";
import Image from "next/image";

const PackagesHero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // Image slides in from left
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -40, scale: 1.04 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1 }
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative border-b border-gray-300">
      <header className="absolute top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </header>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* LEFT — portrait image */}
        <div
          ref={imageRef}
          className="relative w-full md:w-1/2 min-h-[55vh] md:min-h-screen overflow-hidden"
          style={{ opacity: 0 }}
        >
          <Image
            src={packagesHero}
            alt="Designer portrait"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#ede8e2]/40 to-transparent pointer-events-none" />
        </div>

        {/* RIGHT — content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 sm:px-14 md:px-16 lg:px-20 py-24 md:py-32">
          <p
            ref={eyebrowRef}
            className="text-xs tracking-[0.22em] uppercase font-semibold mb-7"
            style={{ color: "#b5973a", opacity: 0 }}
          >
            Brand Strategy &amp; Web Design
          </p>

          <h1
            ref={headingRef}
            className="font-normal leading-[1.1] text-4xl sm:text-5xl lg:text-[3.4rem] mb-8"
            style={{ color: "#2a2a2a", opacity: 0 }}
          >
           Your website should do more than look beautiful. It should tell your story, show people what makes you different, and give the right clients every reason
          <span className="italic text-gold"> to choose you.</span>
          </h1>

          <div
            ref={dividerRef}
            className="w-10 h-px mb-2"
            style={{ backgroundColor: "#b5973a", opacity: 0 }}
          />

          <a ref={ctaRef} href="#packages-section" aria-label="View packages — scroll to packages section" style={{ opacity: 0 }}>
            <button className="button button-lavender border rounded-full px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white cursor-pointer">
              View Packages ↗
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackagesHero;