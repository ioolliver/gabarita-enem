import { prisma } from "@/database/prisma";
import { Answer } from "@prisma/client";

type TUserInfo = { params: Promise<{ id: string }> }

function getLastWeek() {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date;
}

function getWeekFrequency(answers : Answer[]) {    
    function getDifferenceInDays(date1: Date, date2: Date): number {
        const msInDay = 1000 * 60 * 60 * 24;
        const diffInMs = Math.abs(date1.getTime() - date2.getTime());
        return Math.trunc(diffInMs / msInDay);
    }
    
    const frequency : number[] = [0,0,0,0,0,0,0];
    const today = new Date();

    for(const answer of answers) {
        if(!answer.createdAt) continue;
        const difference = getDifferenceInDays(answer.createdAt, today);
        if(difference > 6) { frequency[6]++; continue; }
        frequency[difference]++;
    }
    return frequency;
}

export async function GET(req: Request, { params } : TUserInfo ) {
    const { id } = await params;
    const lastWeek = getLastWeek();
    const answers = await prisma.answer.findMany({
        where: {
            userId: id,
            createdAt: {
                gte: lastWeek
            }
        }
    });

    const weekFrequency = getWeekFrequency(answers);    
    return Response.json({ id, weekFrequency });
}