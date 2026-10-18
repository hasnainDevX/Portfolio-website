import Image from "next/image";
import imageBottomLeft from "./assets/allingoodhans1.png";
import imageRight from "./assets/amrsocialm2.png";
import imageLeft from "./assets/amrsocialp1.png";
import imageBottomRight from "./assets/cafesite.jpeg";
import ribbon from "./assets/charcoal.png";
import imageCenter from "./assets/lashedbytash.jpeg";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollShowcase from "./components/BrandStatement";
import Cta from "./components/Cta";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Portfolio from "./components/PortfolioSection";
import Services from "./components/ServiceSection";
import Testimonials from "./components/TestimonialSection";
import TextMarqueeClient from "./components/TextMarqueeClient";
import { pageMetadata } from "./lib/Seo";
import WhyWorkWithMe from "./components/WhyWorkWithMe";
import ImagesMarquee from "./components/ImagesMarquee";
import MobileTestimonials from "./components/MobileTestimonials";

const testimonials = [
  {
  "quote": "I had a very specific vision for my website, and hasnain brought it together really beautifully! Everything feels so professional, thoughtfully designed, and true to what I wanted. What I appreciated most was how well he understood the little details that mattered to me. I’m genuinely so happy with how it turned out, and I’d absolutely recommend working with him!",
  "name": "Amr socials",
  "company": ""
},
  {
    quote:
      "Hasnain was amazing to work with. A website is something I’ve wanted to do for years but as a full time business owner, finding time to build a space that represented me and my brand was very challenging. The website hasnain created was everything I could have imagined and am so grateful to have this checked off my to-do list. Highly recommend hasainwebstudio for all your website needs!",
    name: "Natasha",
    company: "Lashed By Tash",
  },
  {
    quote:
      "I had a great experience working with hasnainWebstudio on my website (maceysmethod.co.uk) for my virtual assistant business. They were professional, creative, and really listened to my ideas. The final site is easy to navigate and perfectly represents my brand. I highly recommend them to anyone looking for a talented and reliable website designer!.",
    name: "Macey",
    company: "Macey's Method - Virtual Assistant",
  },
  {
    quote:
      "Hasnain has created a website for me that truly represents who I am. I can tell he put a lot of work into it and took on board any feedback I had throughout the process.",
    name: "Hannah",
    company: "All In Good Hans - Virtual Assistant",
  },
  {
    quote:
      "Hasnain did an incredible job on our website. We needed something clean, professional, and easy to navigate — and he delivered exactly that. His communication was clear throughout the process, and the final result represents our brand perfectly. Highly recommend him if you want a website that actually works for your business.",
    name: "Jason Malik",
    company: "Manager at Go Quality Networks",
  },
  {
    quote:
      "I had a vision for a sleek, modern website that could clearly explain our services and help us book clients — and Hasnain nailed it. He was responsive, detail-oriented, and honestly cared about getting it right. Our site looks great and functions perfectly. I’m so glad we chose his services.",
    name: "Jenn",
    company: "Founder of Noble Cleaning Solution",
  },
];

const portfolioImages = [
  { src: imageLeft, alt: "Amr.socials website design" },
  { src: imageCenter, alt: "Lashed by Tash website design" },
  { src: imageRight, alt: "Amr.socials mobile website" },
  { src: imageBottomLeft, alt: "All in Good Hans website design" },
  { src: imageBottomRight, alt: "Cafe website design" },
];

export const metadata = pageMetadata({
  title: "Custom Websites for Ambitious Businesses | Hasnain Webstudio",
  absoluteTitle: true,
  description:
    "Strategy-led, custom-coded websites for ambitious business owners. No templates or builders, built to be found on Google and turn visitors into enquiries.",
  path: "/",
});

export default function Home() {
  return (
    <div className="smooth-wrapper">
      <div className="hidden md:block">
        <AnnouncementBar />
      </div>
      <Hero />
      <div className="md:block hidden ribbon">
        <Image
          className="h-[10vh] w-full object-cover"
          src={ribbon}
          alt="Hasnain Webstudio decorative ribbon"
          style={{ aspectRatio: "auto" }}
        />
      </div>
      {/* <ImagesMarquee /> */}
      <ScrollShowcase
        mode="both"
        heading={[
          "We create premium, conversion-focused websites",
          "that attract the right clients",
          "and help your business grow.",
        ]}
        // description="Your website should reflect the quality of your work—and make it easy for the right clients to take the next step."
        images={portfolioImages}
      />
      <Services />
      <Portfolio />
      <div className="hidden md:block">
        <Testimonials />
      </div>
      <div className="block md:hidden">
        <MobileTestimonials
          testimonials={testimonials.map((testimonial) => ({
            id: `${testimonial.name}-${testimonial.company}`,
            quote: testimonial.quote,
            name: testimonial.name,
            role: testimonial.company,
          }))}
        />
      </div>
      <WhyWorkWithMe />
      <ExperienceSection />
      <Cta />
      <TextMarqueeClient
        data={[
          "SCROLL-STOPPING AND HIGH CONVERTING WEBSITES ✦ Design with purpose. Strategy with heart.",
        ]}
        speed={20}
      />
      <ImagesMarquee />
      <Footer />
    </div>
  );
}
