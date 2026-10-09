"use client";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { packages, type Pkg } from "./PackagesContent";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#b5924c";

// Copied from PackagesAbout / the previous PackagesSection so every section matches.
const HEADING =
  "text-3xl sm:text-4xl md:text-5xl leading-[1.15] sm:leading-[1.12] md:leading-[1.1] mb-6 sm:mb-7 md:mb-8 font-playfair md:capitalize uppercase tracking-wide text-charcoal";
const BODY = "text-gray-800 md:text-base text-sm leading-relaxed ns";
const BUTTON =
  "px-16 py-3 cursor-pointer border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 rounded-full";

type PanelId = "included" | "suited";

const Accordion = ({
  label,
  lead,
  items,
  closing,
  open,
  onToggle,
}: {
  label: string;
  lead: string;
  items: string[];
  closing?: string;
  open: boolean;
  onToggle: () => void;
}) => {
  const panelId = useId();

  return (
    <div className="border-t border-charcoal/30 last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="ns flex w-full cursor-pointer items-center justify-between py-5 text-left text-sm tracking-wide text-charcoal md:text-base"
      >
        {label}
        <span aria-hidden className="relative block h-3 w-3 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
          <span
            className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>

      {/* grid-rows 0fr -> 1fr animates the height without measuring it */}
      <div
        id={panelId}
        role="region"
        aria-label={label}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        onTransitionEnd={(e) => {
          // page height changed, so other sections' scroll triggers need new positions
          if (e.target === e.currentTarget) ScrollTrigger.refresh();
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pr-6">
            <p className={`mb-5 ${BODY}`}>{lead}</p>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item} className={`flex items-start gap-4 ${BODY}`}>
                  <span
                    aria-hidden
                    className="mt-[0.8em] h-px w-4 shrink-0"
                    style={{ backgroundColor: GOLD }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            {closing && <p className={`mt-6 ${BODY}`}>{closing}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const PackageRow = ({ pkg, flip }: { pkg: Pkg; flip: boolean }) => {
  // one panel open at a time; clicking the open one closes it
  const [panel, setPanel] = useState<PanelId | null>("included");
  const toggle = (id: PanelId) => setPanel((cur) => (cur === id ? null : id));

  return (
    <article className="grid border-t border-gray-500 lg:grid-cols-2">
      <div
        className={`pkg-reveal p-4 sm:p-6 lg:p-12 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="relative h-full min-h-[28rem] overflow-hidden lg:min-h-[44rem]">
          <Image
            src={pkg.image}
            alt={`${pkg.name} example website`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="pkg-reveal flex items-center px-6 py-16 sm:px-10 lg:px-[4.5rem] lg:py-28">
        <div className="w-full max-w-lg space-y-12">
          <div>
            <h2 className={HEADING}>{pkg.name}</h2>
            <div className={`space-y-5 ${BODY}`}>
              {pkg.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <Accordion
              label="What's included"
              lead="Depending on what your project needs, this includes:"
              items={pkg.included}
              open={panel === "included"}
              onToggle={() => toggle("included")}
            />
            <Accordion
              label="Who it's for"
              lead="This package suits businesses that:"
              items={pkg.suitedTo}
              closing={pkg.suitedClose}
              open={panel === "suited"}
              onToggle={() => toggle("suited")}
            />
          </div>

          <dl className="ns grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 gap-y-4 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
            <dt className="font-playfair text-lg text-charcoal">Investment</dt>
            <dd className="text-sm uppercase tracking-[0.14em] text-charcoal md:text-base">
              From {pkg.price}
              {pkg.note && (
                <span className="mt-1 block text-sm normal-case italic tracking-normal text-charcoal/80">
                  {pkg.note}
                </span>
              )}
            </dd>

            <dt className="font-playfair text-lg text-charcoal">Timeline</dt>
            <dd className="text-sm uppercase tracking-[0.14em] text-charcoal md:text-base">
              {pkg.timeline}
            </dd>
          </dl>
          <div>
            <Link href="/enquiry" aria-label={`Book ${pkg.name} package`}>
              <button className={BUTTON}>Book {pkg.name}</button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const PackagesSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>(".pkg-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    return () => mm.revert(); // reverts only this section's triggers
  }, []);

  return (
    <div ref={rootRef} id="packages-section" className="w-full">
      {packages.map((pkg, i) => (
        <PackageRow key={pkg.id} pkg={pkg} flip={i % 2 === 1} />
      ))}

      <div className="flex flex-col items-center space-y-12 border-t border-gray-200 px-4 py-16 text-center md:px-[4.5rem] md:py-24">
        <div className="max-w-3xl">
          <h2 className={HEADING}>Not sure which one fits?</h2>
          <p className={BODY}>
            {
              "You don't need the wording ready or a fixed plan. Tell me about the business and who you want to reach, and I'll recommend the package that fits. If none of them do, like an online shop or a web app, I'll quote it separately."
            }
          </p>
        </div>

        <Link href="/enquiry" aria-label="Start a website enquiry">
          <button className={BUTTON}>Start an enquiry</button>
        </Link>

        <p className="ns text-xs text-charcoal/50">
          {
            "Prices are starting points and don't include domain or hosting renewals."
          }
        </p>
      </div>
    </div>
  );
};

export default PackagesSection;
