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
          // ease: "power3.out",
        });

        timeline.to({}, { duration: 0.35 });
      }

      // Signature card.
      if (cardElements[1]) {
        timeline.to(cardElements[1], {
          y: 0,
          duration: 0.65,
          // ease: "power3.out",
        });

        timeline.to({}, { duration: 0.35 });
      }

      // Complete Vision card.
      if (cardElements[2]) {
        timeline.to(cardElements[2], {
          y: 0,
          duration: 0.65,
          // ease: "power3.out",
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
            Websites that gets
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
        <div className="absolute bottom-16 left-1/2 z-10 h-[32rem] w-[88%] -translate-x-1/2 sm:w-[82%] md:bottom-16 md:top-[18vh] md:h-auto md:w-[88%] md:max-w-[1140px] md:translate-y-0 lg:w-[84%]">
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
                {/* Main card. */}
                <div
                  className="relative h-[55vh] max-h-[450px] overflow-hidden border border-black/70 bg-cover bg-center bg-no-repeat md:h-[calc(73vh-4rem)] md:min-h-[480px] md:max-h-none"
                  style={{
                    backgroundImage: `url("${getImageSrc(
                      card.backgroundImage,
                    )}")`,
                  }}
                >
                  {/* Your brand color sits over the background texture. */}
                  <div className="absolute inset-0 bg-cream-bg" />

                  {/* Mobile is text-only; desktop becomes a two-column layout. */}
                  <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-[1fr_0.92fr]">
                    {/* Text content */}
                    <div className="m-2 flex min-w-0 flex-col justify-center rounded-[4px] bg-white px-6 py-6 text-charcoal sm:px-7 md:m-4 md:mr-0 md:px-8 md:py-7 lg:px-9">
                      <div className="mx-auto w-full max-w-[440px] md:mx-0">
                        {(card.timeline || card.badge) && (
                          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                            {card.timeline && (
                              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/60">
                                {card.timeline}
                              </p>
                            )}

                            {card.badge && (
                              <span className="border-l border-charcoal/25 pl-4 text-[11px] italic text-charcoal/70">
                                {card.badge}
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="font-serif text-[clamp(2rem,8vw,2.65rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal md:text-[clamp(2.1rem,3.2vw,3rem)]">
                          {card.title}
                        </h3>

                        <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
                          <p className="text-[15px] leading-[1.65] text-charcoal/80 lg:text-[16px]">
                            {card.description}
                          </p>

                          <p className="max-w-[400px] text-[14px] leading-[1.65] text-charcoal/60">
                            {card.wif}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-7">
                          <Link
                            href="/packages"
                            className="group inline-flex min-h-11 items-center gap-1.5 text-[12px] uppercase tracking-[0.1em] text-charcoal transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                          >
                            <span className="underline decoration-charcoal/35 underline-offset-4 transition-colors duration-200 group-hover:decoration-charcoal">
                              See what&apos;s included
                            </span>
                            <span aria-hidden="true">→</span>
                          </Link>

                          <Link
                            href={card.href}
                            className="inline-flex min-h-11 items-center justify-center border border-charcoal px-6 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-white"
                          >
                            {card.cta}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Website screenshot only appears on desktop. */}
                    <div className="relative hidden min-h-0 overflow-hidden md:block">
                      <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[4px] shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
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
        <div
          role="img"
          aria-label="Scroll down"
          className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 28"
            fill="none"
            className="hw-service-scroll h-7 w-6"
          >
            <path
              d="M12 3v20m-6-6 6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <style>{`
        @keyframes hw-service-scroll { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }
        .hw-service-scroll { animation: hw-service-scroll 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .hw-service-scroll { animation: none; } }
      `}</style>
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
      wif: "Best for: new and solo businesses, or anyone who needs professional presence to get ideal clients from the start as well as look crediible.",
      cta: "Get my Foundation site",
      // The enquiry form only pre-selects the package if it reads this param.
      href: "/enquiry",
    },

    {
      id: 2,
      image: service2,
      backgroundImage: bg,
      title: "Signature Site",
      timeline: "Live in 2-4 weeks",
      // badge: "",
      description:
        "A brand-led site that earns trust before your first message: custom design, sharper storytelling, a clear path to booking.",
      wif: "Best for: growing businesses that want to be the premium pick, not the cheapest.",
      cta: "Start my Signature Site",
      href: "/enquiry",
    },

    {
      id: 3,
      image: service3,
      backgroundImage: bg,
      title: "Complete Vision",
      timeline: "Live in 4–8 weeks",
      description:
        "Strategy, custom design and development in one build, with advanced features shaped around how your business makes money.",
      wif: "Best for: established brands with bigger goals and vision.",
      cta: "Scope my project",
      href: "/enquiry",
    },
  ];

  return <StickyCard002 cards={cards} backgroundImage={packagesbg} />;
};

export { Skiper17, StickyCard002 };
