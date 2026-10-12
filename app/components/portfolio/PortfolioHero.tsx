"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollShowcase from "../BrandStatement";

import AnnouncementBar from "../AnnouncementBar";
import Navbar from "../Navbar";

import imageBottomLeft from "../../assets/allingoodhans1.png";
import imageRight from "../../assets/amrsocialm2.png";
import imageLeft from "../../assets/amrsocialp1.png";
import imageBottomRight from "../../assets/cafesite.jpeg";
import imageCenter from "../../assets/lashedbytash.jpeg";
import bgImage from "../../assets/amrsocialp1.png"

const portfolioImages = [
  { src: imageLeft, alt: "Amr.socials website design" },
  { src: imageCenter, alt: "Lashed by Tash website design" },
  { src: imageRight, alt: "Amr.socials mobile website" },
  { src: imageBottomLeft, alt: "All in Good Hans website design" },
  { src: imageBottomRight, alt: "Cafe website design" },
];

const PortfolioHero = () => {
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

      {/* ── Navbar ── */}
      <Navbar />

      <ScrollShowcase
        mode="both"
        heading={["Built to be found.", "Designed to be chosen."]}
        description="Strategic, conversion-first websites for brands who wants to stand out in their industry not just looks good"
        images={portfolioImages}
        // backgroundImage={bgImage}
        // backgroundOverlay={0.2}
      />
    </div>
  );
};

export default PortfolioHero;
