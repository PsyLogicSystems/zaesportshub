"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

interface Costume {
  id?: string;
  name: string;
  icon?: string;
  quality?: string;
  description?: string;
  appearance?: string;
  heroName?: string;
  heroId?: string | number;
}

const RARITY_OPTS = ["All", "Legendary", "Epic", "Rare", "Common"] as const;

const QUALITY_TO_RARITY: Record<string, string> = {
  ORANGE: "Legendary",
  PURPLE: "Epic",
  BLUE:   "Rare",
  NO_QUALITY: "Common",
};

function getRarityStyle(quality?: string) {
  switch (quality) {
    case "ORANGE": return { color: "#f59e0b", label: "Legendary", glow: "rgba(245,158,11,0.35)" };
    case "PURPLE": return { color: "#a78bfa", label: "Epic",      glow: "rgba(167,139,250,0.35)" };
    case "BLUE":   return { color: "#60a5fa", label: "Rare",      glow: "rgba(96,165,250,0.30)"  };
    default:       return { color: "#9ca3af", label: "Common",    glow: "rgba(156,163,175,0.25)" };
  }
}

function fixIcon(icon?: string) {
  if (!icon) return null;
  if (icon.startsWith("http")) return icon;
  return `https://marvelrivalsapi.com/rivals/${icon.replace(/^\//, "")}`;
}

export default function SkinsPage() {
  const [costumes,    setCostumes]    = useState<Costume[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [search,      setSearch]      = useState("");
  const [heroFilter,  setHeroFilter]  = useState("");
  const [rarityFilter, setRarityFilter] = useState<string>("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/costumes");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setCostumes(Array.isArray(data) ? data : []);
      } catch {
        setError("Could not load skin data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const heroes = [...new Set(costumes.map((c) => c.heroName).filter(Boolean))].sort() as string[];

  const filtered = costumes.filter((c) => {
    const matchSearch = (c.name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchHero   = !heroFilter || c.heroName === heroFilter;
    const rLabel      = QUALITY_TO_RARITY[c.quality ?? ""] ?? "Common";
    const matchRarity = rarityFilter === "All" || rLabel === rarityFilter;
    return matchSearch && matchHero && matchRarity;
  });

  const rarityColors: Record<string, string> = {
    All: "#a78bfa", Legendary: "#f59e0b", Epic: "#a78bfa", Rare: "#60a5fa", Common: "#9ca3af",
  };

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>

      {/* SEO-friendly header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Marvel Rivals <span className="text-gradient">Skins & Costumes</span>
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-muted)" }}>
          Browse all Marvel Rivals skins and costumes. Filter by hero, rarity, or search by name.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1", maxWidth: "340px", minWidth: "200px" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }} />
          <input
            type="text"
            placeholder="Search skins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px" }}
          />
        </div>

        <select value={heroFilter} onChange={(e) => setHeroFilter(e.target.value)} style={{ width: "auto", minWidth: "160px" }}>
          <option value="">All Heroes</option>
          {heroes.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>

        {RARITY_OPTS.map((r) => {
          const color  = rarityColors[r];
          const active = rarityFilter === r;
          return (
            <button
              key={r}
              onClick={() => setRarityFilter(r)}
              className={active ? "btn-primary" : "btn-secondary"}
              style={{
                padding: "8px 18px",
                fontSize: "0.8rem",
                ...(active ? { background: color, border: "none" } : {}),
              }}
            >
              {r}
            </button>
          );
        })}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "32px" }}>
        {filtered.length} skin{filtered.length !== 1 ? "s" : ""} found
      </p>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Loader2 size={36} style={{ color: "var(--accent-teal)", animation: "spin 1s linear infinite" }} />
          <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Loading skins...</p>
          <style jsx>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {error && (
        <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--accent-rose)" }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "20px" }}>
          {filtered.map((skin, idx) => {
            const { color, label, glow } = getRarityStyle(skin.quality);
            const img = fixIcon(skin.icon);
            const heroSlug = (skin.heroName ?? "").toLowerCase().replace(/\s+/g, "-");
            return (
              <a
                key={`${skin.id ?? skin.name}-${idx}`}
                href={heroSlug ? `/heroes/${heroSlug}` : undefined}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  className="nm"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    cursor: heroSlug ? "pointer" : "default",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {/* Image area */}
                  <div style={{ height: "150px", background: `linear-gradient(135deg, ${color}15, var(--bg-secondary))`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {img
                      ? <img src={img} alt={skin.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      : <span style={{ fontSize: "2.8rem", opacity: 0.2 }}>🦸</span>}
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 70%)`, pointerEvents: "none" }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "12px 14px 16px" }}>
                    <span style={{ fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color, background: `${color}18`, border: `1px solid ${color}44`, borderRadius: "5px", padding: "2px 7px", boxShadow: `0 0 8px ${glow}`, display: "inline-block", marginBottom: "6px" }}>{label}</span>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 3px", lineHeight: 1.3 }}>{skin.name}</p>
                    {skin.heroName && (
                      <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", margin: 0 }}>{skin.heroName}</p>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
