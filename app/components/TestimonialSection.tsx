"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import testimonialsBg from "../assets/abstract.png";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Hasnain was amazing to work with. A website is something I’ve wanted to do for years but as a full time business owner, finding time to build a space that represented me and my brand was very challenging. The website hasnain created was everything I could have imagined and am so grateful to have this checked off my to-do list. Highly recommend hasainwebstudio for all your website needs!",
    name: "Natasha",
    company: "Lashed By Tash",
  },
  {
    quote:
      "I had a great experience working with hasnainWebstudio on my website (maceysmethod.co.uk) for my virtual assistant business. They were professional, creative, and really listened to my ideas. The final site is easy to navigate and perfectly represents my brand. I highly recommend them to anyone looking for a talented and reliable website designer!.",
    name: "Macey",
    company: "Macey's Method - Virtual Assistant",
  },
  {
    quote:
      "Hasnain has created a website for me that truly represents who I am. I can tell he put a lot of work into it and took on board any feedback I had throughout the process.",
    name: "Hannah",
    company: "All In Good Hans - Virtual Assistant",
  },
  {
    quote:
      "Hasnain did an incredible job on our website. We needed something clean, professional, and easy to navigate — and he delivered exactly that. His communication was clear throughout the process, and the final result represents our brand perfectly. Highly recommend him if you want a website that actually works for your business.",
    name: "Jason Malik",
    company: "Manager at Go Quality Networks",
  },
  {
    quote:
      "I had a vision for a sleek, modern website that could clearly explain our services and help us book clients — and Hasnain nailed it. He was responsive, detail-oriented, and honestly cared about getting it right. Our site looks great and functions perfectly. I’m so glad we chose his services.",
    name: "Jenn",
    company: "Founder of Noble Cleaning Solution",
  },
];

const TestimonialsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!header || !cardsContainer) return;

    // Pin the header while the testimonial cards scroll past it.
    ScrollTrigger.create({
      trigger: cardsContainer,
      start: "top center",
      end: "bottom center",
      pin: header,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20">
      {/* Full section background image. */}
      <Image src={testimonialsBg} alt="" fill sizes="100vw" className="object-cover object-center" />

      {/* Overlay controls how visible the background image is. */}
      <div className="absolute inset-0 bg-cream-bg/80" />

      {/* Everything stays above the background and overlay. */}
      <div className="relative z-10">
        {/* Title - Will be pinned */}
        <div ref={headerRef} className="mb-32 px-6 text-center">
          <h2 className="mb-4 text-5xl md:text-6xl lg:text-7xl">
            My favourite <span>quotes</span>
          </h2>

          <p className="text-xl">from clients</p>
        </div>

        {/* Cards Container - Scrolls normally */}
        <div ref={cardsContainerRef} className="flex flex-col items-center gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`w-full max-w-md md:max-w-lg ${index % 2 === 0 ? "md:self-start md:ml-20" : "md:self-end md:mr-20"}`}>
              <div className="relative">
                {/* Organic shaped background */}
                <div className="absolute inset-0 rounded-[40px] bg-gold/95 text-white shadow-2xl" style={{ clipPath: "polygon(3% 8%, 8% 2%, 92% 2%, 97% 8%, 97% 92%, 92% 97%, 8% 97%, 3% 92%)" }} />

                {/* Content */}
                <div className="relative p-8 md:p-12">
                  <div className="mb-6">
                    <svg className="h-10 w-10 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="mb-6 font-light leading-relaxed text-white md:text-lg">
                    {testimonial.quote}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-gradient-to-b from-gold to-yellowish" />

                    <div>
                      <p className="text-base font-semibold uppercase tracking-wide text-white">
                        {testimonial.name}
                      </p>

                      <p className="text-sm uppercase tracking-wider text-white">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;