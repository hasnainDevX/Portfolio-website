"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
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

    // Pin the header while cards scroll through
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
    <div className="relative py-20">
      {/* Title - Will be pinned */}
      <div ref={headerRef} className="text-center mb-32 px-6">
        <h2 className="text-5xl md:text-6xl lg:text-7xl mb-4" style={{ fontFamily: "Libre Caslon Text, serif" }}>
          My favourite <span className="">quotes</span>
        </h2>
        <p className="text-xl text-gray-600">from clients</p>
      </div>

      {/* Cards Container - Scrolls normally */}
      <div
        ref={cardsContainerRef}
        className="flex flex-col items-center gap-8 px-4"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`w-full md:max-w-lg max-w-md ${
              index % 2 === 0 ? "md:self-start md:ml-20" : "md:self-end md:mr-20"
            }`}
          >
            <div className="relative">
              {/* Organic shaped background */}
              <div
                className="absolute inset-0 md:bg-cream-bg/30 bg-cream-bg text-black rounded-[40px] shadow-2xl"
                style={{
                  clipPath:
                    "polygon(3% 8%, 8% 2%, 92% 2%, 97% 8%, 97% 92%, 92% 97%, 8% 97%, 3% 92%)",
                }}
              />

              {/* Content */}
              <div className="relative p-8 md:p-12">
                <div className="mb-6">
                  <svg
                    className="w-10 h-10 text-gold opacity-70"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="md:etext-lg leading-relaxed mb-6 font-light">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 bg-gradient-to-b from-gold to-yellowish rounded-full" />
                  <div>
                    <p className="font-semibold text-charcoal text-base uppercase tracking-wide">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm uppercase tracking-wider">
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
  );
};

export default TestimonialsSection;