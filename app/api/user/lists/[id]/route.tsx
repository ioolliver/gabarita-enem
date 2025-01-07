import { prisma } from "@/database/prisma";

type TUserInfo = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params } : TUserInfo ) {
    const { id } = await params;

    const lists = await prisma.list.findMany({
        where: {
            ownerId: id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const answeredLists = await prisma.listAnswer.findMany({
        where: {
            userId: id
        }
    })

    return Response.json({lists, answeredLists});
}