export interface Habit {
  id: string;
  title: string;
  createdAt: string; // ISO Date String ou YYYY-MM-DD
  completedDates: string[]; // Array de datas no formato YYYY-MM-DD
}
