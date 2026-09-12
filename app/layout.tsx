import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hasnainwebstudio.com"),

  title: {
    default: "Hasnain Webstudio | Custom Websites for Businesses",
    template: "%s | Hasnain Webstudio",
  },

  description:
    "Custom-coded websites for service-based businesses. Fast, professional, and built to convert visitors into customers.",

  alternates: {
    canonical: "https://hasnainwebstudio.com",
  },

  openGraph: {
    title: "Hasnain Webstudio | Custom Websites for Businesses",
    description:
      "Custom-coded websites for service-based businesses. Fast, professional, and built to convert visitors into customers.",
    url: "https://hasnainwebstudio.com",
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
    <html lang="en">
      <body>
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