'use client';

import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export function CopyCode({ code } : { code: string }) {
    const { toast } = useToast();
    function copyCode() {
        navigator.clipboard.writeText(code)
        .then(() => {
            toast({ description: "Código PIX copiado com sucesso!" });
        })
        .catch(err => {
            toast({ description: "Tente copiar novamente.", variant: "destructive" });
        });
      }
    return (
        <button onClick={copyCode} className="flex gap-2 items-center border-2 border-black rounded-lg px-4 py-1">
            <Copy size={18} />
            <span className="text-xs">Copiar código</span>
        </button>
    )
}