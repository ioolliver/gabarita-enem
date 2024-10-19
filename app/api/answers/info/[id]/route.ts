import { prisma } from "@/database/prisma";
import { getQuestionsIDList } from "@/database/utils";

export async function GET(request: Request, { params: { id } } : { params: { id: string } } ) {
    const answers = await prisma.answer.findMany({ where: { userId: id } });
    const questionIdList = getQuestionsIDList(answers);
    const questions = await prisma.question.findMany({ where: { id: { in: questionIdList } } });
    const adaptedAnswers = answers.map((a) => ({ ...a, question: questions.find(q => q.id == a.questionId) }));
    return Response.json(adaptedAnswers);
}