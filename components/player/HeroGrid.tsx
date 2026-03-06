"use client";

import { useState } from "react";
import { Search, Shield, Swords, Heart } from "lucide-react";

const ROLE_ICONS = {
  Vanguard: Shield,
  Duelist: Swords,
  Strategist: Heart,
};

// Placeholder heroes until API is connected
const PLACEHOLDER_HEROES = [
  { id: "1", name: "Spider-Man", role: "Duelist" },
  { id: "2", name: "Iron Man", role: "Duelist" },
  { id: "3", name: "Groot", role: "Vanguard" },
  { id: "4", name: "Mantis", role: "Strategist" },
  { id: "5", name: "Black Panther", role: "Duelist" },
  { id: "6", name: "Magneto", role: "Vanguard" },
  { id: "7", name: "Luna Snow", role: "Strategist" },
  { id: "8", name: "Star-Lord", role: "Duelist" },
  { id: "9", name: "Hulk", role: "Vanguard" },
  { id: "10", name: "Rocket Raccoon", role: "Strategist" },
  { id: "11", name: "Storm", role: "Duelist" },
  { id: "12", name: "Thor", role: "Vanguard" },
  { id: "13", name: "Loki", role: "Strategist" },
  { id: "14", name: "Scarlet Witch", role: "Duelist" },
  { id: "15", name: "Captain America", role: "Vanguard" },
  { id: "16", name: "Hela", role: "Duelist" },
  { id: "17", name: "Adam Warlock", role: "Strategist" },
  { id: "18", name: "Namor", role: "Duelist" },
];

export function HeroGrid() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filtered = PLACEHOLDER_HEROES.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || h.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      {/* Search + filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "32px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1", maxWidth: "400px", minWidth: "200px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search heroes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-inset"
            style={{ paddingLeft: "40px" }}
          />
        </div>
        {["All", "Vanguard", "Duelist", "Strategist"].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={roleFilter === role ? "btn-primary" : "btn-secondary"}
            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Hero grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((hero) => {
          const RoleIcon = ROLE_ICONS[hero.role as keyof typeof ROLE_ICONS] || Shield;
          return (
            <div
              key={hero.id}
              className="neu-card"
              style={{
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
              }}
            >
              {/* Placeholder avatar */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "var(--bg-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--neu-inset)",
                }}
              >
                <RoleIcon size={32} style={{ color: "var(--accent-teal)" }} />
              </div>
              <h4 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.1rem" }}>
                {hero.name}
              </h4>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent-lavender)",
                  fontWeight: 600,
                }}
              >
                {hero.role}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
