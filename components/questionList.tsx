'use client';
import { Question } from "@prisma/client";
import { QuestionCard } from "./questionCard";
import { useState } from "react";

export function QuestionList({ questions } : { questions: Question[] }) {
    const question = questions[0];

    const [currentAnswser, updateCurrentAnswer] = useState(0);

    function updateOption(i : number) {
        updateCurrentAnswer(i);
    }

    function checkAnswsers() {
        if(currentAnswser == question.correct) {
            alert('correto!');
        }else{
            alert('incorreto!');
        }
    }

    return (
        <main>
            {questions.map((question, i) => <QuestionCard onOptionChange={updateOption} question={questions[i]} />)}
            <button onClick={checkAnswsers}>Verificar</button>
        </main>
      );
}