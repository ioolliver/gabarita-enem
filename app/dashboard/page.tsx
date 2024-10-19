import { Header } from "@/components/header";
import { Dashboard } from "./dashboard";

export default function Page() {
    return (
        <main className="p-4">
            <Header />
            <Dashboard />
        </main>
    )
}