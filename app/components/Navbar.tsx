"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const leftNavItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about-us" },
    { name: "PORTFOLIO", path: "/portfolio" },
  ];
  const rightNavItems = [{ name: "PACKAGES", path: "/packages" }];

  const linkCls = (path: string) =>
    `text-sm font-normal tracking-widest transition-all duration-200 whitespace-nowrap ${
      pathname === path  
        ? "text-[#b5973a] cursor-not-allowed pointer-events-none"
        : "text-[#2a2a2a] hover:text-[#b5973a]"
    }`;

  return (
    <>
      {/* ── Desktop ── */}
      <nav
        className="hidden lg:grid fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md px-8 py-3.5 rounded-full grid-cols-[1fr_auto_1fr] gap-8 items-center bg-cream-bg/80"
        style={{
          // backgroundColor: "#f5f2eb",
          border: "1px solid #e0d6c8",
          boxShadow: "0 4px 24px rgba(181,151,58,0.08)",
        }}
      >
        {/* Left */}
        <div className="flex gap-8 justify-end items-center mr-4">
          {leftNavItems.map((item, idx) => (
            <Link key={idx} href={item.path} className={linkCls(item.path)}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Centre logo */}
        <Link
          href="/"
          className="text-xl tracking-wide text-center whitespace-nowrap px-6 transition-opacity hover:opacity-70"
          style={{ fontFamily: '"Libre Caslon Text", serif', color: "#2a2a2a" }}
          aria-label="Hasnain Webstudio Logo"
        >
          Hasnain Webstudio
        </Link>

        {/* Right */}
        <div className="flex gap-8 items-center">
          {rightNavItems.map((item, idx) => (
            <Link key={idx} href={item.path} className={linkCls(item.path)}>
              {item.name}
            </Link>
          ))}

          {/* Enquiry CTA — gold accent */}
          <Link href="/enquiry" aria-label="Go to enquiry form">
            <button
              className="px-7 py-2.5 rounded-full text-sm tracking-widest uppercase font-normal transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: "#b5973a",
                color: "#fff",
                border: "1px solid #b5973a",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#2a2a2a";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#2a2a2a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#b5973a";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#b5973a";
              }}
            >
              Enquiry
            </button>
          </Link>

          {/* Instagram */}
          <a
            href="https://instagram.com/hasnainWebstudio"
            aria-label="Follow Hasnain Webstudio on Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
            style={{ backgroundColor: "#e8dfd5", color: "#2a2a2a" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#b5973a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#e8dfd5")
            }
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── Mobile ── */}
      <nav
        className="lg:hidden fixed top-4 left-4 right-4 z-50 px-5 py-4 rounded-2xl bg-cream-bg/90"
        style={{
          // backgroundColor: "#f5f2eb",
          border: "1px solid #e0d6c8",
          boxShadow: "0 4px 20px rgba(181,151,58,0.08)",
        }}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-base tracking-wide hover:opacity-70 transition"
            style={{
              fontFamily: '"Libre Caslon Text", serif',
              color: "#2a2a2a",
            }}
          >
            Hasnain Webstudio
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-70"
            aria-label="Toggle menu"
          >
            <span
              className="w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#2a2a2a",
                transform: isOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#2a2a2a",
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#2a2a2a",
                transform: isOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Dropdown */}
        <div
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{ maxHeight: isOpen ? "360px" : "0px" }}
        >
          <div
            className="mt-4 pt-4 flex flex-col gap-5"
            style={{ borderTop: "1px solid #e0d6c8" }}
          >
            {[...leftNavItems, ...rightNavItems].map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={linkCls(item.path)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/enquiry"
              onClick={() => setIsOpen(false)}
              aria-label="Go to enquiry form"
              className="mt-2"
            >
              <button
                className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-normal transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "#b5973a",
                  color: "#fff",
                  border: "1px solid #b5973a",
                }}
              >
                Enquiry Form
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
