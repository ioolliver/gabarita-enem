import Image from "next/image";
import Logo from "@/assets/gabarita-linguagens.png";
import { LoginCard } from "./LoginCard";

export function Header() {
    return (
        <header className="w-full border-b-2 flex items-center justify-between">
            <div className="">
                <a className="flex items-center" href="/">
                    <Image src={Logo} alt="Machado de Assis. Logo do Gabarita Linguagens" className="w-20 p-2" />
                    <h1 className="font-bold text-xl">Gabarita Linguagens</h1>
                </a>
            </div>
            <LoginCard />
        </header>
    )
}