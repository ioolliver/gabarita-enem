import { QuestionList } from "@/components/questionList";

export default async function Home() {
  const questionsFetch = await fetch("http://localhost:3000/api/question")
  const questions = await questionsFetch.json();

  return (
    <main>
      <h1>Bem-vindo</h1>
    </main>
  );
}
