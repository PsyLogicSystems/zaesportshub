"use client";

import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/heroes", label: "Heroes" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/teams", label: "Teams & Orgs" },
      { href: "/coaches", label: "Coaches" },
      { href: "/tools/comp-calculator", label: "Comp Calculator" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: "Discord Servers" },
      { href: "/articles", label: "News & Articles" },
      { href: "/find-south-african-gamers", label: "Find SA Gamers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/marvel-rivals-south-africa", label: "Marvel Rivals SA" },
      { href: "/how-to-get-into-esports-south-africa", label: "Getting into Esports" },
      { href: "/south-african-gaming-servers", label: "SA Game Servers" },
    ],
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="footer-link">
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        marginTop: "80px",
      }}
    >
      <div
        className="section-container"
        style={{
          padding: "48px 1.5rem 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        {/* Brand column */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "1.25rem",
              marginBottom: "12px",
            }}
          >
            <span className="text-gradient">ZA</span> Esports Hub
          </h4>
          <p style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
            Built with 💚 for the South African esports community.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: "var(--font-heading), sans-serif",
                fontSize: "1rem",
                marginBottom: "12px",
                color: "var(--text-primary)",
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {col.links.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="section-container"
        style={{
          padding: "16px 1.5rem",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
        }}
      >
        <span>&copy; {new Date().getFullYear()} ZA Esports Hub. All rights reserved.</span>
        <span>A passion project for SA gamers 🇿🇦</span>
      </div>

      <style jsx>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--accent-teal);
        }
      `}</style>
    </footer>
  );
}
