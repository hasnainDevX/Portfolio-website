"use client"
import { useState } from "react";
import  Link from "next/link";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = () => {
    if (!email || !firstName) return;
    setStatus("loading");
    emailjs
      .send(
        "service_oc2uvzh",
        "template_ckxo08e",
        { from_name: firstName, from_email: email },
        "LnufNtBlctM0A6DHN",
      )
      .then(() => { setStatus("success"); setEmail(""); setFirstName(""); })
      .catch(() => setStatus("error"));
  };

  return (
    <footer className="bg-gold text-white md:rounded-t-4xl">
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-6 uppercase tracking-widest text-white" style={{ fontFamily: "system-ui, sans-serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/packages", label: "Packages" },
                { to: "/portfolio", label: "Portfolios" },
                { to: "/enquiry", label: "Enquiry" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link href={to} className="text-white hover:text-white transition-colors duration-200 text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base font-semibold mb-6 uppercase tracking-widest text-white" style={{ fontFamily: "system-ui, sans-serif" }}>
              Social
            </h3>
            <ul className="flex gap-4">
              {/* Instagram */}
              <li>
                <a
                  href="https://instagram.com/hasnainWebstudio"
                  target="_blank"
                  aria-label="Follow Hasnain Webstudio on Instagram"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a2a2a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </li>

              {/* Facebook */}
              <li>
                <a
                  href="https://facebook.com/hasnainWebstudio"
                  target="_blank"
                  aria-label="Follow Hasnain Webstudio on Facebook"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a2a2a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/in/hasnainWebstudio"
                  target="_blank"
                  aria-label="Connect with Hasnain Webstudio on LinkedIn"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a2a2a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-6 uppercase tracking-widest text-white" style={{ fontFamily: "system-ui, sans-serif" }}>
              Newsletter
            </h3>
            <p className="text-xs leading-relaxed mb-5 text-white">
              Tips, resources and occasional updates and digital joy will be delivered to your inbox.
            </p>

            {status === "success" ? (
              <p className="text-xs text-white">You're in — talk soon.</p>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 text-xs"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 text-xs"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === "loading"}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white font-medium transition-all duration-300 text-xs uppercase tracking-wider disabled:opacity-50 hover:bg-soft-beige hover:text-[#2a2a2a]"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-white/70">Something went wrong. Please try again.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Large brand name */}
      <div className="w-full overflow-hidden px-2 pb-2">
        <p
          className="text-center font-normal leading-none select-none font-libre-caslon text-6xl md:text-7xl lg:text-[9.5rem] tracking-wider"
        >
          Hasnain Webstudio
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-base space-y-4 md:space-y-0 text-white/70">
            <p className="te">© {new Date().getFullYear()} Hasnain Webstudio</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;