import logo from "../../assets/logo.jpeg";
import Image from "next/image";

const EnquiryAbout = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col bg-[#FFFCF9] py-24 md:py-32">
      <div className="max-w-2xl flex justify-center items-center flex-col">
        <Image src={logo} alt="Enquiry About" className="w-20 h-20" />
        <h1 className="text-center mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-playfair text-charcoal">
         Ready to have some fun & grow your business?
        </h1>
        <h3 className="text-center mt-4 md:text-lg ">
          We would be so excited to work on this project with you. Fill out the enquiry form below to get the ball rolling. I’ll get
          back to you via email or social within 48 hrs.
        </h3>
      </div>
    </div>
  );
};

export default EnquiryAbout;
