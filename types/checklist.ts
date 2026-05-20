export type Category = "legal" | "finance" | "health" | "transport" | "housing" | "social";

export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  category: Category;
  phase: "week1" | "week2" | "week3-6" | "week7-13";
  priority: "critical" | "important" | "optional";
  estimatedMinutes: number;
  instructions: string[];
  tips?: string[];
  links?: { label: string; url: string }[];
  completed?: boolean;
}

export interface ChecklistState {
  arrivalDate: string;
  completedTasks: string[];
  notes: Record<string, string>;
}
