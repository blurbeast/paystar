import type React from "react";
import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Sans_3 as Source_Sans_Pro,
} from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
});

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "PayStar - Decentralized Commerce Platform",
  description:
    "Connect your Stellar wallet for secure, trustless transactions powered by smart contracts",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${playfairDisplay.variable} ${sourceSansPro.variable}`}
    >
      <body className="font-sans antialiased">
        <WalletProvider>
          {children}
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}
