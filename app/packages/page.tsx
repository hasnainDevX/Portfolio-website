"use client";
import PackagesHero from '../components/PackagesHero'
import PackagesSection from '../components/PackagesSection'
import PackagesAbout from '../components/PackagesAbout'
import OurProcess from '../components/OurProcess'
import Cta from '../components/Cta'
import Footer from '../components/Footer'
import FAQSection from '../components/FAQ'
import dynamic from "next/dynamic";
import PackagesOffer from '../components/PackagesOffer';
const MarqueeShowcase = dynamic(() => import("../components/TextMarquee"), {
  ssr: false,
});

const Packages = () => {
  return (
    <div>
        <PackagesHero/>
        <PackagesAbout/>
        {/* <PackagesOffer/> */}
        <PackagesSection/>
        <FAQSection/>
        <MarqueeShowcase data={["DEVELOPMENT  MADE  SIMPLE / ✦ /  DESIGN  &  DEVELOPMENT"]} speed={20}/>
        <OurProcess/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default Packages