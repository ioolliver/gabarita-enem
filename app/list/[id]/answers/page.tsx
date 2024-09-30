import { GabaritoList } from "@/components/gabaritoList";
import { Header } from "@/components/header";
import { List, Question } from "@prisma/client";

export default async function Page({ params: { id }, searchParams: { g } } : { params: { id: string }, searchParams: { g: string } }) {
    const listReq = await fetch(process.env.API_URL+"/api/list/"+id)
    const list : List = await listReq.json();
    const questions = list.questions as unknown as Question[];

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
            <div className="font-bold text-2xl">
                <h1>Estatísticas</h1>
            </div>
        </main>
    )
}