import { prisma } from "@/database/prisma";

type TCreateList = {
    userId: string | null;
    abilities: string[] | null;
    listLen: number | null;
    area: "lc" | "mt" | "ch" | "cn" | null;
    languageFilter: 0 | 1 | 2 | null;
}

function generateRandomArray(size : number, min : number, max : number) {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, size);
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
    const randomList = generateRandomArray(listLen, 0, questions.length-1);
    const listQuestions : string[] = randomList.map(n => questionsId[n]);

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