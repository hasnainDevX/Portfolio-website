"use client";

import AnnouncementBar from "../AnnouncementBar";
import Navbar from "../Navbar";
import ImageTrail from "../ImageTrail";
import BrandMarquee from "../BrandMarquee";

import imageBottomLeft from "../../assets/allingoodhans.png";
import imageRight from "../../assets/amrsocialm2.png";
import imageLeft from "../../assets/amrsocialp1.png";
import imageBottomRight from "../../assets/cafesite.jpeg";
import imageCenter from "../../assets/lashedbytash.jpeg";

const portfolioImages = [
  { src: imageLeft, alt: "Amr.socials website design" },
  { src: imageCenter, alt: "Lashed by Tash website design" },
  { src: imageRight, alt: "Amr.socials mobile website" },
  { src: imageBottomLeft, alt: "All in Good Hans website design" },
  { src: imageBottomRight, alt: "Cafe website design" },
];

export default function PortfolioHero() {
  return (
    <div className="w-full text-charcoal">
      <AnnouncementBar />
      <Navbar />

      <section
        aria-labelledby="portfolio-heading"
        className="relative flex min-h-[calc(100svh-24px)] flex-col bg-transparent pt-24 md:pt-28"
      >
        {/* Heading and image trail */}
        <ImageTrail
          items={portfolioImages}
          imageWidth={170}
          threshold={96}
          className="flex flex-1 flex-col justify-center px-6 py-12 md:px-12"
        >
          <div className="relative z-0 mx-auto w-full max-w-6xl text-center">
            <h1
              id="portfolio-heading"
              className="font-serif text-[clamp(2.75rem,7.6vw,5rem)] font-normal leading-[1.03] tracking-[-0.045em] text-charcoal lg:text-[clamp(5.25rem,4.6vw,4.75rem)]"
            >
              <span className="block">
                High-end conversion focus website
              </span>
              <span className="block">built with your whole
                business in mind.</span>  
            </h1>

            <p className="mx-auto mt-6 max-w-[42rem] font-display text-lg leading-relaxed text-charcoal md:mt-8 md:text-xl">
              Strategic, conversion-first websites for brands who want to stand
              out in their industry, not just look good.
            </p>
          </div>
        </ImageTrail>

        {/* Bottom strips */}
        <BrandMarquee count={2} className="mt-auto pb-4 md:pb-6" />
      </section>
    </div>
  );
}
