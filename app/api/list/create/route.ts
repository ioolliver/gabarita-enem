import { prisma } from "@/database/prisma";

function getRandomNumberList(min : number, max : number, count : number) {
    if (max - min + 1 < count) {
        throw new Error("Range is too small to generate the requested number of unique numbers.");
    }

    let randomNumbers = new Set();
    
    while (randomNumbers.size < count) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber);  // Set automatically ignores duplicates
    }
    
    return Array.from(randomNumbers) as number[];  // Convert Set to array
}

export async function POST(request: Request) {
    const body = await request.json();
    if(!body.listSize) return Response.json({error: "No sufficient questions"}); 
    if(body.listSize < 5) return Response.json({error: "No sufficient questions"}); 
    if(body.listSize > 45) return Response.json({error: "Too many questions"});
    const questionsId : string[] = [];
    const abilityFilter = body.abilityFilter && body.abilityFilter.length > 0 ? {in: body.abilityFilter} : {gt: 0};
    const languageCode = Number(body.languageFilter); 
    const languageFilter = languageCode > 0 ? { in: [0, languageCode] } : {in: [0, 1, 2]};
    const questions = await prisma.question.findMany({ 
        where: { 
            abilityCode: abilityFilter,
            languageType: languageFilter
        } 
    })
    if(questions.length < body.listSize) return Response.json({error: "No sufficient questions"}); 
    const selectedQuestions = getRandomNumberList(0, questions.length-1, body.listSize);
    for(let i = 0; i < selectedQuestions.length; i++) {
        questionsId.push(questions[selectedQuestions[i]].id);
    }
    const list = await prisma.list.create({
        data: {
            abilityFilter: body.abilityFilter,
            questions: questionsId
        }
    })
    return Response.json(list);
}