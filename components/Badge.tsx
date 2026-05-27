"use client";

const CATEGORY_STYLES: Record<string, string> = {
  Documents: "text-blue-600 bg-blue-50 border-blue-200",
  Accommodation: "text-amber-600 bg-amber-50 border-amber-200",
  Money: "text-green-600 bg-green-50 border-green-200",
  Health: "text-red-500 bg-red-50 border-red-200",
  University: "text-purple-600 bg-purple-50 border-purple-200",
  Work: "text-pink-600 bg-pink-50 border-pink-200",
  Safety: "text-orange-600 bg-orange-50 border-orange-200",
  "Local Life": "text-teal-600 bg-teal-50 border-teal-200",
  "Local Admin": "text-slate-600 bg-slate-50 border-slate-200",
  Growth: "text-indigo-600 bg-indigo-50 border-indigo-200",
  Transport: "text-cyan-600 bg-cyan-50 border-cyan-200",
};

const PRIORITY_STYLES: Record<string, string> = {
  "Very High": "text-red-600 bg-red-50 border-red-200",
  High: "text-orange-600 bg-orange-50 border-orange-200",
  Medium: "text-amber-600 bg-amber-50 border-amber-200",
  Low: "text-blue-600 bg-blue-50 border-blue-200",
};

interface BadgeProps {
  label: string;
  variant?: "category" | "priority";
  className?: string;
}

export default function Badge({ label, variant = "category", className = "" }: BadgeProps) {
  const styles = variant === "priority"
    ? (PRIORITY_STYLES[label] ?? "text-muted bg-civic-50 border-border")
    : (CATEGORY_STYLES[label] ?? "text-muted bg-civic-50 border-border");

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${styles}${className ? ` ${className}` : ""}`}>
      {label}
    </span>
  );
}
