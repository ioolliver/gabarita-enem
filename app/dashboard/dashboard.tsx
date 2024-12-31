'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { FIREBASE_AUTH } from "@/database/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FireExtinguisher, Flame, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type TDashboard = {
}

type State = {
    id: string;
    weekFrequency: number[]
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function convertToDay(day : number) {
  const today = new Date().getDay();
  const finalDay = Math.abs(today - day);
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
    default:
      return "Sábado"
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
          <AreaChart
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
            <Area
              dataKey="value"
              name="Questões"
              type="basis"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function Dashboard({ } : TDashboard) {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<State | null>(null);
    const router = useRouter();
    
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
            const req = await fetch(url+`/api/user/info/${user.uid}`);
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
                <p className="text-2xl">Você está em um streak de 0 dias!</p>
              </div>
            </div>
          </div>
        </section>
    );
}