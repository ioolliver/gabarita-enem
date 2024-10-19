import { Answer } from "@prisma/client";

export function getQuestionsIDList(answers : Answer[]) : string[] {
    const questionIdList : string[] = [];
    for(let a of answers) {
        if(!questionIdList.includes(a.questionId)) questionIdList.push(a.questionId)
    }
    return questionIdList;
} 