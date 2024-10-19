'use client';

import { CreateListButton } from "@/components/createListButton";
import { DonateButton } from "@/components/donateButton";
import { InstagramButton } from "@/components/instagramButton";
import { LoadingSpinner } from "@/components/loadingBar";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import { Progress } from "@/components/ui/progress";
import { FIREBASE_AUTH } from "@/database/firebase";
import { Answer, Question } from "@prisma/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface DashAnswer extends Answer {
    question: Question
}

export function Dashboard() {
    const [user, setUser] = useState<User | null>();
    const [answers, setAnswers] = useState<DashAnswer[]>();
    const router = useRouter();

    function updateDashboardInfo(id : string) {
        fetch(window.location.origin+"/api/answers/info/"+id, { next: { revalidate: 120 } })
        .then(async info => {
            const data = await info.json();
            setAnswers(data);
        })
    }
    
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (u) => {
            if(!u) router.push("/")
            setUser(u);
            if(u?.uid && u?.uid != user?.uid) updateDashboardInfo(u.uid);
        });
    }, [user?.uid, router]);

    if(!user || !answers) return <div className="flex justify-center items-center my-32"><LoadingSpinner className="w-16 h-16" /></div>;

    const corrects = answers.filter(a => a.marked == a.correct);
    const wrongs = answers.filter(a => a.marked != a.correct);

    const correctsPercentage = Math.trunc((corrects.length / answers.length) * 100);

    let abilityList : number[] = [];
    for(let a of answers) {
        if(!abilityList.includes(a.question.abilityCode)) abilityList.push(a.question.abilityCode);
    }

    return (
        <div>
            <div className="text-center mt-8">
                <h1 className="text-3xl font-semibold">Bem-vindo(a) novamente, {user.displayName}!</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 justify-around my-10">
                <InstagramButton />
                <DonateButton />
                <CreateListButton />
            </div>
            <div className="flex items-center justify-center gap-8">
                <AnimatedCircularProgressBar value={correctsPercentage} max={100} min={0} gaugePrimaryColor="#22c55e" gaugeSecondaryColor="#ef4444" />
                <div className="flex flex-col gap-2">
                    <span className="text-3xl">Você já respondeu {answers.length} questões!</span>
                    <div className="flex gap-2">
                        <Check />
                        <span>Você acertou {corrects.length} questões</span>
                    </div>
                </div>
            </div>
            <div className="my-16 flex justify-center flex-col items-center">
                <h1 className="text-3xl font-semibold">Taxa de acertos por habilidade:</h1>
                <ul className="flex flex-col gap-4 w-full items-center p-4">
                    {abilityList.sort((a, b) => a - b).map((ab) => {
                        const totalAb = answers.filter(a => a.question.abilityCode == ab);
                        const correctAb = totalAb.filter(a => a.correct == a.marked);
                        const percentage = Math.trunc(correctAb.length / totalAb.length * 100) 
                        return (
                            <li className="w-1/3 h-16 flex flex-col gap-1" key={ab}>
                                <span>Habilidade {ab} - {correctAb.length}/{totalAb.length} ({percentage}%)</span>
                                <Progress value={percentage} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}