"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";

import Navbar from "./Navbar";
import hero1 from "../assets/lashedbytash.jpeg";

const heroImages = [hero1];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(
          overlayRef.current,
          { opacity: 1 },
          { opacity: 0.72, duration: 1.5 },
        )
        .fromTo(
          labelRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.8",
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45",
        );

      const moveSpotlightX = gsap.quickTo(spotlightRef.current, "x", {
        duration: 0.65,
        ease: "power3.out",
      });

      const moveSpotlightY = gsap.quickTo(spotlightRef.current, "y", {
        duration: 0.65,
        ease: "power3.out",
      });

      const handleMouseMove = (event: MouseEvent) => {
        moveSpotlightX(event.clientX);
        moveSpotlightY(event.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, hero);

    return () => context.revert();
  }, []);

  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentSlide = useRef(0);

  useEffect(() => {
    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length < 2) return;

    const SHOW_TIME = 5000; // ms each image stays
    const FADE_TIME = 1.5; // seconds for the crossfade

    // Starting state: first slide visible, others hidden
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
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-charcoal"
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
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Brand-colour image overlay (your existing one) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] bg-gradient-to-br from-charcoal/95 via-charcoal/80 to-gold/75"
      />

      {/* Desktop cursor light */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 lg:block"
        style={{
          background:
            "radial-gradient(circle, var(--color-lavender) 0%, transparent 68%)",
        }}
      />

      <header className="relative z-50">
        <Navbar />
      </header>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8 sm:pb-24 sm:pt-36 lg:px-10 text-cream-bg">
        <p
          ref={labelRef}
          className="mb-6 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-lavender opacity-0 sm:mb-8 sm:text-xs"
        >
          Website Design & Development
        </p>

        <h1
          ref={headingRef}
          className="max-w-5xl font-display text-5xl font-[200] leading-[0.9] tracking-[-0.045em] text-ivory opacity-0 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl "
        >
          Websites for businesses ready to{" "}
          <span className="italic text-lavender">be remembered.</span>
        </h1>

        <p className="mt-7 max-w-xl font-body text-sm leading-relaxed text-ivory/75 sm:mt-8 sm:text-base">
          Strategy-led, custom-built digital experiences that help your business
          look established, feel distinct, and move forward with confidence.
        </p>

        <div ref={buttonRef} className="mt-9 opacity-0 sm:mt-10 ">
          <Link
            href="/packages"
            aria-label="Explore website packages"
            className="button button-lavender border rounded-full px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white cursor-pointer"
          >
            Explore packages ↗
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
