'use client';

import { Question } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { Toggle } from "./ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { ListContext } from "./questionList";

interface iOption { 
    questionIndex : number,
    content : string, 
    index: number
}

function convertIndexToAlternative(index : number) {
    switch(index) {
        case 0: return "A";
        case 1: return "B";
        case 2: return "C";
        case 3: return "D";
        case 4: return "E";
    }
}

function Option({ questionIndex, content, index } : iOption) {
    const list = useContext(ListContext);
    return (
        <label htmlFor={content}>
            <li className="border p-2 m-2 rounded-sm flex gap-4 items-center">
                <input id={content} name={"option-"+questionIndex} type="radio" onChange={(e) => { 
                    list.onOptionChange(questionIndex, index)
                }} />
                <span>{convertIndexToAlternative(index)}) {content}</span>
            </li>
        </label>
    )
}

interface iQuestionCard {
    question: Question
    index: number
}

export function QuestionCard({ question, index } : iQuestionCard) {
    const [questionVisible, setQuestionVisible] = useState(false);
    function changeQuestionVisibility() {
        setQuestionVisible(v => !v)
    }
    return (
        <div className="p-8 flex flex-col gap-4">
            <div className="flex gap-8 items-center">
                <p><b>Questão {index+1} ({question.identifier}-{question.year})</b> {question.preCommand}</p>
                <div className="flex gap-2 items-center">
                    <span>Habilidade:</span> 
                    { !questionVisible ? <Skeleton className="w-6 h-6 bg-slate-400" /> : <span className="w-6 h-6 text-center">{question.abilityCode}</span> }
                    <Toggle className="rounded-full w-10 h-10" onClick={(e) => { changeQuestionVisibility() }}>
                        { !questionVisible ? <Eye size={24} /> : <EyeOff size={24}  /> }
                    </Toggle>
                </div>
            </div>
            <img src={question.imageUrl} className="min-w-80 w-1/4 mx-auto" alt="Questão" />
            <p className="text-lg">{question.command}</p>
            <ul>
                {
                question.options.map((op, i) => <Option questionIndex={index} index={i} key={i} content={op} />)
                }
            </ul>
        </div>
    )
}