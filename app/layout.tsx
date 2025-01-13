import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const kanitFont = Kanit({
  subsets: ["latin"],
  weight: ["500", "800", "900"]
});

export const metadata: Metadata = {
  title: "Gabarita ENEM",
  keywords: ["gabarita", "enem", "habilidades", "matriz", "referência", "linguagens", "vestibular", "banco", "questões"],
  description: "O maior e único banco de questões por habilidades do ENEM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${kanitFont.className} antialiased overflow-x-hidden`}
      >
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
