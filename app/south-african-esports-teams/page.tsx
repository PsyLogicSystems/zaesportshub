import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "South African Esports Teams ",
  description: "Esports Teams",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Esports Teams
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Browse and join South African esports teams competing in Marvel Rivals and other titles.|The South African esports team scene is growing rapidly. From established organisations to grassroots squads formed in Discord voice channels, there is a team for every skill level. ZA Esports Hub maintains a comprehensive directory of SA esports teams. Each team profile includes their roster, game focus, region, and recruitment status. If you are a free agent looking for a home, browse the directory and reach out to teams that match your goals. If you already have a team, register it on the platform to increase your visibility and attract new talent.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
