"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import AnnouncementBar from "../AnnouncementBar";
import Navbar from "../Navbar";

import hero1 from "../../assets/allingoodhans2.png";
import hero2 from "../../assets/cafesite.jpeg";
import hero3 from "../../assets/lashedbytash.jpeg";

const heroImages = [hero1, hero2, hero3];

const EnquiryHero = () => {
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentSlide = useRef(0);

  useEffect(() => {
    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length < 2) return;

    const SHOW_TIME = 5000; // ms each image stays
    const FADE_TIME = 1.5; // seconds for the crossfade

    gsap.set(slides, { opacity: 0, scale: 1.08, zIndex: 0 });
    gsap.set(slides[0], { opacity: 1, zIndex: 1 });
    gsap.to(slides[0], { scale: 1, duration: 7, ease: "none" });

    const interval = setInterval(() => {
      const current = slides[currentSlide.current];
      const nextIndex = (currentSlide.current + 1) % slides.length;
      const next = slides[nextIndex];
      currentSlide.current = nextIndex;

      gsap.set(next, { zIndex: 2, scale: 1.08 });
      gsap.to(next, { opacity: 1, duration: FADE_TIME, ease: "power2.inOut" });
      gsap.to(next, { scale: 1, duration: 7, ease: "none" });
      gsap.to(current, {
        opacity: 0,
        duration: FADE_TIME,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(current, { zIndex: 0 });
        },
      });
    }, SHOW_TIME);

    return () => {
      clearInterval(interval);
      gsap.killTweensOf(slides);
    };
  }, []);

  return (
    <div className="w-full">
      <AnnouncementBar />
      <Navbar />

      <div
        className="relative w-full overflow-hidden bg-charcoal"
        style={{ height: "80vh" }}
      >
        {/* Background slideshow */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {heroImages.map((img, i) => (
            <div
              key={i}
              ref={(el) => {
                slidesRef.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Brand-colour image overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-charcoal/95 via-charcoal/80 to-gold/75" />

        {/* Marquee text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              width: "max-content",
              animation: "heromarquee 59s linear infinite",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="shrink-0 font-serif text-soft-beige text-6xl md:text-8xl lg:text-9xl font-normal leading-none mx-8"
              >
                Work with Hasnain Webstudio &nbsp;~&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heromarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default EnquiryHero;