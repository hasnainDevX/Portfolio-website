import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hasnain Webstudio",
  description: "Custom-coded websites for service-based businesses. Fast, professional, and built to convert visitors into customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}