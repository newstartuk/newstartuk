"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GUIDANCE_PAGES } from "@/lib/guidance-data";
import { SEED_TASKS } from "@/lib/seed-data";
import {
  ChevronLeft,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function GuideArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const guide = GUIDANCE_PAGES.find((g) => g.slug === slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (!guide) {
    return (
      <Navigation>
        <div className="max-w-3xl mx-auto text-center py-20">
          <h1 className="text-lg font-bold text-navy mb-2">Guide not found</h1>
          <Link href="/guides" className="text-sm text-primary hover:underline">Back to guides</Link>
        </div>
      </Navigation>
    );
  }

  const relatedTasks = SEED_TASKS.filter((t) =>
    guide.relatedTaskIds.includes(t.taskId)
  );

  return (
    <Navigation>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        {/* Back */}
        <Link href="/guides" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to guides
        </Link>

        {/* Header */}
        <div>
          <p className="text-xs text-muted mb-2">{guide.category}</p>
          <h1 className="text-2xl font-bold text-navy leading-snug mb-2">{guide.title}</h1>
          <p className="text-sm text-civic-600 leading-relaxed">{guide.description}</p>
          <p className="text-xs text-muted mt-2">Last reviewed: {guide.lastReviewed}</p>
        </div>

        {/* What this is */}
        <div className="card">
          <h2 className="text-base font-semibold text-navy mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> What this is
          </h2>
          <p className="text-sm text-civic-700 leading-relaxed">{guide.whatThisIs}</p>
        </div>

        {/* Why it matters */}
        <div className="card">
          <h2 className="text-base font-semibold text-navy mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> Why it matters
          </h2>
          <p className="text-sm text-civic-700 leading-relaxed">{guide.whyItMatters}</p>
        </div>

        {/* What to prepare */}
        {guide.whatToPrepare.length > 0 && (
          <div className="card">
            <h2 className="text-base font-semibold text-navy mb-3">What to prepare</h2>
            <ul className="space-y-2">
              {guide.whatToPrepare.map((item, i) => (
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
            {guide.stepsToTake.map((step, i) => (
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
        {guide.commonMistakes.length > 0 && (
          <div className="card border-amber-200 bg-amber-50">
            <h2 className="text-base font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Common mistakes to avoid
            </h2>
            <ul className="space-y-2">
              {guide.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="text-amber-400 shrink-0 mt-0.5">✗</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety warning */}
        {guide.safetyWarning && (
          <div className="card border-red-200 bg-red-50">
            <h2 className="text-base font-semibold text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Important safety warning
            </h2>
            <p className="text-sm text-red-600 leading-relaxed">{guide.safetyWarning}</p>
          </div>
        )}

        {/* Source signpost */}
        {guide.sourceSignpost && (
          <div className="card bg-civic-50">
            <h2 className="text-xs font-semibold text-muted uppercase mb-1">Official sources</h2>
            <p className="text-sm text-civic-600">{guide.sourceSignpost}</p>
          </div>
        )}

        {/* Related tasks */}
        {relatedTasks.length > 0 && (
          <div className="card">
            <h2 className="text-base font-semibold text-navy mb-3">Related checklist tasks</h2>
            <div className="space-y-2">
              {relatedTasks.map((t) => (
                <Link
                  key={t.taskId}
                  href={`/tasks/${t.taskId}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-civic-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-navy">{t.title}</p>
                    <p className="text-xs text-muted">{t.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <p className="font-medium text-civic-700 mb-1">Disclaimer</p>
          <p>{guide.disclaimer}</p>
        </div>
      </div>
    </Navigation>
  );
}
