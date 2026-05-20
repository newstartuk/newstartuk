import type {
  User,
  ArrivalProfile,
  UserTask,
  ReminderPrefs,
  SupportTicket,
} from "@/types";

// ─── Key names ────────────────────────────────────────────────────────────────
const KEYS = {
  USER: "nsk_user",
  PROFILE: "nsk_profile",
  TASKS: "nsk_tasks",
  REMINDERS: "nsk_reminders",
  TICKETS: "nsk_tickets",
} as const;

// ─── Generic helpers ─────────────────────────────────────────────────────────
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

// ─── Auth / User ─────────────────────────────────────────────────────────────
export function getUser(): User | null {
  return safeGet<User | null>(KEYS.USER, null);
}

export function setUser(user: User): void {
  safeSet(KEYS.USER, user);
}

export function clearUser(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.USER);
}

export function hashPassword(password: string): string {
  // MVP only — localStorage demo auth. In production, use Supabase Auth or similar.
  // This is a simple hash for demo purposes only.
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `demo_${Math.abs(hash).toString(16)}`;
}

export function createUser(name: string, email: string, password: string): User {
  return {
    id: generateId(),
    name,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ─── Arrival Profile ──────────────────────────────────────────────────────────
export function getArrivalProfile(): ArrivalProfile | null {
  return safeGet<ArrivalProfile | null>(KEYS.PROFILE, null);
}

export function setArrivalProfile(profile: ArrivalProfile): void {
  safeSet(KEYS.PROFILE, profile);
}

export function clearArrivalProfile(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.PROFILE);
}

// ─── User Tasks ──────────────────────────────────────────────────────────────
export function getUserTasks(): UserTask[] {
  return safeGet<UserTask[]>(KEYS.TASKS, []);
}

export function setUserTasks(tasks: UserTask[]): void {
  safeSet(KEYS.TASKS, tasks);
}

export function getUserTask(taskId: string): UserTask | undefined {
  return getUserTasks().find((t) => t.taskId === taskId);
}

export function upsertUserTask(taskId: string, status: UserTask["status"]): void {
  const tasks = getUserTasks();
  const idx = tasks.findIndex((t) => t.taskId === taskId);
  if (idx >= 0) {
    tasks[idx] = { taskId, status, completedAt: status === "complete" ? new Date().toISOString() : undefined };
  } else {
    tasks.push({ taskId, status, completedAt: status === "complete" ? new Date().toISOString() : undefined });
  }
  setUserTasks(tasks);
}

// ─── Reminder Preferences ─────────────────────────────────────────────────────
export function getReminderPrefs(): ReminderPrefs {
  return safeGet<ReminderPrefs>(KEYS.REMINDERS, {
    emailReminders: false,
    frequency: "weekly",
  });
}

export function setReminderPrefs(prefs: ReminderPrefs): void {
  safeSet(KEYS.REMINDERS, prefs);
}

// ─── Support Tickets ─────────────────────────────────────────────────────────
export function getSupportTickets(): SupportTicket[] {
  return safeGet<SupportTicket[]>(KEYS.TICKETS, []);
}

export function addSupportTicket(ticket: SupportTicket): void {
  const tickets = getSupportTickets();
  tickets.push(ticket);
  safeSet(KEYS.TICKETS, tickets);
}

// ─── Clear all data ──────────────────────────────────────────────────────────
export function clearAllData(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

// ─── Utilities ────────────────────────────────────────────────────────────────
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
