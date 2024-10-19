'use client';

import { FIREBASE_AUTH } from "@/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export function DashboardRedirector() {
    const router = useRouter();
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if(user) router.push("/dashboard");
    });
    return null;
}