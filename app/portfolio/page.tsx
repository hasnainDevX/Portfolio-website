import Cta from "../components/Cta";
import Footer from "../components/Footer";
import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfoliosSection from "../components/portfolio/PortfoliosSection";
import TextMarqueeClient from "../components/TextMarqueeClient";
import { pageMetadata } from "../lib/Seo";

export const metadata = pageMetadata({
  title: "Website Design Portfolio: Selected Work",
  description:
    "A selection of bespoke, custom-coded websites built for businesses and brands. See the live sites.",
  path: "/portfolio",
});

const Portfolio = () => {
  return (
    <div className="bg-[#FFFCF9]">
      <PortfolioHero />
      <PortfoliosSection />
      <TextMarqueeClient
        data={[
          "SCROLL-STOPPING AND HIGH CONVERTING WEBSITES ✦ Design with purpose. Strategy with heart",
        ]}
        speed={20}
      />
      <Cta />
      <Footer />
    </div>
  );
};

export default Portfolio;