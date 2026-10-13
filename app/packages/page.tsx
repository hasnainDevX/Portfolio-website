import Cta from "../components/Cta";
import FAQSection from "../components/FAQ";
import Footer from "../components/Footer";
import ImagesMarquee from "../components/ImagesMarquee";
import JsonLd from "../components/JsonLd";
import OurProcess from "../components/OurProcess";
import PackagesAbout from "../components/packages/PackagesAbout";
import PackagesHero from "../components/packages/PackagesHero";
import PackagesSection from "../components/PackagesSection";
import { packagesSchema } from "../components/Schema";
import { pageMetadata } from "../lib/Seo";

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
      <OurProcess />
      <Cta />
      <ImagesMarquee/>
      <Footer />
    </div>
  );
};

export default Packages;