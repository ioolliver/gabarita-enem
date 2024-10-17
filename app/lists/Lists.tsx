'use client';

import { FIREBASE_AUTH } from "@/database/firebase";
import { List } from "@prisma/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

function translateDate(date : Date) {
    const data = new Date(date);
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} - ${data.getHours()}:${data.getMinutes()}`;
}

export function Lists() {
    const [user, setUser] = useState<User | null>();
    const [lists, setLists] = useState<List[]>();

    function updateLists(id : string) {
        fetch(window.location.origin+"/api/lists/"+id, { next: { revalidate: 15 } })
        .then(async (r) => {
            let data = await r.json();
            setLists(data.lists);
        })
    }

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (u) => {
            setUser(u);
            if(u?.uid && u?.uid != user?.uid) updateLists(u.uid);
        })
    }, [user?.uid]);


    if(user === undefined || lists === undefined) return null;

    return (
        <div className="w-full">
            {
                !user ? 
                <p className="text-lg">Para ter acesso às suas listas, faça login.</p>
                :
                <ul className="p-4 w-full flex flex-col gap-8">
                    {lists.map((l, i) => (<li className="border-2 px-8 py-4 flex flex-col items-center md:flex-row justify-between w-full" key={l.id}>
                        <div className="">
                            <div className="flex gap-2 items-center">
                                <p className="text-base">Lista #{i+1}</p><p className="text-xs">({l.id})</p>
                            </div>
                            <div className="">
                                <p className="text-base">{l.questions.length} questões</p>
                            </div>
                            <div className="">
                                <p className="text-base">Criada em: {translateDate(l.createdAt)}</p>
                            </div>
                            <div className="">
                                <p className="text-base">Habilidade(s): {l.abilityFilter.length ? l.abilityFilter.join(", ") : "Todas"}</p>
                            </div>
                            <div className="">
                                <p className="text-base">Lingua estrangeira: {l.languageFilter == 0 ? "Ambas" : l.languageFilter == 1 ? "Inglês" : "Espanhol"}</p>
                            </div>
                        </div>
                        <div className="my-4 items-center">
                            <a className="bg-green-600 py-2 px-4 text-base rounded-sm text-white" href={`${window.location.origin}/list/${l.id}`}>Acessar</a>
                        </div>
                    </li>))}
                </ul>
            }
        </div>
    )
}