import { QuestionList } from "@/components/questionList";
import { List } from "@prisma/client";

export default async function Page({ params: { id } } : { params: { id: string } }) {
    console.log(process.env.API_URL+"/api/list/"+id)
    const listReq = await fetch(process.env.API_URL+"/api/list/"+id)
    const list : List = await listReq.json();

    return (
        <main>
            <h1>Lista {id}</h1>
            <QuestionList questions={list.questions as any} />
        </main>
    )
}