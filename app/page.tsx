"use client";
import Hero from "./components/Hero";
import ribbon from "./assets/image.png";
import Portfolio from "./components/PortfolioSection";
import Services from "./components/ServiceSection";
import Testimonials from "./components/TestimonialSection";
import ExperienceSection from "./components/ExperienceSection";
import ImagesMarquee from "./components/ImagesMarquee";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";
const MarqueeShowcase = dynamic(() => import("./components/TextMarquee"), {
  ssr: false,
});
import AnnouncementBar from "./components/AnnouncementBar";
import Image from "next/image";
import Cta from "./components/Cta";

const Home = () => {
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
          alt="Hasnain Webworks decorative ribbon"
          style={{ aspectRatio: "auto" }}
        />
      </div>
      <ImagesMarquee />
      <Services />
      <Portfolio />
      <Testimonials />
      <ExperienceSection />
      <Cta/>
      <MarqueeShowcase
        data={["DEVELOPMENT MADE SIMPLE ✦ DESIGN & DEVELOPMENT"]}
        speed={20}
      />
      <Footer />
    </div>
  );
};

export default Home;
