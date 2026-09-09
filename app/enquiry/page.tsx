import type { Metadata } from "next";
import EnquiryAbout from "../components/Enquiry/EnquiryAbout"
import EnquiryForm from "../components/Enquiry/EnquiryForm"
import EnquiryHero from "../components/Enquiry/EnquiryHero"
import FAQSection from "../components/FAQ"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "Enquiry | Hasnain Webstudio",
  description: "Ready to start your project? Get in touch with Hasnain Webstudio to discuss your website needs and get a custom quote.",
};

const Enquiry = () => {
  return (
    <div className="bg-[#FFFCF9]">
        <EnquiryHero />
        <EnquiryAbout />
        <EnquiryForm />
        <FAQSection/>
        <Footer/>
    </div>
  )
}

export default Enquiry