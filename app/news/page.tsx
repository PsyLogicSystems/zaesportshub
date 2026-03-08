"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown, ChevronUp, Newspaper } from "lucide-react";

interface Patch {
  id?: string | number;
  version?: string;
  title?: string;
  date?: string;
  summary?: string;
  content?: string;
  notes?: string;
  changes?: unknown[];
  [key: string]: unknown;
}

// Static placeholder articles shown when the API has no patch data
const STATIC_ARTICLES = [
  {
    id:      "welcome",
    version: "Community",
    title:   "Welcome to ZA Esports Hub",
    date:    "2026-03-01",
    summary: "Why we built this platform and what it means for the SA esports community.",
    content: "ZA Esports Hub was created to give South African Marvel Rivals players a dedicated home. Track your favourite heroes, find team mates, follow the leaderboard, and stay up to date with patch notes — all in one place.",
  },
  {
    id:      "servers",
    version: "Community",
    title:   "The Case for South African Servers",
    date:    "2026-02-28",
    summary: "High ping is killing competitive play. Here's what we're doing about it.",
    content: "Playing on 180ms+ ping puts South African players at a significant disadvantage in ranked play. We're actively campaigning for dedicated SA servers and tracking the conversation with NetEase.",
  },
  {
    id:      "meta",
    version: "Season 3",
    title:   "Season 3 Meta Breakdown",
    date:    "2026-02-25",
    summary: "Which heroes are dominating the ranked ladder and why the meta shifted.",
    content: "The arrival of Season 3.5 shuffled the meta significantly. Strategists are in the spotlight following the Loki and Luna Snow adjustments, while Vanguard picks have narrowed to a handful of dominant shields.",
  },
];

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
  } catch { return dateStr; }
}

export default function NewsPage() {
  const [patches,     setPatches]     = useState<Patch[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [expandedId,  setExpandedId]  = useState<string | number | null>(null);
  const [apiWorked,   setApiWorked]   = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/patches");
        if (res.ok) {
          const data = await res.json();
          const list: Patch[] = Array.isArray(data) ? data : [];
          if (list.length > 0) {
            setPatches(list);
            setApiWorked(true);
          }
        }
      } catch {
        // fallback to static content
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const displayItems: Patch[] = apiWorked ? patches : STATIC_ARTICLES;

  function toggle(id: string | number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function getContent(p: Patch): string {
    return String(p.content ?? p.notes ?? p.summary ?? "No content available.");
  }

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Patch Notes & <span className="text-gradient">News</span>
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-muted)" }}>
          Marvel Rivals updates, patch notes, and ZA esports community news.
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Loader2 size={36} style={{ color: "var(--accent-teal)", animation: "spin 1s linear infinite" }} />
          <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Loading...</p>
          <style jsx>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {!loading && (
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {displayItems.map((item) => {
            const id       = item.id ?? item.version ?? String(Math.random());
            const expanded = expandedId === id;
            const content  = getContent(item);
            return (
              <div
                key={String(id)}
                className="nm"
                style={{ borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.25s ease" }}
              >
                {/* Header row */}
                <div
                  style={{ padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}
                  onClick={() => toggle(id)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                      {item.version && (
                        <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "5px", padding: "2px 8px" }}>
                          {item.version}
                        </span>
                      )}
                      {item.date && (
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{formatDate(item.date)}</span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>
                      {item.title ?? `Patch ${item.version}`}
                    </h3>
                    {item.summary && (
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>{item.summary}</p>
                    )}
                  </div>
                  <div style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px" }}>
                    {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded content */}
                {expanded && (
                  <div style={{ padding: "0 26px 24px", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.85, margin: "20px 0 0", whiteSpace: "pre-wrap" }}>
                      {content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {displayItems.length === 0 && (
            <div style={{ padding: "48px", textAlign: "center", background: "var(--surface)", borderRadius: "24px", border: "1px solid var(--border)" }}>
              <Newspaper size={36} style={{ color: "var(--text-muted)", marginBottom: "12px", opacity: 0.5 }} />
              <p style={{ color: "var(--text-muted)" }}>No news available yet. Check back soon.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
