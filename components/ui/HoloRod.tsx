"use client";

import { useState, useEffect, useRef } from "react";

/**
 * HoloRod — a decorative holographic vertical bar fixed to the left edge of
 * every page. Expands and glows when hovered, with a light that chases the
 * cursor. Flashes the full holo gradient on click.
 */
export function HoloRod() {
  const [isHovered,  setIsHovered]  = useState(false);
  const [clickFlash, setClickFlash] = useState(false);
  const [cursorY,    setCursorY]    = useState(0);
  const [isDark,     setIsDark]     = useState(true);

  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track theme
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setCursorY(e.clientY);
  }

  function handleClick() {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setClickFlash(true);
    flashTimer.current = setTimeout(() => setClickFlash(false), 600);
  }

  // Colours for the glow that follows the cursor
  const darkGlow  = `radial-gradient(ellipse 100% 90px at 50% ${cursorY}px,
      rgba(45,212,191,0.85)  0%,
      rgba(167,139,250,0.60) 38%,
      rgba(245,158,11,0.32)  65%,
      transparent 85%)`;

  const lightGlow = `radial-gradient(ellipse 100% 90px at 50% ${cursorY}px,
      rgba(255,182,193,0.90) 0%,
      rgba(176,224,196,0.65) 38%,
      rgba(215,194,255,0.38) 65%,
      transparent 85%)`;

  // Full holo gradient for the click flash
  const holoFlash = isDark
    ? "linear-gradient(to bottom, #2dd4bf, #a78bfa, #f59e0b, #fb7185, #00cfff, #2dd4bf)"
    : "linear-gradient(to bottom, #ffb3d1, #b3eeff, #fffaaa, #b3f5d4, #d4b3ff, #ffb3d1)";

  // Resting appearance — carved-in neumorphic groove
  const restBackground = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
    : "linear-gradient(to bottom, rgba(180,190,210,0.28), rgba(255,255,255,0.65), rgba(180,190,210,0.28))";

  const rodBackground = clickFlash
    ? holoFlash
    : isHovered
    ? (isDark ? darkGlow : lightGlow)
    : restBackground;

  const rodGlow = clickFlash
    ? isDark
      ? "0 0 20px 7px rgba(45,212,191,0.65), 0 0 42px 14px rgba(167,139,250,0.45)"
      : "0 0 20px 7px rgba(255,182,193,0.75), 0 0 42px 14px rgba(215,194,255,0.55)"
    : isHovered
    ? isDark
      ? "0 0 10px 3px rgba(45,212,191,0.38), 0 0 22px 7px rgba(167,139,250,0.22)"
      : "0 0 10px 3px rgba(255,182,193,0.48), 0 0 22px 7px rgba(215,194,255,0.30)"
    : isDark
    ? "inset 2px 0 5px rgba(0,0,0,0.55), inset -1px 0 2px rgba(255,255,255,0.04), 0 0 6px rgba(167,139,250,0.08)"
    : "inset 2px 0 5px rgba(180,190,210,0.5), inset -1px 0 3px rgba(255,255,255,0.9), 0 0 6px rgba(124,58,237,0.06)";

  return (
    /* Hit area: 32 px wide, full height, fixed to left edge */
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left:     0,
        top:      0,
        height:   "100vh",
        width:    "32px",
        zIndex:   9990,
        display:  "flex",
        alignItems: "stretch",
        paddingLeft: "10px",   // rod centre sits ~12 px from left edge
        cursor:   "pointer",
        pointerEvents: "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* The visible rod */}
      <div
        style={{
          width:        (isHovered || clickFlash) ? "6px" : "3px",
          height:       "100%",
          borderRadius: "4px",
          background:   rodBackground,
          boxShadow:    rodGlow,
          transition:   clickFlash
            ? "box-shadow 0.1s ease"
            : "width 0.28s ease, box-shadow 0.32s ease, background 0.38s ease",
        }}
      />
    </div>
  );
}
