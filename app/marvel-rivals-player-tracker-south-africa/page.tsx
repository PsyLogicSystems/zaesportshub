import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marvel Rivals Player Tracker South Africa ",
  description: "Player Tracker",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Player Tracker
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Track your Marvel Rivals stats, rank history, and hero performance as a South African player.|Knowing your stats is the first step to improving. The ZA Esports Hub Player Tracker pulls your Marvel Rivals data through the official API and presents it in a clean, easy-to-read format. See your current rank, rank history across seasons, win rates per hero, and how you compare to other SA players. Link your account once and your profile updates automatically. Your stats also feed into the SA Leaderboard, where you can track your position against the best players in the country. It is free, it is fast, and it is built for the South African community.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
