import { Header } from "@/components/header";
import { Dashboard } from "./dashboard";
import { PageView } from "@/components/analytics/pageView";

export default function Page() {
    return (
        <main>
            <PageView title="Dashboard" />
            <Header />
            <Dashboard />
        </main>
    )
}