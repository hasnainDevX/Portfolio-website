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
import imageCenter from "../../assets/lashedbytash.jpeg";
import PortfolioMarquees from "../PortfolioMarquees";

const columns = [
  [imageLeft, imageCenter, imageBottomLeft],
  [imageRight, imageBottomRight, imageLeft],
];

const IMAGE_SPEED = 32; // Pixels per second

export default function PortfolioHero() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const tracks = trackRefs.current.filter((track): track is HTMLDivElement => track !== null);
    if (!gallery || tracks.length !== 2) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tweens: (gsap.core.Tween | undefined)[] = [];
      const distances = [0, 0];
      const groups = tracks.map((track) => track.firstElementChild as HTMLDivElement);
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
          tweens[index] = gsap.fromTo(track, { yPercent: index === 0 ? 0 : -50 }, {
            yPercent: index === 0 ? -50 : 0,
            duration: distance / IMAGE_SPEED,
            ease: "none",
            repeat: -1,
            paused: true,
          }).progress(progress);
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

      <section aria-labelledby="portfolio-heading" className="relative isolate flex min-h-[75svh] items-center overflow-hidden bg-transparent pb-20 pt-32 lg:min-h-[calc(100svh-24px)] lg:py-40">
        {/* Hero text */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-[6vw] xl:px-[8vw]">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:w-[44%] lg:max-w-[32rem] lg:text-left">
            <h1 id="portfolio-heading" className="font-serif text-[clamp(2.75rem,7.6vw,5rem)] font-normal leading-[1.03] tracking-[-0.045em] text-charcoal lg:text-[clamp(3.25rem,4.6vw,4.75rem)]">
              <span className="block">Built to be found.</span>
              <span className="block">Designed to be chosen.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md font-display text-lg leading-relaxed text-charcoal lg:mx-0 lg:mt-8 lg:max-w-[25rem] lg:text-xl">
              Strategic, conversion-first websites for brands who want to stand out in their industry, not just look good.
            </p>
          </div>
        </div>

        {/* Desktop image columns */}
        <div ref={galleryRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 -right-16 z-0 hidden w-[55%] overflow-hidden lg:block xl:w-[54%]">
          <div className="absolute -inset-y-[20%] -right-12 left-14 grid rotate-[-7deg] grid-cols-2 items-start gap-6">
            {columns.map((images, columnIndex) => (
              <div key={columnIndex} ref={(element) => { trackRefs.current[columnIndex] = element; }} className="will-change-transform motion-reduce:will-change-auto">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex flex-col gap-6 pb-6">
                    {images.map((src, imageIndex) => (
                      <div key={imageIndex} className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-charcoal/15">
                        <Image src={src} alt="" fill sizes="(min-width: 1024px) 28vw, 1px" className="object-cover object-center" draggable={false} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <PortfolioMarquees/>
    </div>
  );
}
