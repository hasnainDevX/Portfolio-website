import EnquiryAbout from "../components/Enquiry/EnquiryAbout";
import EnquiryForm from "../components/Enquiry/EnquiryForm";
import EnquiryHero from "../components/Enquiry/EnquiryHero";
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
    <div className="bg-[#FFFCF9]">
      <EnquiryHero />
      <EnquiryAbout />
      <EnquiryForm />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Enquiry;