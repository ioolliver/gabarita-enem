'use client';

import { API } from "@/database/api";
import { FIREBASE_AUTH } from "@/database/firebase";
import { Question } from "@prisma/client";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export interface AnswersData {
    userId: string,
    correct: number,
    marked: number,
    questionId: string
}

export function SendAnswers({ answers, questions } : { answers: string, questions: Question[] }) {
    const [dataSent, setDataSent] = useState(false);

    useEffect(() => {
        let unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(!user) return;
            if(dataSent) return;
            setDataSent(true);
            const answersData : AnswersData[] = [];
            for(let i = 0; i < answers.length; i++) {
                answersData.push({
                    userId: user.uid,
                    correct: questions[i].correct,
                    marked: Number(answers[i]),
                    questionId: questions[i].id,
                });
            }
            API.post("/answers", {answers: answersData});
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);
    
    return null;
}