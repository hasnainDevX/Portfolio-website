import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";

export const editorsNote = localFont({
  src: [
    {
      path: "./editorsnote/editors-note-extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./editorsnote/editors-note-extralight-italic.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-editors-note",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});