export interface BudgetEntry {
  id: string;
  label: string;
  amount: number;
  type: "income" | "expense";
  category: BudgetCategory;
  date: string;
}

export type BudgetCategory =
  | "rent"
  | "groceries"
  | "transport"
  | "utilities"
  | "entertainment"
  | "health"
  | "education"
  | "clothing"
  | "phone"
  | "savings"
  | "other"
  | "salary"
  | "loan"
  | "scholarship";

export const BUDGET_CATEGORIES: Record<BudgetCategory, { label: string; color: string }> = {
  rent:            { label: "Rent",            color: "#ef4444" },
  groceries:       { label: "Groceries",        color: "#22c55e" },
  transport:       { label: "Transport",        color: "#3b82f6" },
  utilities:       { label: "Utilities",        color: "#f59e0b" },
  entertainment:  { label: "Entertainment",   color: "#a855f7" },
  health:          { label: "Health",           color: "#ec4899" },
  education:       { label: "Education",        color: "#14b8a6" },
  clothing:        { label: "Clothing",         color: "#f97316" },
  phone:           { label: "Phone & Data",     color: "#6366f1" },
  savings:         { label: "Savings",           color: "#10b981" },
  other:           { label: "Other",             color: "#9ca3af" },
  salary:          { label: "Salary",            color: "#10b981" },
  loan:            { label: "Loan",              color: "#f59e0b" },
  scholarship:     { label: "Scholarship",       color: "#22c55e" },
};
