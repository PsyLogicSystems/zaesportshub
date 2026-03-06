import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "South African Gaming Servers ",
  description: "Gaming Servers",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Gaming Servers
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Why South Africa needs local game servers and what the community is doing about it.|South African gamers consistently deal with 150-200ms ping to European and US servers. This puts us at a massive competitive disadvantage in fast-paced games like Marvel Rivals. Local servers would transform the experience — reducing latency to under 30ms and making competitive play truly fair. ZA Esports Hub is tracking the number of active SA players to build a data-driven case that we can present to game developers. Every player who signs up and links their account adds to this count. We have also partnered with local gaming communities to amplify the message. If you are tired of dying to lag, join the movement.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
