import { HandCoins, Heart } from "lucide-react";
import { RainbowButton } from "./ui/rainbow-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image";

import PIX from "@/assets/pix.png";

export function DonateButton() {
    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <RainbowButton>
            <div className="flex gap-2 items-center justify-center w-56">
                <HandCoins />
                <span>Faça uma doação</span>
            </div>
        </RainbowButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center justify-center">
            <Heart className="justify-center" fill="black" size={48} />
          <AlertDialogTitle className="text-center">Ajude o projeto a se manter</AlertDialogTitle>
          <AlertDialogDescription>
            Sua doação ajudará com os custos de manter o site. Além disso, seu dinheiro será reinvestido no projeto para que alcance mais pessoas e se torne cada vez mais completo.
          </AlertDialogDescription>
          <AlertDialogDescription>
            PIX abaixo:
          </AlertDialogDescription>
          <Image className="w-1/2" src={PIX} alt="QR CODE do Pix" />
          <AlertDialogDescription className="text-black">
            ISAQUE NASCIMENTO
          </AlertDialogDescription>
          <a className="underline text-xs" href="https://ko-fi.com/gabaritalinguagens" target="_blank">Quer ajudar com cartão de débito/crédito? Doe pelo KoFi</a>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Vou ajudar!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}