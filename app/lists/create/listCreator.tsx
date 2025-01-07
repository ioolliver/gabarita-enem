'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { FIREBASE_AUTH } from "@/database/firebase";
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged, User } from "firebase/auth";
import { Album } from "lucide-react";
import { useEffect, useState } from "react"
import axios from "axios";
import NumberTicker from "@/components/ui/number-ticker";
import { redirect } from "next/navigation";
import { LoginRequired } from "@/components/loginRequired";
  

export function ListCreator() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [area, setArea] = useState("");
    const [foreign, setForeign] = useState("");
    const [abilities, setAbilities] = useState<string[]>([]);
    const [listLen, setListLen] = useState(5);
    const [questionsCount, setQuestionsCount] = useState(0);
    const { toast } = useToast();

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        })
    });

    if(user === undefined) return (
        <div className="flex p-16 w-full flex-col gap-8">
            <Skeleton className="w-full h-12 rounded-full" />
            <Skeleton className="w-full h-12 rounded-full" />
            <Skeleton className="w-full h-12 rounded-full" />
        </div>
    )

    if(user === null) return <LoginRequired />

    const options = [];
    for(let i = 1; i <= 30; i++) options.push({ value: i+"", label: "Habilidade " + i, icon: Album });

    function willForeignLanguageApply() {
        return (area === "lc" && 
        (abilities.includes("5") || abilities.includes("6") || abilities.includes("7") || abilities.includes("8")));
    }

    async function updateQuestionsCount(presetArea? : string, presetAbilities? : string[]) {
        if(!presetArea) presetArea = area;
        if(!presetAbilities) presetAbilities = abilities;
        if(!user) return;
        const req = await fetch(window.origin+`/api/questions?area=${presetArea}&abilities=${presetAbilities.join(",")}&userId=${user.uid}`);
        const data = await req.json();
        setQuestionsCount(data.count);
    }

    async function createList() {
        if(!area) {
            toast({ description: "Selecione uma área de estudo!", variant: "destructive" });
            return;
        }
        if(listLen < 5) {
            toast({ description: "A lista precisa ter pelo menos 5 questões!", variant: "destructive" });
            return;
        }
        if(listLen > 30) {
            toast({ description: "A lista não pode ter mais de 30 questões!", variant: "destructive" });
            return;
        }
        if(willForeignLanguageApply() && foreign === "") {
            toast({ description: "Escolha uma lingua estrangeira!", variant: "destructive" });
            return;
        }
        if(!user) {
            toast({ description: "Faça login.", variant: "destructive" });
            return;
        }
        toast({ description: "Criando..." });
        const res = await axios.post(window.origin+"/api/list/create", {
            userId: user.uid,
            abilities,
            listLen,
            area,
            languageFilter: foreign
        });
        const data = res.data;
        if(data.status != "Success") {
            toast({ description: `Erro: ${data.message}`, variant: "destructive" })
            return;
        }
        redirect("/lists/"+data.listId);
    }

    return (
        <div className="flex p-16 w-full flex-col gap-16">
            <div className="flex flex-col md:flex-row w-full justify-between gap-2">
                <p className="text-xl">Primeiro, escolha o que quer estudar:</p>
                <Select onValueChange={(v) => {setArea(v); updateQuestionsCount(v, undefined);}} value={area}>
                    <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue placeholder="Selecione a área de conhecimento" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lc">Linguagens, Códigos e suas Tecnologias</SelectItem>
                        <SelectItem value="ch">Ciências Humanas e suas Tecnologias</SelectItem>
                        <SelectItem value="cn">Ciências da Natureza e suas Tecnologias</SelectItem>
                        <SelectItem value="mt">Matemática e suas Tecnologias</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between gap-2">
                <p className="text-xl text-left">Depois, escolha as habilidades:</p>
                <MultiSelect
                disabled={!area}
                options={options} 
                onValueChange={(v) => {setAbilities(v); updateQuestionsCount(undefined, v);}}
                defaultValue={abilities}
                placeholder="Selecione as habilidades"
                animation={2}
                maxCount={30}
                />
            </div>
            {
            willForeignLanguageApply() && 
            <div className="flex flex-col md:flex-row w-full justify-between gap-2">
                <p className="text-xl text-left">Choose a foreign language, mi amigo:</p>
                <Select onValueChange={(v) => {setForeign(v); updateQuestionsCount();}} value={foreign}>
                    <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue placeholder="Selecione uma lingua estrangeira" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Inglês</SelectItem>
                        <SelectItem value="2">Espanhol</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            }
            <div className="flex flex-col md:flex-row w-full justify-between gap-2">
                <p className="text-xl text-left">Por fim, escolha quantas questões responder:</p>
                <Input 
                disabled={!area}
                className="w-full md:w-1/4"
                type="number" 
                value={listLen} 
                min={5} 
                max={45} 
                placeholder="Quantidade de questões entre 5 e 30"
                onChange={(e) => setListLen(Number(e.target.value))} 
                />
            </div>
            <div className="flex flex-col w-full items-center gap-2">
                <p className="text-sm">
                    {questionsCount == 0 ? "Não temos" : <NumberTicker value={questionsCount} />} questões disponíveis com os filtros acima.
                </p>
                <Button onClick={createList} className="text-xl p-8 w-full md:w-64">Criar lista</Button>
            </div>
        </div>
    )
}