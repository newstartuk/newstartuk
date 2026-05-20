"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CheckSquare,
  BookOpen,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { getUserTasks } from "@/lib/utils";
import { SEED_TASKS } from "@/lib/seed-data";
import { GUIDANCE_PAGES } from "@/lib/guidance-data";
import Navigation from "@/components/Navigation";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<ReturnType<typeof getUserTasks>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTasks(getUserTasks());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const completedCount = tasks.filter((t) => t.status === "complete").length;
  const totalTasks = SEED_TASKS.filter((t) => t.active).length;
  const guidanceCount = GUIDANCE_PAGES.length;
  const highPriorityTasks = SEED_TASKS.filter((t) => t.priority === "Very High" && t.active);
  const riskFlaggedTasks = SEED_TASKS.filter((t) => t.riskWarning && t.active);

  return (
    <Navigation>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Checklist Tasks",
              value: `${SEED_TASKS.filter((t) => t.active).length}`,
              sub: `Required: ${SEED_TASKS.filter((t) => t.required && t.active).length}`,
              icon: CheckSquare,
              color: "text-primary",
              bg: "bg-brand-50",
            },
            {
              label: "Guidance Pages",
              value: `${guidanceCount}`,
              sub: "All published",
              icon: BookOpen,
              color: "text-purple-500",
              bg: "bg-purple-50",
            },
            {
              label: "High Priority Tasks",
              value: `${highPriorityTasks.length}`,
              sub: `${riskFlaggedTasks.length} with risk warnings`,
              icon: TrendingUp,
              color: "text-amber-500",
              bg: "bg-amber-50",
            },
            {
              label: "Users (MVP mock)",
              value: "—",
              sub: "Auth: Supabase later",
              icon: Users,
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
          ].map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted">{stat.label}</p>
                <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
              <p className="text-xs text-muted mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/admin/tasks" className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-navy mb-1">Task Manager</h2>
                <p className="text-sm text-muted">
                  Manage {totalTasks} checklist task templates — edit priority, guidance links, risk warnings, and activate/deactivate tasks.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted shrink-0" />
            </div>
          </Link>
          <Link href="/admin/guides" className="card-hover">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-navy mb-1">Guidance Manager</h2>
                <p className="text-sm text-muted">
                  Manage {guidanceCount} guidance articles — edit content, update categories, review dates, and add new articles.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted shrink-0" />
            </div>
          </Link>
        </div>

        {/* High priority task preview */}
        <div className="card">
          <h2 className="section-title mb-3">Very High Priority Tasks</h2>
          <div className="space-y-2">
            {highPriorityTasks.slice(0, 5).map((t) => (
              <div key={t.taskId} className="flex items-center justify-between p-3 bg-civic-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-navy">{t.title}</p>
                  <p className="text-xs text-muted">{t.taskId} · {t.category} · {t.stage}</p>
                </div>
                <Link href={`/admin/tasks`} className="text-xs text-primary hover:underline">
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navigation>
  );
}
