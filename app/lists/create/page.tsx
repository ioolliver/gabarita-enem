import { Header } from "@/components/header";
import { ListCreator } from "./listCreator";

export default function Page() {
    return (
        <main>
            <Header />
            <section className="bg-white m-4 p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-3xl">Comece a estudar por habilidades agora</h1>
                <ListCreator />
            </section>
        </main>
    )
}