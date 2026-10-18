import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";
import CircularText from "../components/CircularText";
import Footer from "../components/Footer";
import ProjectBriefForm from "../components/ProjectBrief/ProjectBriefForm";
import { pageMetadata } from "../lib/Seo";

export const metadata = {
  ...pageMetadata({ title: "Website Project Brief", description: "Share your business, website needs and design preferences with Hasnain Webstudio.", path: "/project-brief" }),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ProjectBriefPage() {
  return <div className="brief-page min-h-screen bg-[#FFFCF9] text-charcoal">
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-10 sm:py-8">
      <Link href="/" aria-label="Hasnain Webstudio home" className="font-display text-2xl tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"><Image src={logo} alt="Hasnain Webstudio" width={160} height={64} className="h-14 w-40 object-contain object-left" priority /></Link>
      <span className="text-[10px] uppercase tracking-[0.16em] text-charcoal/70 sm:text-xs">Project discovery</span>
    </header>
    <main>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-14 pt-10 sm:px-10 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_200px] lg:items-center lg:gap-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(3rem,6.5vw,5.75rem)] font-light leading-[1.02] tracking-[-0.04em]">Website<br />Project Brief</h1>
          <p className="mt-7 max-w-[38rem] font-body text-lg leading-[1.65] text-charcoal sm:text-xl">Tell me more about your business and what you have in mind for your website. Your answers will help me prepare a proposal tailored to your goals and needs.</p>
          <p className="mt-4 max-w-[36rem] font-body text-base leading-relaxed text-charcoal/75">If you’re unsure about anything, just let me know—I can help you figure it out.</p>
        </div>
        <div aria-hidden="true" className="brief-seal pointer-events-none relative mx-auto h-32 w-32 lg:mx-0 lg:h-[200px] lg:w-[200px]">
          <CircularText text="YOUR BUSINESS • YOUR NEXT CHAPTER • " spinDuration={45} onHover="pause" className="!h-32 !w-32 !font-normal !text-charcoal [&>span]:!text-[11px] lg:!h-[200px] lg:!w-[200px] lg:[&>span]:!text-base" />
          <span className="absolute inset-0 flex items-center justify-center"><Image src={logo} alt="" width={104} height={104} className="h-16 w-16 object-contain lg:h-24 lg:w-24" /></span>
        </div>
      </div>
      <section aria-label="Complete your project brief" className="brief-paper relative bg-cream-bg">
        <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
          <ProjectBriefForm />
        </div>
      </section>
      <div aria-hidden="true" className="h-12 sm:h-16" />
    </main>
    <Footer />
  </div>;
}