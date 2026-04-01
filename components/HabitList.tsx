"use client";

import { Habit } from "../types/habit";
import { HabitItem } from "./HabitItem";
import { ListTodo } from "lucide-react";

interface HabitListProps {
  habits: Habit[];
  currentDateString: string;
  onToggleComplete: (id: string, dateString: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Listagem gerencial dos hábitos. Lida com estado de vazio (Empty State).
 */
export function HabitList({ habits, currentDateString, onToggleComplete, onRemove }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 py-16 dark:border-zinc-800/80 dark:bg-zinc-950/50">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <ListTodo className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
        </div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
          Nenhum hábito cadastrado
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Você ainda não está rastreando nenhum hábito.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          currentDateString={currentDateString}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
