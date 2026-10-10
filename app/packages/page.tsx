import PackagesHero from "../components/PackagesHero";
import PackagesSection from "../components/PackagesSection";
import PackagesAbout from "../components/PackagesAbout";
import OurProcess from "../components/OurProcess";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";
import PackagesOffer from "../components/PackagesOffer";
import TextMarqueeClient from "../components/TextMarqueeClient";
import JsonLd from "../components/JsonLd";
import { packagesSchema } from "../components/Schema";
import { pageMetadata } from "../lib/Seo";
import ImagesMarquee from "../components/ImagesMarquee";

export const metadata = pageMetadata({
  title: "Custom Website Packages & Pricing",
  description:
    "Three ways to work together: The Foundation Site, The Signature Site and The Complete Vision. Custom-coded, strategy-led and built to be found on Google.",
  path: "/packages",
});

const Packages = () => {
  return (
    <div>
      <JsonLd data={packagesSchema} />
      <PackagesHero />
      <PackagesAbout />
      {/* <PackagesOffer/> */}
      <PackagesSection />
      <FAQSection />
      <TextMarqueeClient
        data={[
          "SCROLL-STOPPING AND HIGH CONVERTING WEBSITES ✦ Design with purpose. Strategy with heart",
        ]}
        speed={20}
      />
      <OurProcess />
      <Cta />
      <ImagesMarquee/>
      <Footer />
    </div>
  );
};

export default Packages;