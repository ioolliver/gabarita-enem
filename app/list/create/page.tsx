import { Header } from "@/components/header";
import { ListCreator } from "@/components/listCreator";

export default async function Page() {
    const questionsFetch = await fetch(process.env.API_URL+"/api/questions", { next: { revalidate: 60 } })
    const questions = await questionsFetch.json();

    return (
        <div className="">
            <Header />
            <ListCreator initialCountValue={questions.count} />
        </div>
    )
}