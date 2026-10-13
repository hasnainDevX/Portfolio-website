"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnnouncementBar from "../AnnouncementBar";
import Navbar from "../Navbar";

import imageBottomLeft from "../../assets/allingoodhans1.png";
import imageRight from "../../assets/amrsocialm2.png";
import imageLeft from "../../assets/amrsocialp1.png";
import imageBottomRight from "../../assets/cafesite.jpeg";
import newImage from "../../assets/allingoodhans.png"
import newImage2 from "../../assets/lashedbytashmobile.png"
import imageCenter from "../../assets/lashedbytash.jpeg";
import BrandMarquee from "../BrandMarquee";

const columns = [
  [imageLeft, imageCenter, imageBottomLeft, newImage2],
  [imageRight, imageBottomRight, imageLeft, newImage],
];

const IMAGE_SPEED = 32; // Pixels per second

export default function PortfolioHero() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const tracks = trackRefs.current.filter(
      (track): track is HTMLDivElement => track !== null,
    );
    if (!gallery || tracks.length !== 2) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tweens: (gsap.core.Tween | undefined)[] = [];
      const distances = [0, 0];
      const groups = tracks.map(
        (track) => track.firstElementChild as HTMLDivElement,
      );
      let visible = false;

      const syncPlayback = () => {
        tweens.forEach((tween) => tween?.paused(!visible || document.hidden));
      };

      const measure = () => {
        tracks.forEach((track, index) => {
          const distance = groups[index].offsetHeight;
          if (!distance || Math.abs(distance - distances[index]) < 0.5) return;

          const progress = tweens[index]?.progress() ?? (index === 0 ? 0 : 0.3);
          tweens[index]?.kill();
          distances[index] = distance;

          // Left moves up, right moves down.
          tweens[index] = gsap
            .fromTo(
              track,
              { yPercent: index === 0 ? 0 : -50 },
              {
                yPercent: index === 0 ? -50 : 0,
                duration: distance / IMAGE_SPEED,
                ease: "none",
                repeat: -1,
                paused: true,
              },
            )
            .progress(progress);
        });

        syncPlayback();
      };

      measure();

      const resizeObserver = new ResizeObserver(measure);
      groups.forEach((group) => resizeObserver.observe(group));

      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      });

      visibilityObserver.observe(gallery);
      document.addEventListener("visibilitychange", syncPlayback);

      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        tweens.forEach((tween) => tween?.kill());
        gsap.set(tracks, { clearProps: "transform" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="w-full text-charcoal">
      <AnnouncementBar />
      <Navbar />

      <section
        aria-labelledby="portfolio-heading"
        className="relative isolate flex min-h-[75svh] flex-col items-center overflow-hidden bg-transparent pb-0 pt-32 lg:min-h-[calc(100svh-24px)] lg:flex-row lg:py-40"
      >
        {/* Hero text */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-[6vw] xl:px-[8vw]">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:w-[44%] lg:max-w-[32rem] lg:text-left">
            <h1
              id="portfolio-heading"
              className="font-serif text-[clamp(2.75rem,7.6vw,5rem)] font-normal leading-[1.03] tracking-[-0.045em] text-charcoal lg:text-[clamp(3.25rem,4.6vw,4.75rem)]"
            >
              <span className="block">Good work deserves a website that</span>
              <span className="block"> does it justice</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md font-display text-lg leading-relaxed text-charcoal lg:mx-0 lg:mt-8 lg:max-w-[25rem] lg:text-xl">
              Strategic, conversion-first websites for brands who want to stand
              out in their industry, not just look good.
            </p>
          </div>
        </div>

        {/* Moving image columns */}
        <div
          ref={galleryRef}
          aria-hidden="true"
          className="pointer-events-none relative z-0 mt-12 h-[clamp(20rem,90vw,32rem)] w-full overflow-hidden sm:mt-16 lg:absolute lg:inset-y-0 lg:-right-16 lg:mt-0 lg:h-auto lg:w-[55%] xl:w-[54%]"
        >
          <div className="absolute -inset-y-[20%] inset-x-4 grid rotate-[-5deg] grid-cols-2 items-start gap-3 sm:inset-x-8 sm:gap-5 lg:-right-12 lg:left-14 lg:rotate-[-7deg] lg:gap-6">
            {columns.map((images, columnIndex) => (
              <div
                key={columnIndex}
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
                className="will-change-transform motion-reduce:will-change-auto"
              >
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex flex-col gap-3 pb-3 sm:gap-5 sm:pb-5 lg:gap-6 lg:pb-6"
                  >
                    {images.map((src, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-charcoal/15 lg:rounded-xl"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 28vw, 48vw"
                          className="object-cover object-center"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <BrandMarquee />
    </div>
  );
}
