'use client';

import { API } from "@/database/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ListCreator() {
    const router = useRouter();
    const [abilityFilter, setAbilityFilter] = useState(1);
    const [listSize, setListSize] = useState(5);
    async function createList() {
        const list = await API.post("list/create", { abilityFilter, listSize });
        if(!list.id) {
            alert('Não existem questões com os filtros selecionados suficiente. Tente novamente.')
            return;
        }
        router.push("/list/" + list.id)
    }
    return (
        <div className="w-full flex flex-col">
            <div className="">
                <p>Selecione a habilidade que deseja treinar:</p>
                <input className="border-2 w-64" 
                type="number" min={1} max={30} 
                placeholder="Selecione o código da habilidade que deseja" 
                value={abilityFilter} onChange={(e) => { setAbilityFilter(e.target.valueAsNumber) }}
                />
            </div>
            <div className="">
                <p>Selecione a quantidade de questões que deseja:</p>
                <input className="border-2 w-64" 
                type="number" min={5} max={45} 
                placeholder="Selecione a quantidade de questões" 
                value={listSize} onChange={(e) => { setListSize(e.target.valueAsNumber) }}
                />
            </div>
            <button onClick={createList}>Criar lista</button>
        </div>
    )
}