import { Header } from "@/components/header";
import { Dashboard } from "./dashboard";
import { PageView } from "@/components/analytics/pageView";
import { Footer } from "@/components/footer";

export default function Page() {
    return (
        <main>
            <PageView title="Dashboard" />
            <Header />
            <Dashboard />
            <Footer />
        </main>
    )
}