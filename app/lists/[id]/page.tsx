import { Header } from "@/components/header";

export default function Page() {
    return (
        <main>
            <Header />
            <section className="bg-white m-4 p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-3xl">Você chegou cedo demais! Admiramos sua vontade de começar a estudar já em Janeiro, mas o Gabarita ENEM está passando por reformas para deixar o aplicativo o melhor possível para você. Por isso, pedimos paciência e boas férias!</h1>
            </section>
        </main>
    )
}