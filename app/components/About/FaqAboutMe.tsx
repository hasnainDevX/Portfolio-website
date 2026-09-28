"use client";
import { useState } from "react";

const faqs = [
  {
    question: "WHAT YOU CAN EXPECT FROM ME...",
    answer:
      "Clear communication, honest timelines, and a website built properly — not patched together. You'll get a developer who actually understands your business goals, keeps you in the loop throughout, and delivers something you're proud to share. No templates, no shortcuts, no ghosting after handoff.",
    bg: "bg-charcoal/90 text-[#ffffff]",
  },
  {
    question: "WHAT YOU WON'T GET FROM ME...",
    answer:
      "Cookie-cutter designs, bloated page builders, or a site that falls apart the moment you try to update it. I don't do rushed work, vague timelines, or projects I'm not confident I can do justice. If it's not the right fit, I'll tell you upfront.",
    bg: "bg-charcoal/90 text-[#ffffff]",
  },
  {
    question: "WHO AM I, EXACTLY...",
    answer:
      "A solo developer — not an agency, not a team. Just me. I work directly with every client from brief to launch, which means faster communication, lower overhead, and no account managers playing telephone between you and the person actually building your site. Every project gets my full attention.",
    bg: "bg-charcoal/90 text-[#ffffff]",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`${faq.bg} rounded-2xl overflow-hidden cursor-pointer`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center justify-between px-8 py-7">
              <h3 className="font-playfair text-xl sm:text-2xl lg:text-3xl tracking-tight  uppercase">
                {faq.question}
              </h3>
              <button className="flex-shrink-0 ml-6 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-300 cursor-pointer"
                style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <span className="text-xl leading-none mb-1">+</span>
              </button>
            </div>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: open === i ? "300px" : "0px" }}
            >
              <p className="px-8 pb-7 text-base sm:text-lg leading-relaxed  ns">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;