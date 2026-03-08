import Link from "next/link";
import { notFound } from "next/navigation";

const IMAGE_BASE    = "https://marvelrivalsapi.com/rivals";
const PRESTIGE_BASE = "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/hero-prestige-images";

interface HeroAbility {
  name: string;
  description: string;
  icon?: string;
  type?: string;
}

interface HeroCostume {
  id: string;
  name: string;
  icon?: string;
  quality?: "NO_QUALITY" | "BLUE" | "PURPLE" | "ORANGE" | string;
  description?: string;
  appearance?: string;
}

interface MarvelRivalsHero {
  id: string | number;
  name: string;
  slug?: string;
  real_name?: string;
  role?: string;
  attackType?: string;
  attack_type?: string;
  difficulty?: number;
  hp?: number;
  speed?: number;
  description?: string;
  lore?: string;
  bio?: string;
  abilities?: HeroAbility[];
  costumes?: HeroCostume[];
  [key: string]: unknown;
}

function stripTags(str: string): string {
  return str.replace(/<[^>]+>/g, "").replace(/\{[^}]+\}/g, "").trim();
}

function getPrestigeIcon(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${PRESTIGE_BASE}/${slug}_prestige.png`;
}

function getRole(hero: MarvelRivalsHero) {
  const r = (hero.role || "").toLowerCase();
  if (r.includes("vanguard"))   return "Vanguard";
  if (r.includes("duelist"))    return "Duelist";
  if (r.includes("strategist")) return "Strategist";
  return hero.role || "Unknown";
}

function getRoleColor(role: string) {
  const r = role.toLowerCase();
  if (r.includes("vanguard"))   return { color: "#60a5fa", glow: "rgba(96,165,250,0.3)"  };
  if (r.includes("duelist"))    return { color: "#f87171", glow: "rgba(248,113,113,0.3)" };
  if (r.includes("strategist")) return { color: "#34d399", glow: "rgba(52,211,153,0.3)"  };
  return { color: "#a78bfa", glow: "rgba(167,139,250,0.3)" };
}

function fixIcon(icon?: string): string | null {
  if (!icon) return null;
  if (icon.startsWith("http")) return icon;
  return `${IMAGE_BASE}/${icon.replace(/^\//, "")}`;
}

function getRarityStyle(quality?: string): { color: string; label: string; glow: string } {
  switch (quality) {
    case "ORANGE": return { color: "#f59e0b", label: "Legendary", glow: "rgba(245,158,11,0.4)" };
    case "PURPLE": return { color: "#a78bfa", label: "Epic",      glow: "rgba(167,139,250,0.4)" };
    case "BLUE":   return { color: "#60a5fa", label: "Rare",      glow: "rgba(96,165,250,0.35)" };
    default:       return { color: "#9ca3af", label: "Common",    glow: "rgba(156,163,175,0.3)" };
  }
}

// ── Data fetching ─────────────────────────────────────────────────────────────
function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL)           return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getAllHeroes(): Promise<MarvelRivalsHero[]> {
  try {
    const res = await fetch(`${getSiteUrl()}/api/heroes`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.heroes ?? data.data ?? [];
  } catch { return []; }
}

async function getHeroBySlug(slug: string): Promise<MarvelRivalsHero | null> {
  const heroes = await getAllHeroes();
  return heroes.find(
    (h) =>
      h.slug === slug ||
      h.name?.toLowerCase().replace(/\s+/g, "-") === slug ||
      String(h.id) === slug
  ) ?? null;
}

export async function generateStaticParams() {
  const heroes = await getAllHeroes();
  return heroes.map((h) => ({
    slug: h.slug ?? h.name?.toLowerCase().replace(/\s+/g, "-") ?? String(h.id),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = await getHeroBySlug(slug);
  if (!hero) return { title: "Hero Not Found | ZA Esports Hub" };
  return {
    title:       `${hero.name} | Marvel Rivals | ZA Esports Hub`,
    description: `${hero.name} hero guide — abilities, role, lore, and skins. Marvel Rivals South Africa.`,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function HeroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = await getHeroBySlug(slug);
  if (!hero) notFound();

  const role    = getRole(hero);
  const { color: rc, glow: rg } = getRoleColor(role);
  const portrait = getPrestigeIcon(hero.name);
  const lore     = hero.lore ?? hero.bio ?? hero.description ?? null;

  const seen = new Set<string>();
  const abilities = (hero.abilities ?? [])
    .filter((ab) => { if (seen.has(ab.name)) return false; seen.add(ab.name); return true; })
    .slice(0, 8);

  const costumes: HeroCostume[] = (hero.costumes as HeroCostume[] | undefined) ?? [];

  const typeStyle: Record<string, { color: string; bg: string }> = {
    ULTIMATE: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
    PASSIVE:  { color: "#2dd4bf", bg: "rgba(45,212,191,0.1)"  },
    WEAPON:   { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
    NORMAL:   { color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes rainbowSpin {
          0%   { filter: hue-rotate(0deg) brightness(1.15); }
          100% { filter: hue-rotate(360deg) brightness(1.15); }
        }
        @keyframes softRainbow {
          0%   { filter: hue-rotate(0deg) saturate(0.65) brightness(1.05); }
          100% { filter: hue-rotate(360deg) saturate(0.65) brightness(1.05); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes portraitIn {
          from { opacity: 0; transform: scale(1.07) translateX(24px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(250%) skewX(-12deg); }
        }

        .hero-page {
          --bg:      #080810;
          --bg2:     #0f0f1c;
          --surface: rgba(255,255,255,0.028);
          --border:  rgba(255,255,255,0.07);
          --text:    #f1f5f9;
          --muted:   rgba(255,255,255,0.38);
          --nm-out:  -5px -5px 12px rgba(255,255,255,0.025), 7px 7px 20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04);
          --nm-in:   inset 3px 3px 8px rgba(0,0,0,0.55), inset -2px -2px 6px rgba(255,255,255,0.025);
          --holo:    linear-gradient(135deg,#ff0080,#ff8c00,#ffe100,#00ff9f,#00cfff,#7b2fff,#ff0080);
          --holo-anim: rainbowSpin;
        }

        [data-theme="light"] .hero-page {
          --bg:      #e8ecf2;
          --bg2:     #dfe4ee;
          --surface: rgba(255,255,255,0.75);
          --border:  rgba(255,255,255,0.6);
          --text:    #1a1d2e;
          --muted:   #6b7280;
          --nm-out:  6px 6px 16px rgba(180,190,210,0.6), -6px -6px 16px rgba(255,255,255,0.9);
          --nm-in:   inset 4px 4px 10px rgba(180,190,210,0.5), inset -4px -4px 10px rgba(255,255,255,0.8);
          --holo:    linear-gradient(135deg,#ffb3d1,#ffd4a3,#fffaaa,#b3f5d4,#b3eeff,#d4b3ff,#ffb3d1);
          --holo-anim: softRainbow;
        }

        .hero-page {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          font-family: 'Inter', system-ui, sans-serif;
          transition: background 0.3s, color 0.3s;
        }

        .nm        { background: var(--surface); border: 1px solid var(--border); box-shadow: var(--nm-out); }
        .nm-inset  { box-shadow: var(--nm-in); }

        /* Frosted glass in light mode */
        [data-theme="light"] .nm {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .holo { position: relative; }
        .holo::after {
          content: '';
          position: absolute; inset: -1.5px;
          border-radius: inherit; padding: 1.5px;
          background: var(--holo); background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.35s ease;
          animation: var(--holo-anim) 4s linear infinite;
          pointer-events: none;
        }
        .holo:hover::after { opacity: 1; }

        .ab-card {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
          cursor: default;
        }
        .ab-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--nm-out), 0 18px 36px rgba(0,0,0,0.28);
        }

        .skin-card {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
          cursor: default;
        }
        .skin-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--nm-out), 0 16px 32px rgba(0,0,0,0.25);
        }

        .stat-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 11px 14px; border-radius: 10px;
          transition: background 0.2s, padding-left 0.2s;
        }
        .stat-row + .stat-row { border-top: 1px solid var(--border); }
        .stat-row:hover { background: rgba(127,127,127,0.06); padding-left: 22px; }

        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: var(--muted);
          text-decoration: none; letter-spacing: 0.15em; text-transform: uppercase;
          transition: color 0.2s, letter-spacing 0.2s;
        }
        .back-link:hover { color: ${rc}; letter-spacing: 0.24em; }

        .shimmer-layer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 50%, transparent 100%);
          animation: shimmer 5s ease-in-out infinite;
          pointer-events: none; z-index: 3;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${rc}55; border-radius: 2px; }

        @media (max-width: 768px) {
          .hero-splash   { height: 75vh !important; }
          .hero-left     { width: 100% !important; padding: 24px !important; justify-content: flex-end !important; padding-bottom: 48px !important; }
          .hero-portrait { width: 100% !important; }
          .hero-name     { font-size: 2.8rem !important; }
          .lore-grid     { grid-template-columns: 1fr !important; }
          .ab-grid       { grid-template-columns: 1fr !important; }
          .skin-grid     { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="hero-page">

        {/* ── SPLASH ── */}
        <div className="hero-splash" style={{ position: "relative", height: "100vh", maxHeight: "900px", overflow: "hidden" }}>

          <div className="hero-portrait" style={{ position: "absolute", right: 0, top: 0, width: "62%", height: "100%", animation: "portraitIn .85s cubic-bezier(.22,1,.36,1) .05s both" }}>
            <img src={portrait} alt={hero.name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top" }} />
            <div className="shimmer-layer" />
          </div>

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--bg) 26%, color-mix(in srgb,var(--bg) 82%,transparent) 52%, color-mix(in srgb,var(--bg) 12%,transparent) 78%, transparent 100%)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "280px", background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)", zIndex: 1 }} />

          <div className="hero-left" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "50%", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 52px" }}>

            <div style={{ animation: "slideUp .45s both", marginBottom: "40px" }}>
              <Link href="/heroes" className="back-link">← All Heroes</Link>
            </div>

            <div style={{ animation: "slideUp .5s .07s both", marginBottom: "16px" }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: rc, background: rg, border: `1px solid ${rc}`, borderRadius: "6px", padding: "4px 14px", boxShadow: `0 0 20px ${rg}, 0 0 6px ${rg}`, display: "inline-block" }}>{role}</span>
            </div>

            <h1 className="hero-name" style={{ animation: "slideUp .5s .12s both", fontSize: "clamp(3rem, 5vw, 5.8rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 10px", background: `linear-gradient(135deg, var(--text) 45%, ${rc}90 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 28px ${rg})` }}>{hero.name}</h1>

            {hero.real_name && (
              <p style={{ animation: "slideUp .5s .16s both", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 36px" }}>{hero.real_name}</p>
            )}

            <div style={{ animation: "slideUp .5s .2s both", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {hero.difficulty != null && (
                <div className="nm holo" style={{ borderRadius: "14px", padding: "10px 18px" }}>
                  <div style={{ fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Difficulty</div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {[1,2,3].map(i => (
                      <span key={i} style={{ width: "11px", height: "11px", borderRadius: "50%", display: "inline-block", background: i <= Number(hero.difficulty) ? rc : "transparent", border: `1.5px solid ${i <= Number(hero.difficulty) ? rc : "var(--border)"}`, boxShadow: i <= Number(hero.difficulty) ? `0 0 8px ${rc}` : "none" }} />
                    ))}
                  </div>
                </div>
              )}
              {hero.hp != null && (
                <div className="nm holo" style={{ borderRadius: "14px", padding: "10px 18px" }}>
                  <div style={{ fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>Base HP</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: rc }}>{hero.hp}</div>
                </div>
              )}
              {(hero.attackType || hero.attack_type) && (
                <div className="nm holo" style={{ borderRadius: "14px", padding: "10px 18px" }}>
                  <div style={{ fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>Attack</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>{hero.attackType ?? hero.attack_type}</div>
                </div>
              )}
            </div>

            <div style={{ animation: "slideUp .5s .34s both", marginTop: "52px", display: "flex", alignItems: "center", gap: "10px", color: "var(--muted)", fontSize: "0.64rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              <div style={{ width: "22px", height: "36px", border: `1.5px solid ${rc}45`, borderRadius: "12px", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
                <div style={{ width: "3px", height: "8px", background: rc, borderRadius: "2px", animation: "floatY 1.8s ease-in-out infinite", boxShadow: `0 0 8px ${rc}` }} />
              </div>
              Scroll to explore
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 100px" }}>

          {/* ── Abilities ── */}
          <section style={{ marginBottom: "72px", animation: "slideUp .6s .05s both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <h2 style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: rc, margin: 0 }}>Abilities</h2>
              <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${rc}80, transparent)` }} />
            </div>

            {abilities.length === 0 ? (
              <p style={{ color: "var(--muted)", fontStyle: "italic" }}>Ability data coming soon.</p>
            ) : (
              <div className="ab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "16px" }}>
                {abilities.map((ab, i) => {
                  const tk = (ab.type || "NORMAL").toUpperCase();
                  const ts = typeStyle[tk] ?? typeStyle.NORMAL;
                  const icon = fixIcon(ab.icon);
                  return (
                    <div key={i} className="ab-card nm holo" style={{ borderRadius: "20px", padding: "22px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: "-24px", right: "-24px", width: "90px", height: "90px", background: ts.color, borderRadius: "50%", filter: "blur(32px)", opacity: 0.09, pointerEvents: "none" }} />
                      <span style={{
                        position: "absolute", top: "14px", right: "14px",
                        fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase",
                        color: ts.color, background: ts.bg, border: `1px solid ${ts.color}55`,
                        borderRadius: "6px", padding: "3px 8px",
                        boxShadow: `0 0 10px ${ts.color}55`,
                      }}>{ab.type || "Normal"}</span>
                      <div className="nm-inset" style={{ width: "50px", height: "50px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", overflow: "hidden", background: "var(--surface)" }}>
                        {icon
                          ? <img src={icon} alt={ab.name} width={34} height={34} style={{ objectFit: "contain" }} />
                          : <span style={{ fontSize: "1.4rem" }}>⚡</span>}
                      </div>
                      <h4 style={{ fontSize: "0.92rem", fontWeight: 700, margin: "0 0 7px", color: "var(--text)" }}>{ab.name}</h4>
                      <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>{stripTags(ab.description)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── Skins & Costumes ── */}
          {costumes.length > 0 && (
            <section style={{ marginBottom: "72px", animation: "slideUp .6s .08s both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <h2 style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: rc, margin: 0 }}>Skins & Costumes</h2>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${rc}80, transparent)` }} />
                <span style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{costumes.length} skin{costumes.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="skin-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
                {costumes.map((skin, i) => {
                  const { color: rc2, label, glow } = getRarityStyle(skin.quality);
                  const skinIcon = fixIcon(skin.icon);
                  return (
                    <div key={i} className="skin-card nm" style={{ borderRadius: "18px", overflow: "hidden", position: "relative" }}>
                      {/* Skin image */}
                      <div style={{ height: "140px", background: `linear-gradient(135deg, ${rc2}18, var(--bg2))`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        {skinIcon
                          ? <img src={skinIcon} alt={skin.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }} />
                          : <span style={{ fontSize: "2.5rem", opacity: 0.3 }}>🦸</span>}
                        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${rc2}10 0%, transparent 70%)`, pointerEvents: "none" }} />
                      </div>

                      {/* Info */}
                      <div style={{ padding: "12px 14px 14px" }}>
                        {/* Rarity badge */}
                        <span style={{ fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: rc2, background: `${rc2}18`, border: `1px solid ${rc2}44`, borderRadius: "5px", padding: "2px 7px", boxShadow: `0 0 8px ${glow}`, display: "inline-block", marginBottom: "6px" }}>{label}</span>
                        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text)", margin: "0 0 2px", lineHeight: 1.3 }}>{skin.name}</p>
                        {skin.appearance && skin.appearance !== "Default" && (
                          <p style={{ fontSize: "0.65rem", color: "var(--muted)", margin: 0 }}>{skin.appearance}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Lore + Synergies ── */}
          <div className="lore-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            <div className="nm holo" style={{ borderRadius: "24px", padding: "34px", position: "relative", overflow: "hidden", animation: "slideUp .6s .12s both" }}>
              <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "160px", height: "160px", background: rc, borderRadius: "50%", filter: "blur(60px)", opacity: 0.06, pointerEvents: "none" }} />
              <h2 style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: rc, margin: "0 0 18px" }}>Lore</h2>
              {lore
                ? <p style={{ fontSize: "0.86rem", lineHeight: 1.95, color: "var(--muted)", margin: 0 }}>{stripTags(lore)}</p>
                : <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontStyle: "italic" }}>Lore not yet available.</p>}
            </div>

            <div className="nm holo" style={{ borderRadius: "24px", padding: "34px", position: "relative", overflow: "hidden", animation: "slideUp .6s .18s both" }}>
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "140px", height: "140px", background: "#a78bfa", borderRadius: "50%", filter: "blur(55px)", opacity: 0.06, pointerEvents: "none" }} />
              <h2 style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: rc, margin: "0 0 6px" }}>Synergies & Counters</h2>
              <p style={{ fontSize: "0.64rem", color: "var(--muted)", margin: "0 0 24px" }}>Team-up data expanding with the meta.</p>
              {["Works well with", "Countered by"].map((label, li) => (
                <div key={label} style={{ marginBottom: li === 0 ? "20px" : 0 }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>{label}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["Hero A", "Hero B", "Hero C"].map((n) => (
                      <div key={n} className="nm" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "10px", opacity: 0.45 }}>
                        <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--border)", display: "inline-block" }} />
                        <span style={{ fontSize: "0.73rem", color: "var(--muted)" }}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
