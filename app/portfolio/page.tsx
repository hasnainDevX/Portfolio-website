// import MarqueeShowcase from '../components/TextMarquee'
"use client";
import Cta from '../components/Cta'
import Footer from '../components/Footer'
import PortfolioHero from '../components/portfolio/PortfolioHero'
import PortfoliosSection from '../components/portfolio/PortfoliosSection'
import dynamic from "next/dynamic";
const MarqueeShowcase = dynamic(() => import("../components/TextMarquee"), {
  ssr: false,
});

const Portfolio = () => {
  return (
    <div className='bg-[#FFFCF9]'>
        <PortfolioHero/>
        <PortfoliosSection/>
        <MarqueeShowcase data={["SCROLL-STOPPING AND HIGH CONVERTING WEBSITES ✦ Design with purpose. Strategy with heart"]} speed={20}/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default Portfolio