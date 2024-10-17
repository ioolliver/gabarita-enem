import { prisma } from "@/database/prisma";

export async function GET(request: Request, { params: { id } } : { params: { id: string } } ) {
    const lists = await prisma.list.findMany({ where: { ownerId: id }, orderBy: { createdAt: "desc" } });
    return Response.json({ lists });
}