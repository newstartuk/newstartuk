"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_META, CHECKLIST_DATA } from "@/lib/checklist-data";
import { ChecklistTask } from "@/types/checklist";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Clock,
  X,
  ExternalLink,
} from "lucide-react";

const PHASE_LABELS: Record<string, string> = {
  week1:    "Week 1",
  week2:    "Week 2",
  "week3-6":"Weeks 3–6",
  "week7-13":"Weeks 7–13",
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: "text-red-400 bg-red-500/10",
  important: "text-amber-400 bg-amber-500/10",
  optional: "text-gray-400 bg-gray-500/10",
};

export default function ChecklistWrapper() {
  const searchParams = useSearchParams();
  const [completed, setCompleted] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setFilterCategory(cat);
    const stored = JSON.parse(localStorage.getItem("ns_completed_tasks") || "[]");
    setCompleted(stored);
  }, [searchParams]);

  const toggleTask = (id: string) => {
    const updated = completed.includes(id)
      ? completed.filter((c) => c !== id)
      : [...completed, id];
    setCompleted(updated);
    localStorage.setItem("ns_completed_tasks", JSON.stringify(updated));
  };

  const filtered = CHECKLIST_DATA.filter((t) => {
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    if (showOnlyIncomplete && completed.includes(t.id)) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, ChecklistTask[]>>((acc, task) => {
    if (!acc[task.phase]) acc[task.phase] = [];
    acc[task.phase].push(task);
    return acc;
  }, {});

  const total = CHECKLIST_DATA.length;
  const done = completed.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Settlement Checklist</h1>
          <p className="text-gray-400 text-sm">
            {done} of {total} tasks complete ({pct}%)
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* Filter toggle */}
          <button
            onClick={() => setShowOnlyIncomplete(!showOnlyIncomplete)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              showOnlyIncomplete
                ? "border-brand-500 bg-brand-500/10 text-brand-300"
                : "border-dark-600 text-gray-400 hover:text-white"
            }`}
          >
            {showOnlyIncomplete ? "✓ Incomplete Only" : "Show All"}
          </button>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-8 h-3 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setFilterCategory("all")}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            filterCategory === "all"
              ? "border-brand-500 bg-brand-500/10 text-brand-300"
              : "border-dark-600 text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>
        {Object.entries(CATEGORY_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setFilterCategory(key)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              filterCategory === key
                ? "border-brand-500 bg-brand-500/10 text-brand-300"
                : "border-dark-600 text-gray-400 hover:text-white"
            }`}
          >
            {meta.label}
          </button>
        ))}
      </div>

      {/* Task list grouped by phase */}
      {Object.entries(grouped).map(([phase, tasks]) => (
        <div key={phase} className="mb-10">
          <h2 className="text-base font-semibold text-gray-300 mb-4 uppercase tracking-wide text-sm">
            {PHASE_LABELS[phase] || phase}
          </h2>
          <div className="space-y-2">
            {tasks.map((task) => {
              const isDone = completed.includes(task.id);
              const isExpanded = expandedTask === task.id;
              const meta = CATEGORY_META[task.category];

              return (
                <div key={task.id} className="bg-dark-800 border border-dark-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-dark-700/50 transition-colors"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTask(task.id);
                      }}
                      className="shrink-0 mt-0.5"
                      aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_COLORS[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span className={`text-xs ${meta.color}`}>{meta.label}</span>
                      </div>
                      <p className={`text-sm font-medium leading-snug ${isDone ? "text-gray-500 line-through" : "text-white"}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.estimatedMinutes} min
                      </p>
                    </div>
                    <div className="shrink-0 text-gray-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-0 border-t border-dark-700 mt-1">
                      <p className="text-sm text-gray-300 mt-4 mb-4 leading-relaxed">{task.description}</p>

                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Steps</h4>
                      <ol className="space-y-2 mb-5">
                        {task.instructions.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-300">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-dark-700 text-gray-400 text-xs flex items-center justify-center mt-0.5 font-medium">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>

                      {task.tips && task.tips.length > 0 && (
                        <>
                          <h4 className="text-xs font-semibold text-yellow-500/80 uppercase mb-2">💡 Tips</h4>
                          <ul className="space-y-1 mb-5">
                            {task.tips.map((tip, i) => (
                              <li key={i} className="text-sm text-gray-400 flex gap-2">
                                <span className="text-yellow-500">•</span> {tip}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {task.links && task.links.length > 0 && (
                        <>
                          <h4 className="text-xs font-semibold text-brand-400/80 uppercase mb-2">🔗 Useful Links</h4>
                          <ul className="space-y-1 mb-4">
                            {task.links.map((link, i) => (
                              <li key={i}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-brand-400 hover:text-brand-300 underline underline-offset-2 flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" /> {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-2 text-xs px-4 py-2 rounded-lg font-medium transition-colors ${
                          isDone
                            ? "bg-dark-700 text-gray-300 hover:bg-dark-600"
                            : "bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/30"
                        }`}
                      >
                        {isDone ? "Mark as Incomplete" : "Mark as Complete"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <CheckCircle2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No tasks match your filter.</p>
        </div>
      )}
    </div>
  );
}
