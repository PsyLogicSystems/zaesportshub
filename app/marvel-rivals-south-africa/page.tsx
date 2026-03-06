import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marvel Rivals South Africa ",
  description: "South Africa",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        South Africa
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          The home of Marvel Rivals in South Africa. Track stats, find teams, and connect with the SA competitive community.|Marvel Rivals is growing fast in South Africa, and ZA Esports Hub is the central platform for SA players. Whether you are pushing ranked, looking for a team, or just want to connect with other local players, this is your home. We track player stats through the Marvel Rivals API, run leaderboards for SA players, and maintain a directory of local teams and Discord communities. High ping is a reality for SA gamers, but that has not stopped us from competing at the highest level. Join us as we build the case for local servers and grow the SA Marvel Rivals scene together.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
