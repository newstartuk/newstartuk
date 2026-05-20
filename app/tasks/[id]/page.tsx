"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getUserTasks, updateUserTask, getArrivalProfile } from "@/lib/utils";
import { SEED_TASKS } from "@/lib/seed-data";
import { GUIDANCE_PAGES } from "@/lib/guidance-data";
import {
  CheckCircle,
  Clock,
  Circle,
  ChevronLeft,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Info,
  ArrowRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";

const DISCLAIMER =
  "NewStart UK provides general settlement guidance, checklist support, document explanation, and signposting. We do not provide legal, immigration, financial, tax, medical, or housing advice. For official or regulated matters, please use official sources or speak to a qualified professional.";

const PRIORITY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  "Very High": { label: "Very High", color: "text-red-500", bg: "bg-red-50 border border-red-200" },
  "High": { label: "High", color: "text-amber-600", bg: "bg-amber-50 border border-amber-200" },
  "Medium": { label: "Medium", color: "text-blue-500", bg: "bg-blue-50 border border-blue-200" },
  "Low": { label: "Low", color: "text-muted", bg: "bg-civic-50 border border-civic-200" },
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const [status, setStatus] = useState<string>("not_started");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = getUserTasks().find((ut) => ut.taskId === taskId);
    if (t) setStatus(t.status);
    setMounted(true);
  }, [taskId]);

  if (!mounted) return null;

  const task = SEED_TASKS.find((t) => t.taskId === taskId);
  if (!task) {
    return (
      <Navigation>
        <div className="max-w-3xl mx-auto text-center py-20">
          <h1 className="text-lg font-bold text-navy mb-2">Task not found</h1>
          <Link href="/checklist" className="text-sm text-primary hover:underline">Back to checklist</Link>
        </div>
      </Navigation>
    );
  }

  const guidance = task.guidanceSlug
    ? GUIDANCE_PAGES.find((g) => g.slug === task.guidanceSlug)
    : null;
  const priority = PRIORITY_STYLES[task.priority];

  const handleStatus = (newStatus: string) => {
    updateUserTask(task.taskId, newStatus as "not_started" | "in_progress" | "complete");
    setStatus(newStatus);
  };

  return (
    <Navigation>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        {/* Back */}
        <Link href="/checklist" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to checklist
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priority.bg} ${priority.color}`}>
              {priority.label} priority
            </span>
            <span className="text-xs text-muted">{task.category}</span>
            <span className="text-xs text-muted">·</span>
            <span className="text-xs text-muted">{task.stage === "PRE" ? "Pre-Arrival" : task.stage}</span>
            {task.required && <span className="text-xs text-muted">· Required</span>}
            {task.conditional && (
              <span className="text-xs text-amber-500">· {task.conditionNote}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-navy leading-snug">{task.title}</h1>
        </div>

        {/* Status controls */}
        <div className="card">
          <p className="text-xs text-muted mb-3">Mark this task as:</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "not_started", label: "Not started", icon: Circle, color: "text-civic-400" },
              { value: "in_progress", label: "In progress", icon: Clock, color: "text-amber-400" },
              { value: "complete", label: "Complete", icon: CheckCircle, color: "text-green-500" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleStatus(opt.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                  status === opt.value
                    ? `border-current ${opt.color} bg-current/5`
                    : "border-border text-muted hover:border-civic-300"
                }`}
              >
                <opt.icon className="w-4 h-4" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div className="card">
          <h2 className="text-base font-semibold text-navy mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> Why this matters
          </h2>
          <p className="text-sm text-civic-700 leading-relaxed">{task.whyItMatters}</p>
        </div>

        {/* What to prepare */}
        {task.whatToPrepare.length > 0 && (
          <div className="card">
            <h2 className="text-base font-semibold text-navy mb-3">What to prepare</h2>
            <ul className="space-y-2">
              {task.whatToPrepare.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-civic-700">
                  <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps to take */}
        <div className="card">
          <h2 className="text-base font-semibold text-navy mb-3">Steps to take</h2>
          <ol className="space-y-3">
            {task.stepsToTake.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-civic-700">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Common mistakes */}
        {task.commonMistakes.length > 0 && (
          <div className="card border-amber-200 bg-amber-50">
            <h2 className="text-base font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Common mistakes to avoid
            </h2>
            <ul className="space-y-2">
              {task.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="text-amber-400 shrink-0 mt-0.5">✗</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk warning */}
        {task.riskWarning && (
          <div className="card border-red-200 bg-red-50">
            <h2 className="text-base font-semibold text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Risk warning
            </h2>
            <p className="text-sm text-red-600 leading-relaxed">{task.riskWarning}</p>
          </div>
        )}

        {/* Source note */}
        {task.sourceNote && (
          <div className="card bg-civic-50">
            <h2 className="text-xs font-semibold text-muted uppercase mb-1">Official source</h2>
            <p className="text-sm text-civic-600">{task.sourceNote}</p>
          </div>
        )}

        {/* Related guidance */}
        {guidance && (
          <Link
            href={`/guides/${guidance.slug}`}
            className="card-hover flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-500 shrink-0" />
              <div>
                <p className="text-xs text-muted mb-0.5">Related guide</p>
                <p className="text-sm font-semibold text-navy">{guidance.title}</p>
                <p className="text-xs text-muted mt-0.5">{guidance.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted shrink-0" />
          </Link>
        )}

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <p className="font-medium text-civic-700 mb-1">Disclaimer</p>
          <p>{DISCLAIMER}</p>
        </div>
      </div>
    </Navigation>
  );
}
