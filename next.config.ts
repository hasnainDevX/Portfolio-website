import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The footer links to /about, which 404s. Redirect it (and fix the footer link too).
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      // Stop the old vercel.app address from being a duplicate copy of the site.
      // Check Vercel > Project > Domains for every *.vercel.app alias and add each one.
      {
        source: "/:path*",
        has: [{ type: "host", value: "hasnainwebstudio.vercel.app" }],
        destination: "https://www.hasnainwebstudio.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;