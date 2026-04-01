"use client";

import { Trash2, Flame } from "lucide-react";
import { Habit } from "../types/habit";
import { calculateHabitStreak } from "../utils/streak";
import { cn } from "../utils/cn";

interface HabitItemProps {
  habit: Habit;
  currentDateString: string;
  onToggleComplete: (id: string, dateString: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Componente visual de um item individual de hábito na lista.
 * Apresenta comportamento de Checkbox visual customizado, streak de foguinho e botão deletar.
 */
export function HabitItem({ habit, currentDateString, onToggleComplete, onRemove }: HabitItemProps) {
  const isCompletedToday = habit.completedDates.includes(currentDateString);
  const streakCount = calculateHabitStreak(habit.completedDates, currentDateString);

  return (
    <div className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-zinc-700">
      <div className="flex items-center gap-4">
        {/* Checkbox customizado isolado para facilitar o clique na label também caso deseje acoplar no futuro */}
        <button
          type="button"
          onClick={() => onToggleComplete(habit.id, currentDateString)}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90",
            isCompletedToday
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-zinc-300 bg-transparent hover:border-emerald-400 dark:border-zinc-600 dark:hover:border-emerald-500"
          )}
        >
          {isCompletedToday && (
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <span
          className={cn(
            "text-[15px] font-medium transition-colors duration-300",
            isCompletedToday ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-100"
          )}
        >
          {habit.title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Indicador de Streak Diário */}
        <div
          title={`${streakCount} dias seguidos`}
          className={cn(
            "flex select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
            streakCount > 0
              ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
          )}
        >
          <Flame className={cn("h-3.5 w-3.5", streakCount > 0 ? "fill-current" : "")} />
          {streakCount}
        </div>

        {/* Botão de Exclusão (Apenas no Hover para Desktop) */}
        <button
          onClick={() => onRemove(habit.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:text-zinc-500 dark:hover:bg-red-950/40 dark:hover:text-red-400 cursor-pointer"
          title="Remover hábito"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
