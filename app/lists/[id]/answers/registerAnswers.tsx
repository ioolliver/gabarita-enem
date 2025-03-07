'use client';

import { FIREBASE_AUTH } from "@/database/firebase";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function RegisterAnswers({ answers, listId, showFeedback } : { answers: string, listId: string, showFeedback: () => void }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(!user) return;
            setUser(user);
        })
    }, []);

    useEffect(() => {
        async function postAnswer() {
            if(!user) return;
            const res = await axios.post(window.origin+"/api/list/answer", {
                listId,
                userId: user.uid,
                answers
            });
            const data = res.data;
            if(data.feedback) {
                showFeedback();
            }
        }
        postAnswer();
    }, [user, answers, listId]);

    return null;
}