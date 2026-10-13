import showcaseBg from "../assets/waves.png";
import AboutHero from "../components/About/AboutHero";
import FAQ from "../components/About/FaqAboutMe";
import AnnouncementBar from "../components/AnnouncementBar";
import ScrollShowcase from "../components/BrandStatement";
import Footer from "../components/Footer";
import ImagesMarquee from "../components/ImagesMarquee";
import OurProcess from "../components/OurProcess";
import TestimonialsSection from "../components/TestimonialSection";
import WhyWorkWithMe from "../components/WhyWorkWithMe";
import { pageMetadata } from "../lib/Seo";

export const metadata = pageMetadata({
  title: "About Hasnain, Web Designer & Developer",
  description:
    "Meet Hasnain, the designer-developer behind Hasnain Webstudio. Strategy-led, custom-coded websites for ambitious brands in the UK, Canada, US and beyond.",
  path: "/about-us",
});

const About = () => {
  return (
    <div>
      <AnnouncementBar/>
      <AboutHero />
      <ScrollShowcase
        mode="text"
        backgroundImage={showcaseBg}
        backgroundOverlay={0.5}
        inset
        heading={[
          "You’ve put years into your craft.",
          "I believe your website should",
          "reflect that same care.",
        ]}
      />

      <FAQ />
      <WhyWorkWithMe />
      <TestimonialsSection/>
      <OurProcess/>
      <ImagesMarquee />
      <Footer />
    </div>
  );
};

export default About;
