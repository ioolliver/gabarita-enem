import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import { CorrectList } from "./correctList";

export default async function Page({ params, searchParams } : { params: Promise<{id: string}>, searchParams: Promise<{ a: string}> }) {
    const { id } = await params;
    const { a } = await searchParams;
    const questionsFetch = await fetch(process.env.API_URL+"list/"+id, { cache: "force-cache" });
    const questions = await questionsFetch.json();

    if(!questions) redirect("/dashboard");

    return (
        <main>
            <Header />
            <section className="bg-white m-4 p-8 shadow-lg rounded-lg text-center">
                <CorrectList listId={id} questions={questions} answers={a || ""} />
            </section>
        </main>
    )
}