import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Gabarita Linguagens",
  description: "Menos conteúdo, mais habilidade. O Gabarita Linguagens é um banco de dados das questões do ENEM separadas por habilidades específicas de acordo com a Matriz de referência oficial da prova.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8127338518265866" />
      </head>
      <body className={inter.className + " bg-white text-black"}>
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
