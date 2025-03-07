'use client';

import { cn } from "@/lib/utils";
import { Question } from "@prisma/client";
import { Check, X } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import { RegisterAnswers } from "./registerAnswers";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/database/firebase";
import axios from "axios";

function QuestionMarkdown({ children } : { children: string }) {
    return <Markdown className="flex flex-col gap-4"
    components={{
        img(props) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img className="" src={props.src} alt="Question ilustration" />
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

export function CorrectList({ listId, questions, answers } : { questions: Question[], answers: string, listId: string }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [feedbackContent, setFeedbackContent] = useState("");

    function showFeedback() {
        setIsOpen(true);
    }

    async function sendFeedback(content : string) {
        await axios.post(window.origin+"/api/feedback", {
            content,
            userId: user?.uid
        });
    }

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(!user) return;
            setUser(user);
        });
    }, []);
    
    return (<div className="flex flex-col gap-8 px-16 text-justify">
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
                        {question.options.map((option, i) => {
                            let mark = "";
                            if((Number(answers[index])-1) == i) mark = "wrong";
                            if(question.correct == i) mark = "correct";
                            return (
                                <li key={option} className={cn("flex gap-4 items-center border-2 p-2 rounded-lg", {
                                    "bg-red-300": (mark == "wrong"),
                                    "bg-green-300": (mark == "correct")
                                })}>
                                    {
                                        mark ? 
                                        mark == "correct" ? <Check /> : <X />
                                        : null 
                                    }
                                    <QuestionMarkdown>
                                    {`${parseToQuestion(i)}) ` + option}
                                    </QuestionMarkdown>
                                </li>
                            )
                        })}
                    </ul>
                </div>)
            )
        }
        <div className="w-full flex justify-center">
            <Link className="bg-green-600 px-8 py-2 text-white text-xl rounded-xl" href={"/dashboard"}>Voltar</Link>
        </div>
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">Ei {user?.displayName}, que tal um feedback?</AlertDialogTitle>
                <AlertDialogDescription>
                    Deixe aqui sugestões, críticas, elogios e opiniões! :)
                </AlertDialogDescription>
                <textarea className="border-2 border-black p-2 rounded-lg" placeholder="Deixe sua sugestão aqui!"
                onChange={(e) => setFeedbackContent(e.target.value)}
                value={feedbackContent}
                />
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => { setIsOpen(false); }}>Não, obrigado!</AlertDialogCancel>
                <AlertDialogAction onClick={() => { sendFeedback(feedbackContent); setIsOpen(false); }}>Enviar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <RegisterAnswers answers={answers} listId={listId} showFeedback={showFeedback} />
    </div>)
}