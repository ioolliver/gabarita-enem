'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { FIREBASE_AUTH } from "@/database/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BookCopy, Flame, NotebookPen } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link";

type State = {
    id: string;
    weekFrequency: number[],
    streak: number
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function convertToDay(day : number) {
  const today = new Date().getDay();
  let finalDay = today - day;
  if(finalDay < 0) finalDay = 7 + finalDay;
  switch(finalDay) {
    case 0:
      return "Domingo"
    case 1:
      return "Segunda"
    case 2:
      return "Terça"
    case 3:
      return "Quarta"
    case 4:
      return "Quinta"
    case 5: 
      return "Sexta"
    case 6:
      return "Sábado"
    default:
      return "Domingo"
  }
}

export function Chart({ weekFrequency } : { weekFrequency: number[] }) {
  const data = [];
  for(let i = weekFrequency.length-1; i >= 0; i--) {
    data.push({ day: convertToDay(i), value: weekFrequency[i] || 0 });
  }
  console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Questões respondidas nessa semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              name="Questões"
              type="basis"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

type TDashButton = {
  href: string;
  placeholder: string;
  icon: React.ReactNode;
}

function DashButton({ href, placeholder, icon } : TDashButton) {
  return (
    <Link className="text-white cursor-pointer bg-gradient-to-br from-indigo-900 to-purple-600 flex text-center items-center py-2 px-12 rounded-full text-xl gap-4" href={href}>
      {icon}
      <p>{placeholder}</p>
    </Link>
  )
}

export function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<State | null>(null);
    const router = useRouter();

    function logOut() {
      signOut(FIREBASE_AUTH);
    }
    
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            if(!user) {
                router.push("/");
            }
        })
    });

    useEffect(() => {
        async function fetchData() {
            if(!user) return;
            const url = window.location.origin;
            const req = await fetch(url+`/api/user/info/${user.uid}`, { next: { revalidate: 60 } });
            const data = await req.json();
            setStatus(data);
        }
        fetchData();
    }, [user])

    if(!status || !user) return (
        <section className="bg-white m-4 p-8 shadow-lg rounded-lg">
            <div className="">
                <div className="flex w-full justify-center">
                  <Skeleton className="w-2/5 h-8 rounded-full" />
                </div>
                <div className="flex justify-between mt-8 gap-4">
                  <Skeleton className="w-1/2 h-96 rounded-2xl" />
                  <div className="flex flex-col w-1/2 gap-8">
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                  </div>
                </div>
            </div>
        </section>
    );

    return (
        <section className="bg-white m-4 p-8 shadow-lg rounded-lg">
          <div className="flex w-full justify-center mb-8">
              <h1 className="text-3xl">Bem-vindo(a), {user.displayName}!</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between flex-1 gap-4">
            <div className="w-full md:w-1/2">
                <Chart weekFrequency={status.weekFrequency} />
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="flex gap-2">
                <Flame size={32} color="#d83004" fill="#f7ad04" />
                <p className="text-2xl">Você está em um streak de {status.streak} dias!</p>
              </div>
              <div className="flex flex-col my-8 gap-8">
                <DashButton href="/lists" placeholder="Minhas listas" icon={<BookCopy size={24} />} />
                <DashButton href="/lists/create" placeholder="Criar uma lista" icon={<NotebookPen size={24} />} />
              </div>
              <div className="flex items-end h-full">
                <div className="">
                  <button onClick={logOut} className="underline text-xs">Sair da minha conta</button>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}