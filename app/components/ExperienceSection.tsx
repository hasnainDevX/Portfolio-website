import Link from "next/link";

const industries = [
  "Virtual Assistants",
  "E-commerce Brands",
  "Coaches & Consultants",
  "Cleaning Services",
  "Fitness & Wellness",
  "Internet Service Providers",
  "Real Estate",
  "Social Media Managers",
  "Restaurants & Cafés",
  "Creative Agencies",
  "Personal Brands",
  "Courses & Digital Products",
  "Crowdfunding Platforms",
];

const rowOne = industries.slice(0, 7);
const rowTwo = industries.slice(7);

const tagStyles = [
  "border-charcoal/15 bg-cream-bg text-charcoal",
  "border-charcoal/15 bg-vream-bg text-charcoal",
] as const;

function MarqueeRow({
  items,
  reverse = false,
  colourOffset = 0,
}: {
  items: string[];
  reverse?: boolean;
  colourOffset?: number;
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
            {items.map((industry, index) => (
              <span
                key={`${industry}-${copy}`}
                className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2 font-body text-xs font-medium tracking-[-0.01em] shadow-[0_5px_16px_rgba(48,50,51,0.06)] sm:px-5 sm:py-2.5 sm:text-sm ${
                  tagStyles[(index + colourOffset) % tagStyles.length]
                }`}
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
      className="overflow-hidden bg-cream-bg py-24 sm:py-32 lg:py-40"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal sm:text-xs">
              Experience across industries
            </p>

            <h2
              id="industries-heading"
              className="mt-5 max-w-lg font-display text-5xl font-[200] leading-[0.9] tracking-[-0.045em] text-charcoal sm:text-6xl md:text-7xl"
            >
              Different industries.
              <br />
              <span className="italic">One clear standard.</span>
            </h2>
          </div>

          <div className="max-w-xl lg:pb-1">
            <p className="font-body text-sm leading-relaxed text-charcoal/70 sm:text-base">
              From personal brands finding their voice to established businesses
              refining their digital presence, every project begins with what
              makes the business distinct.
            </p>

            <Link href="/portfolio" className="button mt-7">
              Explore selected work ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 to-periwinkle/35 py-7 sm:mt-20 sm:py-9">
        <MarqueeRow items={rowOne} colourOffset={0} />
        <MarqueeRow items={rowTwo} reverse colourOffset={3} />
      </div>

      <ul className="sr-only">
        {industries.map((industry) => (
          <li key={industry}>{industry}</li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-6xl px-5 text-center font-body text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal/50 sm:px-8 sm:text-xs lg:px-10">
        And the next ambitious business could be yours.
      </p>
    </section>
  );
};

export default ExperienceSection;