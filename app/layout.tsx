import type { Metadata } from "next";
import { IBM_Plex_Mono, Anton } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "YOUR TURN / JORDAN",
  description: "Streetball identity, scored.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${anton.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
