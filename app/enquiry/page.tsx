import EnquiryAbout from "../components/Enquiry/EnquiryAbout";
import EnquiryForm from "../components/Enquiry/EnquiryForm";
import EnquiryHero from "../components/Enquiry/EnquiryHero";
import Navbar from "../components/Navbar";
import FAQSection from "../components/FAQ";
import Footer from "../components/Footer";
import { pageMetadata } from "../lib/Seo";

export const metadata = pageMetadata({
  title: "Start Your Website Project",
  description:
    "Tell me about your business and where you want it to go. Share a few details and I'll reply within 48 hours with the right next step.",
  path: "/enquiry",
});

const Enquiry = () => {
  return (
    <div className="relative isolate bg-[#FFFCF9]">
      <Navbar />

      {/* Hero stays behind */}
      <div className="sticky top-0 z-0">
        <EnquiryHero />
      </div>

      {/* Content wraps over the hero */}
      <div className="relative z-10 bg-white border-t border-charcoal pt-8 md:pt-12">
        <div className="overflow-hidden rounded-t-[inherit]">
          <EnquiryAbout />
          <EnquiryForm />
        </div>

        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Enquiry;