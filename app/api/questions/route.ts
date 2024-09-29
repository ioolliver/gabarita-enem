import { prisma } from "@/database/prisma";

export async function GET(request: Request) {
    const questions = await prisma.question.findMany();
    return Response.json({count: questions.length});
}