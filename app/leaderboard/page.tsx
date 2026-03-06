import type { Metadata } from "next";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

export const metadata: Metadata = {
  title: "Leaderboard | ZA Esports Hub – Marvel Rivals South Africa",
  description: "See where South African Marvel Rivals players rank. Track Top 500 placements and climb the ladder.",
};

export default function LeaderboardPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          SA <span className="text-gradient">Leaderboard</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
          The top Marvel Rivals players in South Africa. Climb the ranks and earn badges.
        </p>
      </div>
      <LeaderboardTable />
    </div>
  );
}
