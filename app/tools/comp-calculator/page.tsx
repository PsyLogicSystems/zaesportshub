"use client";

import { useState } from "react";
import { Shield, Swords, Heart, Plus, X, Zap } from "lucide-react";

const HEROES = {
  Vanguard: ["Groot", "Magneto", "Hulk", "Thor", "Captain America", "Doctor Strange", "Venom", "Peni Parker"],
  Duelist: ["Spider-Man", "Iron Man", "Black Panther", "Star-Lord", "Storm", "Scarlet Witch", "Hela", "Namor", "Hawkeye", "Psylocke", "Moon Knight", "Winter Soldier", "Squirrel Girl"],
  Strategist: ["Mantis", "Luna Snow", "Rocket Raccoon", "Loki", "Adam Warlock", "Jeff the Land Shark", "Cloak & Dagger", "Invisible Woman"],
};

const ROLE_STYLES = {
  Vanguard: { icon: Shield, color: "var(--accent-teal)", bg: "rgba(125,211,252,0.12)" },
  Duelist: { icon: Swords, color: "var(--accent-rose)", bg: "rgba(249,168,212,0.12)" },
  Strategist: { icon: Heart, color: "var(--accent-lavender)", bg: "rgba(192,132,252,0.12)" },
};

export default function CompCalculatorPage() {
  const [team, setTeam] = useState<string[]>([]);

  function addHero(name: string) {
    if (team.length >= 6 || team.includes(name)) return;
    setTeam([...team, name]);
  }

  function removeHero(name: string) {
    setTeam(team.filter((h) => h !== name));
  }

  function getHeroRole(name: string): string {
    for (const [role, heroes] of Object.entries(HEROES)) {
      if (heroes.includes(name)) return role;
    }
    return "Duelist";
  }

  const roleCounts = {
    Vanguard: team.filter((h) => getHeroRole(h) === "Vanguard").length,
    Duelist: team.filter((h) => getHeroRole(h) === "Duelist").length,
    Strategist: team.filter((h) => getHeroRole(h) === "Strategist").length,
  };

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Team Comp <span className="text-gradient">Calculator</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
          Build a 6-player team composition. Find synergies and balance your roles.
        </p>
      </div>

      {/* Team slots */}
      <div className="neu-card" style={{ padding: "28px", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-heading), sans-serif" }}>Your Team ({team.length}/6)</h3>
          {team.length > 0 && (
            <button onClick={() => setTeam([])} className="btn-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem" }}>
              Clear
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const hero = team[i];
            const role = hero ? getHeroRole(hero) : null;
            const style = role ? ROLE_STYLES[role as keyof typeof ROLE_STYLES] : null;

            return (
              <div
                key={i}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "16px",
                  background: hero ? style?.bg : "var(--bg-elevated)",
                  boxShadow: hero ? "var(--neu-raised)" : "var(--neu-inset)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  position: "relative",
                  transition: "var(--transition-smooth)",
                }}
              >
                {hero ? (
                  <>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: style?.color }}>{hero}</span>
                    <button
                      onClick={() => removeHero(hero)}
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <Plus size={20} style={{ color: "var(--text-muted)" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Role breakdown */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {Object.entries(roleCounts).map(([role, count]) => {
            const s = ROLE_STYLES[role as keyof typeof ROLE_STYLES];
            const Icon = s.icon;
            return (
              <div key={role} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
                <Icon size={16} style={{ color: s.color }} />
                <span style={{ color: "var(--text-secondary)" }}>{role}:</span>
                <span style={{ fontWeight: 700, color: s.color }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero selector */}
      {(Object.entries(HEROES) as [string, string[]][]).map(([role, heroes]) => {
        const s = ROLE_STYLES[role as keyof typeof ROLE_STYLES];
        const Icon = s.icon;
        return (
          <div key={role} style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Icon size={18} style={{ color: s.color }} />
              <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.1rem" }}>{role}</h3>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {heroes.map((hero) => {
                const selected = team.includes(hero);
                return (
                  <button
                    key={hero}
                    onClick={() => (selected ? removeHero(hero) : addHero(hero))}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "12px",
                      border: selected ? `2px solid ${s.color}` : "1px solid var(--border-subtle)",
                      background: selected ? s.bg : "var(--bg-card)",
                      boxShadow: selected ? `0 0 12px ${s.bg}` : "var(--neu-raised)",
                      color: selected ? s.color : "var(--text-secondary)",
                      cursor: team.length >= 6 && !selected ? "not-allowed" : "pointer",
                      opacity: team.length >= 6 && !selected ? 0.4 : 1,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      transition: "var(--transition-smooth)",
                      fontFamily: "var(--font-body), sans-serif",
                    }}
                  >
                    {hero}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
