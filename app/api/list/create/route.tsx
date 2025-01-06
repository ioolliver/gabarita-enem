import { prisma } from "@/database/prisma";

type TCreateList = {
    userId: string | null;
    abilities: string[] | null;
    listLen: number | null;
    area: "lc" | "mt" | "ch" | "cn" | null;
    languageFilter: 0 | 1 | 2 | null;
}

export async function POST(req: Request) {
    const { userId, abilities, listLen, area, languageFilter } : TCreateList = await req.json();
    
    if(!userId) return Response.json({"status": "Error", "message": "Necessário fazer Login."});
    if(!listLen || listLen < 5 || listLen > 30) return  Response.json({"status": "Error", "message": "Tamanho de lista inválido."});
    if(!area || !["lc", "mt", "ch", "cn"].includes(area)) return  Response.json({"status": "Error", "message": "Área de conhecimento inválida."});

    const parsedAbilities = (abilities || []).map(ab => Number(ab) || null).filter(ab => ab !== null);
    let abilityFilter = {}
    if(parsedAbilities.length > 0) abilityFilter = {
        in: parsedAbilities
    }

    const questions = await prisma.question.findMany({
        where: {
            area,
            languageType: {
                in: [0, Number(languageFilter) || 0]
            },
            abilityCode: abilityFilter
        }
    });

    if(questions.length < listLen) {
        return Response.json({"status": "Error", "message": "Questões insuficientes."});
    }

    const questionsId = questions.map(q => q.id);
    const listQuestions : string[] = [];

    for(let i = 0; i < listLen; i++) {
        const random = Math.floor(Math.random() * (questionsId.length-1));
        listQuestions.push(questionsId[random]);
        questionsId.splice(random, 1);
    }

    const list = await prisma.list.create({
        data: {
            languageFilter: Number(languageFilter) || 0,
            abilityFilter: parsedAbilities,
            ownerId: userId,
            questions: listQuestions,
            area
        }
    });

    return Response.json({status: "Success", listId: list.id});
}