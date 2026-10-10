import Image from "next/image";
import processBg from "../assets/waves2.png";

const OurProcess = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-charcoal">
      {/* Background image */}
      <Image src={processBg} alt="" fill sizes="100vw" className="object-cover object-center" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/80" />

      <div className="relative z-10 min-h-screen px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left Column */}
            <div className="space-y-8 text-white">
              <h1 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                A website built around <em className="italic">your vision,</em> not a template.
              </h1>

              <p className="font-serif text-lg leading-relaxed md:text-xl lg:text-2xl">
                Every project starts with understanding — not assumptions. Before a single line of code is written, I take the time to learn your business, your goals, and exactly what you want your website to do. The result is a custom-coded site that performs, converts, and actually feels like you.
              </p>
            </div>

            {/* Right Column - Process Steps */}
            <div className="space-y-12 text-white lg:space-y-16">

              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40">01</span>
                  <h2 className="font-serif text-3xl italic md:text-4xl lg:text-5xl">Discover</h2>
                </div>
                <p className="text-base leading-relaxed text-white/80">
                  We start with a detailed brief — example sites you love, your brand assets, your target audience, and what you want visitors to do when they land on your page. No guesswork, no generic questionnaires. Just a clear foundation that the entire build is rooted in.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40">02</span>
                  <h2 className="font-serif text-3xl italic md:text-4xl lg:text-5xl">Build</h2>
                </div>
                <p className="text-base leading-relaxed text-white/80">
                  Your site is custom-coded from scratch — no page builders, no bloat. I build section by section and share progress throughout so you're never left waiting to see the full thing. Unlimited revisions during development means we don't move forward until each part is right.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/40">03</span>
                  <h2 className="font-serif text-3xl italic md:text-4xl lg:text-5xl">Launch</h2>
                </div>
                <p className="text-base leading-relaxed text-white/80">
                  Once you're happy — and only then — your site goes live. I handle the deployment, final performance checks, and SEO setup. Post-launch support is included so you're not left on your own the moment it's live.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;