'use client'

import { LoginRequired } from "@/components/loginRequired";
import { Skeleton } from "@/components/ui/skeleton";
import { FIREBASE_AUTH } from "@/database/firebase"
import { useToast } from "@/hooks/use-toast";
import { List, ListAnswer } from "@prisma/client";
import { onAuthStateChanged, User } from "firebase/auth"
import Link from "next/link";
import { useEffect, useState } from "react"

export function MyLists() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [lists, setLists] = useState<List[] | null>(null);
    const [answeredLists, setAnsweredLists] = useState<ListAnswer[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        })
    });

    useEffect(() => {
        async function fetchLists() {
            if(!user) return;
            const listsFetch = await fetch(window.origin+"/api/user/lists/"+user.uid, { next: { revalidate: 60 } });
            const data = await listsFetch.json();
            setLists(data.lists);
            setAnsweredLists(data.answeredLists);
        }
        fetchLists();
    }, [user])

    function getFormatedDate(dateString : string | Date) {
        function pad(number: number) {
            if(number <= 9) return "0" + number;
            return number;
        }
        const date = new Date(dateString);
        return `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`;
    }

    function openingList() {
        toast({ description: "Abrindo lista..." })
    }

    if(user === undefined || lists == null) return (
        <div className="py-8 flex flex-col gap-4">   
            <Skeleton className="w-full h-12 rounded-full" />
            <Skeleton className="w-full h-12 rounded-full" />
            <Skeleton className="w-full h-12 rounded-full" />
            <Skeleton className="w-full h-12 rounded-full" />
        </div>
    )

    if(user === null) return <LoginRequired />

    return (
        <div>
            <ul className="flex flex-col gap-8 py-8">
                {
                    lists.map(list => {
                        const answered = answeredLists.find(a => a.listId == list.id);
                        return (
                            <li key={list.id} className="border-2 rounded-lg p-4 flex justify-between items-center">
                                <h1>Lista {list.id}</h1>
                                <p>Área: {list.area.toUpperCase()}</p>
                                <p>{list.questions.length} questões</p>
                                <p>{getFormatedDate(list.createdAt)}</p>
                                {
                                    answered ? 
                                    <p>Nota: {answered.corrects}/{answered.total}</p>
                                    : <p>Não respondida</p>
                                }
                                <Link onClick={openingList} className="bg-green-500 text-white p-2 rounded-lg" href={"/lists/"+list.id+(answered ? "/answers?a="+answered.answers : "")}>{answered ? "Visualizar" : "Responder"}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}