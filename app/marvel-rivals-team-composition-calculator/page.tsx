import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marvel Rivals Team Composition Calculator ",
  description: "Team Composition",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Team Composition
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Build and analyse Marvel Rivals team compositions with our interactive calculator tool.|Team composition is everything in Marvel Rivals. The right combination of Vanguards, Duelists, and Strategists can turn a close match into a dominant victory. Our Team Composition Calculator lets you drag and drop heroes into a 6-player lineup and instantly see role balance, potential synergies, and suggested alternatives. Whether you are theorycrafting for your next scrim or trying to figure out why your ranked team keeps losing, this tool gives you the data you need. Built specifically with SA players in mind, it takes into account the heroes and strategies that work best in higher-latency environments.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
