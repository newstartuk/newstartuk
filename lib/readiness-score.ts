import type {
  ChecklistTask,
  UserTask,
  ArrivalProfile,
  ReadinessScore,
  CategoryScore,
  TaskCategory,
} from "@/types";
import { SEED_TASKS } from "./seed-data";

export const CATEGORY_WEIGHTS: Record<TaskCategory, number> = {
  Documents: 0.15,
  Accommodation: 0.15,
  University: 0.15,
  Money: 0.15,
  Health: 0.1,
  "Local Admin": 0.1,
  Work: 0.1,
  Safety: 0.05,
  "Local Life": 0.05,
  Transport: 0.05,
  Growth: 0.05,
};

const ALL_CATEGORIES: TaskCategory[] = [
  "Documents",
  "Accommodation",
  "University",
  "Money",
  "Health",
  "Local Admin",
  "Work",
  "Safety",
  "Local Life",
  "Transport",
  "Growth",
];

export function isTaskRelevantToProfile(task: ChecklistTask, profile: ArrivalProfile): boolean {
  // MVP default is student
  if (task.stage === "PRE" && profile.arrivalStatus === "arrived") return false;
  return task.active;
}

export function calculateReadinessScore(
  profile: ArrivalProfile,
  userTasks: UserTask[]
): ReadinessScore {
  const relevantTasks = SEED_TASKS.filter(
    (t) => t.active && isTaskRelevantToProfile(t, profile)
  );

  // Build a map of user task status
  const taskStatusMap = new Map<string, string>();
  userTasks.forEach((ut) => taskStatusMap.set(ut.taskId, ut.status));

  const categoryBreakdown: CategoryScore[] = ALL_CATEGORIES.map((cat) => {
    const catTasks = relevantTasks.filter((t) => t.category === cat);
    const requiredTasks = catTasks.filter((t) => t.required);
    const completedCount = requiredTasks.filter(
      (t) => taskStatusMap.get(t.taskId) === "complete"
    ).length;
    const totalRequired = requiredTasks.length;
    const percentage = totalRequired > 0 ? (completedCount / totalRequired) * 100 : 100;
    const weight = CATEGORY_WEIGHTS[cat] ?? 0.05;

    return {
      category: cat,
      weight,
      completed: completedCount,
      total: totalRequired,
      percentage: Math.round(percentage),
      weightedContribution: (percentage / 100) * weight,
    };
  });

  // For categories with no required tasks (optional categories), treat as 100% complete
  const totalScore = Math.round(
    categoryBreakdown.reduce(
      (sum, cat) =>
        sum + (cat.total === 0 ? cat.weight * 1 : cat.weightedContribution),
      0
    ) * 100
  );

  return { totalScore: Math.min(100, totalScore), categoryBreakdown };
}

export function getUrgentTasks(
  profile: ArrivalProfile,
  userTasks: UserTask[],
  limit = 3
): ChecklistTask[] {
  const urgent = SEED_TASKS.filter((t) => {
    if (!t.active) return false;
    if (!isTaskRelevantToProfile(t, profile)) return false;
    const status = userTasks.find((ut) => ut.taskId === t.taskId)?.status ?? "not_started";
    return status !== "complete" && (t.priority === "Very High" || t.priority === "High");
  });

  return urgent.slice(0, limit);
}
