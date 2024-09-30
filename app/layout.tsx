import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className + " bg-white text-black"}>{children}</body>
    </html>
  );
}
