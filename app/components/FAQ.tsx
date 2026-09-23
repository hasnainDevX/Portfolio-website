"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Packages start from $399 and go up depending on the scope — number of pages, features, animations, and so on. The packages page has a full breakdown, but if you're still unsure, just fill out the enquiry form and I'll give you a straight answer based on what you actually need.",
  },
  {
    question: "Why custom code instead of Wix, WordPress, or Squarespace?",
    answer:
      "Builders are convenient, but they come with a cost — bloated code, slow load times, generic layouts, and monthly fees that add up. A custom-coded site is leaner, faster, and built exactly around your business. No unused plugins, No monthly Fee ever, no one-size-fits-all templates. You own it completely.",
  },
  {
    question: "Can I update the website myself after it's built?",

    answer:
      "Yes — you can add a custom content management dashboard to your website so you can update it yourself. The Complete Vision package includes a custom dashboard, while clients on other packages can also add one as an optional upgrade. Dashboard pricing typically ranges from $99–$299 depending on the features and complexity. You can use it to update text, swap images, add blog posts, and handle other content directly from an easy-to-use interface.",
  },

  {
    question: "How long does the process take?",
    answer:
      "The Foundation Site typically wraps up in 1–2 weeks. Larger projects run 3–8 weeks depending on scope. The biggest factor is usually how quickly content and feedback come through on your end — I'll always give you a clear timeline upfront so nothing drags.",
  },
  {
    question: "Why are your rates lower than most Web Designers?",
    answer:
      "Because the traditional agency model is broken. You pay $3,000 and half of it covers account managers, project coordinators, and internal meetings you're never in. I've cut all of that out by design — every penny goes into the actual build. The result is the same quality, delivered faster, with direct access to the person doing the work. That's not a compromise. That's a better deal.",
  },
  {
    question: "Will my website work on mobile?",
    answer:
      "Every site is fully responsive and tested across phones, tablets, and desktops before it goes live. Mobile isn't an add-on — it's built in from the start, since that's where most of your visitors will land anyway.",
  },
  {
    question: "I'm not sure which package is right for me.",
    answer:
      "That's completely fine — most people aren't sure before we talk. Fill out the enquiry form with a rough idea of what you're after and I'll come back to you with a recommendation. No pressure, no sales pitch.",
  },
];

const FAQItem = ({ faq }: { faq: FAQ; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item border-b transition-colors duration-300"
      style={{ borderColor: "#e0d9d0", opacity: 0 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-7 md:py-8 gap-6 group cursor-pointer"
        aria-label={`${open ? "Close" : "Open"} FAQ: ${faq.question}`}
      >
        <span
          className="text-2xl md:text-3xl lg:text-4xl font-normal leading-snug transition-colors duration-300 group-hover:opacity-70 px-10 md:px-16 lg:px-24"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#1a1a1a",
          }}
        >
          {faq.question}
        </span>

        <span
          className="shrink-0 flex items-center justify-center transition-transform duration-400 px-10 md:px-16"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "#1a1a1a",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M5 8l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p
          className="pb-8 leading-relaxed max-w-3xl font-sans px-10 md:px-16 lg:px-24"
          style={{ fontSize: "1rem", color: "#6b6560" }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".faq-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Eyebrow label
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
      );

      // FAQ rows stagger in
      if (items?.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <div className="mx-auto">
        <p
          ref={eyebrowRef}
          className="text-xs tracking-[0.4em] uppercase text-[#999] mb-12 font-sans px-10 md:px-16 lg:px-24"
          style={{ opacity: 0 }}
        >
          Frequently Asked Questions
        </p>

        <div style={{ borderTop: "1px solid #e0d9d0" }}>
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
