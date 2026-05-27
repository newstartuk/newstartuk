"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon?: LucideIcon;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function InfoCard({ icon: Icon, title, children, className = "" }: InfoCardProps) {
  return (
    <div className={`card${className ? ` ${className}` : ""}`}>
      {title && (
        <h2 className="section-title flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
