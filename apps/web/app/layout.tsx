import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zakarya-oukil.vercel.app"),
  title: {
    default: "Zakarya Oukil — Designer, Developer & High-Tech Creative",
    template: "%s — Zakarya Oukil",
  },
  description: "A cinematic personal portfolio for Zakarya Oukil: Graphic Designer, UI/UX Designer and Developer from Algiers, Algeria.",
  keywords: ["Zakarya Oukil", "UI/UX Designer", "Graphic Designer", "Developer", "Cybersecurity", "Next.js", "Portfolio"],
  authors: [{ name: "Zakarya Oukil" }],
  openGraph: {
    title: "Zakarya Oukil — Designer, Developer & High-Tech Creative",
    description: "Premium portfolio experience with three interactive identities: Graphic Designer, UI/UX Designer and Developer.",
    url: "/",
    siteName: "Zakarya Oukil Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${space.variable} ${mono.variable} noise font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
