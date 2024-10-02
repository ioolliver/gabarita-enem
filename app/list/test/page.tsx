import { QuestionMarkdown } from "@/components/questionMarkdown";

export default function Page() {
    const content = "![](https://enem.dev/2017/questions/43/b01a5852-707f-4dad-9d93-63376b294f3e.png)\n\n**TEXTO II**  \n**Speto**  \nPaulo César Silva, mais conhecido como Speto, é um grafiteiro paulista envolvido com o _skate_ e a música. O fortalecimento de sua arte ocorreu, em 1999, pela oportunidade de ver de perto as referências que trazia há tempos, ao passar por diversas cidades do Norte do Brasil em uma turnê com a banda O Rappa\n\nRevista Zupi, n. 19, 2010";
    return <QuestionMarkdown content={content} />
}