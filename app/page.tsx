import { Header } from "@/components/header";
import { spectralFont } from "./layout";
import { ArrowRight } from "lucide-react";
import WordPullUp from "@/components/ui/word-pull-up";
import { FadeText } from "@/components/ui/fade-text";

export function Bold({ children } : { children: React.ReactNode }) {
  return <span className="font-semibold">{children}</span>
}

export default function Home() {
  return (
    <main>
      <Header />
      <section className="w-full flex items-center justify-center flex-col mt-16 gap-2 md:gap-6">
        <WordPullUp delayMultiple={2} className={`font-normal text-5xl md:text-6xl p-4 w-full md:w-1/2 text-center ${spectralFont.className}`}>Questões da forma que o ENEM quer que você veja.</WordPullUp>
        <FadeText className={`${spectralFont.className} font-light text-2xl p-4 md:text-3xl md:w-1/2 text-center`}>
        Se você deseja ter sucesso em uma prova que <Bold>todo mundo</Bold> faz, você precisa estudar da forma que <Bold>ninguém</Bold> estuda. Para isso, pare de focar em conteúdo, foque em <Bold>Habilidades</Bold>.</FadeText>
        <a href="#" className="text-white cursor-pointer bg-gradient-to-br from-violet-500 to-violet-700 flex text-center items-center py-2 pl-10 pr-2 rounded-full mt-6 text-2xl justify-between gap-6 hover:scale-110 hover:from-violet-500 hover:to-violet-800 transition-transform">
            <span>Quero aprender</span>
            <ArrowRight size={24} />
        </a>
      </section>
    </main>
  );
}
