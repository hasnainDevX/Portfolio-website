import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Preloader from "./components/PreLoader";
import JsonLd from "./components/JsonLd";
import { siteSchema } from "./components/Schema";
import { editorsNote, sourceSans } from "./fonts/font";

export const metadata: Metadata = {
  // www is the version the site really serves (the apex redirects to it),
  // so every relative URL below resolves to www.
  metadataBase: new URL("https://www.hasnainwebstudio.com"),

  title: {
    default: "Custom Websites for Ambitious Businesses | Hasnain Webstudio",
    template: "%s | Hasnain Webstudio",
  },

  description:
    "Strategy-led, custom-coded websites for ambitious business owners. No templates or builders, built to be found on Google and turn visitors into enquiries.",

  // IMPORTANT: no `alternates.canonical` and no `openGraph.url` here.
  // Anything set in the root layout is inherited by every page that does not
  // override it, which is what made every page canonical to the homepage.
  // Each page sets its own through pageMetadata() in app/lib/seo.ts.

  // Shared fallbacks only (pages replace these via pageMetadata()).
  openGraph: {
    siteName: "Hasnain Webstudio",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Hasnain Webstudio - Custom Websites for Businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorsNote.variable} ${sourceSans.variable}`}
    >
      <body>
        {/* Site-wide structured data (Organization, WebSite, Person) */}
        <JsonLd data={siteSchema} />

        <Preloader />
        {/* <SmoothScroll /> */}
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-771FQE1ZQQ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-771FQE1ZQQ');
          `}
        </Script>
      </body>
    </html>
  );
}