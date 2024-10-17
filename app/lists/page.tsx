import { Header } from "@/components/header";
import { Lists } from "./Lists";

export default function Page() {
    return (
        <main className="p-4">
            <Header />
            <div className="flex flex-col justify-center font-semibold items-center mt-12 text-3xl">
                <h1>Suas listas:</h1>
                <Lists />
            </div>
        </main>
    )
}