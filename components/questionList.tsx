'use client';

import { Question } from "@prisma/client";
import { QuestionCard } from "./questionCard";
import React, { createContext, useState } from "react";
import ShimmerButton from "./ui/shimmer-button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface iListContext {
    onOptionChange: (index: number, markedQuestion: number) => void
}

export const ListContext = createContext<iListContext>({onOptionChange: () => {}});

type TGabaritoList = {
    [key: number]: number;
};

export function QuestionList({ listId, questions } : { listId: string, questions: Question[] }) {
    const [gabaritoList, setGabaritoList] = useState<TGabaritoList>({});
    const router = useRouter();
    const {toast} = useToast();

    function onOptionChange(index : number, markedQuestion : number) {
        setGabaritoList({...gabaritoList, [index]: markedQuestion});
    }
    function translateGabaritoList(gabaritoList : TGabaritoList) {
        const gabaritoArray = [];
        const keys = Object.keys(gabaritoList);
        for(let i = 0; i < keys.length; i++) {
            const key = Number(keys[i]);
            const answer = gabaritoList[key];
            gabaritoArray.push(answer);
        }
        return gabaritoArray.join("");
    }
    function goToGabarito() {
        if(Object.keys(gabaritoList).length != questions.length) {
            toast({ variant: "destructive", description: "Responda todas as questões." });
            return;
        }
        const finalGabarito = translateGabaritoList(gabaritoList);
        router.push(`/list/${listId}/answers?g=${finalGabarito}`);
    }

    return (
        <div className="">
        <ListContext.Provider value={{ onOptionChange }}>
        <div className="">
        {
            questions.map((question, i) => (
                <QuestionCard index={i} key={question.id} question={question} />
            ))
        }
        </div>
        <div className="w-full flex items-center justify-center p-8">
            <ShimmerButton onClick={goToGabarito}>Verificar gabarito</ShimmerButton>
        </div>
        </ListContext.Provider>
        </div>
    )
}