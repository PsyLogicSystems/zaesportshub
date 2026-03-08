"use client";

import { useState, useEffect } from "react";
import { Loader2, Map } from "lucide-react";

interface GameMap {
  id?: string | number;
  name?: string;
  game_mode?: string;
  mode?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  [key: string]: unknown;
}

const IMAGE_BASE = "https://marvelrivalsapi.com/rivals";

function fixImage(img?: string): string | null {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return `${IMAGE_BASE}/${img.replace(/^\//, "")}`;
}

export default function MapsPage() {
  const [maps,    setMaps]    = useState<GameMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/maps");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setMaps(Array.isArray(data) ? data : data.maps ?? []);
      } catch {
        setError("Could not load map data. The API may not support this endpoint yet.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const modeColors: Record<string, string> = {
    "Convoy":           "#f59e0b",
    "Domination":       "#f87171",
    "Convergence":      "#60a5fa",
    "Clash":            "#a78bfa",
    "Tournament":       "#2dd4bf",
  };

  function getModeColor(mode?: string): string {
    if (!mode) return "#a78bfa";
    for (const [key, color] of Object.entries(modeColors)) {
      if (mode.toLowerCase().includes(key.toLowerCase())) return color;
    }
    return "#a78bfa";
  }

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Marvel Rivals <span className="text-gradient">Maps</span>
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-muted)" }}>
          Every Marvel Rivals map and game mode. Learn the layout, master the meta.
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Loader2 size={36} style={{ color: "var(--accent-teal)", animation: "spin 1s linear infinite" }} />
          <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Loading maps...</p>
          <style jsx>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {error && (
        <div style={{ padding: "48px", textAlign: "center", background: "var(--surface)", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "var(--nm-out)" }}>
          <Map size={40} style={{ color: "var(--text-muted)", marginBottom: "16px", opacity: 0.5 }} />
          <p style={{ color: "var(--accent-rose)", marginBottom: "8px", fontWeight: 600 }}>{error}</p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Map data will appear here once the API endpoint becomes available.</p>
        </div>
      )}

      {!loading && !error && maps.length === 0 && (
        <div style={{ padding: "48px", textAlign: "center", background: "var(--surface)", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "var(--nm-out)" }}>
          <Map size={40} style={{ color: "var(--text-muted)", marginBottom: "16px", opacity: 0.5 }} />
          <p style={{ color: "var(--text-muted)" }}>No map data returned from the API.</p>
        </div>
      )}

      {!loading && !error && maps.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {maps.map((map, idx) => {
            const img  = fixImage(map.image ?? map.imageUrl as string);
            const mode = map.game_mode ?? map.mode ?? "Unknown";
            const mc   = getModeColor(mode);
            return (
              <div
                key={map.id ?? idx}
                className="nm"
                style={{
                  borderRadius: "22px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "var(--nm-out), 0 20px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "";
                }}
              >
                {/* Map image */}
                <div style={{ height: "180px", background: `linear-gradient(135deg, ${mc}25, var(--bg-secondary))`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  {img
                    ? <img src={img} alt={map.name ?? "Map"} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    : (
                      <div style={{ textAlign: "center", opacity: 0.3 }}>
                        <Map size={40} />
                        <p style={{ fontSize: "0.7rem", marginTop: "8px" }}>No image</p>
                      </div>
                    )}
                  {/* Mode badge overlay */}
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: mc, background: `${mc}22`, border: `1px solid ${mc}55`, borderRadius: "6px", padding: "3px 10px" }}>{mode}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.15rem", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>{map.name ?? "Unknown Map"}</h3>
                  {map.description && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{String(map.description).slice(0, 120)}{String(map.description).length > 120 ? "…" : ""}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
