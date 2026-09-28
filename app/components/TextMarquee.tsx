"use client";
import { useRef } from "react";

const TextMarquee = ({
  data,
  speed = 20,
  bgColor = "#2A2A2A",
  textColor = "#ffffff",
  hoverColor = "#b5973a",
  textSize = "1.875rem",
  height = "auto",
}: {
  data: string[];
  speed?: number;
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  textSize?: string;
  height?: string;
}) => {
  const marqueeId = useRef(`marquee-${Math.random().toString(36).slice(2, 7)}`).current;
  const loopedData = [...data, ...data];

  return (
    <div>
      <div
        className="overflow-hidden"
        suppressHydrationWarning
        style={{
          backgroundColor: bgColor,
          height,
        }}
      >
        <div
          id={marqueeId}
          style={{
            display: "inline-flex",
            flexWrap: "nowrap",
            width: "max-content", 
            alignItems: "center",
            fontSize: textSize,
            color: textColor,
            fontWeight: 900,
            textTransform: "uppercase",
            paddingTop: height === "auto" ? "1.5rem" : undefined,
            paddingBottom: height === "auto" ? "1.5rem" : undefined,
            height: height !== "auto" ? height : undefined,
          }}
        >
          {loopedData.map((text, idx) => (
            <span
              key={idx}
              className="transition-colors duration-300"
              style={{
                color: textColor,
                margin: "0 2rem",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = hoverColor)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = textColor)
              }
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ${marqueeId} {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        #${marqueeId} {
          animation: ${marqueeId} ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TextMarquee;