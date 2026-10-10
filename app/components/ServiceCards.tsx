"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import bg from "../assets/waves.png";

import service1 from "../assets/allingoodhans1.png";
import service2 from "../assets/lashedbytash.jpeg";
import service3 from "../assets/cafesite.jpeg";
import packagesbg from "../assets/packagesbg.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number | string;
  image: StaticImageData | string;
  backgroundImage: StaticImageData | string;
  alt?: string;
  title: string;
  timeline: string;
  wif: string;
  description: string;
  cta: string;
  href: string;
  badge?: string;
}

interface StickyCardsProps {
  cards: CardData[];
  backgroundImage: StaticImageData | string;
}

// Gets the actual URL whether the image is imported or passed as a string.
const getImageSrc = (image: StaticImageData | string) =>
  typeof image === "string" ? image : image.src;

const StickyCard002 = ({ cards, backgroundImage }: StickyCardsProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const cardElements = cardsRef.current.filter(
      (card): card is HTMLElement => card !== null,
    );

    if (!cardElements.length) return;

    const ctx = gsap.context(() => {
      // Start every card below the viewport, including its tab.
      gsap.set(cardElements, {
        y: () => window.innerHeight + 120,
      });

      // Pin the section while each card stacks over the previous one.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => (window.innerWidth < 768 ? "+=450%" : "+=600%"),
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Leave a short intro before the first card appears.
      timeline.to({}, { duration: 0.35 });

      // Foundation card.
      if (cardElements[0]) {
        timeline.to(cardElements[0], {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        timeline.to({}, { duration: 0.35 });
      }

      // Signature card.
      if (cardElements[1]) {
        timeline.to(cardElements[1], {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        timeline.to({}, { duration: 0.35 });
      }

      // Complete Vision card.
      if (cardElements[2]) {
        timeline.to(cardElements[2], {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        // Hold the final card before the next section comes over it.
        timeline.to({}, { duration: 1.4 });
      }
    }, container);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [cards.length]);

  return (
    <section ref={containerRef} className="relative isolate h-screen w-full">
      <div
        className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${getImageSrc(backgroundImage)}")`,
        }}
      >
        {/* Darkens the full Services background. */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Main editorial heading. */}
        <div className="absolute inset-x-0 top-[12vh] z-[2] px-5 text-center md:top-[30vh]">
          <h2 className="mx-auto max-w-[860px] font-playfair text-[clamp(2.7rem,12vw,4rem)] font-normal leading-[0.88] tracking-[-0.045em] text-white md:text-[clamp(3.6rem,6.8vw,6.4rem)]">
            Design that gets
            <br />
            dream clients to
            <br />
            <span className="uppercase text-gold">say yes.</span>
          </h2>

          {/* Hide the paragraph on mobile so the card has more breathing room. */}
          <p className="mx-auto mt-10 hidden max-w-[560px] text-[18px] leading-[1.7] text-white md:block">
            Three ways to work together, each built around your business, your
            audience and your goals. Not sure which fits? Tell me where you are
            and I&apos;ll point you to the right one.
          </p>
        </div>

        {/* All cards live in the same stack. */}
        <div className="absolute left-1/2 top-[60%] z-10 h-[clamp(470px,58vh,560px)] w-[88%] -translate-x-1/2 -translate-y-1/2 sm:w-[82%] md:bottom-0 md:top-[27vh] md:h-auto md:w-[88%] md:max-w-[1140px] md:translate-y-0 lg:w-[84%]">
          {cards.map((card, i) => {
            // Keep every tab aligned on mobile, then spread them on desktop.
            const desktopTabClass =
              i === 0
                ? "md:left-[4%]"
                : i === 1
                  ? "md:left-[38%]"
                  : "md:left-[72%]";

            return (
              <article
                key={card.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute inset-0"
                style={{
                  zIndex: i + 1,
                  willChange: "transform",
                }}
              >
                {/* Folder tab. */}
                <div
                  className={`absolute left-[5%] top-[-42px] flex h-[44px] w-[58%] max-w-[190px] items-center justify-center rounded-t-[16px] border border-b-0 border-charcoal bg-[#F7F4EE] px-3 md:top-[-58px] md:h-[60px] md:w-[31%] md:max-w-[230px] md:rounded-t-[24px] md:px-5 ${desktopTabClass}`}
                >
                  <span className="text-center text-[8px] font-semibold uppercase leading-tight tracking-[0.11em] text-charcoal md:text-[10px] lg:text-[11px]">
                    {card.title}
                  </span>
                </div>

                {/* Main card. */}
                <div
                  className="relative h-[58vh] min-h-[470px] max-h-[560px] overflow-hidden rounded-t-[8px] border border-black/70 bg-cover bg-center bg-no-repeat md:h-[70vh] md:min-h-0 md:max-h-none md:rounded-t-[10px]"
                  style={{
                    backgroundImage: `url("${getImageSrc(
                      card.backgroundImage,
                    )}")`,
                  }}
                >
                  {/* Your brand color sits over the background texture. */}
                  <div className="absolute inset-0 bg-gold/90" />

                  {/* Mobile is text-only; desktop becomes a two-column layout. */}
                  <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-[1fr_0.92fr]">
                    {/* Text content. */}
                    <div className="flex h-full flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-8 lg:px-[7%]">
                      <div className="mx-auto w-full max-w-[370px] md:mx-0 md:max-w-[550px]">
                        <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-5">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white md:text-[10px] lg:text-[11px]">
                            {card.timeline}
                          </p>

                          {card.badge && (
                            <span className="rounded-full border border-white/70 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white md:text-[9px]">
                              {card.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="max-w-[310px] font-playfair text-[clamp(2rem,9vw,2.8rem)] uppercase leading-[0.9] tracking-[-0.045em] text-white sm:max-w-[360px] md:max-w-none md:text-[clamp(2.6rem,4vw,4.8rem)] md:text-white">
                          {card.title}
                        </h3>

                        <p className="mt-6 max-w-[340px] text-[13px] leading-[1.65] text-white md:mt-7 md:max-w-lg md:text-[14px] md:text-white lg:text-[16px]">
                          {card.description}
                        </p>

                        <p className="mt-5 max-w-[320px] text-[12px] leading-[1.6] text-white md:mt-5 md:max-w-md md:text-[13px] md:text-white/85 lg:text-sm">
                          {card.wif}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
                          <Link
                            href={card.href}
                            className="inline-flex h-[42px] items-center justify-center rounded-full border border-charcoal bg-[#FAF8F2] px-6 text-[9px] font-semibold uppercase tracking-[0.13em] text-charcoal transition-colors duration-300 hover:border-cream-bg hover:bg-charcoal hover:text-white md:h-[48px] md:px-7 md:text-[11px]"
                          >
                            {card.cta}

                            <span className="ml-3 text-base">›</span>
                          </Link>

                          <Link
                            href="/packages"
                            className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white underline underline-offset-4 transition-opacity duration-300 hover:opacity-80 md:text-[11px]"
                          >
                            See what&apos;s included
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Website screenshot only appears on desktop. */}
                    <div className="relative hidden min-h-0 overflow-hidden md:block">
                      <div className="absolute left-1/2 top-1/2 h-[74%] w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-[3deg] overflow-hidden rounded-[4px] shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
                        <Image
                          src={card.image}
                          alt={card.alt || card.title}
                          fill
                          sizes="45vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Skiper17 = () => {
  const cards: CardData[] = [
    {
      id: 1,
      image: service1,
      backgroundImage: bg,
      title: "Foundation Website",
      timeline: "Live in 1–2 weeks",

      description:
        "Online and taking enquiries in weeks, not months. A clean, fast, custom-coded site that makes you look as good as you are.",

      wif: "Best for: new and solo businesses, or anyone replacing a DIY site.",

      cta: "Get my Foundation site",
      // The enquiry form only pre-selects the package if it reads this param.
      href: "/enquiry?package=foundation",
    },

    {
      id: 2,
      image: service2,
      backgroundImage: bg,
      title: "Signature Site",
      timeline: "Live in 3–5 weeks",
      badge: "Popular",

      description:
        "A brand-led site that earns trust before your first message: custom design, sharper storytelling, a clear path to booking.",

      wif: "Best for: growing businesses that want to be the premium pick, not the cheapest.",

      cta: "Start my Signature Site",
      href: "/enquiry?package=signature",
    },

    {
      id: 3,
      image: service3,
      backgroundImage: bg,
      title: "Complete Vision",
      timeline: "Live in 5–10 weeks",

      description:
        "Strategy, custom design and development in one build, with advanced features shaped around how your business makes money.",

      wif: "Best for: established brands with bigger goals than a package can hold.",

      cta: "Scope my project",
      href: "/enquiry?package=complete-vision",
    },
  ];

  return <StickyCard002 cards={cards} backgroundImage={packagesbg} />;
};

export { Skiper17, StickyCard002 };
