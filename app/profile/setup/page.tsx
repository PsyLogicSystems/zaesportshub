"use client";

import { useState } from "react";
import { Save, User, Gamepad2 } from "lucide-react";

const AVATAR_LAYERS = [
  { key: "bg", label: "Background", count: 6 },
  { key: "base", label: "Base Body", count: 4 },
  { key: "skin", label: "Skin Tone", count: 6 },
  { key: "hair", label: "Hair", count: 8 },
  { key: "eyes", label: "Eyes", count: 6 },
  { key: "accessory", label: "Accessories", count: 8 },
];

export default function ProfileSetupPage() {
  const [username, setUsername] = useState("");
  const [rivalsUsername, setRivalsUsername] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [avatar, setAvatar] = useState<Record<string, number | null>>({
    bg: 0, base: 0, skin: 0, hair: null, eyes: null, accessory: null,
  });

  function selectLayer(key: string, index: number) {
    setAvatar((prev) => ({
      ...prev,
      [key]: prev[key] === index ? null : index,
    }));
  }

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "900px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Set Up Your <span className="text-gradient">Profile</span>
        </h1>
        <p style={{ fontSize: "1.05rem" }}>
          Customise your identity on ZA Esports Hub.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
        {/* Left: Avatar builder */}
        <div>
          <h3 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "20px" }}>
            Avatar Builder
          </h3>

          {/* Preview */}
          <div
            className="neu-card"
            style={{
              width: "280px",
              height: "280px",
              margin: "0 auto 24px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <User size={80} style={{ color: "var(--text-muted)" }} />
            <span
              style={{
                position: "absolute",
                bottom: "12px",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
              }}
            >
              Assets coming soon
            </span>
          </div>

          {/* Layer selectors */}
          {AVATAR_LAYERS.map((layer) => (
            <div key={layer.key} style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                {layer.label}
              </label>
              <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
                {Array.from({ length: layer.count }).map((_, i) => {
                  const selected = avatar[layer.key] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectLayer(layer.key, i)}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        border: selected ? "2px solid var(--accent-teal)" : "1px solid var(--border-subtle)",
                        background: selected ? "rgba(125,211,252,0.12)" : "var(--bg-elevated)",
                        boxShadow: selected ? "var(--glow-teal)" : "var(--neu-raised)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: selected ? "var(--accent-teal)" : "var(--text-muted)",
                        fontSize: "1rem",
                        transition: "var(--transition-smooth)",
                        flexShrink: 0,
                      }}
                    >
                      ✦
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Profile details */}
        <div>
          <h3 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "20px" }}>
            Profile Details
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Your display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="neu-inset"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Marvel Rivals Username
              </label>
              <div style={{ position: "relative" }}>
                <Gamepad2
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
                  placeholder="Your in-game name"
                  value={rivalsUsername}
                  onChange={(e) => setRivalsUsername(e.target.value)}
                  className="neu-inset"
                  style={{ paddingLeft: "40px" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Discord Handle
              </label>
              <input
                type="text"
                placeholder="username#0000"
                value={discordHandle}
                onChange={(e) => setDiscordHandle(e.target.value)}
                className="neu-inset"
              />
            </div>

            <button className="btn-primary touch-target" style={{ width: "100%", marginTop: "12px" }}>
              <Save size={16} />
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
