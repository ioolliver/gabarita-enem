'use client';

import { FIREBASE_AUTH } from "@/database/firebase";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function RegisterAnswers({ answers, listId } : { answers: string, listId: string }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(!user) return;
            setUser(user);
        })
    }, []);

    useEffect(() => {
        if(!user) return;
        axios.post(window.origin+"/api/list/answer", {
            listId,
            userId: user.uid,
            answers
        });
    }, [user, answers, listId]);

    return null;
}