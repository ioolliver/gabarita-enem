import { prisma } from "@/database/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const question = await prisma.question.create({
        data: body
    })
    return Response.json(question);
}