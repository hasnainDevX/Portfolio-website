import Link from "next/link";
import Image from "next/image";

import experienceBg from "../assets/waves.png";

// Service businesses only, in order of priority.
// Put verticals you've actually shipped sites for first.
const industries = [
  "Lash & Brow Artists",
  "Photographers",
  "Event & Wedding Planners",
  "Cleaning Services",
  "Real Estate",
  "Virtual Assistants and Coaches",
  "Branding and SMM Agencies",
  "Content Creators",
  "Aesthetic Clinics"
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="group overflow-hidden py-2">
      <div
        className={`industry-marquee flex w-max ${
          reverse ? "industry-marquee-reverse" : ""
        } group-hover:[animation-play-state:paused]`}
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
          >
            {items.map((industry) => (
              <span
                key={`${industry}-${copy}`}
                className={"md:text-2xl font-serif border px-4 py-2 rounded-full"}
              >
                {industry}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const ExperienceSection = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-24
        sm:py-32
        lg:py-40
      "
      aria-labelledby="industries-heading"
    >
      {/* Background image */}
      <Image
        src={experienceBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay — change opacity here */}
      <div className="absolute inset-0 bg-cream-bg/40" />

      {/* Main content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal sm:text-xs">
                Who I build for
              </p>

              <h2
                id="industries-heading"
                className="
                  mt-5
                  max-w-lg
                  font-display
                  text-5xl
                  font-[200]
                  leading-[0.9]
                  tracking-[-0.045em]
                  text-charcoal

                  sm:text-6xl
                  md:text-7xl
                "
              >
                Your skill sells.
                <br />

                <span className="italic">
                  Your website should too.
                </span>
              </h2>
            </div>

            <div className="max-w-xl lg:pb-1">
              <p className="font-body text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Lash artists, coaches, photographers, event planners, trainers.
                If clients pay for your time and trust, your website is the
                first thing they judge. I build sites that do the selling: a
                clear offer, easy booking, and a place on Google.
              </p>
              <Link
                href="/portfolio"
                className="button mt-7"
              >
                See the work ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Industry marquee */}
        <div className="mt-16 py-7 sm:mt-20 sm:py-9">
          <MarqueeRow items={industries} />
        </div>

        {/* Accessible industry list */}
        <ul className="sr-only">
          {industries.map((industry) => (
            <li key={industry}>
              {industry}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-6xl px-5 text-center font-body text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal/50 sm:px-8 sm:text-xs lg:px-10">
          Don&apos;t see your trade? If clients book you, I can build for you.
        </p>
      </div>
    </section>
  );
};

export default ExperienceSection;