"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/heroes", label: "Heroes" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/teams", label: "Teams" },
  { href: "/coaches", label: "Coaches" },
  { href: "/articles", label: "News" },
  { href: "/community", label: "Community" },
  { href: "/tools/comp-calculator", label: "Comp Tool" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="nav-frosted"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
      }}
    >
      <nav
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "1.5rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          <span className="text-gradient">ZA</span> Esports Hub
        </Link>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="touch-target"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "999px",
              boxShadow: "var(--neu-raised)",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              color: "var(--text-primary)",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Login button */}
          <Link href="/login" className="btn-primary" style={{ padding: "8px 24px", fontSize: "0.875rem" }}>
            Sign In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="mobile-menu-btn touch-target"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            display: "none",
          }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          />

          {/* Panel */}
          <div
            className="mobile-panel"
            style={{
              position: "relative",
              width: "280px",
              maxWidth: "80vw",
              height: "100%",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="touch-target"
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              <X size={24} />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "12px 0",
                  fontSize: "1.1rem",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={toggleTheme}
                className="btn-secondary touch-target"
                style={{ justifyContent: "center" }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              <Link
                href="/login"
                className="btn-primary touch-target"
                onClick={() => setMobileOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
