'use client';

import Image from "next/image";
import InstagramSVG from "@/assets/instagram.svg";
import { getAnalytics, logEvent } from "firebase/analytics";

export function Footer() {

    function registerEvent() {
        const ANALYTICS = getAnalytics();
        logEvent(ANALYTICS, "social_media", {
            media: "Instagram"
        })
    }

    return <footer className="w-full bg-white h-full mt-32 flex justify-center items-center p-12 flex-col gap-8">
        <p>Gabarita ENEM &copy; 2025</p>
        <a onClick={registerEvent} className="underline" href="https://www.instagram.com/gabaritaoenem/" target="_blank">
            <Image src={InstagramSVG} alt="Instagram" />
        </a>
    </footer>
}