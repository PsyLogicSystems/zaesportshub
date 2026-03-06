import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find South African Gamers ",
  description: "South African",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        South African
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Connect with gamers across South Africa for Marvel Rivals, ranked play, and competitive teams.|Finding other South African gamers should not be this hard, but it is — or it was. ZA Esports Hub makes it simple. Create a profile, link your Marvel Rivals account, and instantly become visible to other SA players looking for teammates. Our platform lets you filter by game, rank, region, and playstyle. Looking for a Strategist main in Gauteng for your ranked team? We have got you. Want to find casual players in the Western Cape for late-night sessions? Done. The SA gaming community is bigger than you think — we just needed a place to find each other.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
