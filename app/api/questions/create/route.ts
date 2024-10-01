import { prisma } from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    if(!body.password || body.password && body.password != "gbl222") return Response.json({});
    try{
        const question = await prisma.question.create({
            data: body
        })
    return Response.json(question);
    }catch(e) {
        return NextResponse.json({error: e}, { status: 400 })
    }
}