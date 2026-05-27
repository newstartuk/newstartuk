"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  className?: string;
}

export default function EmptyState({ icon: Icon, message, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-10 text-center${className ? ` ${className}` : ""}`}>
      <Icon className="w-8 h-8 text-muted opacity-50 mb-2" />
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
