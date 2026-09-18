"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Package11Image from "../assets/vasite3.jpeg";
import Package2Image from "../assets/vasite4.jpeg";
import Package1Image from "../assets/maceysmethod3.png";
import Package3Image from "../assets/ecomsite1.jpeg";
import Image from "next/image";
import Link from "next/link";
import PackagesOffer from "./PackagesOffer";

gsap.registerPlugin(ScrollTrigger);

const Deliverable = ({
  bold,
  normal = "",
}: {
  bold: string;
  normal?: string;
}) => (
  <div className="flex items-start gap-3 mb-4">
    <span
      className="mt-[3px] shrink-0 text-sm leading-none"
      style={{ fontFamily: "serif", color: "#b5924c" }}
    >
      ✓
    </span>
    <p className="text-sm leading-relaxed text-[#2a2a2a]">
      <span className="font-semibold">{bold}</span>
      {normal && (
        <span className="font-normal text-[#2a2a2a]/60"> {normal}</span>
      )}
    </p>
  </div>
);

const PriceBlock = ({
  price,
  originalPrice,
  turnaround,
  note,
}: {
  price: string;
  originalPrice?: string;
  turnaround: string;
  note?: string;
}) => {
  const blockRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={blockRef} className="mt-8 mb-8 border-t border-[#2a2a2a]/10 pt-8">
      {originalPrice && (
        <span
          className="discount-badge inline-block text-[10px] tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full border"
          style={{ color: "#b5924c", borderColor: "#b5924c" }}
        >
          25% off · August only
        </span>
      )}
      <div className="flex items-baseline gap-3 flex-wrap">
        {originalPrice && (
          <span
            className="text-xl text-[#2a2a2a]/30 line-through"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {originalPrice}
          </span>
        )}
        <p
          className="text-4xl text-[#2a2a2a] mb-1"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {price}
        </p>
      </div>
      <p className="text-xs tracking-[0.22em] uppercase text-[#2a2a2a]/60">
        {turnaround}
      </p>
      {note && <p className="text-xs text-[#2a2a2a]/40 italic mt-1">{note}</p>}
    </div>
  );
};

// Hook to animate a package row
const usePackageAnimation = (
  ref: React.RefObject<HTMLDivElement | null>,
  imageSelector: string,
  textSelector: string,
  fromLeft = true,
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const img = el.querySelector(imageSelector);
      const text = el.querySelector(textSelector);
      const hr = el.previousElementSibling;
      const deliverables = el.querySelectorAll(".deliverable-item");
      const priceBlock = el.querySelector(".price-block");
      const cta = el.querySelector(".cta-btn");
      const number = el.querySelector(".pkg-number");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // HR line draw
      if (hr && hr.tagName === "HR") {
        tl.fromTo(
          hr,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8 },
          0,
        );
      }

      // Package number
      if (number) {
        tl.fromTo(
          number,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.1,
        );
      }

      // Image slides in
      if (img) {
        tl.fromTo(
          img,
          { opacity: 0, x: fromLeft ? -60 : 60, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9 },
          0.15,
        );
      }

      // Text block
      if (text) {
        tl.fromTo(
          text,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3,
        );
      }

      // Deliverables stagger
      if (deliverables.length) {
        tl.fromTo(
          deliverables,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
          0.5,
        );
      }

      // Price block
      if (priceBlock) {
        tl.fromTo(
          priceBlock,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );
      }

      // CTA
      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 12, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          "-=0.2",
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);
};

const PackagesSection = () => {
  const pkg1Ref = useRef<HTMLDivElement>(null);
  const pkg2Ref = useRef<HTMLDivElement>(null);
  const pkg3Ref = useRef<HTMLDivElement>(null);

  usePackageAnimation(pkg1Ref, ".centerimage", ".textpart", true);
  usePackageAnimation(pkg2Ref, ".centerpart", ".leftpart", false);
  usePackageAnimation(pkg3Ref, ".leftimage", ".centercontent", true);

  return (
    <div id="packages-section" className="w-full min-h-screen">
      <hr className="border-t border-gray-500" />
      {/* <PackagesOffer /> */}

      {/* ── 01 The Foundation Site ── */}
      <div
        ref={pkg1Ref}
        className="package1 flex flex-col lg:flex-row w-full h-auto gap-8 lg:gap-0 py-16"
      >
        <div className="leftdecor hidden lg:flex flex-[0_0_15%] lg:py-16 py-8">
          <Image
            className="w-full h-full object-cover"
            src={Package11Image}
            alt=""
          />
        </div>

        <div className="centerimage flex-[0_0_35%] flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <Image
              src={Package1Image}
              alt="The Foundation Site"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="textpart flex-[0_0_50%] p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-xl">
            <p className="pkg-number text-sm font-light mb-4 tracking-wider">
              01
            </p>
            <h2
              className="text-5xl lg:text-6xl font-serif mb-6 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The Foundation Site
            </h2>
            <p className="text-base leading-relaxed mb-8 text-gray-800">
              Stop second-guessing every design choice. Start showing up with
              consistency and confidence. Your digital front door that actually
              works — a website that loads instantly, looks professional, and
              turns visitors into customers without the headaches of DIY
              builders.
            </p>

            <p className="text-xs tracking-[0.22em] uppercase text-[#2a2a2a]/40 mb-5">
              What's included
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-6">
              <div>
                <div className="deliverable-item">
                  <Deliverable
                    bold="Custom-coded Website"
                    normal="built from scratch"
                  />
                </div>
                <div className="deliverable-item">
                  <Deliverable
                    bold="Fast loading speeds"
                    normal="and performance tuning"
                  />
                </div>
                <div className="deliverable-item">
                  <Deliverable
                    bold="Contact forms"
                    normal="and essential integrations"
                  />
                </div>
              </div>
              <div>
                <div className="deliverable-item">
                  <Deliverable
                    bold="SEO, analytics and copywriting"
                    normal="for a strong launch"
                  />
                </div>
                <div className="deliverable-item">
                  <Deliverable
                    bold="Free hosting setup"
                    normal="& domain guidance"
                  />
                </div>
                <div className="deliverable-item">
                  <Deliverable bold="30 days" normal="of post-launch support" />
                </div>
              </div>
            </div>

            <div className="price-block">
              <PriceBlock
                price="$299–$499"
                // originalPrice="$750–$1,500"
                turnaround="2–3 weeks turnaround"
              />
            </div>
            <Link href="/enquiry" aria-label="Book The Foundation Site package">
              <button className="cta-btn px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
                Book The Foundation Site
              </button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-500" />

      {/* ── 02 The Signature Site ── */}
      <div
        ref={pkg2Ref}
        className="package2 flex flex-col lg:flex-row w-full h-auto gap-8 lg:gap-0 py-16"
      >
        <div className="leftpart flex-1 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md">
            <p className="pkg-number text-sm font-light mb-4 tracking-wider">
              02
            </p>
            <h2
              className="text-5xl lg:text-6xl font-serif mb-6 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The Signature Site
            </h2>
            <p
              className="text-base leading-relaxed text-gray-800"
              style={{ textAlign: "justify" }}
            >
              Elevate your online presence with a website that commands
              attention and builds trust — the kind that makes potential
              customers think 'this business knows what they're doing'.
            </p>
          </div>
        </div>

        <div className="centerpart flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Image
              src={Package2Image}
              alt="The Signature Site"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="rightpart flex-1 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.22em] uppercase text-[#2a2a2a]/40 mb-5">
              What's included
            </p>
            <div className="deliverable-item">
              <Deliverable
                bold="Multi-page custom-coded website"
                normal="with advanced features"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Optimised for speed and SEO"
                normal="Core Web Vitals compliant"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Professional copywriting"
                normal="consultation session"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Advanced SEO implementation"
                normal="with schema markup"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Custom animations"
                normal="and interactive elements"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Analytics setup"
                normal="and conversion tracking"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Email marketing integration"
                normal="and lead capture forms"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="60 days"
                normal="of post-launch support and updates"
              />
            </div>
            {/* <div className="deliverable-item">
              <Deliverable
                bold="Self-managed content system"
                normal="— no developer needed"
              />
            </div> */}
            <div className="price-block">
              <PriceBlock
                price="$499–$999"
                // originalPrice="$750–$1,500"
                turnaround="3–4 weeks turnaround"
                note="2-month payment plans available"
              />
            </div>
            <Link href="/enquiry" aria-label="Book The Signature Site package">
              <button className="cta-btn px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
                Book The Signature Site
              </button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-500" />

      {/* ── 03 The Complete Vision ── */}
      <div
        ref={pkg3Ref}
        className="package3 flex flex-col lg:flex-row w-full h-auto gap-0 py-16"
      >
        <div className="leftimage flex-1 p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Image
              src={Package3Image}
              alt="The Complete Vision"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="centercontent flex-1 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <p className="pkg-number text-sm font-light mb-4 tracking-wider">
              03
            </p>
            <h2
              className="text-5xl lg:text-6xl font-serif mb-6 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The Complete Vision
            </h2>
            <p
              className="text-base leading-relaxed mb-8 text-gray-800"
              style={{ textAlign: "justify" }}
            >
              For businesses ready to stop playing small online. Every line of
              code written with intention, every detail designed to turn a
              first-time visitor into a repeat customer. This is the last
              website you'll ever need to build.
            </p>
            <h3 className="text-xs tracking-widest uppercase mb-6">
              Built to scale with you
            </h3>
            <div className="space-y-4">
              {[
                "Capture and nurture leads automatically",
                "Scale your business without working more hours",
                "Premium presence that justifies higher prices",
                "Turns visitors into customers through smart workflows",
              ].map((reason) => (
                <div
                  key={reason}
                  className="deliverable-item flex items-start gap-3"
                >
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <p
                    className="text-base italic font-serif"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rightsidebar flex-1 p-8 lg:p-16 flex flex-col justify-center lg:border-l border-gray-300">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.22em] uppercase text-[#2a2a2a]/40 mb-5">
              What's included
            </p>
            <div className="deliverable-item">
              <Deliverable
                bold="Everything in The Signature Site,"
                normal="plus:"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Fully custom web application"
                normal="with advanced functionality"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="99+ PageSpeed scores"
                normal="performance-optimised code"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Custom CMS"
                normal="or e-commerce integration"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Custom admin panel"
                normal="for easy content and image updates"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Multi-platform compatibility"
                normal="and PWA features"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="Ongoing maintenance"
                normal="and security updates included"
              />
            </div>
            <div className="deliverable-item">
              <Deliverable
                bold="90 days priority support"
                normal="with unlimited revisions"
              />
            </div>
            <div className="price-block">
              <PriceBlock
                price="$2000+"
                turnaround="6–8 weeks turnaround"
                note="3-month payment plans available"
              />
            </div>
            <Link href="/enquiry" aria-label="Book The Complete Vision package">
              <button className="cta-btn px-16 py-3 cursor-pointer bg-soft-beige border-charcoal border-1 rounded-xl hover:bg-charcoal text-sm tracking-widest uppercase hover:text-white transition-colors duration-300">
                Book The Complete Vision
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-8 md:px-16 py-12 text-center">
        <p className="text-sm text-[#2a2a2a]/60 leading-relaxed max-w-2xl mx-auto font-sans">
          Need something outside these packages? Custom quotes are available for
          e-commerce builds, web applications, or anything with specific
          requirements. All prices are exclude domain and hosting
          renewal costs.{" "}
          <a
            href="/enquiry"
            className="underline underline-offset-2 hover:text-[#2a2a2a] transition-colors duration-200"
          >
            Get in touch
          </a>{" "}
          and we'll figure out what makes sense.
        </p>
      </div>
    </div>
  );
};

export default PackagesSection;
