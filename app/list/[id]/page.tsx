import { QuestionCard } from "@/components/questionCard";
import { List, Question } from "@prisma/client";

export default async function Page({ params: { id } } : { params: { id: string } }) {
    const listReq = await fetch(process.env.API_URL+"/api/list/"+id)
    const list : List = await listReq.json();
    const questions = list.questions as unknown as Question[];

    return (
        <main className="w-full h-full bg-white">
            <h1 className="font-bold text-lg text-center mt-4">Lista {id}</h1>
            <div className="">
            {
                questions.map((question, i) => <QuestionCard index={i} key={question.id} question={question} />)
            }
            </div>
        </main>
    )
}