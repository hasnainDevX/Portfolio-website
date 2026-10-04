import AboutHero from "../components/About/AboutHero";
import AboutMe from "../components/About/AboutMe";
import FAQ from "../components/About/FaqAboutMe";
import MyApproach from "../components/About/MyApproach";
import Cta from "../components/Cta";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
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
      <AboutHero />
      <AboutMe />
      <FAQ />
      <MyApproach />
      <ExperienceSection />
      <Cta />
      <Footer />
    </div>
  );
};

export default About;