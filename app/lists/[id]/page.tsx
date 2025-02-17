import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import { QuestionList } from "./questionList";
import { PageView } from "@/components/analytics/pageView";

export default async function Page({ params } : { params: Promise<{id: string}> }) {
    const { id } = await params;
    const questionsFetch = await fetch(process.env.API_URL+"list/"+id, { cache: "force-cache" });
    const questions = await questionsFetch.json();

    if(!questions) redirect("/dashboard");

    return (
        <main>
            <PageView title="Lista de questões" />
            <Header />
            <section className="bg-white m-4 p-8 shadow-lg rounded-lg text-center">
                <QuestionList questions={questions} />
            </section>
        </main>
    )
}