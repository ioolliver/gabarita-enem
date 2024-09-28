'use client';

import { Question } from "@prisma/client";

interface iOption { 
    content : string, 
    index: number, 
    onOptionChange: (index: number) => void 
}

function Option({ content, index, onOptionChange } : iOption) {
    return (
        <label htmlFor={content}>
            <li className="border p-2 m-2 rounded-sm flex gap-4 items-center">
                <input id={content} name="option" type="radio" onChange={(e) => { 
                    onOptionChange(index)
                }} />
                <span>{content}</span>
            </li>
        </label>
    )
}

interface iQuestionCard {
    question: Question,
    onOptionChange: (index : number) => void
}

export function QuestionCard({ question, onOptionChange } : iQuestionCard) {
    return (
        <div className="bg-white text-black p-4">
            <p><b>({question.identifier})</b> {question.preCommand}</p>
            <img src={question.imageUrl} className="min-w-80 w-1/4 mx-auto" />
            <p className="text-lg">{question.command}</p>
            <ul>
                {question.options.map((op, i) => <Option index={i} key={i} content={op} onOptionChange={onOptionChange} />)}
            </ul>
        </div>
    )
}