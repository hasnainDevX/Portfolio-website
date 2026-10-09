"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import portfolio1 from "../assets/maceysmethod3.png";
import portfolio2 from "../assets/fruitysite1.jpeg";
import portfolio3 from "../assets/allingoodhans1.png";
import portfolio4 from "../assets/rlestatesite.png";

const images = [portfolio1, portfolio2, portfolio3, portfolio4];

const PortfolioSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Automatically cycles through the portfolio projects.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-30 -mt-[100dvh] min-h-[100dvh] overflow-hidden rounded-t-[28px] bg-white md:-mt-[100vh] md:min-h-screen md:rounded-t-[36px]">
      {/* Keeps the content slightly below the wrapping edge. */}
      <div className="pt-[8dvh] md:pt-[10vh]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-12">
          
          {/* Section heading */}
          <div className="py-14 text-center sm:py-20 md:py-24 lg:py-28">
            <h1 className="mx-auto max-w-4xl text-4xl leading-[0.95] tracking-[-0.03em] text-charcoal sm:text-5xl md:text-6xl lg:text-7xl">
              Project <span className="italic">Spotlight</span>
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-sm leading-relaxed text-gray-600 sm:text-base md:mt-8 md:text-lg">
              Every site was built from scratch — no templates, no shortcuts. Each one designed around a specific business, a specific audience, and a specific goal. Browse the work and see what's possible when the code actually fits the brand.
            </p>
          </div>

          {/* Portfolio showcase card */}
          <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl border border-dashed border-charcoal/40 bg-white shadow-2xl md:grid-cols-[55%_45%]">
            
            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-center bg-white p-7 sm:p-10 md:min-h-[520px] md:p-12 lg:p-16 xl:p-20">
              <div className="max-w-xl">
                <h2 className="text-[28px] font-light leading-[1.05] tracking-[-0.03em] text-charcoal sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl">
                  Captivating and Converting <span className="text-[#7a6025]">Portfolio</span>
                </h2>

                <p className="mt-6 text-[15px] font-light leading-[1.75] text-charcoal/75 sm:text-base md:text-[17px] lg:text-lg">
                  Some are service businesses. Some are e-commerce. All of them needed something that actually worked — not just looked good. That's what's in here.
                </p>

                <div className="mt-8">
                  <Link
                    href="/portfolio"
                    aria-label="View portfolio — see all projects"
                    className="inline-flex items-center justify-center rounded-full border border-charcoal px-8 py-3 text-xs uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:border-white hover:text-white sm:px-10 sm:text-sm lg:px-12 font-serif"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>

            {/* Auto-changing project image */}
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-auto md:min-h-[520px]">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? "opacity-100" : "pointer-events-none opacity-0"}`}
                >
                  <Image
                    src={image}
                    alt={`Portfolio project ${idx + 1}`}
                    fill
                    sizes="(max-width: 767px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Space before the next section. */}
          <div className="h-20 sm:h-24 md:h-32" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;