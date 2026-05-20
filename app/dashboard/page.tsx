"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { getUser, getArrivalProfile, getUserTasks } from "@/lib/utils";
import { calculateReadinessScore } from "@/lib/readiness-score";
import { calculateStage, getStageLabel, getStageColor } from "@/lib/stage-calculator";
import { SEED_TASKS } from "@/lib/seed-data";
import { getAllScamAlerts } from "@/lib/scam-alerts";
import type { UserTask } from "@/types";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  BookOpen,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [profile, setProfile] = useState<ReturnType<typeof getArrivalProfile>>(null);
  const [userTasks, setUserTasks] = useState<UserTask[]>([]);
  const [scamAlertIndex, setScamAlertIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const u = getUser();
    const p = getArrivalProfile();
    if (!u) { router.push("/signup"); return; }
    setUser(u);
    setProfile(p);
    setUserTasks(getUserTasks());
    const interval = setInterval(() => {
      setScamAlertIndex((i) => (i + 1) % getAllScamAlerts().length);
    }, 15000);
    return () => clearInterval(interval);
  }, [router]);

  if (!mounted || !user) return null;

  const stage = calculateStage(profile?.arrivalDate);
  const score = calculateReadinessScore(SEED_TASKS, userTasks);
  const highPriority = SEED_TASKS.filter(
    (t) => t.priority === "Very High" && t.active && !userTasks.find((ut) => ut.taskId === t.taskId && ut.status === "complete")
  ).slice(0, 3);
  const completedCount = userTasks.filter((ut) => ut.status === "complete").length;
  const scamAlerts = getAllScamAlerts();
  const currentAlert = scamAlerts[scamAlertIndex];

  const circumference = 2 * Math.PI * 40;
  const progress = (score.totalScore / 100) * circumference;

  const stageColorClass = getStageColor(stage);

  return (
    <Navigation>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome */}
        <div>
          <p className="text-sm text-muted">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="text-2xl font-bold text-navy mt-0.5">
            Hello, {user.name.split(" ")[0]} 👋
          </h1>
          {!profile?.profileCompleted && (
            <Link href="/onboarding" className="text-xs text-primary hover:underline mt-1 block">
              → Complete your arrival profile to get your personalised roadmap
            </Link>
          )}
        </div>

        {/* Stage + Score */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Score ring */}
          <div className="card flex items-center gap-5">
            <div className="relative shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D9E2EC" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#0B7285" strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{score.totalScore}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">UK Readiness Score</p>
              <p className="text-sm font-semibold text-navy">{score.completedTasks}/{score.totalRequiredTasks} tasks complete</p>
              <Link href="/checklist" className="text-xs text-primary hover:underline mt-1 block">
                View checklist →
              </Link>
            </div>
          </div>

          {/* Stage */}
          <div className="card flex items-center gap-5">
            <div className={`shrink-0 w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center ${stageColorClass.split(" ").map((c) => c.startsWith("bg-") ? c : "").join(" ")}`}
              style={{ borderColor: stageColorClass.split(" ")[1] === "border-blue-200" ? "#BFDBFE" :
                                 stageColorClass.includes("teal-50") ? "#CCFBF1" :
                                 stageColorClass.includes("teal-100") ? "#99F6E4" :
                                 stageColorClass.includes("amber-50") ? "#FEF3C7" :
                                 stageColorClass.includes("orange-50") ? "#FFF7ED" :
                                 stageColorClass.includes("green-50") ? "#F0FDF4" : "#D1FAE5" }}
            >
              <span className="text-xl font-bold" style={{
                color: stage === "PRE" ? "#2563EB" :
                       stage === "D1" ? "#0B7285" :
                       stage === "D7" ? "#0D9488" :
                       stage === "D30" ? "#D97706" :
                       stage === "D90" ? "#EA580C" : "#16A34A"
              }}>{stage}</span>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Current stage</p>
              <p className="text-base font-bold text-navy">{getStageLabel(stage)}</p>
              <p className="text-xs text-muted mt-0.5">
                {profile?.city ? `${profile.city} · ` : ""}
                {profile?.university?.split(" ")[0]} University
              </p>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card">
          <h2 className="section-title flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Progress by category
          </h2>
          <div className="space-y-3">
            {score.categoryBreakdown.filter((c) => c.total > 0).map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-navy">{cat.category}</span>
                  <span className="text-xs text-muted">{cat.completed}/{cat.total} tasks</span>
                </div>
                <div className="h-2 bg-civic-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent tasks */}
        {highPriority.length > 0 && (
          <div className="card">
            <h2 className="section-title flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Top priorities right now
            </h2>
            <div className="space-y-2">
              {highPriority.map((t) => (
                <Link
                  key={t.taskId}
                  href={`/tasks/${t.taskId}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-civic-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.title}</p>
                    <p className="text-xs text-muted">{t.stage} · {t.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
            <Link href="/checklist" className="text-xs text-primary hover:underline mt-3 block">
              View full checklist →
            </Link>
          </div>
        )}

        {/* Scam alert */}
        {currentAlert && (
          <div className={`card border-2 ${currentAlert.severity === "high" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
            <h2 className="text-sm font-bold text-navy mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              Scam Alert — Stay Safe
            </h2>
            <p className="text-sm font-semibold text-navy mb-1">{currentAlert.title}</p>
            <p className="text-xs text-civic-600 leading-relaxed">{currentAlert.body}</p>
            <Link href="/guides/housing-scam-warning" className="text-xs text-primary hover:underline mt-2 block">
              Read full scam guides →
            </Link>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { href: "/checklist", label: "My Checklist", icon: CheckCircle, sub: `${completedCount} tasks done` },
            { href: "/guides", label: "Guidance Library", icon: BookOpen, sub: "20+ articles" },
            { href: "/document-helper", label: "Document Helper", icon: Shield, sub: "Nia explains" },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="card-hover text-center py-4">
              <action.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold text-navy">{action.label}</p>
              <p className="text-xs text-muted mt-0.5">{action.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </Navigation>
  );
}
