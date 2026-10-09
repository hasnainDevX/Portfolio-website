"use client";

import { Skiper17 } from "./ServiceCards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        labelRef.current,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
      )
        .fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.3",
        )
        .fromTo(
          paraRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4",
        );
    });

    // Recalculate all ScrollTriggers after layout is ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full">
      {/* NORMAL HEADING SECTION */}
      {/* <div
        ref={labelRef}
        className="
          relative
          px-5
          pb-8
          pt-12

          sm:px-6
          sm:pb-10
          sm:pt-16

          md:px-16
          md:pb-12
          md:pt-20
        "
      >
        <h1
          ref={headingRef}
          className="
            text-center
            text-3xl
            text-[#2A2A2A]

            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          "
        >
          A Package Built for{" "}
          <span className="italic">
            Where You Are
          </span>
        </h1>

        <p
          ref={paraRef}
          className="
            mx-auto
            mt-4
            max-w-xl
            text-center
            text-sm
            text-gray-600

            sm:text-base
          "
        >
          Three considered ways to create a website that reflects where your
          business is now—and where it is heading next.
        </p>
      </div> */}

      {/* 
        ScrollTrigger controls the pinning/scroll space.
      */}
      <Skiper17 />
    </section>
  );
};

export default Services;