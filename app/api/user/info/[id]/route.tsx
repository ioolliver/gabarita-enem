import { prisma } from "@/database/prisma";
import { Answer } from "@prisma/client";

type TUserInfo = { params: Promise<{ id: string }> }

export const revalidate = 60
export const dynamic = 'force-static'

function getLastWeek() {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date;
}

function getWeekFrequency(answers : Answer[]) {    
    function getDifferenceInDays(date1: Date, date2: Date): number {
        const date1Count = date1.getMonth() + date1.getDate();
        const date2Count = date2.getMonth() + date2.getDate();
        return Math.abs(date1Count - date2Count);
    }
    
    const frequency : number[] = [0,0,0,0,0,0,0];
    const today = new Date();

    const lastWeek = getLastWeek();
    const filtredAnswers = answers.filter(a => a.createdAt >= lastWeek)

    for(const answer of filtredAnswers) {
        if(!answer.createdAt) continue;
        const difference = getDifferenceInDays(new Date(answer.createdAt), today);
        if(difference > 6) { frequency[6]++; continue; }
        frequency[difference]++;
    }
    return frequency;
}

function getStreakCount(answers : Answer[]) {
    const sortedAnswers = answers
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < sortedAnswers.length; i++) {
        const currentDate = sortedAnswers[i].createdAt;
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - streak);
        if (
            currentDate.getFullYear() === expectedDate.getFullYear() &&
            currentDate.getMonth() === expectedDate.getMonth() &&
            currentDate.getDate() === expectedDate.getDate()
        ) {
            streak++;
        } else if (currentDate < expectedDate) {
            break;
        }
    }
    return streak;
}

export async function GET(req: Request, { params } : TUserInfo ) {
    const { id } = await params;
    const answers = await prisma.answer.findMany({
        where: {
            userId: id
        }
    });
    const weekFrequency = getWeekFrequency(answers); 
    const streak = getStreakCount(answers);   
    return Response.json({ id, weekFrequency, streak });
}