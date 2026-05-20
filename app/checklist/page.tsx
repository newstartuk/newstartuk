"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getArrivalProfile,
  getUserTasks,
  updateUserTask,
} from "@/lib/utils";
import { calculateStage } from "@/lib/stage-calculator";
import { isTaskRelevantToProfile } from "@/lib/readiness-score";
import { SEED_TASKS } from "@/lib/seed-data";
import {
  CheckCircle,
  Circle,
  Clock,
  ChevronRight,
  Filter,
  AlertTriangle,
} from "lucide-react";
import type { JourneyStage, TaskCategory } from "@/types";
import Navigation from "@/components/Navigation";

const STAGES: { value: JourneyStage | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PRE", label: "Pre-Arrival" },
  { value: "D1", label: "Arrival Day" },
  { value: "D7", label: "First Week" },
  { value: "D30", label: "First Month" },
  { value: "D90", label: "Days 31–90" },
  { value: "GROW", label: "Growth" },
];

const CATEGORIES: { value: TaskCategory | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "Documents", label: "Documents" },
  { value: "Accommodation", label: "Accommodation" },
  { value: "University", label: "University" },
  { value: "Money", label: "Money" },
  { value: "Health", label: "Health" },
  { value: "Local Admin", label: "Local Admin" },
  { value: "Work", label: "Work" },
  { value: "Safety", label: "Safety" },
  { value: "Local Life", label: "Local Life" },
  { value: "Growth", label: "Growth" },
  { value: "Transport", label: "Transport" },
];

const PRIORITY_COLORS: Record<string, string> = {
  "Very High": "text-red-500 bg-red-50 border border-red-200",
  "High": "text-amber-600 bg-amber-50 border border-amber-200",
  "Medium": "text-blue-500 bg-blue-50 border border-blue-200",
  "Low": "text-muted bg-civic-50 border border-civic-200",
};

const STAGE_COLORS: Record<string, string> = {
  PRE: "text-brand-400",
  D1: "text-amber-500",
  D7: "text-blue-500",
  D30: "text-purple-500",
  D90: "text-green-500",
  GROW: "text-teal-500",
};

const STAGE_LABELS: Record<string, string> = {
  PRE: "Pre-Arrival",
  D1: "Day 1",
  D7: "Week 1",
  D30: "Month 1",
  D90: "Days 31–90",
  GROW: "Growth",
};

export default function ChecklistPage() {
  const [profile, setProfile] = useState<ReturnType<typeof getArrivalProfile>>(null);
  const [tasks, setTasks] = useState<ReturnType<typeof getUserTasks>>([]);
  const [stageFilter, setStageFilter] = useState<JourneyStage | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<"all" | "not_started" | "in_progress" | "complete">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const p = getArrivalProfile();
    const t = getUserTasks();
    setProfile(p);
    setTasks(t);
    if (p) {
      const s = calculateStage(p.arrivalDate || null);
      setStageFilter(s);
    }
    setMounted(true);
  }, []);

  const filtered = SEED_TASKS.filter((t) => {
    if (!t.active) return false;
    if (!profile || !isTaskRelevantToProfile(t, profile)) return false;
    if (stageFilter !== "ALL" && t.stage !== stageFilter) return false;
    if (categoryFilter !== "ALL" && t.category !== categoryFilter) return false;
    if (statusFilter !== "all") {
      const status = tasks.find((ut) => ut.taskId === t.taskId)?.status ?? "not_started";
      if (status !== statusFilter) return false;
    }
    return true;
  });

  const toggleTask = (taskId: string, currentStatus: string) => {
    const next = currentStatus === "complete" ? "in_progress" : "complete";
    const updated = updateUserTask(taskId, next);
    setTasks(updated);
  };

  if (!mounted) return null;

  return (
    <Navigation>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">My Checklist</h1>
            <p className="text-sm text-muted mt-0.5">
              {tasks.filter((t) => t.status === "complete").length} of{" "}
              {SEED_TASKS.filter((t) => t.active && (!profile || isTaskRelevantToProfile(t, profile))).length} tasks complete
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Stage tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {STAGES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStageFilter(s.value as typeof stageFilter)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  stageFilter === s.value
                    ? "bg-primary text-white"
                    : "bg-white text-muted border border-border hover:bg-civic-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
              className="select-field w-auto text-xs"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="select-field w-auto text-xs"
            >
              <option value="all">All statuses</option>
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>

        {/* Tasks */}
        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <CheckCircle className="w-10 h-10 text-muted mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted">No tasks match your filters.</p>
            <button onClick={() => { setStageFilter("ALL"); setCategoryFilter("ALL"); setStatusFilter("all"); }} className="text-xs text-primary hover:underline mt-2">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((task) => {
              const userTask = tasks.find((ut) => ut.taskId === task.taskId);
              const status = userTask?.status ?? "not_started";
              const isComplete = status === "complete";
              const isInProgress = status === "in_progress";

              return (
                <div
                  key={task.taskId}
                  className={`card flex items-start gap-3 transition-all ${
                    isComplete ? "opacity-60 bg-civic-50/50" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.taskId, status)}
                    className="mt-0.5 shrink-0 transition-colors"
                  >
                    {isComplete ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : isInProgress ? (
                      <Clock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-civic-300 hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isComplete ? "line-through text-muted" : "text-navy"}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-muted">{task.category}</span>
                          <span className={`text-xs font-medium ${STAGE_COLORS[task.stage] ?? "text-muted"}`}>
                            {STAGE_LABELS[task.stage] ?? task.stage}
                          </span>
                          {task.conditional && (
                            <span className="text-xs text-amber-500">Conditional</span>
                          )}
                          {task.riskWarning && (
                            <span className="text-xs text-red-500 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Risk
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/tasks/${task.taskId}`} className="shrink-0 btn-ghost p-1.5">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Navigation>
  );
}
