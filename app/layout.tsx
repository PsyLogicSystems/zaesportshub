import type { Metadata } from "next";
import { Iceland, Pontano_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const iceland = Iceland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const pontanoSans = Pontano_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZA Esports Hub – Marvel Rivals South Africa | South African Esports & Gaming Community",
  description:
    "A South African esports hub for veterans, newcomers, teams, sponsors, and gamers who want to grow competitive gaming in South Africa.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "ZA Esports Hub – Marvel Rivals South Africa",
    description:
      "A South African esports hub for veterans, newcomers, teams, sponsors, and gamers who want to grow competitive gaming in South Africa.",
    siteName: "ZA Esports Hub",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZA Esports Hub – Marvel Rivals South Africa",
    description:
      "A South African esports hub for veterans, newcomers, teams, sponsors, and gamers who want to grow competitive gaming in South Africa.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${iceland.variable} ${pontanoSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ minHeight: "100vh" }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
