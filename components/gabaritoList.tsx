import { Question } from "@prisma/client";
import { GabaritoCard } from "./gabaritoCard";

export function GabaritoList({ questions, gabarito } : { questions: Question[], gabarito : string }) {
    return (
        <div className="">
        {
            questions.map((question, i) => (
                <GabaritoCard marked={Number(gabarito[i])} index={i} key={question.id} question={question} />
            ))
        }
        </div>
    )
}