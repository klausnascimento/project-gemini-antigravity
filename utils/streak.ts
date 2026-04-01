/**
 * Calcula a sequência de dias consecutivos (streak)
 * @param completedDates Array de datas no formato YYYY-MM-DD
 * @param referenceDateString Data de referência (hoje) YYYY-MM-DD
 * @returns Quantidade de dias consecutivos ininterruptos
 */
export function calculateHabitStreak(
  completedDates: string[],
  referenceDateString: string
): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Cria um Set para busca O(1)
  const completedSet = new Set(completedDates);
  let streak = 0;

  // Lógica:
  // Convertendo data de referência em YYYY-MM-DD split
  const [year, month, day] = referenceDateString.split("-").map(Number);
  
  // Verifica se hoje está concluído
  const isTodayCompleted = completedSet.has(referenceDateString);
  
  if (isTodayCompleted) {
    streak++;
  }

  // Ponto de partida para a contagem contínua reversa é ontem (1 dia antes de hoje)
  let daysToSubtract = 1;
  while (true) {
    const prevDateObj = new Date(year, month - 1, day - daysToSubtract);
    
    // Calcula ano, mês (1 a 12), dia padronizados para garantir que ficamos imunes a timezone local 
    // já que usamos a base sem horas para setar
    const checkYear = prevDateObj.getFullYear();
    const checkMonth = String(prevDateObj.getMonth() + 1).padStart(2, "0");
    const checkDay = String(prevDateObj.getDate()).padStart(2, "0");
    const formattedCheckDate = `${checkYear}-${checkMonth}-${checkDay}`;

    if (completedSet.has(formattedCheckDate)) {
      streak++;
      daysToSubtract++;
    } else {
      break; // Interrompe no primeiro dia quebrado na sequência reversa
    }
  }

  return streak;
}
