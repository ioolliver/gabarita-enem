import { prisma } from "@/database/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    await prisma.feedback.create({
        data: {
            content: data.content,
            userId: data.userId
        }
    });

    return Response.json({ });
}