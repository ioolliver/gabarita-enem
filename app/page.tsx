import { ListCreator } from "@/components/listCreator";

export default async function Home() {
  const questionsFetch = await fetch("http://localhost:3000/api/questions", { next: { revalidate: 60 } })
  const questions = await questionsFetch.json();

  return (
    <main className="bg-white w-full min-h-screen">
      <h1>Bem-vindo ao Gabarita Linguagens</h1>
      <h2>Temos mais de {questions.count} questões separadas por habilidades em nosso banco de dados!</h2>
      <h2>Comece criando uma lista personalizada:</h2>
      <ListCreator />
    </main>
  );
}
