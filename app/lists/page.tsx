import { Header } from "@/components/header";
import { MyLists } from "./MyLists";

export default function Page() {
    return (
        <main>
            <Header />
            <section className="bg-white m-4 p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-3xl">Suas listas</h1>
                <MyLists />
            </section>
        </main>
    )
}