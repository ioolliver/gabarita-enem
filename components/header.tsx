import Image from "next/image";

export function Header() {
    return <header className="flex justify-between p-8 px-10 md:px-24">
        <div className="flex gap-2 text-center items-center font-bold italic">
            <Image className="w-10 md:w-12" src={"/logo.png"} width={50} height={50} alt="Icone do Machado de Assis. Logo do Gabarita ENEM" />
            <h1 className="text-xl md:text-3xl">Gabarita ENEM</h1>
        </div>
        <div className="flex items-center">
            <div className="bg-indigo-200 flex text-center items-center p-1 rounded-full">
                <a href="#" className="text-white cursor-pointer bg-gradient-to-br from-indigo-500 to-indigo-600 flex text-center items-center py-2 px-12 rounded-full">
                    Entrar
                </a>
            </div>
        </div>
    </header>
}