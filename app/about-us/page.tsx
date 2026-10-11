import showcaseBg from "../assets/charcoal.png";
import AboutHero from "../components/About/AboutHero";
import FAQ from "../components/About/FaqAboutMe";
import MyApproach from "../components/About/MyApproach";
import ScrollShowcase from "../components/BrandStatement";
import Footer from "../components/Footer";
import ImagesMarquee from "../components/ImagesMarquee";
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
      <AboutHero />
      <ScrollShowcase
        mode="text"
        backgroundImage={showcaseBg}
        backgroundOverlay={0.1}
        inset
        heading={[
          "You’ve put years into your craft.",
          "I believe your website should",
          "reflect that same care.",
        ]}
      />
      <FAQ />
      <MyApproach />
      {/* <ExperienceSection /> */}
      <WhyWorkWithMe />
      <ImagesMarquee />
      <Footer />
    </div>
  );
};

export default About;
