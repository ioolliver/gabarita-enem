import { Copy, HandCoins, Heart } from "lucide-react";
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
import { CopyCode } from "./copyCode";

const PIX_CODE = "00020101021126580014br.gov.bcb.pix01366aa280b7-beed-4292-a46a-b79894e086735204000053039865802BR5922ISAQUE O DO NASCIMENTO6009SAO PAULO62070503***6304B1AC";
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
          <CopyCode code={PIX_CODE} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Vou ajudar!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}