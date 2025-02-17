'use server';

import Image from "next/image";
import { LoginButton } from "./loginButton";
import Link from "next/link";

export async function Header() {
    return <header className="flex flex-col">
        <div className="flex justify-between items-center p-8 px-10 md:px-24">
            <Link href="/" className="flex gap-2 text-center items-center font-bold italic">
                <Image className="w-10 md:w-12" src={"/logo.png"} width={50} height={50} alt="Icone do Machado de Assis. Logo do Gabarita ENEM" />
                <h1 className="text-xl md:text-3xl">Gabarita ENEM</h1>
            </Link>
            <div className="flex items-center">
                <LoginButton />
            </div>
        </div>
    </header>
}