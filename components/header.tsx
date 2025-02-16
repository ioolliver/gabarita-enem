'use server';

import Image from "next/image";
import { LoginButton } from "./loginButton";
import Link from "next/link";

function NavBar() {
    return (
        <ul className="flex bg-[#ffffffaa] px-12 py-2 gap-8 rounded-full text-xl shadow-lg">
            <li className="cursor-pointer">
                <a href="https://www.instagram.com/gabarita.linguagens" target="_blank">Instagram</a>
            </li>
        </ul>
    )
}

export async function Header() {
    return <header className="flex flex-col">
        <div className="flex justify-between items-center p-8 px-10 md:px-24">
            <Link href="/" className="flex gap-2 text-center items-center font-bold italic">
                <Image className="w-10 md:w-12" src={"/logo.png"} width={50} height={50} alt="Icone do Machado de Assis. Logo do Gabarita ENEM" />
                <h1 className="text-xl md:text-3xl">Gabarita ENEM</h1>
            </Link>
            <nav className="hidden md:block">
                <NavBar />
            </nav>
            <div className="flex items-center">
                <LoginButton />
            </div>
        </div>
        <div className="flex justify-center">
            <nav className="md:hidden block">
                <NavBar />
            </nav>
        </div>
    </header>
}