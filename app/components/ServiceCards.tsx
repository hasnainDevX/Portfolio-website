"use client";
import { useEffect, useRef, useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface CardData {
  id: number | string;
  image: StaticImageData | string;
  alt?: string;
  title: string;
  timeline: string;
  wif: string;
  description: string;
}

const StickyCard002 = ({ cards }: { cards: CardData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollProgress =
        (scrollTop - containerTop) / (containerHeight - windowHeight);
      const cardIndex = Math.min(
        Math.floor(scrollProgress * cards.length),
        cards.length - 1,
      );

      if (cardIndex >= 0 && cardIndex < cards.length) {
        setCurrentIndex(cardIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  const isLast = currentIndex === cards.length - 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="relative h-[92vh] sm:h-[90vh] w-full max-w-7xl overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="w-full md:w-2/5 h-[35%] sm:h-[40%] md:h-full relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt || card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 h-[65%] sm:h-[60%] md:h-full p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 flex flex-col justify-center font-sans">
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 max-w-2xl">
                    <h2
                      className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-charcoal font-playfair"
                      style={{ fontFamily: "Libre Caslon Text, serif" }}
                    >
                      {card.title}
                    </h2>

                    <p className="text-gray-800 leading-relaxed text-[15px] sm:text-base md:text-lg lg:text-xl font-light">
                      {card.description}
                    </p>

                    <div className="rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gold md:bg-yellowish/50 bg-yellowish/30">
                      <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] mb-2 sm:mb-3 text-charcoal">
                        Who Is This For?
                      </h3>
                      <p className="text-charcoal text-[13px] sm:text-sm md:text-base leading-relaxed">
                        {card.wif}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 md:pt-4">
                      <Link
                        href="/enquiry"
                        aria-label={`Get started with ${card.title}`}
                      >
                        <button className="px-16 py-3 bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer w-full md:w-[250px] md:h-[60px]" aria-label={`Get started with ${card.title}`}>
                          Get Started
                        </button>
                      </Link>
                      <Link
                        href="/packages"
                        aria-label={`Learn more about {card.title}`}
                        className="hidden md:block"
                      >
                        <button className="px-16 py-3 bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer w-full md:w-auto md:h-[60px]" aria-label={`Learn more about ${card.title}`}>
                          Learn More about {card.title}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator — outside the overflow-hidden card ── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          {/* Dot progress */}
          <div className="flex gap-0 items-center mt-1">
            {/* {cards.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === currentIndex ? "20px" : "6px",
                  height: "6px",
                  backgroundColor:
                    i === currentIndex ? "#2a2a2a" : "rgba(42,42,42,0.3)",
                }}
              />
            ))} */}
          </div>

          {/* Scroll hint — hides on last card */}
          <div
            className="flex flex-col items-center gap-1 transition-opacity duration-500"
            style={{ opacity: isLast ? 0 : 1 }}
          >
            <span
              className="text-[12px] md:text-base uppercase tracking-[0.2em] text-[#2a2a2a]/80"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              scroll
            </span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 16 16"
              fill="none"
              style={{ animation: "scrollBounce 1.6s ease-in-out infinite" }}
            >
              <path
                d="M3 5.5l5 5 5-5"
                stroke="rgba(42,42,42,0.5)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

import service1 from "../assets/maceysmethod4.png";
import service2 from "../assets/allingoodhans1.png";
import service3 from "../assets/telecomsite1.jpeg";
import Link from "next/link";

const Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: service1,
      title: "The Foundation Website",
      timeline: "1-2 weeks",
      wif: "Perfect for small businesses and individuals who want a simple yet professional online presence.",
      description:
        "Your digital front door that actually works - a website that loads instantly, looks professional, and turns visitors into customers without the headaches of DIY builders.",
    },
    {
      id: 2,
      image: service2,
      title: "The Signature Site",
      timeline: "3-5 weeks",
      wif: "For growing businesses ready to stand out from competitors with a website that commands attention and builds trust.",
      description:
        "Elevate your online presence with a website that commands attention and builds trust - the kind that makes potential customers think 'this business knows what they're doing.'",
    },
    {
      id: 3,
      image: service3,
      title: "The Complete Vision",
      timeline: "5-10 weeks",
      wif: "For established businesses, brands, and e-commerce stores ready to automate workflows, scale operations, and deliver premium customer experiences.",
      description:
        "The complete digital solution that handles complex business processes automatically - your website becomes a powerful business tool, not just a brochure.",
    },
  ];

  return (
    <div className="w-full">
      <StickyCard002 cards={defaultCards} />
    </div>
  );
};

export { Skiper17, StickyCard002 };
