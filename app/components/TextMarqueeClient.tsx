"use client";
import dynamic from "next/dynamic";

// `ssr: false` is only allowed inside a client component,
// so it lives here instead of in the server page.
const TextMarqueeClient = dynamic(() => import("./TextMarquee"), {
  ssr: false,
});

export default TextMarqueeClient;