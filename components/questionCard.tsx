'use client';

import { Question } from "@prisma/client";

interface iOption { 
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

function Option({ content, index } : iOption) {
    return (
        <label htmlFor={content}>
            <li className="border p-2 m-2 rounded-sm flex gap-4 items-center">
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
    return (
        <div className="p-8">
            <p><b>Questão {index+1} - ({question.identifier}-{question.year})</b> {question.preCommand}</p>
            <img src={question.imageUrl} className="min-w-80 w-1/4 mx-auto" />
            <p className="text-lg">{question.command}</p>
            <ul>
                {
                question.options.map((op, i) => <Option index={i} key={i} content={op} />)
                }
            </ul>
        </div>
    )
}