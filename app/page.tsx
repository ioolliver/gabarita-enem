import { ListCreator } from "@/components/listCreator";
import NumberTicker from "@/components/ui/number-ticker";
import Image from "next/image";

import Logo from "@/assets/gabarita-linguagens.png";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HandCoins } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Header } from "@/components/header";
import { DonateButton } from "@/components/donateButton";

// <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>

export default async function Home() {
  const questionsFetch = await fetch(process.env.API_URL+"/api/questions", { next: { revalidate: 60 } })
  const questions = await questionsFetch.json();

  return (
    <main className="bg-white w-full min-h-screen p-4">
      <Header />
      <section className="flex text-center flex-col gap-2 my-4">
        <Image className="m-auto w-3/4 md:h-64 md:w-64" src={Logo} alt="Logo oficial do Gabarita Linguagens: Machado de Assis" />
        <h1 className="text-5xl font-black">Gabarita Linguagens</h1>
        <h2 className="text-2xl font-medium">Mais de <NumberTicker className="font-bold" value={questions.count} /> questões separadas por habilidades, prontas para te levar à sua aprovação.</h2>
      </section>
      <section className="flex text-center flex-col gap-2 my-8">
        <h1 className="text-3xl font-black">O que são habilidades?</h1>
        <h2 className="text-xl font-medium text-justify md:px-16">A prova de Linguagens do ENEM não cobra conteúdos, mas sim habilidades. Por isso, a forma correta de estudar para ela não é por meio de conteúdos tradicionais, mas sim pelas 30 habilidades descritas na Matriz de Referência.</h2>
        <h2 className="text-xl font-medium text-justify md:px-16">Dessa forma, o Gabarita Linguagens traz uma proposta inovadora: gerar listas de exercícios personalizadas de acordo com as habilidades selecionadas. É bem simples: você escolhe as habilidades que deseja treinar, define o número de questões e nós geramos uma lista fresquinha para você. Você responde e pode ver como foi o seu desempenho. Assim, fica fácil gabaritar Linguagens.</h2>
      </section>
      <section className="flex text-center flex-col gap-4 my-8">
        <h1 className="text-3xl font-black">O que é o Gabarita Linguagens?</h1>
        <h2 className="text-xl font-medium text-justify md:px-16">O Gabarita Linguagens é um projeto muito recente. Lançado em outubro de 2024, seu objetivo é quebrar o paradigma conteúdista do ensino tradicional para a Prova de Linguagens. Neste momento, o projeto conta com a sua ajuda para se manter ativo. Siga-nos nas redes sociais para acompanhar as últimas atualizações e, se possível, faça uma doação.</h2>
        <div className="">
          <DonateButton />
        </div>
        <div className="">
          <a href="https://www.instagram.com/gabarita.linguagens" target="_blank">
            <RainbowButton>
              <div className="flex gap-2 items-center justify-center w-56">
                <InstagramLogoIcon />
                <span>Siga-nos no Instagram</span>
              </div>
            </RainbowButton>
          </a>
        </div>
      </section>
      <div className="flex items-center flex-col">
        <h2 className="font-semibold text-2xl">Comece criando uma lista personalizada:</h2>
        <ListCreator initialCountValue={questions.count} />
      </div>
    </main>
  );
}
