"use client"
import { useEffect, useRef, useState } from "react";
import portfolio1 from "../../assets/lashedbytash.jpeg";
import portfolio2 from "../../assets/allingoodhans1.png";
import portfolio3 from "../../assets/maceysmethod1.png";
import portfolio4 from "../../assets/telecomsite1.jpeg";
import portfolio5 from "../../assets/noblesite1.jpeg";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface Portfolio {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
  desc?: string;
  year: string;
  link?: string;
}

const portfolioData: Portfolio[] = [
  {
    id: 1,
    title: "Lashed By Tash",
    category: "Website Design",
    image: portfolio1,
    desc: "A strategic website for a certified lash artist in Steinbach, MB, built to bring her work beyond Instagram. Features an editorial brand identity, a lash menu with real pricing, a before/after slider, client testimonials, and a booking inquiry flow that sends requests straight to her inbox. Built with Next.js, Tailwind, and GSAP, with SEO and speed in mind.",
    year: "2026",
    link: "https://www.lashedbytash.ca",
  },
  {
    id: 2,
    title: "All In Good Hans",
    category: "Website Design",
    image: portfolio2,
    desc: "A strategic website build for a UK-based Virtual Assistant supporting overwhelmed entrepreneurs with inbox management, systems, and client coordination. The design reflects the brand's calm, organised approach — positioning her as the dependable 'behind-the-scenes' partner who brings structure to business chaos.",
    year: "2026",
    link: "https://www.allingoodhans.co.uk/",
  },
  {
    id: 3,
    title: "Macey's Method",
    category: "Website Design + Development",
    image: portfolio3,
    desc: "A refined, service-led website for a Virtual Assistant business focused on operational support and streamlined workflows. The structure prioritises clarity, service breakdown, and trust-building — helping potential clients quickly understand the value of outsourcing their admin.",
    year: "2025",
    link: "https://maceysmethod.co.uk/",
  },
  {
    id: 4,
    title: "Go Quality Networks",
    category: "Website Development",
    image: portfolio4,
    desc: "A Houston-based telecom website built to present high-speed internet and connectivity solutions with clarity and authority. The platform is structured to simplify provider comparison, communicate coverage and reliability, and guide users toward confident service decisions.",
    year: "2023",
    link: "https://go-quality-networks.com/",
  },
  {
    id: 5,
    title: "Noble Cleaning Solutions",
    category: "Website Design + Development",
    image: portfolio5,
    desc: "A functional service website developed for a Edmonton-based cleaning business. The platform streamlines the booking process while clearly presenting residential and commercial services in a structured, easy-to-navigate layout.",
    year: "2023",
    link: "https://noble-cleaning-solutions.vercel.app/",
  },
];

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const PortfoliosSection = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 py-24 md:py-32 text-center">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-6 text-charcoal"
          style={{ fontFamily: "sans-serif" }}
        >
          Explore My Recent Work
        </p>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide"
        >
          Recent Projects
        </h1>
      </div>

      {/* Portfolio Rows */}
      <div className="w-full divide-y divide-[#E8E4DF] border-t border-[#E8E4DF]">
        {portfolioData.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col md:flex-row items-stretch min-h-[520px]"
          >
            {/* ── Text Part ── */}
            <div className="flex-1 flex items-center py-16 md:py-0">
              <FadeIn delay={100}>
                <div className="px-8 md:px-16 lg:px-24 max-w-xl">

                  {/* Category tag — small, quiet */}
                  <p
                    className="text-[10px] tracking-[0.28em] uppercase mb-6"
                    style={{ color: "#aaa", fontFamily: "system-ui, sans-serif" }}
                  >
                    {item.category}
                  </p>

                  {/* Title */}
                  <h2
                    className="font-normal leading-[1.05] tracking-tight mb-7"
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      color: "#1A1A1A",
                    }}
                  >
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="leading-[1.75] mb-10"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#6B6560",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Year + button row */}
                  <div className="flex items-center gap-6">
                    <Link href={item.link || "#"} target="_blank" rel="noopener noreferrer">
                      <button className="px-10 py-3 bg-soft-beige border border-charcoal rounded-xl hover:bg-charcoal text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer">
                        View Live Site
                      </button>
                    </Link>
                    {/* <span
                      className="text-xs tracking-widest text-[#bbb]"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {item.year}
                    </span> */}
                  </div>

                </div>
              </FadeIn>
            </div>

            {/* ── Image Part ── */}
            <div
              className={`flex-1 w-full overflow-hidden ${
                idx % 2 !== 0 ? "md:order-first" : ""
              }`}
              style={{ minHeight: 380 }}
            >
              <FadeIn delay={200}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 380, display: "block" }}
                />
              </FadeIn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfoliosSection;