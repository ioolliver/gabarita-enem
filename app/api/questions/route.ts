import { prisma } from "@/database/prisma";

export async function GET(request : Request) {
    const { searchParams } = new URL(request.url);
    const filterString = searchParams.get('filter') || "";
    const languageString = searchParams.get('lang') || "";
    const languageCode = Number(languageString);
    const filter = filterString.split(",")
    .map(v => Number(v))
    .filter(v => v > 0);
    const abilityFilter = filter.length > 0 ? { in: filter } : { gt: 0 };
    const languageFilter = languageCode == 0 ? { in: [0, 1, 2] } : { in: [0, languageCode] };
    const questions = await prisma.question.findMany({ where: { abilityCode: abilityFilter, languageType: languageFilter } });
    return Response.json({ count: questions.length });
}