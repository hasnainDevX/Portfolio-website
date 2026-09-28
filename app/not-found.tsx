import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f0eb]">
      <p
        className="text-xs tracking-[0.4em] uppercase mb-6 text-[#aaa]"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Error 404
      </p>
      <h1
        className="text-6xl md:text-8xl font-light tracking-wide text-[#1a1a1a] mb-6"
      >
        Page Not Found
      </h1>
      <p className="text-[#6B6560] mb-10 text-sm tracking-wide">
        This page doesn't exist or has been moved.
      </p>
      <Link href="/">
        <button className="px-10 py-3 bg-soft-beige border border-charcoal rounded-xl hover:bg-charcoal hover:text-white text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;