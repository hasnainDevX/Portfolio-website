import type { Metadata } from "next";
import AboutHero from '../components/About/AboutHero'
import AboutMe from '../components/About/AboutMe'
import FAQ from '../components/About/FaqAboutMe'
import MyApproach from '../components/About/MyApproach'
import Cta from '../components/Cta'
import ExperienceSection from '../components/ExperienceSection'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: "About | Hasnain Webstudio",
  description: "Learn about Hasnain — a freelance web developer and software engineering student building custom websites for small businesses.",
};

const About = () => {
  return (
    <div>
        <AboutHero/>
        <AboutMe/>
        <FAQ/>
        <MyApproach/>
        <ExperienceSection/>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default About