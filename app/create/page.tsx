'use client';

import { API } from "@/database/api";
import { useState } from "react";

type QuestionInfo = {
    command: string,
    correct: number | undefined,
    identifier: string,
    languageType: number,
    abilityCode: number | undefined,
    options: string[],
    imageUrl: string,
    preCommand: string,
    year: number
}

export default function Page() {
    const [questionInfo, setQuestionInfo] = useState<QuestionInfo>({
        abilityCode: undefined,
        command: "",
        correct: undefined,
        identifier: "",
        imageUrl: "",
        languageType: 0,
        options: [],
        preCommand: "",
        year: 0
    });

    async function createQuestion() {
        const info = await API.post("questions/create", questionInfo);
        if(info.status == 400) return alert('Erro!');
        alert('Criado!');
        setQuestionInfo(q => ({...q, command: "", imageUrl: "", options: ["", "", "", "", ""], preCommand: ""}))
    }

    return (
        <div className="bg-white w-full min-h-screen">
            <h1>Criador de questões</h1>
            <div className="flex flex-col">
                <input type="text" className="border-2" placeholder="Comando da questão" 
                value={questionInfo.command} onChange={(e) => { setQuestionInfo(q => ({...q, command: e.target.value.trim() })) }} />
                <input type="number" className="border-2" placeholder="Gabarito correto" 
                value={questionInfo.correct} onChange={(e) => { setQuestionInfo(q => ({...q, correct: e.target.valueAsNumber })) }} />
                <input type="text" className="border-2" placeholder="Letra A" 
                value={questionInfo.options[0]} onChange={(e) => { setQuestionInfo((q) => ({...q, options: [e.target.value.trim(), q.options[1], q.options[2], q.options[3], q.options[4]]})) }} />
                <input type="text" className="border-2" placeholder="Letra B" 
                value={questionInfo.options[1]} onChange={(e) => { setQuestionInfo((q) => ({...q, options: [q.options[0], e.target.value.trim(), q.options[2], q.options[3], q.options[4]]})) }} />
                <input type="text" className="border-2" placeholder="Letra C" 
                value={questionInfo.options[2]} onChange={(e) => { setQuestionInfo((q) => ({...q, options: [q.options[0], q.options[1], e.target.value.trim(), q.options[3], q.options[4]]})) }} />
                <input type="text" className="border-2" placeholder="Letra D" 
                value={questionInfo.options[3]} onChange={(e) => { setQuestionInfo((q) => ({...q, options: [q.options[0], q.options[1], q.options[2], e.target.value.trim(), q.options[4]]})) }} />
                <input type="text" className="border-2" placeholder="Letra E" 
                value={questionInfo.options[4]} onChange={(e) => { setQuestionInfo((q) => ({...q, options: [q.options[0], q.options[1], q.options[2], q.options[3], e.target.value.trim()]})) }} />
                
                <input type="text" className="border-2" placeholder="Identificador" 
                value={questionInfo.identifier} onChange={(e) => { setQuestionInfo(q => ({...q, identifier: e.target.value })) }} />
                <input type="number" className="border-2" placeholder="Lingua" 
                value={questionInfo.languageType} onChange={(e) => { setQuestionInfo(q => ({...q, languageType: e.target.valueAsNumber })) }} />
                <input type="number" className="border-2" placeholder="Código da habilidade" 
                value={questionInfo.abilityCode} onChange={(e) => { setQuestionInfo(q => ({...q, abilityCode: e.target.valueAsNumber })) }} />
                <input type="text" className="border-2" placeholder="Url da imagem" 
                value={questionInfo.imageUrl} onChange={(e) => { setQuestionInfo(q => ({...q, imageUrl: e.target.value })) }} />
                <input type="text" className="border-2" placeholder="Pré comando" 
                value={questionInfo.preCommand} onChange={(e) => { setQuestionInfo(q => ({...q, preCommand: e.target.value })) }} />
                <input type="number" className="border-2" placeholder="Ano" 
                value={questionInfo.year} onChange={(e) => { setQuestionInfo(q => ({...q, year: e.target.valueAsNumber })) }} />
                <button onClick={createQuestion} className="bg-green-500">Criar</button>
            </div>
        </div>
    )
}