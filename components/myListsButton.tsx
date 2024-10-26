import { BookOpen } from "lucide-react";
import { RainbowButton } from "./ui/rainbow-button";

export function MyListsButton() {
    return (
        <RainbowButton>
            <a href="/lists" className="flex gap-2 items-center justify-center w-56">
                <BookOpen />
                <span>Veja suas listas</span>
            </a>
        </RainbowButton>
    )
}