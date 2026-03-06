import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get Into Esports in South Africa ",
  description: "Esports",
};

export default function Page() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "800px" }}>
      <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
         ZA Esports Hub
      </h1>
      <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
        Esports
      </p>

      <div className="neu-card" style={{ padding: "36px 32px", lineHeight: "1.9", fontSize: "1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          A complete guide for South Africans who want to start their competitive gaming journey.|Getting into esports in South Africa can feel overwhelming, but it does not have to be. Start by picking a game you love and learning its competitive fundamentals. Marvel Rivals is a great entry point — it is free to play, has an active ranked mode, and the SA community is welcoming to newcomers. Join local Discord servers to find other players at your skill level. Look for community tournaments — they are low-pressure and a great way to build experience. As you improve, connect with established teams through platforms like ZA Esports Hub. Most importantly, be consistent. The SA esports scene rewards players who show up regularly and contribute positively to the community.
        </p>
        <Link href="/signup" className="btn-primary" style={{ marginTop: "16px" }}>
          Join ZA Esports Hub
        </Link>
      </div>
    </div>
  );
}
