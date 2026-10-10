import AboutHero from "../components/About/AboutHero";
import AboutMe from "../components/About/AboutMe";
import FAQ from "../components/About/FaqAboutMe";
import MyApproach from "../components/About/MyApproach";
import Cta from "../components/Cta";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import ImagesMarquee from "../components/ImagesMarquee";
import { pageMetadata } from "../lib/Seo";
import ScrollShowcase from "../components/BrandStatement";

export const metadata = pageMetadata({
  title: "About Hasnain, Web Designer & Developer",
  description:
    "Meet Hasnain, the designer-developer behind Hasnain Webstudio. Strategy-led, custom-coded websites for ambitious brands in the UK, Canada, US and beyond.",
  path: "/about-us",
});

const About = () => {
  return (
    <div>
      <AboutHero />
      <ScrollShowcase
        mode="text"
        heading={[
          "You’ve put years into your craft.",
          "I believe your website should",
          "reflect that same care.",
        ]}
      />
      <FAQ />
      <MyApproach />
      <ExperienceSection />
      <Cta />
      <ImagesMarquee />
      <Footer />
    </div>
  );
};

export default About;
