"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import portfolio1 from "../assets/maceysmethod3.png";
import portfolio2 from "../assets/fruitysite1.jpeg";
import portfolio3 from "../assets/allingoodhans1.png";
import portfolio4 from "../assets/rlestatesite.png";
import Image from "next/image";

const PortfolioSection = () => {
  const [currentIdx, setcurrentIdx] = useState(0);

  const images = [portfolio1, portfolio2, portfolio3, portfolio4];

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="py-20 px-4">
      <div className="headings my-16 md:my-28 lg:my-32 space-y-6 px-4 md:px-12">
        <h1
          className="text-[#2A2A2A] text-5xl md:text-2xl lg:text-5xl xl:text-6xl 2xl:text-7xl  text-center px-4 md:px-0 max-w-4xl mx-auto "
        >
          Project <span className="">Spotlight</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-600 px-4 md:px-16 text-center max-w-7xl mx-auto">
          Every site was built from scratch — no templates, no shortcuts. Each
          one designed around a specific business, a specific audience, and a
          specific goal. Browse the work and see what's possible when the code
          actually fits the brand.
        </p>
      </div>
      <div className="card border border-dashed border-charcoal/40 max-w-5xl mx-auto shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-xl bg-white">
        <div className="left-content w-full md:flex-[55%] p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20 space-y-5 sm:space-y-6 md:space-y-7 flex flex-col justify-center">
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-light text-charcoal leading-tight tracking-tighta">
            Captivating and Converting{" "}
            <span className="text-[#7a6025]">Portfolio</span>
          </h2>
          <p className="font-light text-[15px] sm:text-base md:text-[17px] lg:text-lg leading-relaxed sm:leading-relaxed md:leading-loose  ns text-charcoal/75 max-w-xl">
            Some are service businesses. Some are e-commerce. All of them needed
            something that actually worked — not just looked good. That's what's
            in here.
          </p>
          <div className="pt-2 sm:pt-3">
            <Link
              href="/portfolio"
              className="text-charcoal hover:text-soft-beige"
              aria-label="View portfolio — see all projects"
            >
              <button className="px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
                View Portfolios
              </button>
            </Link>
          </div>
        </div>
        <div className="rightimg w-full h-72 sm:h-80 md:h-auto md:flex-[45%] relative overflow-hidden">
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
      </div>
    </div>
  );
};

export default PortfolioSection;
