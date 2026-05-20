// ─── User & Auth ───────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface ArrivalProfile {
  arrivalType: "student" | "worker" | "family" | "visitor" | "other";
  arrivalStatus: "not_arrived" | "arriving_soon" | "arrived";
  arrivalDate: string; // ISO date string
  city: string;
  university: string;
  accommodationType:
    | "private_rental"
    | "university_accommodation"
    | "family"
    | "temporary"
    | "not_secured";
  nationality?: string;
  englishLevel?: "beginner" | "intermediate" | "advanced";
  interestedInWork: boolean;
  completed: boolean;
}

// ─── Stage ─────────────────────────────────────────────────────────────────

export type JourneyStage = "PRE" | "D1" | "D7" | "D30" | "D90" | "GROW";

// ─── Categories & Tasks ─────────────────────────────────────────────────────

export type TaskCategory =
  | "Documents"
  | "Accommodation"
  | "University"
  | "Money"
  | "Health"
  | "Local Admin"
  | "Work"
  | "Safety"
  | "Local Life"
  | "Growth"
  | "Transport";

export type TaskPriority = "Very High" | "High" | "Medium" | "Low";
export type TaskStatus = "not_started" | "in_progress" | "complete";

export interface TaskDependency {
  taskId: string;
  label: string;
}

export interface ChecklistTask {
  taskId: string;
  title: string;
  stage: JourneyStage | "PRE";
  category: TaskCategory;
  priority: TaskPriority;
  required: boolean;
  conditional?: boolean; // conditional on profile (e.g. only if renting privately)
  conditionNote?: string;
  dependencyIds: string[];
  whyItMatters: string;
  whatToPrepare: string[];
  stepsToTake: string[];
  commonMistakes: string[];
  riskWarning?: string;
  guidanceSlug?: string;
  sourceNote?: string;
  reminderTrigger?: string; // e.g. "arrival_date + 10 days"
  escalationFlag: boolean;
  adminEditable: boolean;
  active: boolean;
  aiHelperAllowed: boolean;
  sourceRequired: boolean;
}

export interface UserTask {
  taskId: string;
  status: TaskStatus;
  completedAt?: string;
  startedAt?: string;
  notes?: string;
}

// ─── Guidance ───────────────────────────────────────────────────────────────

export type GuidanceCategory =
  | "Documents"
  | "Accommodation"
  | "Money"
  | "Health"
  | "University"
  | "Work"
  | "Safety"
  | "Local Life";

export interface GuidancePage {
  slug: string;
  title: string;
  category: GuidanceCategory;
  description: string;
  whatThisIs: string;
  whyItMatters: string;
  whatToPrepare: string[];
  stepsToTake: string[];
  commonMistakes: string[];
  safetyWarning?: string;
  sourceSignpost: string;
  disclaimer: string;
  relatedTaskIds: string[];
  lastReviewed: string;
}

// ─── Reminders ──────────────────────────────────────────────────────────────

export interface ReminderPrefs {
  emailReminders: boolean;
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
}

// ─── Support ────────────────────────────────────────────────────────────────

export type SupportCategory =
  | "account"
  | "checklist"
  | "document"
  | "housing"
  | "partner"
  | "scam"
  | "other";

export interface SupportTicket {
  id: string;
  category: SupportCategory;
  description: string;
  email: string;
  createdAt: string;
  status: "open" | "in_progress" | "resolved";
}

// ─── Scam Alerts ────────────────────────────────────────────────────────────

export interface ScamAlert {
  id: string;
  title: string;
  type: "housing" | "jobs" | "documents" | "finance" | "general";
  headline: string;
  description: string;
  redFlags: string[];
  safeActions: string[];
}

// ─── Admin ──────────────────────────────────────────────────────────────────

export interface AdminStats {
  totalUsers: number;
  onboardingCompletion: number;
  avgTaskCompletion: number;
  topIncompleteCategories: TaskCategory[];
}

// ─── Readiness Score ─────────────────────────────────────────────────────────

export interface CategoryScore {
  category: TaskCategory;
  weight: number;
  completed: number;
  total: number;
  percentage: number;
  weightedContribution: number;
}

export interface ReadinessScore {
  totalScore: number;
  categoryBreakdown: CategoryScore[];
}

// ─── Document Helper ────────────────────────────────────────────────────────

export interface DocHelperResponse {
  plainEnglish: string;
  missingFields: string[];
  keyTerms: { term: string; meaning: string }[];
  safeNextSteps: string[];
  refusal?: boolean;
  refusalReason?: string;
}
