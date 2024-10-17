'use client';

import { API } from "@/database/api";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ShimmerButton from "./ui/shimmer-button";
import NumberTicker from "./ui/number-ticker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/database/firebase";

export function ListCreator({ initialCountValue } : { initialCountValue: number }) {
    const router = useRouter();
    const { toast } = useToast();
    const [currentAbility, setCurrentAbility] = useState("");
    const [abilityFilter, setAbilityFilter] = useState<number[]>([]);
    const [languageFilter, setLanguageFilter] = useState("");
    const [availableCount, setavailableCount] = useState(initialCountValue);
    const [listSize, setListSize] = useState(5);
    const [createButton, setCreateButton] = useState(false);
    const [noRepeat, setNoRepeat] = useState(false);

    const [user, setUser] = useState<User | null>();

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
    });

    async function createList() {
        if(availableCount < listSize) {
            toast({ 
                variant: "destructive",
                description: "Não temos questões suficientes para a sua lista com o filtro atual." 
            });
            return;
        }
        setCreateButton(true);
        toast({
            description: "Criando lista..." 
        });
        const list = await API.post("list/create", { abilityFilter, listSize, languageFilter, userId: user?.uid || null });
        if(!list.id) {
            toast({ 
                variant: "destructive",
                description: "Não temos questões suficientes para a sua lista com o filtro atual." 
            });
            setCreateButton(false);
            return;
        }
        router.push("/list/" + list.id)
    }
    async function updateAvailableCount(abilityFiltered : number[], languageFiltered : number | string, noRepeat? : boolean) {
        const result = await 
        API.fetch("questions?filter="+abilityFiltered.join(",")+"&lang="+languageFiltered+"&user="
        +(noRepeat && user ? user.uid : ""), 10);
        setavailableCount(result.count);
    }
    function addAbility() {
        let code = Number(currentAbility);
        if(!code || abilityFilter.includes(code)) return;
        setAbilityFilter(v => {
            let newFilter = [...v, code]
            updateAvailableCount(newFilter, languageFilter);
            return newFilter
        });
    }
    function removeFromFilter(a : number) {
        setAbilityFilter(v => {
            let newFilter = (v.filter(h => h != a))
            updateAvailableCount(newFilter, languageFilter);
            return newFilter
        });
    }
    return (
        <div className="flex flex-col items-center p-8">
            <div className="">
                <p>Selecione a(s) habilidade(s) que deseja treinar (1-30):</p>
                <a className="text-xs underline" href="https://download.inep.gov.br/download/enem/matriz_referencia.pdf" target="_blank">Não sabe o código? Veja a matriz de referência</a>
                <ul className="grid grid-cols-4 p-4 gap-4">
                    {
                        abilityFilter.map(a => (
                        <button className="hover:cursor-pointer" key={a} onClick={() => { removeFromFilter(a); }}>
                            <li 
                                className="border-2 border-black rounded-full w-8 h-8 text-center flex justify-center items-center" >
                                {a}
                            </li>
                        </button>
                        ))
                    }
                </ul>
                <div className="flex p-4 gap-2">
                    <input className="px-4 py-2 border-2 w-full" 
                    type="text"
                    placeholder="Digite o código de uma habilidade" 
                    value={currentAbility} onChange={(e) => { 
                        let v = e.target.value;
                        if(v && Number(v) < 1) v = "1";
                        if(v && Number(v) > 30) v = "30";
                        setCurrentAbility(v) 
                    }}
                    />
                    <input onClick={addAbility} type="button" value="Adicionar" className="bg-lime-500 p-2 rounded-lg hover:cursor-pointer" />
                </div>
            </div>
            <div className="p-4 my-4 flex flex-col md:flex-row items-center gap-4">
                <p>Quantidade de questões (5-45):</p>
                <input className="border-2 py-1 px-4" 
                type="number" min={5} max={45} 
                placeholder="Selecione a quantidade de questões" 
                value={listSize} onChange={(e) => { setListSize(e.target.valueAsNumber) }}
                />
            </div>
            <div className="p-4 my-4 flex flex-col md:flex-row items-center gap-4">
                <p>Lingua estrangeira:</p>
                <Select value={languageFilter} onValueChange={(e) => { 
                    setLanguageFilter(e);
                    updateAvailableCount(abilityFilter, e);
                }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Ambas</SelectItem>
                    <SelectItem value="1">Inglês</SelectItem>
                    <SelectItem value="2">Espanhol</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="p-4 my-4 flex flex-col items-center gap-4">
                <div className="flex gap-4 items-center">
                    <p>Excluir questões já respondidas:</p>
                    <input className="border-2 w-4 h-4" type="checkbox" onChange={(e) => {
                        updateAvailableCount(abilityFilter, languageFilter, e.target.checked);
                        setNoRepeat(e.target.checked)
                    }} checked={noRepeat} disabled={!user} />
                </div>
                <div className="">
                    {!user ? <p className="text-xs">(Faça login para usar essa opção.)</p> : null}
                </div>
            </div>
            <div className="flex flex-col my-8 gap-4">
                <p className="text-sm">Nós temos <NumberTicker value={availableCount} className="font-bold" /> questões disponíveis com os filtros selecionados.</p>
                <ShimmerButton disabled={createButton} onClick={createList}><span className="text-xl">Criar lista</span></ShimmerButton>
            </div>
        </div>
    )
}