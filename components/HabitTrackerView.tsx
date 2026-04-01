"use client";

import { useEffect, useState } from "react";
import { HabitForm } from "./HabitForm";
import { HabitList } from "./HabitList";
import { WeeklyProgressChart } from "./WeeklyProgressChart";
import { Habit } from "../types/habit";
import { formatDateToYYYYMMDD } from "../utils/date";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Activity } from "lucide-react";

export function HabitTrackerView() {
  // A persistência através de custom hook evita erro de hidratação e salva automaticamente
  const [habits, setHabits, isMounted] = useLocalStorage<Habit[]>("habits_v1", []);
  
  // Data local do usuário resolvida no client
  const [currentDateString, setCurrentDateString] = useState("");

  useEffect(() => {
    // Definimos apenas onde roda via CSR para travar e ter controle da re-renderização
    setCurrentDateString(formatDateToYYYYMMDD(new Date()));
  }, []);

  const handleAddHabit = (title: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(), // Utilizando web crypto API nativa
      title,
      createdAt: formatDateToYYYYMMDD(new Date()),
      completedDates: [],
    };
    
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleToggleComplete = (id: string, dateString: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completedDates.includes(dateString);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((d) => d !== dateString) // Desmarca
              : [...habit.completedDates, dateString], // Marca
          };
        }
        return habit;
      })
    );
  };

  const handleRemoveHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h !== id ? h.id !== id : false));
  };

  if (!isMounted || !currentDateString) {
    // Renderiza ghost/vazio durante hidratação do next.js
    return <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950" />;
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 md:py-16">
      
      {/* Header Clássico UI */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Activity className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Habit Tracker
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          Acompanhe seu progresso e construa rotinas de sucesso diariamente.
        </p>
      </header>

      {/* Grid Overview Dashboard */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-end space-y-6">
           <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
             <h3 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
               Adicionar Hábito
             </h3>
             <HabitForm onAddHabit={handleAddHabit} />
           </div>
        </div>
        
        {/* Gráfico */}
        <WeeklyProgressChart habits={habits} />
      </section>

      {/* Lista Principal */}
      <section className="mt-4">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Seus Hábitos ({currentDateString.split("-").reverse().join("/")})
        </h2>
        <HabitList
          habits={habits}
          currentDateString={currentDateString}
          onToggleComplete={handleToggleComplete}
          onRemove={handleRemoveHabit}
        />
      </section>
      
    </div>
  );
}
