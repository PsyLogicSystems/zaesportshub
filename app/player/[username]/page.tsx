import { Trophy, Target, Swords, Calendar } from "lucide-react";
import Link from "next/link";

export default async function PlayerPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      {/* Profile header */}
      <div
        className="neu-card"
        style={{
          padding: "40px 32px",
          display: "flex",
          gap: "28px",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}
      >
        {/* Avatar placeholder */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "20px",
            background: "var(--bg-elevated)",
            boxShadow: "var(--neu-inset)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            fontFamily: "var(--font-heading), sans-serif",
            color: "var(--accent-teal)",
          }}
        >
          {decodeURIComponent(username).charAt(0).toUpperCase()}
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <h1 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "2rem", marginBottom: "4px" }}>
            {decodeURIComponent(username)}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
            Marvel Rivals Player — South Africa
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "4px 14px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "rgba(125,211,252,0.12)",
                color: "var(--accent-teal)",
              }}
            >
              Celestial
            </span>
            <span
              style={{
                padding: "4px 14px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "rgba(192,132,252,0.12)",
                color: "var(--accent-lavender)",
              }}
            >
              Season 3
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {[
          { icon: Trophy, label: "Peak Rank", value: "Celestial", color: "var(--accent-teal)" },
          { icon: Target, label: "Win Rate", value: "62%", color: "var(--accent-lavender)" },
          { icon: Swords, label: "Games Played", value: "485", color: "var(--accent-rose)" },
          { icon: Calendar, label: "Member Since", value: "Jan 2026", color: "var(--text-secondary)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="neu-card"
            style={{ padding: "24px 20px", textAlign: "center" }}
          >
            <stat.icon size={24} style={{ color: stat.color, marginBottom: "8px" }} />
            <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-heading), sans-serif", color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "20px" }}>
        Achievement <span className="text-gradient">Badges</span>
      </h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {["Peak: Celestial", "Season 3 Veteran", "Storm Specialist"].map((badge) => (
          <div
            key={badge}
            className="neu-card badge-shimmer"
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "14px",
            }}
          >
            <Trophy size={18} style={{ color: "var(--accent-teal)" }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
