import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "South African Gaming Discord Servers ",
  description: "Discord Servers",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Discord Servers
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Find the best South African gaming Discord servers for Marvel Rivals, Valorant, and more.|Discord is where the SA gaming community lives. Finding the right servers can be the difference between playing solo and having a full squad every night. ZA Esports Hub maintains a curated directory of South African gaming Discord servers, verified and categorised by game, region, and activity level. Whether you are looking for Marvel Rivals teammates in Cape Town, Valorant scrims in Johannesburg, or a casual gaming community in Durban, our directory has you covered. Each listing includes member counts, game tags, and direct invite links so you can jump in immediately.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
