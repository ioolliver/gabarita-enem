import Image from "next/image";
import Logo from "@/assets/gabarita-linguagens.png";

export function Header() {
    return (
        <header className="w-full border-b-2 flex items-center">
            <a className="flex items-center" href="/">
                <Image src={Logo} alt="Logo do Gabarita Linguagens. Machado de Assis." className="w-20 p-2" />
                <h1 className="font-bold text-xl">Gabarita Linguagens</h1>
            </a>
        </header>
    )
}