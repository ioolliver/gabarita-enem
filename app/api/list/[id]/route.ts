import { prisma } from "@/database/prisma";

export async function GET(request: Request, { params: { id } } : { params: { id: string } } ) {
    const list = await prisma.list.findFirst({ where: { id } });
    if(!list) return Response.json({ message: "NOT FOUND" });
    const questions = await prisma.question.findMany({ where: { id: { in: list.questions } } })
    return Response.json({ ...list, questions });
}