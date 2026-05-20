"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { CATEGORY_META, CHECKLIST_DATA } from "@/lib/checklist-data";

const PHASE_LABELS: Record<string, string> = {
  week1:    "Week 1 — Day 1",
  week2:    "Week 2",
  "week3-6":"Weeks 3–6",
  "week7-13":"Weeks 7–13",
};

export default function DashboardPage() {
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [setupDone, setSetupDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("ns_arrival_date");
    if (stored) {
      setArrivalDate(stored);
      setSetupDone(true);
    }
    const comp = JSON.parse(localStorage.getItem("ns_completed_tasks") || "[]");
    setCompleted(comp);
  }, []);

  const daysRemaining = arrivalDate
    ? Math.max(0, 90 - Math.floor((Date.now() - new Date(arrivalDate).getTime()) / 86400000))
    : null;

  const overall = CHECKLIST_DATA.length > 0
    ? Math.round((completed.length / CHECKLIST_DATA.length) * 100)
    : 0;

  const byCategory = Object.entries(CATEGORY_META).map(([key, meta]) => {
    const tasks = CHECKLIST_DATA.filter((t) => t.category === key);
    const done = tasks.filter((t) => completed.includes(t.id)).length;
    return { key, meta, total: tasks.length, done, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  });

  const criticalTasks = CHECKLIST_DATA.filter(
    (t) => t.priority === "critical" && !completed.includes(t.id)
  );

  const urgentTasks = CHECKLIST_DATA.filter(
    (t) => t.priority === "critical" || t.phase === "week1"
  ).filter((t) => !completed.includes(t.id)).slice(0, 4);

  if (!setupDone) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Welcome to NewstartUK</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            To personalise your 90-day plan, tell us when you arrived (or are arriving) in the UK.
          </p>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2 text-left">Arrival Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-brand-500 transition-colors"
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (!arrivalDate) return;
              localStorage.setItem("ns_arrival_date", arrivalDate);
              setSetupDone(true);
              router.refresh();
            }}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Start My 90-Day Plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
        <p className="text-gray-400">Track your 90-day settlement progress.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-sm text-gray-400">Days Remaining</span>
          </div>
          <p className="text-4xl font-bold text-white">{daysRemaining}</p>
          <p className="text-sm text-gray-500 mt-1">of 90 days</p>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Overall Progress</span>
          </div>
          <p className="text-4xl font-bold text-white">{overall}%</p>
          <div className="mt-3 h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${overall}%` }}
            />
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">Tasks Completed</span>
          </div>
          <p className="text-4xl font-bold text-white">{completed.length}</p>
          <p className="text-sm text-gray-500 mt-1">of {CHECKLIST_DATA.length} total</p>
        </div>
      </div>

      {/* Arrival date reset */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            localStorage.removeItem("ns_arrival_date");
            setSetupDone(false);
          }}
          className="text-xs text-gray-600 hover:text-gray-400 flex items-center gap-1 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" /> Change arrival date
        </button>
      </div>

      {/* Category breakdown */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Progress by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {byCategory.map(({ key, meta, total, done, pct }) => (
            <Link
              key={key}
              href={`/checklist?category=${key}`}
              className="bg-dark-800 border border-dark-600 rounded-xl p-4 hover:border-dark-500 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${meta.color}`}>{meta.label}</span>
                <span className="text-sm text-gray-400">{done}/{total}</span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: `var(--tw-colors-${key})` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{pct}% complete</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Priority tasks */}
      {urgentTasks.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Priority Tasks</h2>
          <div className="bg-dark-800 border border-dark-600 rounded-xl overflow-hidden">
            {urgentTasks.map((task, i) => (
              <Link
                key={task.id}
                href={`/checklist?category=${task.category}`}
                className={`flex items-center justify-between p-4 hover:bg-dark-700 transition-colors ${i < urgentTasks.length - 1 ? "border-b border-dark-700" : ""}`}
              >
                <div>
                  <p className="text-white font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {CATEGORY_META[task.category]?.label} · {PHASE_LABELS[task.phase]}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/checklist"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
        >
          View Full Checklist <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
