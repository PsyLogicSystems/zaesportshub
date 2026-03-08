"use client";

import { useEffect, useRef, useState } from "react";

// ── Wave path generator ──────────────────────────────────────────────────────
function buildWavePath(
  height: number,
  phase: number,
  amplitude: number,
  cursorY: number,
  hovered: boolean,
  cx = 12
): string {
  const N = 32; // more segments = smoother curve
  const segH = height / N;
  let d = `M ${cx.toFixed(1)} 0`;

  for (let i = 0; i < N; i++) {
    const midY = (i + 0.5) * segH;
    const endY = Math.min((i + 1) * segH, height);

    // Two overlapping sine waves at different frequencies for organic feel
    const wave1 = Math.sin(i * 0.55 + phase)        * amplitude;
    const wave2 = Math.sin(i * 1.10 + phase * 1.6)  * amplitude * 0.35;
    const sine  = wave1 + wave2;

    // Cursor bulge: strong push outward near mouse position
    let bulge = 0;
    if (hovered) {
      const dist = Math.abs(midY - cursorY);
      const prox = Math.max(0, 1 - dist / (height * 0.12));
      // Cubic falloff for sharp, punchy bulge
      bulge = prox * prox * amplitude * 3.5;
    }

    const ctrlX = (cx + sine + bulge).toFixed(1);
    d += ` Q ${ctrlX} ${midY.toFixed(1)} ${cx.toFixed(1)} ${endY.toFixed(1)}`;
  }
  return d;
}

// ── Component ────────────────────────────────────────────────────────────────
export function HoloRod() {
  const [isDark,    setIsDark]    = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlash,   setIsFlash]   = useState(false);

  const mainPathRef = useRef<SVGPathElement | null>(null);
  const glowPathRef = useRef<SVGPathElement | null>(null);
  const flashTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation refs — never trigger React re-renders
  const phaseRef    = useRef(0);
  const ampRef      = useRef(4);    // start with visible rest amplitude
  const ampVelRef   = useRef(0);
  const cursorYRef  = useRef(300);
  const hoveredRef  = useRef(false);

  // ── Theme tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  // ── rAF animation loop ──────────────────────────────────────────────────────
  useEffect(() => {
    let raf: number;

    function frame() {
      const h = window.innerHeight;

      // Spring physics: amplitude → target
      // High target + low damping = elastic, bouncy overshoot
      const targetAmp = hoveredRef.current ? 16 : 4;
      const force = (targetAmp - ampRef.current) * 0.13;
      ampVelRef.current = ampVelRef.current * 0.76 + force; // lower damping = more bounce
      ampRef.current   += ampVelRef.current;

      // Phase advance (faster when hovered for more fluid motion)
      phaseRef.current += hoveredRef.current ? 0.08 : 0.042;

      const path = buildWavePath(
        h,
        phaseRef.current,
        ampRef.current,
        cursorYRef.current,
        hoveredRef.current
      );

      mainPathRef.current?.setAttribute("d", path);
      glowPathRef.current?.setAttribute("d", path);

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []); // Empty — refs drive all state, no re-runs needed

  // ── Event handlers ──────────────────────────────────────────────────────────
  function handleMouseEnter(e: React.MouseEvent) {
    hoveredRef.current = true;
    cursorYRef.current = e.clientY;
    setIsHovered(true);
  }
  function handleMouseMove(e: React.MouseEvent) {
    cursorYRef.current = e.clientY;
  }
  function handleMouseLeave() {
    hoveredRef.current = false;
    setIsHovered(false);
  }
  function handleClick() {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setIsFlash(true);
    flashTimer.current = setTimeout(() => setIsFlash(false), 650);
  }

  // ── Gradient stops ──────────────────────────────────────────────────────────
  type Stop = { offset: string; color: string };

  const stops: Stop[] = isFlash
    ? isDark
      ? [
          { offset: "0%",   color: "#2dd4bf" },
          { offset: "25%",  color: "#a78bfa" },
          { offset: "50%",  color: "#f59e0b" },
          { offset: "75%",  color: "#fb7185" },
          { offset: "100%", color: "#00cfff" },
        ]
      : [
          { offset: "0%",   color: "#ffb3d1" },
          { offset: "25%",  color: "#b3eeff" },
          { offset: "50%",  color: "#fffaaa" },
          { offset: "75%",  color: "#d4b3ff" },
          { offset: "100%", color: "#b3f5d4" },
        ]
    : isHovered
    ? isDark
      ? [
          { offset: "0%",   color: "rgba(45,212,191,0.95)" },
          { offset: "50%",  color: "rgba(167,139,250,0.90)" },
          { offset: "100%", color: "rgba(45,212,191,0.95)" },
        ]
      : [
          { offset: "0%",   color: "rgba(255,182,193,0.95)" },
          { offset: "50%",  color: "rgba(176,224,196,0.90)" },
          { offset: "100%", color: "rgba(215,194,255,0.95)" },
        ]
    : isDark
    ? [
        { offset: "0%",   color: "rgba(167,139,250,0.28)" },
        { offset: "50%",  color: "rgba(45,212,191,0.38)" },
        { offset: "100%", color: "rgba(167,139,250,0.28)" },
      ]
    : [
        { offset: "0%",   color: "rgba(215,194,255,0.38)" },
        { offset: "50%",  color: "rgba(176,224,196,0.48)" },
        { offset: "100%", color: "rgba(215,194,255,0.38)" },
      ];

  const glowColor = isDark
    ? isFlash ? "rgba(45,212,191,0.7)"   : isHovered ? "rgba(167,139,250,0.5)"  : "rgba(167,139,250,0.15)"
    : isFlash ? "rgba(255,182,193,0.75)" : isHovered ? "rgba(215,194,255,0.55)" : "rgba(215,194,255,0.20)";

  const strokeW = isHovered || isFlash ? 5 : 3;
  const glowW   = isHovered || isFlash ? 22 : 8;
  const glowOp  = isFlash ? 0.85 : isHovered ? 0.6 : 0.18;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        left:          0,
        top:           0,
        height:        "100vh",
        width:         "32px",
        zIndex:        9990,
        cursor:        "pointer",
        pointerEvents: "auto",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top:      0,
          left:     0,
          width:    "32px",
          height:   "100vh",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Vertical gradient spanning bounding box of path */}
          <linearGradient id="holoRodGrad" x1="0" y1="0" x2="0" y2="1">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>

          {/* Glow blur filter */}
          <filter id="holoRodGlow" x="-300%" y="-5%" width="700%" height="110%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow halo — wider, blurred, same path as main */}
        <path
          ref={glowPathRef}
          stroke={glowColor}
          strokeWidth={glowW}
          fill="none"
          strokeLinecap="round"
          opacity={glowOp}
          filter="url(#holoRodGlow)"
          style={{ transition: "opacity 0.35s ease, stroke-width 0.3s ease" }}
        />

        {/* Main visible rod */}
        <path
          ref={mainPathRef}
          stroke="url(#holoRodGrad)"
          strokeWidth={strokeW}
          fill="none"
          strokeLinecap="round"
          style={{ transition: "stroke-width 0.28s ease" }}
        />
      </svg>
    </div>
  );
}
