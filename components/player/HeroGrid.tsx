"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

const IMAGE_BASE = "https://marvelrivalsapi.com/rivals";
const PRESTIGE_BASE =
  "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/hero-prestige-images";

// ── PART 1: Authoritative role lookup — never relies on the API string ────────
const ROLE_MAP: Record<string, string> = {
  // Vanguard
  "angela":            "vanguard",
  "captain america":   "vanguard",
  "doctor strange":    "vanguard",
  "emma frost":        "vanguard",
  "groot":             "vanguard",
  "hulk":              "vanguard",
  "magneto":           "vanguard",
  "peni parker":       "vanguard",
  "rogue":             "vanguard",
  "the thing":         "vanguard",
  "thor":              "vanguard",
  "venom":             "vanguard",
  // Duelist
  "black panther":     "duelist",
  "black widow":       "duelist",
  "blade":             "duelist",
  "daredevil":         "duelist",
  "hawkeye":           "duelist",
  "hela":              "duelist",
  "human torch":       "duelist",
  "iron fist":         "duelist",
  "iron man":          "duelist",
  "magik":             "duelist",
  "mister fantastic":  "duelist",
  "moon knight":       "duelist",
  "namor":             "duelist",
  "phoenix":           "duelist",
  "psylocke":          "duelist",
  "scarlet witch":     "duelist",
  "spider-man":        "duelist",
  "squirrel girl":     "duelist",
  "star-lord":         "duelist",
  "winter soldier":    "duelist",
  "wolverine":         "duelist",
  "elsa bloodstone":   "duelist",
  // Strategist
  "adam warlock":      "strategist",
  "cloak & dagger":    "strategist",
  "gambit":            "strategist",
  "invisible woman":   "strategist",
  "jeff the land shark": "strategist",
  "loki":              "strategist",
  "luna snow":         "strategist",
  "mantis":            "strategist",
  "rocket raccoon":    "strategist",
  "ultron":            "strategist",
  // Multi-Role (appears under both Vanguard and Duelist filters)
  "deadpool":          "multi",
};

const FILTER_GLOW: Record<string, string> = {
  All:        "#a78bfa",
  Vanguard:   "#60a5fa",
  Duelist:    "#f87171",
  Strategist: "#34d399",
};

interface Hero {
  id: string | number;
  name: string;
  real_name?: string;
  role?: string;
  imageUrl?: string;
  abilities?: { icon?: string; type?: string }[];
}

interface TiltState {
  id: string;
  rotX: number;
  rotY: number;
  spotX: number;
  spotY: number;
}

export function HeroGrid() {
  const [heroes, setHeroes]           = useState<Hero[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [search, setSearch]           = useState("");
  const [roleFilter, setRoleFilter]   = useState<string>("All");
  const [tiltState, setTiltState]     = useState<TiltState | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [isDark, setIsDark]           = useState(true);

  // ── Fetch heroes ────────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadHeroes() {
      try {
        const res = await fetch("/api/heroes");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const heroList: Hero[] = Array.isArray(data) ? data : data.heroes || data.data || [];

        const seen = new Set<string>();
        const deduped = heroList.filter((h) => {
          const key = (h.name || "").toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setHeroes(deduped);
      } catch (err) {
        console.error("Failed to load heroes:", err);
        setError("Could not load heroes.");
      } finally {
        setLoading(false);
      }
    }
    loadHeroes();
  }, []);

  // ── Track theme for spotlight colours ───────────────────────────────────────
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // ── Role helpers ─────────────────────────────────────────────────────────────
  function getRole(hero: Hero): string {
    const key = hero.name.toLowerCase().trim();
    if (ROLE_MAP[key]) return ROLE_MAP[key];
    // Fallback: read the API string
    const r = String(hero.role ?? "").toLowerCase().trim();
    if (r.includes("vanguard") || r === "tank")                      return "vanguard";
    if (r.includes("duelist")  || r === "damage" || r === "dps")    return "duelist";
    if (r.includes("strategist") || r === "support" || r === "healer") return "strategist";
    return r || "unknown";
  }

  function getRoleColor(role: string): string {
    if (role === "vanguard")   return "#60a5fa";
    if (role === "duelist")    return "#f87171";
    if (role === "strategist") return "#34d399";
    if (role === "multi")      return "#c084fc";
    return "#a78bfa";
  }

  function getRoleLabel(role: string): string {
    return role === "multi" ? "Multi-Role" : role;
  }

  // ── Image helpers ────────────────────────────────────────────────────────────
  function getPrestigeIcon(heroName: string): string {
    const slug = heroName
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `${PRESTIGE_BASE}/${slug}_prestige.png`;
  }

  function getHeroSlug(hero: Hero): string {
    return hero.name.toLowerCase().replace(/\s+/g, "-");
  }

  function getAbilityIcons(hero: Hero): string[] {
    if (!hero.abilities) return [];
    return hero.abilities
      .slice(0, 3)
      .map((ab) => {
        const icon = ab.icon;
        if (!icon) return "";
        if (icon.startsWith("http")) return icon;
        return `${IMAGE_BASE}/${icon.replace(/^\//, "")}`;
      })
      .filter(Boolean);
  }

  // ── PART 2: Tilt handlers ────────────────────────────────────────────────────
  function handleCardPointer(e: React.MouseEvent<HTMLAnchorElement>, cardId: string) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY =  ((x - rect.width  / 2) / (rect.width  / 2)) * 12;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 12;
    setTiltState({
      id: cardId,
      rotX,
      rotY,
      spotX: (x / rect.width)  * 100,
      spotY: (y / rect.height) * 100,
    });
  }

  function handleCardLeave() {
    setTiltState(null);
  }

  // ── Filter ───────────────────────────────────────────────────────────────────
  const filtered = heroes.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
    const role = getRole(h);
    const matchesRole =
      roleFilter === "All" ||
      role === roleFilter.toLowerCase() ||
      // Deadpool (multi) shows under both Vanguard and Duelist
      (role === "multi" && (roleFilter === "Vanguard" || roleFilter === "Duelist"));
    return matchesSearch && matchesRole;
  });

  // ── Loading / error states ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <Loader2 size={36} style={{ color: "var(--accent-teal)", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>Loading heroes...</p>
        <style jsx>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--accent-rose)", marginBottom: "8px" }}>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`

        /* ── Animations ── */
        @keyframes rainbowGlow {
          0%   { filter: hue-rotate(0deg) brightness(1.2); }
          100% { filter: hue-rotate(360deg) brightness(1.2); }
        }
        @keyframes softRainbow {
          0%   { filter: hue-rotate(0deg) saturate(0.6) brightness(1.05); }
          100% { filter: hue-rotate(360deg) saturate(0.6) brightness(1.05); }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Outer link wrapper ── */
        .hero-card-link {
          display: block;
          text-decoration: none;
          cursor: pointer;
          border-radius: 26px;
          animation: cardEntrance 0.55s cubic-bezier(0.22,1,0.36,1) both;
          box-shadow: var(--nm-out);
          /* base transition — JS overrides to 0.1s while mouse is on card */
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s ease;
          position: relative;
          transform-style: preserve-3d;
        }

        /* ── Holo border ── */
        .hero-card-link::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 28px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            #ff0080, #ff8c00, #ffe100,
            #00ff9f, #00cfff, #7b2fff, #ff0080
          );
          background-size: 300% 300%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 10;
        }
        [data-theme="dark"]  .hero-card-link::before { animation: rainbowGlow 3.5s linear infinite; }
        [data-theme="light"] .hero-card-link::before {
          background: linear-gradient(135deg, #ffb3d1, #ffd4a3, #fffaaa, #b3f5d4, #b3eeff, #d4b3ff, #ffb3d1);
          animation: softRainbow 3.5s linear infinite;
        }
        .hero-card-link:hover::before { opacity: 1; }

        /* ── CSS lift (JS tilt replaces this while tracking) ── */
        .hero-card-link:hover {
          box-shadow: var(--nm-out), 0 30px 60px rgba(0,0,0,0.4);
        }
        .hero-card-link:hover .hero-card-portrait { transform: scale(1.08); }
        .hero-card-link:hover .hero-card-info      { transform: translateY(-6px); }

        /* ── Inner card ── */
        .hero-card-inner {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 420px;
          background: #0a0a12;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow:
            inset -4px -4px 8px rgba(255,255,255,0.02),
            6px 6px 20px rgba(0,0,0,0.7);
        }
        [data-theme="light"] .hero-card-inner {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow:
            -6px -6px 12px rgba(255,255,255,0.9),
            6px 6px 16px rgba(180,190,210,0.6);
        }

        /* ── Portrait ── */
        .hero-card-portrait {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
          background: rgba(0,0,0,0.2);
        }
        [data-theme="light"] .hero-card-portrait { background: rgba(0,0,0,0.04); }

        /* ── Info overlay ── */
        .hero-card-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 4;
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        [data-theme="dark"] .hero-card-info {
          background: linear-gradient(to top, #0a0a12 0%, rgba(10,10,18,0.95) 40%, rgba(10,10,18,0.6) 68%, transparent 100%);
        }
        [data-theme="light"] .hero-card-info {
          background: linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.6) 68%, transparent 100%);
        }

        /* ── Role badge ── */
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 8px;
          width: fit-content;
          margin-bottom: 3px;
        }
        [data-theme="dark"]  .role-badge { box-shadow: -2px -2px 4px rgba(255,255,255,0.05), 2px 2px 6px rgba(0,0,0,0.6); }
        [data-theme="light"] .role-badge { box-shadow: -2px -2px 5px rgba(255,255,255,0.9), 2px 2px 5px rgba(150,160,180,0.35); }

        /* ── Light mode text overrides ── */
        [data-theme="light"] .hero-card-name     { color: #1a1d2e !important; -webkit-text-stroke: 0 !important; }
        [data-theme="light"] .hero-card-realname { color: rgba(0,0,0,0.45) !important; }

        /* ── Ability icon pills ── */
        .card-ability-icons { display: flex; gap: 5px; margin-top: 7px; align-items: center; }
        .card-ability-icon  {
          width: 26px; height: 26px;
          border-radius: 7px; overflow: hidden;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        [data-theme="dark"]  .card-ability-icon {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.04);
        }
        [data-theme="light"] .card-ability-icon {
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: inset 2px 2px 4px rgba(150,160,180,0.3), inset -1px -1px 3px rgba(255,255,255,0.85);
        }

        /* ── Active filter button ── */
        .filter-active {
          border: 2px solid transparent !important;
          background-image:
            linear-gradient(var(--bg), var(--bg)),
            linear-gradient(135deg,#ff0080,#ff8c00,#ffe100,#00ff9f,#00cfff,#7b2fff,#ff0080) !important;
          background-origin: border-box !important;
          background-clip: padding-box, border-box !important;
        }

        /* ── Stagger entrance ── */
        .hero-card-link:nth-child(1)  { animation-delay: 0ms;   }
        .hero-card-link:nth-child(2)  { animation-delay: 50ms;  }
        .hero-card-link:nth-child(3)  { animation-delay: 100ms; }
        .hero-card-link:nth-child(4)  { animation-delay: 150ms; }
        .hero-card-link:nth-child(5)  { animation-delay: 200ms; }
        .hero-card-link:nth-child(6)  { animation-delay: 250ms; }
        .hero-card-link:nth-child(7)  { animation-delay: 300ms; }
        .hero-card-link:nth-child(8)  { animation-delay: 350ms; }
        .hero-card-link:nth-child(n+9){ animation-delay: 400ms; }
      `}</style>

      {/* ── PART 3: Filters with role-coloured glow lift ── */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ position: "relative", flex: "1", maxWidth: "400px", minWidth: "200px" }}>
          <Search
            size={16}
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }}
          />
          <input
            type="text"
            placeholder="Search heroes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px" }}
          />
        </div>

        {(["All", "Vanguard", "Duelist", "Strategist"] as const).map((role) => {
          const color = FILTER_GLOW[role];
          const isActive = roleFilter === role;
          const isHov = hoveredFilter === role;
          return (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              onMouseEnter={() => setHoveredFilter(role)}
              onMouseLeave={() => setHoveredFilter(null)}
              className={isActive ? "btn-primary filter-active" : "btn-secondary"}
              style={{
                padding: "8px 22px",
                fontSize: "0.83rem",
                transform: isHov ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHov ? `0 8px 22px ${color}60, var(--nm-out)` : undefined,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {role}
            </button>
          );
        })}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "32px" }}>
        {filtered.length} hero{filtered.length !== 1 ? "es" : ""} found
      </p>

      {/* ── Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "28px" }}>
        {filtered.map((hero, idx) => {
          const role      = getRole(hero);
          const roleColor = getRoleColor(role);
          const abilityIcons = getAbilityIcons(hero);
          const cardId    = String(hero.id || hero.name);
          const isActive  = tiltState?.id === cardId;

          return (
            <a
              key={hero.id || hero.name}
              href={`/heroes/${getHeroSlug(hero)}`}
              className="hero-card-link"
              style={{
                animationDelay: `${Math.min(idx, 8) * 50}ms`,
                // PART 2: JS tilt overrides CSS hover transform
                ...(isActive ? {
                  transform: `perspective(1000px) rotateX(${tiltState!.rotX}deg) rotateY(${tiltState!.rotY}deg) translateY(-14px) scale(1.03)`,
                  transition: "transform 0.1s ease, box-shadow 0.1s ease",
                  boxShadow: `var(--nm-out), 0 32px 64px rgba(0,0,0,0.5)`,
                } : {}),
              }}
              onMouseEnter={(e) => handleCardPointer(e, cardId)}
              onMouseMove={(e)  => handleCardPointer(e, cardId)}
              onMouseLeave={handleCardLeave}
            >
              <div className="hero-card-inner">

                {/* Portrait — z:2 so it sits above the z:1 spotlight glow */}
                <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                  {/* Vignette around portrait edges */}
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: "radial-gradient(ellipse 88% 88% at 50% 50%, transparent 38%, rgba(0,0,0,0.48) 100%)",
                  }} />
                  <img
                    src={getPrestigeIcon(hero.name)}
                    alt={hero.name}
                    className="hero-card-portrait"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.dataset.fallbackTried) { img.style.opacity = "0"; return; }
                      img.dataset.fallbackTried = "1";
                      const raw = hero.imageUrl;
                      if (raw) {
                        img.src = raw.startsWith("/rivals/")
                          ? `https://marvelrivalsapi.com${raw}`
                          : raw;
                      } else {
                        img.style.opacity = "0";
                      }
                    }}
                  />
                </div>

                {/* PART 2: Iridescent spotlight that follows cursor */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      pointerEvents: "none",
                      borderRadius: "24px",
                      background: isDark
                        ? `radial-gradient(circle at ${tiltState!.spotX}% ${tiltState!.spotY}%,
                            rgba(45,212,191,0.22)  0%,
                            rgba(167,139,250,0.18) 35%,
                            rgba(245,158,11,0.12)  60%,
                            rgba(251,113,133,0.07) 75%,
                            transparent 90%)`
                        : `radial-gradient(circle at ${tiltState!.spotX}% ${tiltState!.spotY}%,
                            rgba(255,182,193,0.38)  0%,
                            rgba(176,224,196,0.30)  35%,
                            rgba(215,194,255,0.22)  60%,
                            rgba(255,218,185,0.14)  75%,
                            transparent 90%)`,
                    }}
                  />
                )}

                {/* Info bar */}
                <div className="hero-card-info">

                  {/* Role badge */}
                  <span
                    className="role-badge"
                    style={{ color: roleColor, background: `${roleColor}1a` }}
                  >
                    <span style={{
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: roleColor,
                      boxShadow: `0 0 7px 2px ${roleColor}`,
                      display: "inline-block",
                      flexShrink: 0,
                    }} />
                    {getRoleLabel(role)}
                  </span>

                  {hero.real_name && (
                    <span
                      className="hero-card-realname"
                      style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}
                    >
                      {hero.real_name}
                    </span>
                  )}

                  <h3
                    className="hero-card-name"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      WebkitTextStroke: "1px var(--border)",
                      margin: "2px 0 0",
                    }}
                  >
                    {hero.name}
                  </h3>

                  {abilityIcons.length > 0 && (
                    <div className="card-ability-icons">
                      {abilityIcons.map((iconUrl, i) => (
                        <div key={i} className="card-ability-icon">
                          <img src={iconUrl} alt="" width={18} height={18} style={{ objectFit: "contain" }} />
                        </div>
                      ))}
                      <span style={{
                        marginLeft: "5px",
                        fontSize: "0.56rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}>
                        View Hero →
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
