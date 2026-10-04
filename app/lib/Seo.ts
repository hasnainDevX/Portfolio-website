// app/lib/seo.ts
import type { Metadata } from "next";

const BRAND = "Hasnain Webstudio";

const OG_IMAGE = {
  url: "/og-image.jpeg",
  width: 1200,
  height: 630,
  alt: "Hasnain Webstudio - Custom Websites for Businesses",
};

type PageMetaInput = {
  /** Page title WITHOUT the brand. The layout template adds " | Hasnain Webstudio". */
  title: string;
  description: string;
  /** Route path, e.g. "/packages". Resolved against metadataBase (www). */
  path: string;
  /** Set true if `title` already contains the brand (used for the homepage). */
  absoluteTitle?: boolean;
};

/**
 * Next.js replaces (does not deep-merge) nested metadata objects, so a page
 * that sets openGraph must repeat the image, siteName etc. This helper does
 * that once so every page gets a correct canonical, og:url and share card.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: BRAND,
      images: [OG_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}