"use client";

import { useState } from "react";
import { Trophy, Medal, Award, ChevronUp, ChevronDown } from "lucide-react";

const PLACEHOLDER_PLAYERS = [
  { rank: 1, username: "StormBreaker_ZA", rating: 4850, peakRank: "One Above All", wins: 342, losses: 128, hero: "Storm" },
  { rank: 2, username: "VenomSA", rating: 4720, peakRank: "One Above All", wins: 310, losses: 140, hero: "Spider-Man" },
  { rank: 3, username: "WakandaForever", rating: 4680, peakRank: "Celestial", wins: 298, losses: 135, hero: "Black Panther" },
  { rank: 4, username: "CapeTownThunder", rating: 4590, peakRank: "Celestial", wins: 285, losses: 150, hero: "Thor" },
  { rank: 5, username: "JoziGamer", rating: 4510, peakRank: "Celestial", wins: 270, losses: 148, hero: "Iron Man" },
  { rank: 6, username: "DurbanDuelist", rating: 4480, peakRank: "Eternity", wins: 260, losses: 155, hero: "Hela" },
  { rank: 7, username: "PretoriaProdigy", rating: 4400, peakRank: "Eternity", wins: 250, losses: 160, hero: "Scarlet Witch" },
  { rank: 8, username: "StellenGaming", rating: 4350, peakRank: "Eternity", wins: 242, losses: 158, hero: "Magneto" },
  { rank: 9, username: "BloemBrawler", rating: 4280, peakRank: "Eternity", wins: 235, losses: 170, hero: "Hulk" },
  { rank: 10, username: "EasternCapeElite", rating: 4200, peakRank: "Diamond", wins: 220, losses: 175, hero: "Star-Lord" },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy size={20} style={{ color: "#FFD700" }} />;
  if (rank === 2) return <Medal size={20} style={{ color: "#C0C0C0" }} />;
  if (rank === 3) return <Award size={20} style={{ color: "#CD7F32" }} />;
  return <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{rank}</span>;
}

export function LeaderboardTable() {
  return (
    <div className="neu-card" style={{ padding: "0", overflow: "hidden" }}>
      {/* Header note */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Placeholder data — will be populated from the Marvel Rivals API
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <th style={{ padding: "14px 24px", textAlign: "left" }}>Rank</th>
              <th style={{ padding: "14px 16px", textAlign: "left" }}>Player</th>
              <th style={{ padding: "14px 16px", textAlign: "left" }}>Rating</th>
              <th style={{ padding: "14px 16px", textAlign: "left" }}>Peak</th>
              <th style={{ padding: "14px 16px", textAlign: "left" }}>Main</th>
              <th style={{ padding: "14px 16px", textAlign: "right" }}>W/L</th>
            </tr>
          </thead>
          <tbody>
            {PLACEHOLDER_PLAYERS.map((p) => (
              <tr
                key={p.rank}
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  transition: "background 0.15s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "16px 24px", width: "60px" }}>
                  <RankIcon rank={p.rank} />
                </td>
                <td style={{ padding: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {p.username}
                </td>
                <td style={{ padding: "16px" }}>
                  <span className="text-gradient" style={{ fontWeight: 700 }}>{p.rating}</span>
                </td>
                <td style={{ padding: "16px", fontSize: "0.875rem", color: "var(--accent-lavender)" }}>
                  {p.peakRank}
                </td>
                <td style={{ padding: "16px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {p.hero}
                </td>
                <td style={{ padding: "16px", textAlign: "right", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--accent-teal)" }}>{p.wins}</span>
                  <span style={{ color: "var(--text-muted)" }}> / </span>
                  <span style={{ color: "var(--accent-rose)" }}>{p.losses}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
