// app/components/schema.ts

const SITE_URL = "https://www.hasnainwebstudio.com";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

/**
 * Site-wide schema. Render once in app/layout.tsx.
 * Tells Google who "Hasnain Webstudio" is, which domain belongs to it,
 * and which profiles are the same entity.
 */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Hasnain Webstudio",
      // Connects the old brand name to the new one
      alternateName: ["Hasnain Webworks", "Hasnain Web Works"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        // Add a square logo (512x512 or larger) at public/logo.png
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/og-image.jpeg`,
      description:
        "Custom-coded, strategy-led websites for ambitious businesses. Fast, search-ready and built to convert visitors into customers.",
      founder: { "@id": FOUNDER_ID },
      areaServed: "Worldwide",
      knowsAbout: [
        "Web design",
        "Web development",
        "Brand strategy",
        "Search engine optimization",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE_URL}/enquiry`,
        availableLanguage: "English",
      },
      // Only list profiles that really exist and are yours.
      // Add Facebook / LinkedIn here once you've confirmed the exact URLs.
      sameAs: ["https://www.instagram.com/hasnainwebstudio/"],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      // Google uses name + alternateName for the site name shown in results
      name: "Hasnain Webstudio",
      alternateName: ["Hasnain Webworks"],
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Hasnain",
      jobTitle: "Web Designer & Developer",
      url: `${SITE_URL}/about-us`,
      worksFor: { "@id": ORG_ID },
    },
  ],
};

type Pkg = {
  name: string;
  description: string;
  minPrice: number;
  maxPrice?: number;
};

// Keep these in sync with the prices shown on /packages
const packages: Pkg[] = [
  {
    name: "The Foundation Site",
    description:
      "A one-page custom-coded website with search set up from day one, mobile-first design and enquiries sent straight to your inbox. Usually 1-2 weeks.",
    minPrice: 399,
    maxPrice: 599,
  },
  {
    name: "The Signature Site",
    description:
      "A multi-page custom website with search built into every page, a one-to-one wording session and tracking that shows which pages bring enquiries. Usually 2-4 weeks.",
    minPrice: 599,
    maxPrice: 1199,
  },
  {
    name: "The Complete Vision",
    description:
      "Basic branding, a fully custom website, search planning against your competitors and ongoing maintenance and security updates. Usually 6-8 weeks.",
    minPrice: 1500,
  },
];

/**
 * Packages page schema. Render once in app/packages/page.tsx.
 */
export const packagesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/packages#service`,
  name: "Custom website design and development",
  serviceType: "Web design and development",
  url: `${SITE_URL}/packages`,
  provider: { "@id": ORG_ID },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website packages",
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.description,
      url: `${SITE_URL}/packages`,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: p.minPrice,
        ...(p.maxPrice ? { maxPrice: p.maxPrice } : {}),
      },
      itemOffered: {
        "@type": "Service",
        name: p.name,
        description: p.description,
      },
    })),
  },
};