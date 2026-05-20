import type {
  User,
  ArrivalProfile,
  UserTask,
  ReminderPrefs,
  SupportTicket,
} from "@/types";

// ─── Storage Keys ────────────────────────────────────────────────────────────

const KEYS = {
  USER: "nsubuk_user",
  PROFILE: "nsubuk_profile",
  USER_TASKS: "nsubuk_user_tasks",
  REMINDER_PREFS: "nsubuk_reminders",
  SUPPORT_TICKETS: "nsubuk_support_tickets",
} as const;

// ─── User ────────────────────────────────────────────────────────────────────

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(KEYS.USER);
}

// ─── Arrival Profile ─────────────────────────────────────────────────────────

export function getArrivalProfile(): ArrivalProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setArrivalProfile(profile: ArrivalProfile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function clearArrivalProfile(): void {
  localStorage.removeItem(KEYS.PROFILE);
}

// ─── User Tasks ──────────────────────────────────────────────────────────────

export function getUserTasks(): UserTask[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.USER_TASKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setUserTasks(tasks: UserTask[]): void {
  localStorage.setItem(KEYS.USER_TASKS, JSON.stringify(tasks));
}

export function updateUserTask(taskId: string, status: UserTask["status"]): UserTask[] {
  const tasks = getUserTasks();
  const existing = tasks.find((t) => t.taskId === taskId);
  if (existing) {
    existing.status = status;
    if (status === "complete") existing.completedAt = new Date().toISOString();
    if (status === "in_progress") existing.startedAt = existing.startedAt ?? new Date().toISOString();
  } else {
    tasks.push({
      taskId,
      status,
      startedAt: status === "in_progress" ? new Date().toISOString() : undefined,
      completedAt: status === "complete" ? new Date().toISOString() : undefined,
    });
  }
  setUserTasks(tasks);
  return tasks;
}

// ─── Reminders ────────────────────────────────────────────────────────────────

export function getReminderPrefs(): ReminderPrefs {
  if (typeof window === "undefined")
    return { emailReminders: false, frequency: "weekly" };
  try {
    const raw = localStorage.getItem(KEYS.REMINDER_PREFS);
    return raw
      ? JSON.parse(raw)
      : { emailReminders: false, frequency: "weekly" };
  } catch {
    return { emailReminders: false, frequency: "weekly" };
  }
}

export function setReminderPrefs(prefs: ReminderPrefs): void {
  localStorage.setItem(KEYS.REMINDER_PREFS, JSON.stringify(prefs));
}

// ─── Support Tickets ──────────────────────────────────────────────────────────

export function getSupportTickets(): SupportTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.SUPPORT_TICKETS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSupportTicket(ticket: SupportTicket): void {
  const tickets = getSupportTickets();
  tickets.push(ticket);
  localStorage.setItem(KEYS.SUPPORT_TICKETS, JSON.stringify(tickets));
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function hasCompletedOnboarding(): boolean {
  const profile = getArrivalProfile();
  return profile !== null && profile.completed;
}

export function clearAllData(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function daysUntil(isoDate: string): number {
  const target = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
