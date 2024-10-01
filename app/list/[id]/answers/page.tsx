import { GabaritoList } from "@/components/gabaritoList";
import { Header } from "@/components/header";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import ShimmerButton from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { List, Question } from "@prisma/client";

export default async function Page({ params: { id }, searchParams: { g } } : { params: { id: string }, searchParams: { g: string } }) {
    const listReq = await fetch(process.env.API_URL+"/api/list/"+id)
    const list : List = await listReq.json();
    const questions = list.questions as unknown as Question[];

    let acertos = 0;
    for(let i = 0; i < questions.length; i++) {
        if(Number(g[i]) == questions[i].correct) acertos++;
    }

    const acertosPercentage = parseFloat(((acertos / questions.length) * 100).toFixed(1));

    return (
        <main className="w-full px-1 md:px-4 py-4 min-h-screen bg-white">
            <Header />
            <div className="">
                <h1 className="font-bold md:text-lg text-center mt-4">Gabarito &#x23;{id}</h1>
                <p className="text-center"><span className="font-bold">Filtro:</span> {
                (list.abilityFilter.length > 0 ? 
                `Essa lista possui exclusivamente as habilidades: ${list.abilityFilter.join(", ")}`
                : "Essa lista possui todas as 30 habilidades misturadas.")
                }</p>
                <p className="text-center"><span className="font-bold">Língua estrangeira:</span> {
                (list.languageFilter > 0 ? 
                `Essa lista pode incluir questões de ${list.languageFilter == 1 ? "inglês" : "espanhol"}.`
                : "Essa lista pode incluir questões de inglês e espanhol.")
                }</p>
            </div>
            <GabaritoList questions={questions} gabarito={g} />
            <div className="w-full flex flex-col p-4">
                <h1 className="text-center font-bold text-4xl">Estatísticas</h1>
                <div className="flex items-center mt-8 gap-4 w-full justify-center">
                    <AnimatedCircularProgressBar min={0} max={100} value={acertosPercentage} gaugePrimaryColor="#22c55e" gaugeSecondaryColor="#ef4444" />
                    <p className="text-2xl">Você acertou {acertos}/{questions.length} ({acertosPercentage}%) das questões!</p>
                </div>
                <div className={cn("w-full p-4 grid grid-cols-1 justify-items-center justify-between items-center", {
                    "md:grid-cols-1": (list.abilityFilter.length <= 1),
                    "md:grid-cols-2": (list.abilityFilter.length == 2),
                    "md:grid-cols-3": (list.abilityFilter.length >= 3)
                })}>
                {
                    list.abilityFilter.map(ability => {
                        let acertosHab = 0;
                        let gabaritoHab = "";
                        let questionsHab = [];
                        for(let i = 0; i < questions.length; i++) {
                            if(questions[i].abilityCode == ability) {
                                gabaritoHab = gabaritoHab + g[i];
                                questionsHab.push(questions[i]);
                            }
                        }
                        if(questionsHab.length == 0) return null;
                        for(let i = 0; i < questionsHab.length; i++) {
                            if(questionsHab[i].correct == Number(gabaritoHab[i])) acertosHab++;
                        }
                        let acertosHabPercentage = parseFloat(((acertosHab / questionsHab.length) * 100).toFixed(1));
                        return (
                            <div key={ability} className="flex items-center my-2 px-4 gap-4 justify-center">
                                <AnimatedCircularProgressBar min={0} max={100} value={acertosHabPercentage} gaugePrimaryColor="#22c55e" gaugeSecondaryColor="#ef4444" />
                                <p className="text-lg">Você acertou {acertosHab}/{questionsHab.length} ({acertosHabPercentage}%) das questões da habilidade {ability}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div className="w-full flex justify-center p-4">
                <a href="/"><ShimmerButton>Voltar</ShimmerButton></a>
            </div>
        </main>
    )
}