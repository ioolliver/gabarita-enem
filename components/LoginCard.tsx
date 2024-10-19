'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from "firebase/auth";
import { FIREBASE_AUTH, GoogleProvider } from "@/database/firebase";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function LoginCard() {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>();

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
    });

    function logOut() {
        signOut(FIREBASE_AUTH);
    }

    function login() {
        signInWithPopup(FIREBASE_AUTH, GoogleProvider)
        .catch((error) => {
            toast({ description: "Não foi possível fazer login. Tente novamente em instantes", variant: "destructive" });
        });
    }

    if(user === undefined) return null;

    return (
        <div className="px-12">
            {
            user ? 
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user.photoURL || "https://i.imgur.com/9r4HHgF.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><a href="/dashboard">Dashboard</a></DropdownMenuItem>
                    <DropdownMenuItem><a href="/lists">Minhas listas</a></DropdownMenuItem>
                    <DropdownMenuItem onClick={logOut}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> : 
            <button className="underline" onClick={login}>Entrar</button>
            }
        </div>
    )
}