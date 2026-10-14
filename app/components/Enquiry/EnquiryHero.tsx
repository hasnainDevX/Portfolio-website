"use client";

import AnnouncementBar from "../AnnouncementBar";
// import Navbar from "../Navbar";
import ImageTrail from "../ImageTrail";
import BrandMarquee from "../BrandMarquee";
import CircularText from "../CircularText";

import imageBottomLeft from "../../assets/allingoodhans.png";
import imageRight from "../../assets/amrsocialm2.png";
import imageLeft from "../../assets/amrsocialp1.png";
import imageBottomRight from "../../assets/cafesite.jpeg";
import imageCenter from "../../assets/lashedbytash.jpeg";
import Image from "next/image";
import heroBg from "../../assets/waves.png";

const portfolioImages = [
  { src: imageLeft, alt: "Amr.socials website design" },
  { src: imageCenter, alt: "Lashed by Tash website design" },
  { src: imageRight, alt: "Amr.socials mobile website" },
  { src: imageBottomLeft, alt: "All in Good Hans website design" },
  { src: imageBottomRight, alt: "Cafe website design" },
];

export default function EnquiryHero() {
  return (
    <div className="w-full text-charcoal">
      <AnnouncementBar />
      {/* <Navbar /> */}

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
          <div className="absolute hidden md:block z-20 mb-4 mr-6 self-end -top-5 -right-5 md:right-12 md:top-6 md:m-0">
            <CircularText
              text="HASNAIN*WEBSTUDIO*"
              onHover="speedUp"
              spinDuration={20}
              // className="text-sm!"
            />
          </div>
          <div className="relative z-0 mx-auto w-full max-w-6xl text-center">
            <h1
              id="enquiry-heading"
              className="font-serif text-[clamp(2.75rem,7.6vw,5rem)] font-normal leading-[1.03] tracking-[-0.045em] text-charcoal lg:text-[clamp(5.25rem,4.6vw,4.75rem)]"
            >
              <span className="block">Your Next Chapter</span>
              <span className="block">Starts Here.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[42rem] font-display text-lg leading-relaxed text-charcoal md:mt-8 md:text-xl">
              Whether you&apos;re establishing your business online or ready for
              a website that reflects how far you&apos;ve come, I&apos;ll help
              you take the next step.
            </p>
          </div>
        </ImageTrail>

        {/* Bottom strips */}
        <BrandMarquee count={2} className="mt-auto pb-4 md:pb-6" />
      </section>
    </div>
  );
}
