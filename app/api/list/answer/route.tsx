import { prisma } from "@/database/prisma";
import { Question } from "@prisma/client";
import { NextRequest } from "next/server";

type Answer = {
    userId: string;
    correct: number;
    questionId: string;
    marked: number;
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    if(!data.listId) return Response.json({});
    if(!data.userId) return Response.json({});
    if(!data.answers) return Response.json({});

    const { listId, userId, answers } = data;

    const alreadyAnswered = await prisma.listAnswer.findFirst({
        where: {
            listId,
            userId
        }
    })
    
    if(alreadyAnswered) return Response.json({});

    const listFetch = await fetch(process.env.API_URL+"list/"+listId);
    const questions : Question[] | null = await listFetch.json();
    if(!questions) return Response.json({});

    let correctCount = 0;
    const marked = answers.split("").map((a : string) => Number(a)-1);
    const answerList : Answer[] = questions.map((question, index) => {
        if(marked[index] == question.correct) correctCount++;
        return {
            correct: question.correct,
            marked: marked[index],
            questionId: question.id,
            userId
        }
    });

    await prisma.$transaction([
        prisma.answer.createMany({
            data: answerList
        }),
        prisma.listAnswer.create({
            data: {
                corrects: correctCount,
                total: questions.length,
                listId,
                userId
            }
        })
    ])

    return Response.json({});
}