import { BookText } from "lucide-react";
import { RainbowButton } from "./ui/rainbow-button";

export function CreateListButton() {
    return (
        <RainbowButton>
            <a href="/list/create" className="flex gap-2 items-center justify-center w-56">
                <BookText />
                <span>Crie uma lista</span>
            </a>
        </RainbowButton>
    )
}