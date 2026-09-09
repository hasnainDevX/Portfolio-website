"use client"
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../Navbar";
import image2 from "../../assets/allingoodhans2.png";
import image4 from "../../assets/randomportfolio.png";
import image1 from "../../assets/maceysmethod4.png";
import image3 from "../../assets/rlestatesite.png";
import Link from "next/link";
import Image from "next/image";

const AboutHero = () => {
  const [currentIdx, setcurrentIdx] = useState(0);
  const images = [image1, image2, image3, image4];

  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          slideshowRef.current,
          { opacity: 0, scale: 0.97, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          subContentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          circleRef.current,
          { opacity: 0, scale: 0.7, rotate: -30 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.4)" },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-cover bg-center bg-no-repeat relative bg-[#FFFCF9]">
      <header className="relative z-50">
        <Navbar />
      </header>

      <div className="relative z-10 flex flex-col text-center px-5 sm:px-6 md:px-8 lg:px-6 py-24 sm:py-32 md:py-40 lg:py-52 max-w-4xl mx-auto min-h-screen">

        {/* Small Label */}
        <div
          ref={labelRef}
          className="text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-7 md:mb-8 opacity-90"
          style={{ opacity: 0 }}
        >
          About Us
        </div>

        {/* Main Heading */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-[1.15] sm:leading-[1.12] md:leading-[1.1] mb-6 sm:mb-7 md:mb-8 px-2 sm:px-0 font-libre-caslon! md:capitalize uppercase tracking-wide">
            Strategic website design for creative business owners who want their
            brand to be noticed, trusted, &amp; remembered
          </h1>
        </div>

        {/* Slideshow */}
        <div
          ref={slideshowRef}
          className="flex items-center justify-center mt-10 max-w-3xl mx-auto relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
          style={{ opacity: 0 }}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIdx ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Portfolio ${idx + 1}`}
                className="w-full h-full object-cover"
                fill
              />
            </div>
          ))}
        </div>

        {/* Sub content and CTA */}
        <div
          ref={subContentRef}
          className="container max-w-xl mx-auto py-10 space-y-6"
          style={{ opacity: 0 }}
        >
          <h3 className="md:text-lg font-medium mt-8 text-gray-700 font-playfair uppercase tracking-wide">
            We build websites for ambitious businesses that are just as
            memorable as they are functional.
          </h3>
          <h4 className="font-sans text-gray-600 leading-relaxed">
            Working with a new developer shouldn't feel like handing your brand
            to a stranger and hoping for the best. Every project starts with
            understanding your business properly — what you do, who you're
            talking to, and what you actually need the site to do. From there
            it's built from scratch, with you involved the whole way through.
          </h4>
          <Link href="/enquiry" aria-label="Enquire about my Business">
            <button className="px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
              Enquire Now
            </button>
          </Link>
        </div>

        {/* Rotating circular text */}
        <div
          ref={circleRef}
          className="hidden md:block absolute top-[24vh] -right-[10vh] w-52 h-52 z-10 2xl:scale-125"
          style={{ opacity: 0 }}
        >
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
            <svg width="224" height="224" viewBox="0 0 224 224" className="absolute inset-0">
              <defs>
                <path
                  id="circle"
                  d="M 112,112 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                />
              </defs>
              <text fill="black" fontSize="16" fontWeight="300" letterSpacing="3px" fontFamily="'Inter', 'Helvetica Neue', sans-serif">
                <textPath href="#circle">• Hasnain Webstudio • Web Design and Development</textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;