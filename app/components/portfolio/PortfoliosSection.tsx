
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import portfolio1 from "../../assets/lashedbytash.jpeg";
import portfolio2 from "../../assets/allingoodhans1.png";
import portfolio3 from "../../assets/maceysmethod1.png";
import portfolio4 from "../../assets/telecomsite1.jpeg";
import portfolio5 from "../../assets/noblesite1.jpeg";

interface Portfolio {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
  desc: string;
  link: string;
}

const portfolioData: Portfolio[] = [
  {
    id: 1,
    title: "Lashed By Tash",
    category: "Website Design",
    image: portfolio1,
    desc: "Tash had the talent, the loyal clients, and the reputation to match. What she needed was a digital home that reflected it all. We brought her work to life through an editorial design, an easy-to-explore lash menu, real client stories, and a booking journey that makes taking the next step feel effortless.",
    link: "https://www.lashedbytash.ca",
  },
  {
    id: 2,
    title: "All In Good Hans",
    category: "Website Design",
    image: portfolio2,
    desc: "When your business is built on making other people's lives easier, your website should do the same. For All In Good Hans, we created a calm, considered online space that communicates her value, showcases her services, and helps busy business owners see exactly why they need her in their corner.",
    link: "https://www.allingoodhans.co.uk/",
  },
  {
    id: 3,
    title: "Macey's Method",
    category: "Website Design + Development",
    image: portfolio3,
    desc: "Macey helps business owners get their time back. Her website needed to communicate that value without making visitors work for the answer. Clean layouts, thoughtful messaging, and a clear path to enquire come together in a digital presence that feels every bit as organised and dependable as the service behind it.",
    link: "https://maceysmethod.co.uk/",
  },
  {
    id: 4,
    title: "Go Quality Networks",
    category: "Website Development",
    image: portfolio4,
    desc: "Internet solutions can get complicated fast. The website shouldn't. For this Houston-based telecom business, we developed a straightforward digital experience that brings services, connectivity options, and essential information into focus — so visitors can spend less time figuring things out and more time finding the right solution.",
    link: "https://go-quality-networks.com/",
  },
  {
    id: 5,
    title: "Noble Cleaning Solutions",
    category: "Website Design + Development",
    image: portfolio5,
    desc: "Finding a reliable cleaning company shouldn't feel like another chore. We built Noble Cleaning Solutions a clean, approachable website that puts its residential and commercial services front and centre, answers the questions that matter, and makes getting in touch refreshingly simple.",
    link: "https://noble-cleaning-solutions.vercel.app/",
  },
];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
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
    <section className="w-full">
      {/* Header */}
      <div className="px-6 py-24 text-center md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-charcoal">
          Explore My Work
        </p>

        <h1 className="text-5xl font-light tracking-wide md:text-6xl lg:text-7xl xl:text-8xl">
          Take a peak at some of our favorite projects.
        </h1>
      </div>

      {/* Portfolio Rows */}
      <div className="w-full divide-y divide-[#E8E4DF] border-t border-[#E8E4DF]">
        {portfolioData.map((item, idx) => (
          <article key={item.id} className="flex w-full flex-col items-stretch md:min-h-[520px] md:flex-row">
            {/* Text */}
            <div className="flex flex-1 items-center py-16 md:py-0">
              <FadeIn delay={100} className="w-full">
                <div className="max-w-xl px-8 md:px-16 lg:px-24">
                  <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-[#999]">
                    {item.category}
                  </p>

                  <h2 className="mb-7 text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.05] tracking-tight text-[#1A1A1A]">
                    {item.title}
                  </h2>

                  <p className="mb-10 text-[0.9rem] leading-[1.75] text-[#6B6560]">
                    {item.desc}
                  </p>

                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-lavender border rounded-full px-5 py-3 transition-colors duration-300 hover:bg-gold hover:text-white cursor-pointer"
                  >
                    Explore the website ↗
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Image */}
            <div className={`relative min-h-[380px] w-full flex-1 overflow-hidden ${idx % 2 !== 0 ? "md:order-first" : ""}`}>
              <FadeIn delay={200} className="absolute inset-0">
                <div className="relative h-full w-full">
                  <Image
                    src={item.image}
                    alt={`${item.title} website design`}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </FadeIn>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfoliosSection;