const announcementItems = [
  "Now Booking for September and October",
  "✦",              
  "Hasnain Webworks is rebranding to Hasnain Webstudio",
  "✦",
  "Now Booking for September and October",
  "✦",
  "Hasnain Webworks is rebranding to Hasnain Webstudio",
  "✦",
];

const loopedItems = [...announcementItems, ...announcementItems];

const AnnouncementBar = () => {
  return (
    <div>
      {/* ── Announcement bar ── */}
      <div className="w-full bg-charcoal overflow-hidden py-1">
        <div
          className="flex whitespace-nowrap"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "max-content",   // ← same fix as images: don't collapse
            animation: "announcebar 22s linear infinite",
          }}
        >
          {loopedItems.map((announcementText, i) => (
            <span
              key={i}
              className="text-white text-xs tracking-[0.25em] uppercase font-sans mx-6 shrink-0"
            >
              {announcementText}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes announcebar {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
