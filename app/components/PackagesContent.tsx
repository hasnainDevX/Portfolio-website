import type { StaticImageData } from "next/image";
import FoundationImage from "../assets/allingoodhans2.png";
import SignatureImage from "../assets/lashedbytash.jpeg";
import CompleteImage from "../assets/ecomsite1.jpeg";

export type Pkg = {
  id: string;
  name: string;
  image: StaticImageData;
  intro: string[];
  included: string[];
  suitedTo: string[];
  suitedClose: string;
  price: string;
  timeline: string;
  note?: string;
};

export const packages: Pkg[] = [
  {
    id: "foundation",
    name: "The Foundation Site",
    image: FoundationImage,
    intro: [
      "When you're starting out, your website is often where a potential client decides whether to trust you. The Foundation Site is a single, carefully built page that explains what you offer and makes it easy to get in touch, so enquiries start arriving in your inbox.",
      "It's custom coded from scratch and built to be found on Google from day one, with no template limits and no builder subscription.",
    ],
    included: [
      "A one-page website designed around your business, so you look credible from the start",
      "Search set up from day one, so your site is built to be found on Google",
      "A fast, smooth experience on phones, where most of your visitors arrive",
      "Enquiries sent straight to your inbox, with visitor stats that show where they come from",
      "Help with your wording, plus hosting setup and domain guidance",
      "Ten days of support after launch",
    ],
    suitedTo: [
      "Are starting out and don't have a website yet",
      "Want to be found by people searching for what they do",
      "Need a credible online presence now, without a long project",
      "Would rather own their website outright than rent one from a builder",
      "Want a first impression that matches the quality of their work",
    ],
    suitedClose:
      "If your work is strong and clients can't find you online yet, start here.",
    price: "$399-599",
    timeline: "Usually 1–2 weeks",
  },
  {
    id: "signature",
    name: "The Signature Site",
    image: SignatureImage,
    intro: [
      "For businesses that want their website to work as hard as they do. A stronger design, more pages to answer questions before clients have to ask, and tracking that shows which pages bring in enquiries.",
      "Search is built into every page from the start, and a wording session makes sure the words do as much as the design.",
    ],
    included: [
      "A multi-page custom website that explains your services and answers questions before clients ask",
      "Search built into every page, including the technical details Google looks for, on a site made to load fast",
      "Subtle motion and detail that make the site feel finished and trustworthy",
      "A one-to-one session to sharpen the wording across your pages",
      "Tracking that shows which pages lead to enquiries, plus sign-up forms to build your mailing list",
      "Twenty days of support and updates after launch",
    ],
    suitedTo: [
      "Have a growing or established business and want a full website from day one",
      "Are checked out online before anyone gets in touch",
      "Want to be found for what they do in their area or niche",
      "Offer several services that need room to be explained",
      "Want to know what is working on their website instead of guessing",
    ],
    suitedClose:
      "If people trust you once they've met you, this is the site that earns some of that trust earlier.",
    price: "$599-1199",
    timeline: "Usually 2–4 weeks",
    note: "2-month payment plans available",
  },
  {
    id: "complete",
    name: "The Complete Vision",
    image: CompleteImage,
    intro: [
      "For businesses that want to compete with the names already showing up at the top of search results. It brings together a basic brand foundation, a fully custom website, and search planning built around the businesses you're up against.",
      "It's designed to outlast trends: a consistent identity, a site that grows with the business, and ongoing maintenance and security updates so it keeps performing after launch.",
    ],
    included: [
      "Everything in The Signature Site",
      "Basic branding, so your website and everything around it share one consistent, established identity",
      "A review of who already appears for your key searches, with the site and its content planned to compete with them",
      "Custom features designed around how your business runs, with an online shop or content system if you need one",
      "A dashboard of your own for changing text and images, without waiting on a developer",
      "A site that works smoothly on every device, with app-like features on phones",
      "Ongoing maintenance and security updates, so it stays dependable and current",
      "Thirty days of priority support, with unlimited revisions",
    ],
    suitedTo: [
      "Are up against established competitors who already appear at the top of search results",
      "Want a brand and a website that look like one business",
      "Sell products or services online, or are about to",
      "Want to manage their own content without technical help",
      "See the website as a long-term asset built to outlast trends, not a one-off project",
    ],
    suitedClose:
      "If you're competing with established names and plan to be around for years, this is the build to plan around.",
    price: "$1,500+",
    timeline: "Usually 6–8 weeks",
    note: "3-month payment plans available",
  },
];