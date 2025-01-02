import { prisma } from "@/database/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    let count = 0;
    const searchParams = req.nextUrl.searchParams;
    const area = searchParams.get("area");
    const userId = searchParams.get("userId");
    const abilities = searchParams.get("abilities");
    const whereObj : {[key:string] : string | { in: number[] }} = {};
    if(area && ["lc", "mt", "cn", "ch"].includes(area)) whereObj["area"] = area;
    if(abilities) {
        const parsedAbilities = abilities.split(",").map(a => Number(a.trim()) || null).filter(a => a !== null);
        if(parsedAbilities.length > 0) whereObj["abilityCode"] = { in: parsedAbilities }
    }
    const questions = await prisma.question.findMany({
        where: whereObj
    });
    count = questions.length;
    if(userId) {
        const userAnswers = await prisma.answer.findMany({
            where: {userId}
        })
        const answersQuestionsId = userAnswers.map(a => a.questionId);
        const newQuestions = questions.filter(q => !answersQuestionsId.includes(q.id));
        count = newQuestions.length;
    }
    return Response.json({count});
}

// export async function POST(req: Request) {
//     const data = await req.json();
//     try{
//         const question = await prisma.question.create({
//             data
//         }); 
//         return Response.json(question);
//     }catch(e : unknown) {
//         console.log(e.stack);
//         return Response.json({});
//     }
// }