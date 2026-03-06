"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  async function handleDiscordSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/profile/setup`,
      },
    });
    if (error) {
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile/setup`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage("Could not send signup link. Please try again.");
    } else {
      setMessage("Check your email for a signup link!");
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 1.5rem",
      }}
    >
      <div
        className="neu-card"
        style={{
          padding: "48px 36px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "2rem",
            marginBottom: "8px",
          }}
        >
          Join the <span className="text-gradient">Hub</span>
        </h1>
        <p style={{ marginBottom: "32px", fontSize: "0.95rem" }}>
          Create your ZA Esports Hub account and be counted
        </p>

        <button
          onClick={handleDiscordSignup}
          disabled={loading}
          className="btn-primary touch-target"
          style={{ width: "100%", marginBottom: "16px", background: "#5865F2", gap: "10px" }}
        >
          <MessageCircle size={18} />
          Sign up with Discord
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>or use email</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        </div>

        <form onSubmit={handleEmailSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <Mail
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neu-inset"
              style={{ paddingLeft: "40px" }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-secondary touch-target" style={{ width: "100%" }}>
            Send Magic Link
            <ArrowRight size={16} />
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "0.875rem",
              color: message.includes("Check") ? "var(--accent-teal)" : "var(--accent-rose)",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "24px", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-teal)", textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
