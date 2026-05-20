"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getArrivalProfile,
  getUserTasks,
  daysRemaining,
  daysUntil,
} from "@/lib/utils";
import {
  calculateReadinessScore,
  getUrgentTasks,
  isTaskRelevantToProfile,
} from "@/lib/readiness-score";
import { calculateStage, getStageLabel, getStageDescription, getStageColor, getDaysSinceArrival } from "@/lib/stage-calculator";
import { getRandomScamAlert } from "@/lib/scam-alerts";
import { SEED_TASKS } from "@/lib/seed-data";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Shield,
  BookOpen,
  Bell,
  TrendingUp,
  Circle,
} from "lucide-react";
import type { JourneyStage, ScamAlert } from "@/types";
import Navigation from "@/components/Navigation";

const CATEGORY_COLORS: Record<string, string> = {
  Documents: "bg-blue-400",
  Accommodation: "bg-amber-400",
  University: "bg-purple-400",
  Money: "bg-green-400",
  Health: "bg-red-400",
  "Local Admin": "bg-teal-400",
  Work: "bg-pink-400",
  Safety: "bg-orange-400",
  "Local Life": "bg-cyan-400",
  Transport: "bg-indigo-400",
  Growth: "bg-lime-400",
};

export default function DashboardWrapper() {
  const [profile, setProfile] = useState<ReturnType<typeof getArrivalProfile>>(null);
  const [userTasks, setUserTasks] = useState<ReturnType<typeof getUserTasks>>([]);
  const [readiness, setReadiness] = useState<ReturnType<typeof calculateReadinessScore> | null>(null);
  const [scamAlert, setScamAlert] = useState<ScamAlert | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const p = getArrivalProfile();
    const t = getUserTasks();
    setProfile(p);
    setUserTasks(t);
    if (p) {
      const score = calculateReadinessScore(p, t);
      setReadiness(score);
    }
    setScamAlert(getRandomScamAlert());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!profile) {
    return (
      <div className="min-h-screen bg-civic-50 flex items-center justify-center px-4">
        <div className="card text-center max-w-sm">
          <h2 className="text-lg font-bold text-navy mb-2">Welcome to NewStart UK!</h2>
          <p className="text-sm text-muted mb-4">Complete your profile to get your personalised checklist.</p>
          <Link href="/onboarding" className="btn-primary inline-flex">Complete Setup</Link>
        </div>
      </div>
    );
  }

  const stage = calculateStage(profile.arrivalDate || null);
  const stageColor = getStageColor(stage);
  const urgentTasks = profile ? getUrgentTasks(profile, userTasks) : [];
  const daysLeft = daysRemaining(profile.arrivalDate || null);
  const daysSince = getDaysSinceArrival(profile.arrivalDate || null);

  const completedCount = userTasks.filter((t) => t.status === "complete").length;
  const totalRelevant = SEED_TASKS.filter(
    (t) => t.active && isTaskRelevantToProfile(t, profile!)
  ).length;

  const circumference = 2 * Math.PI * 44;
  const score = readiness?.totalScore ?? 0;
  const strokeDash = (score / 100) * circumference;

  return (
    <Navigation>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Welcome header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted mb-1">Your settlement journey</p>
            <h1 className="text-2xl font-bold text-navy">
              Welcome{userTasks.length > 0 ? "" : " — let's get started"}.
            </h1>
            {profile.arrivalDate && (
              <p className="text-sm text-muted mt-1">
                {daysLeft > 0
                  ? `${daysLeft} days left in your 90-day window`
                  : daysSince > 0
                  ? `Day ${daysSince} of settlement`
                  : "Arriving soon"}
                {" · "}{profile.city}
              </p>
            )}
          </div>
          <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${stageColor} shrink-0`}>
            {getStageLabel(stage)}
          </div>
        </div>

        {/* Stage card */}
        <div className={`card border-l-4 border-primary ${stageColor.split(" ")[1]} ${stageColor.split(" ")[0]}/5`}>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-navy">{getStageLabel(stage)}</p>
              <p className="text-xs text-muted mt-0.5">{getStageDescription(stage)}</p>
            </div>
          </div>
        </div>

        {/* Score + quick stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Readiness score ring */}
          <div className="card text-center">
            <p className="text-xs text-muted mb-3">UK Readiness Score</p>
            <div className="relative inline-flex items-center justify-center w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke={score >= 60 ? "#2F9E44" : score >= 30 ? "#F08C00" : "#C92A2A"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - strokeDash}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-navy">{score}%</span>
            </div>
            <p className="text-xs text-muted mt-2">
              {completedCount}/{totalRelevant} tasks complete
            </p>
          </div>

          {/* Quick stats */}
          <div className="sm:col-span-2 space-y-3">
            <div className="card">
              <p className="text-xs text-muted mb-3">Task progress</p>
              <div className="space-y-2">
                {[
                  { label: "Complete", value: userTasks.filter((t) => t.status === "complete").length, color: "bg-green-400" },
                  { label: "In progress", value: userTasks.filter((t) => t.status === "in_progress").length, color: "bg-amber-400" },
                  { label: "Not started", value: totalRelevant - userTasks.length, color: "bg-civic-200" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted w-24">{s.label}</span>
                    <div className="flex-1 progress-bar">
                      <div className={`progress-fill ${s.color}`} style={{ width: `${totalRelevant > 0 ? (s.value / totalRelevant) * 100 : 0}%` }} />
                    </div>
                    <span className="text-xs text-muted w-8 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        {readiness && (
          <div className="card">
            <h2 className="section-title mb-1">Progress by category</h2>
            <p className="section-subtitle mb-4">Weighted readiness score across settlement areas.</p>
            <div className="space-y-3">
              {readiness.categoryBreakdown.filter((c) => c.total > 0).map((cat) => (
                <div key={cat.category} className="flex items-center gap-3">
                  <span className="text-xs text-muted w-28 shrink-0">{cat.category}</span>
                  <div className="flex-1 progress-bar">
                    <div
                      className={`progress-fill ${CATEGORY_COLORS[cat.category] ?? "bg-primary"}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted w-10 text-right">{cat.percentage}%</span>
                  <span className="text-xs text-muted w-12 text-right">
                    {cat.completed}/{cat.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Urgent tasks */}
        {urgentTasks.length > 0 && (
          <div className="card">
            <h2 className="section-title mb-3">Urgent tasks</h2>
            <div className="space-y-2">
              {urgentTasks.map((task) => {
                const status = userTasks.find((t) => t.taskId === task.taskId)?.status ?? "not_started";
                return (
                  <Link
                    key={task.taskId}
                    href={`/tasks/${task.taskId}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-civic-50 transition-colors group"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      status === "complete" ? "bg-green-400" :
                      status === "in_progress" ? "bg-amber-400" : "bg-civic-300"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy truncate">{task.title}</p>
                      <p className="text-xs text-muted">{task.category} · {task.priority} priority</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/checklist" className="card-hover text-center">
            <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">My Checklist</p>
            <p className="text-xs text-muted mt-0.5">View all tasks</p>
          </Link>
          <Link href="/guides" className="card-hover text-center">
            <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">Guides</p>
            <p className="text-xs text-muted mt-0.5">Read guidance</p>
          </Link>
          <Link href="/document-helper" className="card-hover text-center">
            <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">Doc Helper</p>
            <p className="text-xs text-muted mt-0.5">Plain-English explainer</p>
          </Link>
        </div>

        {/* Scam alert */}
        {scamAlert && (
          <div className="card border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-sm font-bold text-danger">Scam Alert — {scamAlert.title}</h2>
                </div>
                <p className="text-sm text-red-700 mb-2">{scamAlert.headline}</p>
                <p className="text-xs text-red-600 leading-relaxed mb-2">{scamAlert.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-red-700">Red flags to watch for:</p>
                  {scamAlert.redFlags.slice(0, 3).map((rf, i) => (
                    <p key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                      <span className="text-red-400 shrink-0">⚠</span>{rf}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile card */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Your profile</h2>
            <Link href="/settings" className="text-xs text-primary hover:underline flex items-center gap-1">
              Edit <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-muted">City</span>
              <p className="font-medium text-navy">{profile.city || "—"}</p>
            </div>
            <div>
              <span className="text-xs text-muted">University</span>
              <p className="font-medium text-navy">{profile.university || "—"}</p>
            </div>
            <div>
              <span className="text-xs text-muted">Arrival</span>
              <p className="font-medium text-navy">
                {profile.arrivalDate
                  ? new Date(profile.arrivalDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted">Accommodation</span>
              <p className="font-medium text-navy capitalize">
                {profile.accommodationType?.replace(/_/g, " ") || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Navigation>
  );
}
