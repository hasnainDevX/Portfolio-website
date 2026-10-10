"use client";
import image1 from "../assets/amrsocialp1.png";
import image5 from "../assets/maceysmethod2.png";
import image2 from "../assets/telecomsite2.png";
import image3 from "../assets/fruitysite1.jpeg";
import image7 from "../assets/amrsocialm2.png";
import image4 from "../assets/lashedbytash.jpeg";
import image6 from "../assets/vasite4.jpeg";
import Image from "next/image";

const marqueeImages = [
  { src: image1, alt: "AMR Social" },
  { src: image2, alt: "Telecom Site" },
  { src: image3, alt: "MetaSite" },
  { src: image4, alt: "Lashed By Tash" },
  { src: image5, alt: "Restaurant Site 1" },
  { src: image6, alt: "Restaurant Site 2" },
  { src: image7, alt: "Fruity Site 1" },
];

// Duplicate for seamless loop: scroll -50% lands exactly where it started
const loopedImages = [...marqueeImages, ...marqueeImages];

const ImagesMarquee = () => {
  return (
    <div className="overflow-hidden py-16" suppressHydrationWarning>
      <div
        id="images-marquee"
        style={{
          display: "flex",
          flexWrap: "nowrap", // keep all images in one row
          width: "max-content", // ← key fix: don't collapse the row
          animation: "marquee 48s linear infinite",
          willChange: "transform",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running")
        }
      >
        {loopedImages.map((image, idx) => (
          <div
            key={idx}
            style={{
              flexShrink: 0,
              margin: "0 24px",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => {
              // modulo keeps alternating tilt regardless of which copy you're hovering
              (e.currentTarget as HTMLDivElement).style.transform =
                idx % 2 === 0
                  ? "rotate(3deg) scale(1.03)"
                  : "rotate(-3deg) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "rotate(0deg) scale(1)";
            }}
          >
            <Image
              className="object-cover"
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              style={{
                height: "300px",
                width: "300px",
                borderRadius: "12px",
              }}
              loading="eager"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* On mobile, speed it up */
        @media (max-width: 768px) {
          .overflow-hidden > div {
            animation-duration: 20s !important;
          }
          .marquee-image{
            height: 200px !important; /* h-32 */
            width: 200px !important;  /* w-48 */
          }
        }
      `}</style>
    </div>
  );
};

export default ImagesMarquee;
