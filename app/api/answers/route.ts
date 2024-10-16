import { AnswersData } from "@/app/list/[id]/answers/SendAnswers";
import { prisma } from "@/database/prisma";
import rateLimit from "@/lib/rate-limit";
import { NextApiResponse } from "next";

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(request: Request, response: NextApiResponse) {
    try {
        await limiter.check(response, 10, "CACHE_TOKEN"); // 10 requests per minute
    } catch {
        Response.json({ error: "Rate limit exceeded" });
    }
    const body = await request.json();
    const answers = body.answers as AnswersData[];
    const otherAnswers = await prisma.answer.findMany({ where: { userId: answers[0].userId } });
    let finalAnswers = [];
    for(let answer of answers) {
        if(otherAnswers.find(a => a.questionId == answer.questionId)) continue;
        finalAnswers.push(answer);
    }
    if(finalAnswers.length == 0) return Response.json({ ok: "ok" });
    await prisma.answer.createMany({
        data: finalAnswers
    })
    return Response.json({ ok: "ok" });
}