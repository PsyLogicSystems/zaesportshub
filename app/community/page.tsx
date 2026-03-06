import type { Metadata } from "next";
import { MessageCircle, ExternalLink, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Community | ZA Esports Hub – South African Gaming Discord Servers",
  description: "Find South African gaming Discord servers. Connect with Marvel Rivals players and the broader SA esports community.",
};

const PLACEHOLDER_SERVERS = [
  { id: "1", name: "ZA Esports Hub Official", desc: "The main hub for SA competitive gaming.", members: 450, tags: ["Marvel Rivals", "General Gaming"] },
  { id: "2", name: "SA Marvel Rivals", desc: "Dedicated Marvel Rivals community for South African players.", members: 320, tags: ["Marvel Rivals"] },
  { id: "3", name: "Cape Town Gamers", desc: "Gaming community for the Western Cape region.", members: 890, tags: ["General Gaming", "LFG"] },
  { id: "4", name: "Gauteng Esports", desc: "Competitive gaming hub for Gauteng players.", members: 1200, tags: ["Esports", "Scrims", "LFG"] },
  { id: "5", name: "SA Ranked Grinders", desc: "For players pushing ranked in any competitive game.", members: 560, tags: ["Ranked", "Marvel Rivals", "Valorant"] },
  { id: "6", name: "African Esports Network", desc: "Pan-African esports community connecting players across the continent.", members: 2100, tags: ["Esports", "Tournaments"] },
];

export default function CommunityPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          SA Gaming <span className="text-gradient">Community</span>
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem" }}>
          Discover South African Discord servers and connect with players who share your passion.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {PLACEHOLDER_SERVERS.map((server) => (
          <div
            key={server.id}
            className="neu-card"
            style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#5865F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={22} style={{ color: "#fff" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.1rem" }}>
                  {server.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <Users size={12} />
                  {server.members.toLocaleString()} members
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{server.desc}</p>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {server.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "rgba(192,132,252,0.12)",
                    color: "var(--accent-lavender)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="btn-secondary touch-target"
              style={{ alignSelf: "flex-start", padding: "8px 20px", fontSize: "0.85rem", marginTop: "4px" }}
            >
              Join Server <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
