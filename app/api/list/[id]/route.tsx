import { prisma } from "@/database/prisma";

export async function GET(req : Request, { params } : { params: Promise<{id: string}> }) {
    const { id } = await params;
    const list = await prisma.list.findFirst({
        where: {
            id
        }
    });
    if(!list) return Response.json({});
    const questionsId = list.questions;
    const questions = await prisma.question.findMany({
        where: {
            id: {
                in: questionsId
            }
        }
    });
    return Response.json(questions);
}