import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Trophy,
  Swords,
  Newspaper,
  MessageCircle,
  Heart,
  Wifi,
  Target,
  Shield,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ZA Esports Hub – Marvel Rivals South Africa | South African Esports & Gaming Community",
  description:
    "A South African esports hub for veterans, newcomers, teams, sponsors, and gamers who want to grow competitive gaming in South Africa.",
};

const features = [
  {
    icon: Target,
    title: "Player Tracker",
    desc: "Track your Marvel Rivals stats, rank history, and hero performance with our API-powered tracker.",
    href: "/heroes",
  },
  {
    icon: Swords,
    title: "Comp Calculator",
    desc: "Build and analyse team compositions. Find synergies, counter-picks, and winning strategies.",
    href: "/tools/comp-calculator",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    desc: "See where SA players rank. Climb the ladder and earn achievement badges along the way.",
    href: "/leaderboard",
  },
  {
    icon: Users,
    title: "Teams & Orgs",
    desc: "Find or create a team. Connect with orgs looking for talent across South Africa.",
    href: "/teams",
  },
  {
    icon: Shield,
    title: "Coaches Hub",
    desc: "Get guidance from experienced coaches or share your knowledge with the community.",
    href: "/coaches",
  },
  {
    icon: MessageCircle,
    title: "Community",
    desc: "Discover SA gaming Discord servers and connect with players who share your passion.",
    href: "/community",
  },
  {
    icon: Newspaper,
    title: "News & Articles",
    desc: "Stay up to date with SA esports news, patch analysis, and community stories.",
    href: "/articles",
  },
  {
    icon: BookOpen,
    title: "Getting Started",
    desc: "New to SA esports? We have guides to help you jump in, find your team, and start competing.",
    href: "/how-to-get-into-esports-south-africa",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 1.5rem 60px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            marginBottom: "20px",
          }}
        >
          Connecting{" "}
          <span className="text-gradient">South African</span>{" "}
          Esports
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            maxWidth: "600px",
            marginBottom: "40px",
            color: "var(--text-secondary)",
            lineHeight: "1.8",
          }}
        >
          A home for every SA gamer — whether you&apos;re Top 500 or just starting out.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/signup" className="btn-primary">
            Join the Hub
          </Link>
          <Link href="/leaderboard" className="btn-secondary">
            View Leaderboards
          </Link>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="section-container" style={{ padding: "60px 1.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          Everything SA Gamers Need
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="neu-card"
              style={{
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <f.icon
                size={28}
                style={{ color: "var(--accent-teal)" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  fontSize: "1.25rem",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: "0.9rem" }}>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── SERVER ADVOCACY ─── */}
      <section
        style={{
          padding: "80px 1.5rem",
          textAlign: "center",
        }}
      >
        <div
          className="section-container neu-card"
          style={{
            padding: "48px 32px",
            maxWidth: "800px",
          }}
        >
          <Wifi
            size={36}
            style={{
              color: "var(--accent-rose)",
              marginBottom: "16px",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              marginBottom: "16px",
            }}
          >
            We Deserve <span className="text-gradient">Local Servers</span>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto 28px",
              fontSize: "1rem",
              lineHeight: "1.8",
            }}
          >
            South African gamers deserve local servers. We&apos;re tracking active
            players across Marvel Rivals to show developers that the demand is
            real. Add yourself. Be counted.
          </p>
          <Link href="/signup" className="btn-primary">
            Add Me to the Count
          </Link>
        </div>
      </section>

      {/* ─── DONATION SECTION ─── */}
      <section
        style={{
          padding: "60px 1.5rem 100px",
          textAlign: "center",
        }}
      >
        <div
          className="section-container neu-card"
          style={{
            padding: "48px 32px",
            maxWidth: "800px",
          }}
        >
          <Heart
            size={36}
            style={{
              color: "var(--accent-rose)",
              marginBottom: "16px",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              marginBottom: "16px",
            }}
          >
            Keep the <span className="text-gradient">Lights On</span>
          </h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto 28px",
              fontSize: "1rem",
              lineHeight: "1.8",
            }}
          >
            ZA Esports Hub is built and paid for by one person — a full-time
            student, full-time employee, and full-time gamer who is very klaar
            with high ping. If you want to help keep the lights on, even R20
            makes a real difference. Every rand goes straight back into the
            platform.
          </p>
          <a href="#" className="btn-primary">
            Donate via PayPal
          </a>
        </div>
      </section>
    </>
  );
}
