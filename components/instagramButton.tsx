import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { RainbowButton } from "./ui/rainbow-button";

export function InstagramButton() {
    return (
        <a href="https://www.instagram.com/gabarita.linguagens" target="_blank">
            <RainbowButton>
            <div className="flex gap-2 items-center justify-center w-56">
                <InstagramLogoIcon />
                <span>Siga-nos no Instagram</span>
            </div>
            </RainbowButton>
        </a>
    )
}