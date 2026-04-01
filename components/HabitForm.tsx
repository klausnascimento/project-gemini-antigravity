"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface HabitFormProps {
  onAddHabit: (title: string) => void;
}

/**
 * Componente de formulário isolado para inclusão de novos hábitos.
 */
export function HabitForm({ onAddHabit }: HabitFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddHabit(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        placeholder="Adicionar novo hábito..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 shadow-sm transition-colors focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="flex h-[46px] items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <Plus className="mr-2 h-5 w-5" />
        Adicionar
      </button>
    </form>
  );
}
