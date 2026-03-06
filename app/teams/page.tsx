import type { Metadata } from "next";
import { Users, Plus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teams & Orgs | ZA Esports Hub – Marvel Rivals South Africa",
  description: "Find or create a South African esports team. Connect with orgs recruiting Marvel Rivals players.",
};

const PLACEHOLDER_TEAMS = [
  { id: "1", name: "Cape Storm Esports", members: 6, game: "Marvel Rivals", region: "Western Cape" },
  { id: "2", name: "Jozi Legends", members: 5, game: "Marvel Rivals", region: "Gauteng" },
  { id: "3", name: "Durban Vipers", members: 6, game: "Marvel Rivals", region: "KwaZulu-Natal" },
  { id: "4", name: "Highveld Heroes", members: 4, game: "Marvel Rivals", region: "Gauteng" },
  { id: "5", name: "Garden Route Gaming", members: 5, game: "Marvel Rivals", region: "Eastern Cape" },
  { id: "6", name: "Boland Brawlers", members: 6, game: "Marvel Rivals", region: "Western Cape" },
];

export default function TeamsPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Teams & <span className="text-gradient">Organisations</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto 24px", fontSize: "1.05rem" }}>
          Find your squad or build one from scratch. SA esports starts here.
        </p>
        <Link href="/signup" className="btn-primary" style={{ gap: "8px" }}>
          <Plus size={16} /> Register a Team
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {PLACEHOLDER_TEAMS.map((team) => (
          <div
            key={team.id}
            className="neu-card"
            style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "var(--bg-elevated)",
                  boxShadow: "var(--neu-inset)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={22} style={{ color: "var(--accent-teal)" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.15rem" }}>
                  {team.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{team.region}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: "rgba(125,211,252,0.12)",
                  color: "var(--accent-teal)",
                }}
              >
                {team.game}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: "rgba(192,132,252,0.12)",
                  color: "var(--accent-lavender)",
                }}
              >
                {team.members} members
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
