import Image from "next/image";
import Hero from "./components/Hero";
import ribbon from "./assets/image.png";
import Portfolio from "./components/PortfolioSection";
import Services from "./components/ServiceSection";
import Testimonials from "./components/TestimonialSection";
import ExperienceSection from "./components/ExperienceSection";
import ImagesMarquee from "./components/ImagesMarquee";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import Cta from "./components/Cta";
import TextMarqueeClient from "./components/TextMarqueeClient";
import { pageMetadata } from "./lib/Seo";

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
      <ImagesMarquee />
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