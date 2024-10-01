import { ListCreator } from "@/components/listCreator";
import NumberTicker from "@/components/ui/number-ticker";
import Image from "next/image";

import Logo from "@/assets/gabarita-linguagens.png";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HandCoins } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Header } from "@/components/header";

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
        <h2 className="text-xl font-medium text-justify md:px-16">A prova de Linguagens do ENEM não cobra conteúdos, e sim habilidades. Por isso, a forma correta de estudar para ela não é através de conteúdos tradicionais, mas sim pelas 30 habilidades descritas na Matriz de referência.</h2>
        <h2 className="text-xl font-medium text-justify md:px-16">Desta forma, o Gabarita Linguagens veio com uma proposta inovadora: gerar listas de exercícios personalizadas de acordo com as habilidades selecionadas. É bem fácil: você seleciona as habilidades que deseja treinar, quantas questões deseja e nós geramos uma lista fresquinha para você. Você responde e pode ver como foi o seu desempenho. Dessa forma, gabaritar Linguagens fica fácil.</h2>
      </section>
      <section className="flex text-center flex-col gap-4 my-8">
        <h1 className="text-3xl font-black">O que é o Gabarita Linguagens?</h1>
        <h2 className="text-xl font-medium text-justify md:px-16">O Gabarita Linguagens é um projeto muito recente. Lançado em outubro de 2024, tem como objetivo quebrar o paradigma conteúdista de ensino quando o assunto é a Prova de Linguagens. O projeto, nesse momento, conta com sua ajuda para se manter de pé. Siga-nos nas redes sociais para saber das últimas atualizações, se possível, doe algum valor.</h2>
        <p className="text-sm">OBS: a previsão é que todas as questões do ENEM de 2023 a 2009 sejam cadastradas até 05/10. Depois disso, as questões de provas PPL serão adicionadas até 01/11 (2 dias antes do ENEM). Siga nosso Instagram para ficar por dentro das atualizações.</p>
        <div className="">
          <a href="https://ko-fi.com/gabaritalinguagens" target="_blank">
            <RainbowButton>
              <div className="flex gap-2 items-center justify-center w-56">
                <HandCoins />
                <span>Faça uma doação</span>
              </div>
            </RainbowButton>
          </a>
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
        <ListCreator />
      </div>
    </main>
  );
}
