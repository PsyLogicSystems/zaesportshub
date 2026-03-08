"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

const IMAGE_BASE = "https://marvelrivalsapi.com/rivals";
const PRESTIGE_BASE = "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/hero-prestige-images";

interface Hero {
  id: string | number;
  name: string;
  real_name?: string;
  role?: string;
  imageUrl?: string;
  abilities?: { icon?: string; type?: string }[];
}

export function HeroGrid() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  useEffect(() => {
    async function loadHeroes() {
      try {
        const res = await fetch("/api/heroes");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const heroList: Hero[] = Array.isArray(data) ? data : data.heroes || data.data || [];

        // Deduplicate by name (case-insensitive) — keeps the first occurrence
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

  function getRole(hero: Hero): string {
    // Use String() so the function works even if `role` is a number or object
    const r = String(hero.role ?? "").toLowerCase().trim();
    if (r.includes("vanguard") || r === "tank") return "vanguard";
    if (r.includes("duelist") || r === "damage" || r === "dps") return "duelist";
    if (r.includes("strategist") || r === "support" || r === "healer") return "strategist";
    return r || "unknown";
  }

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

  function getRoleColor(role: string): string {
    if (role === "vanguard") return "#60a5fa";
    if (role === "duelist") return "#f87171";
    if (role === "strategist") return "#34d399";
    return "#a78bfa";
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

  const filtered = heroes.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || getRole(h) === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

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

        /*
         * KEY FIX: Two-layer structure.
         * .hero-card-wrapper  → holds the holo border (NO overflow:hidden)
         * .hero-card-inner    → clips the portrait image (overflow:hidden)
         * Both sit inside the <a> tag.
         */

        /* ── Outer link wrapper ── */
        .hero-card-link {
          display: block;
          text-decoration: none;
          cursor: pointer;
          border-radius: 26px;
          animation: cardEntrance 0.55s cubic-bezier(0.22,1,0.36,1) both;
          /* Neumorphic shadow on the outer wrapper */
          box-shadow: var(--nm-out);
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.45s ease;
          position: relative;
        }

        /* ── Holo border lives on the wrapper (not clipped) ── */
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
        [data-theme="dark"]  .hero-card-link::before {
          animation: rainbowGlow 3.5s linear infinite;
        }
        [data-theme="light"] .hero-card-link::before {
          background: linear-gradient(
            135deg,
            #ffb3d1, #ffd4a3, #fffaaa,
            #b3f5d4, #b3eeff, #d4b3ff, #ffb3d1
          );
          animation: softRainbow 3.5s linear infinite;
        }

        /* Show border on hover */
        .hero-card-link:hover::before { opacity: 1; }

        /* ── Hover: lift the whole card ── */
        .hero-card-link:hover {
          transform: translateY(-12px) scale(1.025);
          box-shadow:
            var(--nm-out),
            0 30px 60px rgba(0,0,0,0.5);
        }
        .hero-card-link:hover .hero-card-portrait {
          transform: scale(1.08);
        }
        .hero-card-link:hover .hero-card-info {
          transform: translateY(-6px);
        }

        /* ── Inner card: clips portrait ── */
        .hero-card-inner {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 420px;
          border: 1px solid var(--border);
          background: linear-gradient(160deg, var(--bg-secondary) 0%, var(--bg) 100%);
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

        /* ── Info overlay ── */
        .hero-card-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 2;
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        [data-theme="dark"] .hero-card-info {
          background: linear-gradient(
            to top,
            rgba(8,8,16,0.97) 0%,
            rgba(8,8,16,0.82) 55%,
            transparent 100%
          );
        }
        [data-theme="light"] .hero-card-info {
          background: linear-gradient(
            to top,
            rgba(212,218,230,0.98) 0%,
            rgba(212,218,230,0.88) 55%,
            transparent 100%
          );
        }

        /* ── Role badge — neumorphic raised pill ── */
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
        [data-theme="dark"] .role-badge {
          box-shadow:
            -2px -2px 4px rgba(255,255,255,0.05),
             2px  2px 6px rgba(0,0,0,0.6);
        }
        [data-theme="light"] .role-badge {
          box-shadow:
            -2px -2px 5px rgba(255,255,255,0.9),
             2px  2px 5px rgba(150,160,180,0.35);
        }

        /* ── Light mode text ── */
        [data-theme="light"] .hero-card-name {
          color: #1a1d2e !important;
          -webkit-text-stroke: 0 !important;
        }
        [data-theme="light"] .hero-card-realname {
          color: rgba(0,0,0,0.45) !important;
        }

        /* ── Ability icon pills ── */
        .card-ability-icons {
          display: flex;
          gap: 5px;
          margin-top: 7px;
          align-items: center;
        }
        .card-ability-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        [data-theme="dark"] .card-ability-icon {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow:
            inset 2px 2px 5px rgba(0,0,0,0.5),
            inset -1px -1px 3px rgba(255,255,255,0.04);
        }
        [data-theme="light"] .card-ability-icon {
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow:
            inset 2px 2px 4px rgba(150,160,180,0.3),
            inset -1px -1px 3px rgba(255,255,255,0.85);
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

      {/* ── Filters ── */}
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
        {["All", "Vanguard", "Duelist", "Strategist"].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={roleFilter === role ? "btn-primary filter-active" : "btn-secondary"}
            style={{ padding: "8px 22px", fontSize: "0.83rem" }}
          >
            {role}
          </button>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "32px" }}>
        {filtered.length} hero{filtered.length !== 1 ? "es" : ""} found
      </p>

      {/* ── Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "28px",
      }}>
        {filtered.map((hero, idx) => {
          const role = getRole(hero);
          const roleColor = getRoleColor(role);
          const abilityIcons = getAbilityIcons(hero);

          return (
            <a
              key={hero.id || hero.name}
              href={`/heroes/${getHeroSlug(hero)}`}
              className="hero-card-link"
              style={{ animationDelay: `${Math.min(idx, 8) * 50}ms` }}
            >
              {/* Inner clipping card */}
              <div className="hero-card-inner">

                {/* Portrait */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <img
                    src={getPrestigeIcon(hero.name)}
                    alt={hero.name}
                    className="hero-card-portrait"
                    onError={(e) => {
                      const img = e.currentTarget;
                      // Only try the fallback once — prevents infinite retry loop
                      if (img.dataset.fallbackTried) {
                        img.style.opacity = "0";
                        return;
                      }
                      img.dataset.fallbackTried = "1";
                      const raw = hero.imageUrl;
                      if (raw) {
                        // Relative paths from the API need the external base URL
                        img.src = raw.startsWith("/rivals/")
                          ? `https://marvelrivalsapi.com${raw}`
                          : raw;
                      } else {
                        img.style.opacity = "0";
                      }
                    }}
                  />
                </div>

                {/* Info bar */}
                <div className="hero-card-info">

                  {/* Role badge */}
                  <span
                    className="role-badge"
                    style={{
                      color: roleColor,
                      background: `${roleColor}1a`,
                    }}
                  >
                    <span style={{
                      width: "5px", height: "5px",
                      borderRadius: "50%",
                      background: roleColor,
                      boxShadow: `0 0 7px 2px ${roleColor}`,
                      display: "inline-block",
                      flexShrink: 0,
                    }} />
                    {role}
                  </span>

                  {hero.real_name && (
                    <span
                      className="hero-card-realname"
                      style={{
                        fontSize: "0.6rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.06em",
                      }}
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
                          <img
                            src={iconUrl}
                            alt=""
                            width={18}
                            height={18}
                            style={{ objectFit: "contain" }}
                          />
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
