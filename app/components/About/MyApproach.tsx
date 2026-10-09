"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Approach {
  number: string;
  description: string;
}

const approaches: Approach[] = [
  {
    number: "01.",
    description:
      "We start by talking. What you love, what you don't, and who you're trying to win over, so I'm never guessing what you want.",
  },
  {
    number: "02.",
    description:
      "A website that feels like the next version of your brand, not a template with your logo dropped in.",
  },
  {
    number: "03.",
    description:
      "You see the site take shape section by section and tell me what you think as it goes, so there are no surprises at the end.",
  },
  {
    number: "04.",
    description:
      "Revisions while I'm building. We move forward when you're happy with it, not when the clock runs out.",
  },
  {
    number: "05.",
    description:
      "Built by hand just for you, not stitched together from a template. Fast, clean, and made to last, so you're not rebuilding in two years.",
  },
];

// ── Mobile accordion cell (unchanged) ──
const MobileCell = ({
  item,
  idx,
  visible,
}: {
  item: Approach;
  idx: number;
  visible: boolean;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="sm:hidden flex flex-col transition-all duration-700"
      style={{
        borderRight: "1px solid #d6c9b8",
        borderBottom: "1px solid #d6c9b8",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${(idx + 1) * 90}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-8 py-6 text-left bg-white cursor-pointer"
      >
        <span
          className="font-light leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "2.4rem",
            color: "#b5973a",
          }}
        >
          {item.number}
        </span>
        <span
          className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            borderColor: "#d6c9b8",
            color: "#b5973a",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden bg-white transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p
          className="px-8 pb-7 leading-relaxed"
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "1.05rem",
            color: "#3a2a2a",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

// ── Desktop step cell with hover interactivity ──
const DesktopCell = ({
  item,
  idx,
  visible,
}: {
  item: Approach;
  idx: number;
  visible: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between p-10 overflow-hidden transition-all duration-500 cursor-default"
      style={{
        borderRight: "1px solid #b5973a",
        borderBottom: "1px solid #b5973a",
        minHeight: 380,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${(idx + 1) * 90}ms`,
        backgroundColor: hovered ? "#f5f2eb" : "#ffffff",
        borderLeft: hovered ? "2px solid #b5973a" : "2px solid transparent",
      }}
    >
      {/* Watermark number — large, background */}
      <span
        className="absolute bottom-4 right-4 font-light leading-none select-none pointer-events-none transition-all duration-500"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(6rem, 10vw, 8.5rem)",
          color: hovered ? "#b5973a" : "#1a1a1a",
          opacity: hovered ? 0.08 : 0.05,
        }}
      >
        {item.number}
      </span>

      {/* Top: small gold index dot + label */}
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "#b5973a" }}
        />
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "#b5973a", fontFamily: "system-ui, sans-serif" }}
        >
          {item.number.replace(".", "")}
        </span>
      </div>

      {/* Description — center of the cell */}
      <p
        className="leading-relaxed transition-all duration-400 relative z-10"
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          color: hovered ? "#1a1a1a" : "#3a2a2a",
          transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        }}
      >
        {item.description}
      </p>

      {/* Bottom: gold line draws in on hover */}
      <div
        className="h-px transition-all duration-500 ease-out"
        style={{
          width: hovered ? "32px" : "0px",
          backgroundColor: "#b5973a",
        }}
      />
    </div>
  );
};

const MyApproach = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">

      {/* ── MOBILE ── */}
      <div
        className="sm:hidden"
        style={{ borderTop: "1px solid #d6c9b8", borderLeft: "1px solid #d6c9b8" }}
      >
        <div
          className="flex flex-col items-center justify-center gap-5 px-8 py-10 text-center transition-all duration-700 bg-yellowish/80"
          style={{
            borderRight: "1px solid #d6c9b8",
            borderBottom: "1px solid #d6c9b8",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2
            className="font-normal leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.6rem",
              color: "#2e1414",
            }}
          >
            What working with me is like
          </h2>
        </div>
        {approaches.map((item, idx) => (
          <MobileCell key={idx} item={item} idx={idx} visible={visible} />
        ))}
      </div>

      {/* ── DESKTOP ── */}
      <div
        className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderTop: "1px solid #d6c9b8", borderLeft: "1px solid #d6c9b8" }}
      >
        {/* Label cell */}
        <div
          className="flex flex-col items-center justify-center gap-5 p-10 text-center transition-all duration-700 bg-yellowish"
          style={{
            borderRight: "1px solid #d6c9b8",
            borderBottom: "1px solid #d6c9b8",
            minHeight: 380,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0ms",
          }}
        >
          <h2
            className="font-normal leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#2e1414",
            }}
          >
            What working with me is like
          </h2>
        </div>

        {approaches.map((item, idx) => (
          <DesktopCell key={idx} item={item} idx={idx} visible={visible} />
        ))}
      </div>

      {/* ── CLOSING CTA (mobile + desktop) ── */}
      <div
        className="flex flex-col items-center justify-center gap-6 px-8 py-12 text-center transition-all duration-700 bg-yellowish"
        style={{
          borderLeft: "1px solid #d6c9b8",
          borderRight: "1px solid #d6c9b8",
          borderBottom: "1px solid #d6c9b8",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: `${(approaches.length + 1) * 90}ms`,
        }}
      >
        <p
          className="max-w-xl leading-relaxed"
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            color: "#2e1414",
          }}
        >
          No surprises, no guessing, no handoffs. Just you and the person
          building your site.
        </p>

        <Link
          href="/enquiry"
          aria-label="Start the conversation about your website"
          className="button button-lavender cursor-pointer border rounded-full px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white"
        >
          Start the conversation ↗
        </Link>
      </div>

    </section>
  );
};

export default MyApproach;