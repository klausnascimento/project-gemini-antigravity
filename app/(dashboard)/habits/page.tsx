import { HabitTrackerView } from "../../../components/HabitTrackerView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hábitos | Dashboard",
  description: "Monitore e gerencie seus hábitos diariamente",
};

export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <HabitTrackerView />
    </div>
  );
}
