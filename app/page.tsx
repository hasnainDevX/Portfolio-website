import Image from "next/image";
import imageBottomLeft from "./assets/allingoodhans1.png";
import imageRight from "./assets/amrsocialm2.png";
import imageLeft from "./assets/amrsocialp1.png";
import imageBottomRight from "./assets/cafesite.jpeg";
import ribbon from "./assets/charcoal.png";
import imageCenter from "./assets/lashedbytash.jpeg";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollShowcase from "./components/BrandStatement";
import Cta from "./components/Cta";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Portfolio from "./components/PortfolioSection";
import Services from "./components/ServiceSection";
import Testimonials from "./components/TestimonialSection";
import TextMarqueeClient from "./components/TextMarqueeClient";
import { pageMetadata } from "./lib/Seo";

const portfolioImages = [
  { src: imageLeft, alt: "Amr.socials website design" },
  { src: imageCenter, alt: "Lashed by Tash website design" },
  { src: imageRight, alt: "Amr.socials mobile website" },
  { src: imageBottomLeft, alt: "All in Good Hans website design" },
  { src: imageBottomRight, alt: "Cafe website design" },
];

export const metadata = pageMetadata({
  title: "Custom Websites for Ambitious Businesses | Hasnain Webstudio",
  absoluteTitle: true,
  description:
    "Strategy-led, custom-coded websites for ambitious business owners. No templates or builders, built to be found on Google and turn visitors into enquiries.",
  path: "/",
});

export default function Home() {
  return (
    <div className="smooth-wrapper">
      <div className="hidden md:block">
        <AnnouncementBar />
      </div>
      <Hero />
      <div className="md:block hidden ribbon">
        <Image
          className="h-[10vh] w-full object-cover"
          src={ribbon}
          alt="Hasnain Webstudio decorative ribbon"
          style={{ aspectRatio: "auto" }}
        />
      </div>
      {/* <ImagesMarquee /> */}
      <ScrollShowcase
        mode="both"
        heading={["Good work deserves", "a website that does", "it justice."]}
        description="You're ready to stand out, attract higher-paying clients, and have a website that feels as premium as the work you deliver."
        images={portfolioImages}
      />
      <Services />
      <Portfolio />
      <Testimonials />
      <ExperienceSection />
      <Cta />
      <TextMarqueeClient
        data={[
          "SCROLL-STOPPING AND HIGH CONVERTING WEBSITES ✦ Design with purpose. Strategy with heart.",
        ]}
        speed={20}
      />
      <Footer />
    </div>
  );
}
