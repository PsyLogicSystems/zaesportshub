import type { Metadata } from "next";
import { GraduationCap, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Coaches Hub | ZA Esports Hub – Marvel Rivals South Africa",
  description: "Find a Marvel Rivals coach in South Africa or share your expertise with the community.",
};

const PLACEHOLDER_COACHES = [
  { id: "1", name: "CoachViper", specialty: "Duelist positioning & aim", team: "Cape Storm Esports", bio: "Former Top 100 player helping SA duelists reach their peak." },
  { id: "2", name: "StratMaster_ZA", specialty: "Team strategy & drafting", team: "Jozi Legends", bio: "Breaking down meta compositions and counter-strategies for competitive play." },
  { id: "3", name: "TankSensei", specialty: "Vanguard play & space control", team: null, bio: "Teaching frontline fundamentals to aspiring vanguard mains across SA." },
  { id: "4", name: "HealQueen", specialty: "Strategist positioning & cooldown management", team: "Durban Vipers", bio: "Dedicated to improving support play in the SA competitive scene." },
];

export default function CoachesPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Coaches <span className="text-gradient">Hub</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
          Learn from experienced SA players or share your knowledge with the community.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {PLACEHOLDER_COACHES.map((coach) => (
          <div
            key={coach.id}
            className="neu-card"
            style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--bg-elevated)",
                  boxShadow: "var(--neu-inset)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={24} style={{ color: "var(--accent-lavender)" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.15rem" }}>
                  {coach.name}
                </h3>
                {coach.team && (
                  <p style={{ fontSize: "0.8rem", color: "var(--accent-teal)" }}>{coach.team}</p>
                )}
              </div>
            </div>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "rgba(249,168,212,0.12)",
                color: "var(--accent-rose)",
                alignSelf: "flex-start",
              }}
            >
              {coach.specialty}
            </span>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{coach.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
