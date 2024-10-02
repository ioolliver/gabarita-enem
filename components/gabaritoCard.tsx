import { cn } from "@/lib/utils";
import { Question } from "@prisma/client";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { QuestionMarkdown } from "./questionMarkdown";

interface iOption { 
    content : string, 
    index: number,
    correct: boolean,
    incorrect: boolean
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

function Option({ content, index, correct, incorrect } : iOption) {
    return (
        <label htmlFor={content}>
            <li className={cn("border p-2 m-2 rounded-sm flex gap-4 items-center",{
                "bg-red-400": incorrect,
                "bg-green-400": correct
            })}>
                <span>{convertIndexToAlternative(index)}) {content}</span>
            </li>
        </label>
    )
}

interface iQuestionCard {
    question: Question
    index: number
    marked: number
}

export function GabaritoCard({ question, index, marked } : iQuestionCard) {
    const isCorrect = (marked == question.correct ? true : false);
    return (
        <div className={cn("p-8 flex flex-col gap-4")}>
            <div className="flex gap-8 items-center">
                { isCorrect ? <Check /> : <X /> }
                <p><b>Questão {index+1} ({question.identifier}-{question.year})</b></p>
                <div className="flex gap-2 items-center">
                    <span>Habilidade:</span> 
                    <span className="w-6 h-6 text-center">{question.abilityCode}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-center">
                <QuestionMarkdown content={question.preCommand} />
            </div>
            <div className="w-full flex items-center justify-center">
                {question.imageUrl ? 
                <Image width={1100} height={1100} className="w-1/4" src={question.imageUrl} alt="Questão" /> :
                null}
            </div>
            <p className="text-lg">{question.command}</p>
            <ul>
                {
                    question.options.map((op, i) => (
                        <Option 
                        incorrect={i == marked ? true : false}
                        correct={i == question.correct ? true : false} 
                        index={i} key={i} content={op} />
                    ))
                }
            </ul>
        </div>
    )
}