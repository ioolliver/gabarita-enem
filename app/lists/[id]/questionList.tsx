'use client';

import { Question } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

function QuestionMarkdown({ children } : { children: string }) {
    return <Markdown className="flex flex-col gap-4"
    components={{
        img(props) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img className="" src={props.src} alt="Question ilustration" />
        },
        h4(props) {
            return <h4 className="text-xs">{props.children}</h4>
        }
    }}>
        { children }
    </Markdown>
}

function parseToQuestion(index : number) {
    switch(index) {
        case 0: return "A";
        case 1: return "B";
        case 2: return "C";
        case 3: return "D";
        default: return "E";
    }
}

export function QuestionList({ questions } : { questions: Question[] }) {
    const [answers, setAnswers] = useState<number[]>(questions.map(() => 0));
    const [apiUrl, setApiUrl] = useState("");

    function setAnswer(inputId : string) {
        const [answerIndex, questionIndex] = inputId.split("-").map(v => Number(v));
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex+1;
        setAnswers(newAnswers);
    }

    useEffect(() => {
        setApiUrl(window.location.href);
    }, [apiUrl])

    return (<div className="flex flex-col gap-8 px-16 text-justify">
        <div className="flex flex-col gap-8">
        {
            questions.map((question, index) =>
                (<div className="" key={question.id}>
                    <div className="flex gap-2 items-center">
                        <p className="font-bold">Questão {index+1} (ENEM{question.identifier} {question.year})</p>
                        <p className="text-xs">Habilidade {question.abilityCode}</p>
                    </div>
                    <QuestionMarkdown>
                        {`${question.preCommand}\n\n # ${question.command}`}
                    </QuestionMarkdown>
                    <ul className="flex flex-col gap-2">
                        {question.options.map((option, i) => (
                            <label key={option} htmlFor={i+"-"+index}>
                            <li className="flex gap-4 items-center border-2 p-2 rounded-lg">
                                <input 
                                type="radio" 
                                name={question.id} 
                                id={i+"-"+index}
                                onChange={(e) => ( setAnswer(e.target.id) )}
                                />
                                <QuestionMarkdown>
                                {`${parseToQuestion(i)}) ` + option}
                                </QuestionMarkdown>
                            </li>
                            </label>
                        ))}
                    </ul>
                </div>)
            )
        }
        </div>
        <div className="w-full flex justify-center">
            <Link className="bg-green-600 px-8 py-2 text-white text-xl rounded-xl" href={apiUrl+"/answers?a="+answers.join("")}>Responder</Link>
        </div>
    </div>)
}