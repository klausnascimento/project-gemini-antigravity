"use client";

import { Habit } from "../types/habit";
import { getLastNDays, getShortDayName } from "../utils/date";

interface WeeklyProgressChartProps {
  habits: Habit[];
}

/**
 * Componente puramente visual que exibe as métricas de evolução na semana em um gráfico de barras.
 */
export function WeeklyProgressChart({ habits }: WeeklyProgressChartProps) {
  // Pega os últimos 7 dias dinamicamente
  const last7Days = getLastNDays(7).reverse(); // Reverse para ficar cronológico, ex: (Hoje - 6) até (Hoje)
  
  const totalHabitsCount = habits.length;

  const chartData = last7Days.map((dateString) => {
    // Quantos hábitos ativos nesse dia? (simplificação: só pegamos os que existiam na data ou não importamos)
    // Para simplificar o dashboard, vamos focar nos concluídos dividido pelo total de hábitos que o usuário possui no momento
    // Em um app produtivo, vc deve checar se habit.createdAt <= dateString
    
    let completedCount = 0;
    
    if (totalHabitsCount > 0) {
      habits.forEach((habit) => {
        // Se a data de criação for futura à data do grid, pula (se quiser ser perfeccionista)
        // Simplificação: só conta completions vs total
        if (habit.completedDates.includes(dateString)) {
          completedCount++;
        }
      });
    }

    const percentage =
      totalHabitsCount === 0 ? 0 : Math.round((completedCount / totalHabitsCount) * 100);

    return {
      date: dateString,
      shortName: getShortDayName(dateString),
      percentage,
      isToday: dateString === last7Days[last7Days.length - 1], // ÚItimo da lista ordenada reversamente
    };
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Progresso da Semana
        </h3>
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
          Últimos 7 dias
        </span>
      </div>

      <div className="flex h-40 items-end justify-between gap-2 md:gap-4">
        {chartData.map((day, i) => (
          <div key={day.date} className="flex h-full w-full flex-col items-center justify-end gap-2">
            {/* Tooltip simplificada via title */}
            <div
              title={`${day.percentage}% concluído`}
              className="relative flex w-full max-w-[2.5rem] flex-col justify-end overflow-hidden rounded-t-md bg-zinc-100 dark:bg-zinc-800/60"
              style={{ height: "100%" }}
            >
              {/* Barra que enche */}
              <div
                className="w-full rounded-t-md bg-emerald-500 transition-all duration-700 ease-out dark:bg-emerald-500"
                style={{ height: `${day.percentage}%` }}
              />
            </div>
            
            <span
              className={`text-xs font-medium ${
                day.isToday
                  ? "text-zinc-900 dark:text-emerald-400 font-bold"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {day.shortName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
