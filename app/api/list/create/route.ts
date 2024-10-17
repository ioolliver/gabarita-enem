import { prisma } from "@/database/prisma";
import rateLimit from "@/lib/rate-limit";
import { NextApiResponse } from "next";

function getRandomNumberList(min : number, max : number, count : number) {
    if (max - min + 1 < count) {
        throw new Error("Range is too small to generate the requested number of unique numbers.");
    }

    let randomNumbers = new Set();
    
    while (randomNumbers.size < count) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber);  // Set automatically ignores duplicates
    }
    
    return Array.from(randomNumbers) as number[];  // Convert Set to array
}

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
    if(!body.listSize) return Response.json({error: "No sufficient questions"}); 
    if(body.listSize < 5) return Response.json({error: "No sufficient questions"}); 
    if(body.listSize > 45) return Response.json({error: "Too many questions"});
    const questionsId : string[] = [];
    const abilityFilter = body.abilityFilter && body.abilityFilter.length > 0 ? {in: body.abilityFilter} : {gt: 0};
    const languageCode = Number(body.languageFilter); 
    const languageFilter = languageCode > 0 ? { in: [0, languageCode] } : {in: [0, 1, 2]};
    const userId = body.userId;
    let idFilter = {};
    if(userId) {
        const answers = await prisma.answer.findMany({ where: { userId } });
        let idFilterArray : string[] = [];
        for(let i = 0; i < answers.length; i++) {
            let a = answers[i];
            if(!idFilterArray.includes(a.questionId)) idFilterArray.push(a.questionId);
        }
        idFilter = { notIn: idFilterArray }
    }
    const questions = await prisma.question.findMany({ 
        where: { 
            id: idFilter,
            abilityCode: abilityFilter,
            languageType: languageFilter
        } 
    })
    if(questions.length < body.listSize) return Response.json({error: "No sufficient questions"}); 
    const selectedQuestions = getRandomNumberList(0, questions.length-1, body.listSize);
    for(let i = 0; i < selectedQuestions.length; i++) {
        questionsId.push(questions[selectedQuestions[i]].id);
    }
    const list = await prisma.list.create({
        data: {
            abilityFilter: body.abilityFilter,
            questions: questionsId,
            languageFilter: languageCode,
            ownerId: userId || null
        }
    })
    return Response.json(list);
}