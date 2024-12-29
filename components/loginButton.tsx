'use client';

import { FIREBASE_AUTH, GoogleProvider } from "@/database/firebase";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LoginButton() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        })
    }, []);

    function login() {
        if(user) return;
        signInWithPopup(FIREBASE_AUTH, GoogleProvider);
    }

    return (
    <div className="bg-indigo-200 flex text-center items-center p-1 rounded-full">
        <Link href={user ? "/dashboard" : ""} onClick={login} className="text-white cursor-pointer bg-gradient-to-br from-indigo-500 to-indigo-600 flex text-center items-center py-2 px-12 rounded-full">
            {user ? "Dashboard" : "Entrar"}
        </Link>
    </div>)
}