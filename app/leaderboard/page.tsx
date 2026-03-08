"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Loader2, Trophy, Filter } from "lucide-react";

// Note: metadata export doesn't work in "use client" — set via generateMetadata in a server wrapper if needed.
// For now the page is fully client-side for interactive filtering.

interface Player {
  rank?: number;
  player_name?: string;
  name?: string;
  username?: string;
  rating?: number;
  score?: number;
  rank_name?: string;
  region?: string;
  platform?: string;
  matches_played?: number;
  wins?: number;
  [key: string]: unknown;
}

const RANK_COLORS: Record<string, string> = {
  "1":  "#f59e0b",
  "2":  "#9ca3af",
  "3":  "#cd7f32",
};

export default function LeaderboardPage() {
  const [allPlayers,   setAllPlayers]   = useState<Player[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [platFilter,   setPlatFilter]   = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/leaderboard");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const players: Player[] = Array.isArray(data)
          ? data
          : data.players ?? data.data ?? data.leaderboard ?? [];
        setAllPlayers(players);
      } catch {
        setError("Could not load leaderboard. The API may be unavailable.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const regions   = [...new Set(allPlayers.map((p) => p.region).filter(Boolean))] as string[];
  const platforms = [...new Set(allPlayers.map((p) => p.platform).filter(Boolean))] as string[];

  const filtered = allPlayers.filter((p) => {
    const matchR = !regionFilter || p.region === regionFilter;
    const matchP = !platFilter   || p.platform === platFilter;
    return matchR && matchP;
  });

  const getName = (p: Player) => p.player_name ?? p.name ?? p.username ?? "—";
  const getRating = (p: Player) => p.rating ?? p.score ?? "—";

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Marvel Rivals <span className="text-gradient">Leaderboard</span>
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-muted)" }}>
          Top players globally. Use filters to find the best in Southern Africa.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <Filter size={16} style={{ color: "var(--text-muted)" }} />

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ width: "auto", minWidth: "160px" }}
        >
          <option value="">All Regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select
          value={platFilter}
          onChange={(e) => setPlatFilter(e.target.value)}
          style={{ width: "auto", minWidth: "160px" }}
        >
          <option value="">All Platforms</option>
          {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        {(regionFilter || platFilter) && (
          <button className="btn-secondary" onClick={() => { setRegionFilter(""); setPlatFilter(""); }} style={{ padding: "8px 16px", fontSize: "0.83rem" }}>
            Clear
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Loader2 size={36} style={{ color: "var(--accent-teal)", animation: "spin 1s linear infinite" }} />
          <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Loading leaderboard...</p>
          <style jsx>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {error && (
        <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)" }}>
          <Trophy size={32} style={{ color: "var(--text-muted)", marginBottom: "12px" }} />
          <p style={{ color: "var(--accent-rose)", marginBottom: "8px" }}>{error}</p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>This feature requires a valid API key and leaderboard data from the Marvel Rivals API.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No players found for the selected filters.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "20px", textAlign: "center" }}>
            Showing {filtered.length} player{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Table */}
          <div style={{ background: "var(--surface)", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "var(--nm-out)", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 130px 120px 110px 110px", gap: "0", padding: "14px 24px", borderBottom: "1px solid var(--border)", background: "rgba(127,127,127,0.04)" }}>
              {["Rank", "Player", "Rating", "Region", "Platform", "Matches"].map((h) => (
                <span key={h} style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {filtered.slice(0, 100).map((player, idx) => {
              const rank      = player.rank ?? idx + 1;
              const rankColor = RANK_COLORS[String(rank)] ?? "var(--text-muted)";
              const isTop3    = rank <= 3;
              return (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 130px 120px 110px 110px",
                    gap: "0",
                    padding: "14px 24px",
                    borderBottom: idx < filtered.length - 1 ? "1px solid var(--border)" : "none",
                    background: idx % 2 === 1 ? "rgba(127,127,127,0.025)" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(127,127,127,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 1 ? "rgba(127,127,127,0.025)" : "transparent")}
                >
                  <span style={{ fontWeight: 800, fontSize: isTop3 ? "1rem" : "0.85rem", color: rankColor, display: "flex", alignItems: "center", gap: "4px" }}>
                    {isTop3 && <span>{"🏅".charAt(0)}</span>}
                    #{rank}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", display: "flex", alignItems: "center" }}>{getName(player)}</span>
                  <span style={{ fontSize: "0.88rem", color: "var(--accent)", fontWeight: 700, display: "flex", alignItems: "center" }}>{getRating(player)}</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>{player.region ?? "—"}</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>{player.platform ?? "—"}</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>{player.matches_played ?? "—"}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
