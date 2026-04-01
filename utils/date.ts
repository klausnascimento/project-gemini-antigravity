/**
 * Retorna uma data string formatada em YYYY-MM-DD a partir de um objeto Date local
 * Isso previne problemas de timezone quando a interface interage apenas com dias plenos
 */
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

/**
 * Retorna as datas dos últimos 'n' dias, terminando em hoje.
 */
export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDateToYYYYMMDD(d));
  }
  
  return dates;
}

/**
 * Funções auxiliares para formatar labels curtas (ex: 'Seg', 'Ter')
 */
export function getShortDayName(dateString: string): string {
  // Parsing simples para evitar inconsistências de TZ
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).replace(".", "");
}
