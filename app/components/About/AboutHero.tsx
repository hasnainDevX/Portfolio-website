"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";

import image1 from "../../assets/amrsocialm2.png";
import image2 from "../../assets/allingoodhans2.png";
import image3 from "../../assets/rlestatesite.png";
import image4 from "../../assets/lashedbytash.jpeg";

const columns = [
  [image1, image4, image2, image3],
  [image3, image2, image1, image4],
];

const DESKTOP_SPEED = 32; // Pixels per second
const MOBILE_SPEED = 20;
const COPIES = 3;

export default function AboutHero() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const tracks = trackRefs.current.filter(
      (track): track is HTMLDivElement => track !== null,
    );
    if (!gallery || tracks.length !== 2) return;

    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 1024px)",
        mobile: "(max-width: 1023px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduce) return;

        const speed = context.conditions?.desktop
          ? DESKTOP_SPEED
          : MOBILE_SPEED;
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
            if (!distance || Math.abs(distance - distances[index]) < 0.5)
              return;

            const progress =
              tweens[index]?.progress() ?? (index === 0 ? 0 : 0.3);
            tweens[index]?.kill();
            distances[index] = distance;

            // Left moves up, right moves down.
            tweens[index] = gsap
              .fromTo(
                track,
                { yPercent: index === 0 ? 0 : -100 / COPIES },
                {
                  yPercent: index === 0 ? -100 / COPIES : 0,
                  duration: distance / speed,
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
      },
    );

    return () => media.revert();
  }, []);

  return (
    <main className="relative mb-12 text-charcoal md:mb-16">
      <Navbar />

      <section
        aria-labelledby="about-heading"
        className="relative isolate overflow-hidden bg-transparent pt-32 sm:pt-36 lg:grid lg:h-[calc(100svh-24px)] lg:grid-cols-[65%_35%] lg:pt-0"
      >
        {/* About text */}
        <div className="relative z-10 mx-auto w-full px-6 md:px-12 lg:mx-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-y-auto lg:pb-8 lg:pl-[clamp(2.5rem,6vw,6rem)] lg:pr-[clamp(1.5rem,3vw,3rem)] lg:pt-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:my-auto lg:w-full lg:max-w-[46rem] lg:shrink-0">
            <h1
              id="about-heading"
              className="text-center font-serif text-[clamp(3.5rem,10vw,6rem)] font-light  leading-[1] tracking-[-0.035em] text-gold lg:text-left lg:text-[clamp(3.5rem,5vw,5rem)]"
            >
              <span
                className="block text-transparent lg:inline"
                style={{ WebkitTextStroke: "1px #b5973a" }}
              >
                Hi, I&apos;m
              </span>{" "}
              <span className="block lg:inline">Hasnain</span>
            </h1>

            <div className="mt-8 space-y-4 text-base leading-[1.65] text-charcoal sm:text-lg lg:mt-6 lg:space-y-4 lg:text-base lg:leading-[1.55]">
              <h2 className="max-w-[32ch] font-serif text-[1.75rem] font-normal leading-[1.2] tracking-[-0.02em] sm:text-3xl lg:max-w-none lg:text-[clamp(1.5rem,2vw,1.875rem)]">
                I started building websites in 2023 out of curiosity.
              </h2>

              <p>
                It didn&apos;t stay a hobby for long: pretty soon I was building
                real sites for real businesses, and I haven&apos;t stopped
                since.
              </p>

              <p>
                I study software engineering, which is why the sites I build
                work properly underneath. They&apos;re fast, they&apos;re made
                to be found on Google, and they do exactly what your business
                needs, which is more than a drag-and-drop template can promise.
              </p>

              <p>
                Over the years, I&apos;ve built websites for virtual assistants,
                social media agencies, beauty professionals, coaches and other
                service businesses. Different industries, same goal: look as
                good as the work you do, and make it easy for the right clients
                to say yes.
              </p>
            </div>

            <div className="mt-8 text-center lg:mt-6 lg:text-left">
              <Link
                href="/portfolio"
                aria-label="See what I've built: view my portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal/30 px-7 py-3 text-sm leading-normal tracking-[0.02em] text-charcoal transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:min-h-11 lg:py-2.5"
              >
                See what I&apos;ve built
              </Link>
            </div>
          </div>
        </div>

        {/* Moving project columns */}
        <div
          ref={galleryRef}
          aria-hidden="true"
          className="pointer-events-none relative z-0 mt-12 h-[clamp(20rem,100vw,32rem)] w-full overflow-hidden sm:mt-16 lg:mt-0 lg:h-full lg:min-h-0"
        >
          <div className="absolute -inset-y-[20%] inset-x-4 grid rotate-[-5deg] grid-cols-2 items-start gap-3 sm:inset-x-8 sm:gap-5 lg:-right-5 lg:left-5 lg:rotate-[-7deg] lg:gap-4">
            {columns.map((images, columnIndex) => (
              <div
                key={columnIndex}
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
                className="will-change-transform motion-reduce:will-change-auto"
              >
                {Array.from({ length: COPIES }, (_, copy) => (
                  <div
                    key={copy}
                    className="flex flex-col gap-3 pb-3 sm:gap-5 sm:pb-5 lg:gap-4 lg:pb-4"
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
                          sizes="(min-width: 1024px) 18vw, 48vw"
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
    </main>
  );
}
