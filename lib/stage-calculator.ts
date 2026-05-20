import type { JourneyStage } from "@/types";

export function calculateStage(arrivalDate: string | null): JourneyStage {
  if (!arrivalDate) return "PRE";

  const arrival = new Date(arrivalDate);
  const now = new Date();

  // Reset time portion to compare dates only
  arrival.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - arrival.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "D1";
  if (diffDays <= 7) return "D7";
  if (diffDays <= 30) return "D30";
  if (diffDays <= 90) return "D90";
  return "GROW";
}

export function getStageLabel(stage: JourneyStage): string {
  const labels: Record<JourneyStage, string> = {
    PRE: "Pre-Arrival",
    D1: "Arrival Day",
    D7: "First Week",
    D30: "First Month",
    D90: "Days 31–90",
    GROW: "Growing",
  };
  return labels[stage];
}

export function getStageDescription(stage: JourneyStage): string {
  const descriptions: Record<JourneyStage, string> = {
    PRE: "You have not arrived yet — use this time to prepare everything.",
    D1: "You arrived recently — focus on safety, accommodation, and essentials.",
    D7: "Your first week — get registered, set up accounts, and find your feet.",
    D30: "Your first month — complete admin tasks and start settling in.",
    D90: "Days 31–90 — review, adjust, and build on what you have set up.",
    GROW: "You have settled — focus on growing, connecting, and planning ahead.",
  };
  return descriptions[stage];
}

export function getStageColor(stage: JourneyStage): string {
  const colors: Record<JourneyStage, string> = {
    PRE: "text-brand-400 bg-brand-50 border-brand-200",
    D1: "text-amber-500 bg-amber-50 border-amber-200",
    D7: "text-blue-500 bg-blue-50 border-blue-200",
    D30: "text-purple-500 bg-purple-50 border-purple-200",
    D90: "text-green-500 bg-green-50 border-green-200",
    GROW: "text-teal-500 bg-teal-50 border-teal-200",
  };
  return colors[stage];
}

export function getDaysSinceArrival(arrivalDate: string): number {
  if (!arrivalDate) return 0;
  const arrival = new Date(arrivalDate);
  const now = new Date();
  arrival.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDaysRemaining(arrivalDate: string): number {
  if (!arrivalDate) return 90;
  const daysSince = getDaysSinceArrival(arrivalDate);
  return Math.max(0, 90 - daysSince);
}
