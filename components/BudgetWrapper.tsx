"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BudgetEntry, BudgetCategory, BUDGET_CATEGORIES } from "@/types/budget";
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Calculator,
  ArrowDownRight,
} from "lucide-react";

const PRESET_ENTRIES: { label: string; amount: number; type: BudgetEntry["type"]; category: BudgetCategory }[] = [
  { label: "Student Loan / Maintenance", amount: 1000, type: "income", category: "salary" },
  { label: "Scholarship / Grant", amount: 500, type: "income", category: "scholarship" },
  { label: "Part-time Job Income", amount: 300, type: "income", category: "salary" },
  { label: "Rent (Monthly)", amount: 600, type: "expense", category: "rent" },
  { label: "Groceries (Weekly)", amount: 50, type: "expense", category: "groceries" },
  { label: "Oyster / Transport (Monthly)", amount: 130, type: "expense", category: "transport" },
  { label: "Utilities (Monthly avg.)", amount: 80, type: "expense", category: "utilities" },
  { label: "Mobile Phone", amount: 20, type: "expense", category: "phone" },
  { label: "Books / Course Materials", amount: 50, type: "expense", category: "education" },
];

const EXPENSE_CATS = (Object.keys(BUDGET_CATEGORIES) as BudgetCategory[]).filter(
  (k) => !["salary", "loan", "scholarship"].includes(k)
);

export default function BudgetWrapper() {
  const [entries, setEntries] = useState<BudgetEntry[]>([]);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState<BudgetCategory>("rent");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ns_budget") || "[]") as BudgetEntry[];
    setEntries(stored);
  }, []);

  const save = (updated: BudgetEntry[]) => {
    setEntries(updated);
    localStorage.setItem("ns_budget", JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!label.trim() || !amount) return;
    const newEntry: BudgetEntry = {
      id: Date.now().toString(),
      label: label.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };
    save([...entries, newEntry]);
    setLabel("");
    setAmount("");
    setShowAdd(false);
  };

  const removeEntry = (id: string) => save(entries.filter((e) => e.id !== id));

  const totalIncome = entries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const totalExpenses = entries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Pie chart data (expenses by category)
  const expenseByCat = EXPENSE_CATS.map((cat) => ({
    name: BUDGET_CATEGORIES[cat].label,
    value: entries
      .filter((e) => e.type === "expense" && e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
    color: BUDGET_CATEGORIES[cat].color,
  })).filter((d) => d.value > 0);

  // Bar chart data (monthly — summarise by date)
  const monthlyData = entries
    .reduce<{ name: string; income: number; expense: number }[]>((acc, entry) => {
      const month = entry.date.substring(0, 7);
      const existing = acc.find((d) => d.name === month);
      if (existing) {
        if (entry.type === "income") existing.income += entry.amount;
        else existing.expense += entry.amount;
      } else {
        acc.push({ name: month, income: entry.type === "income" ? entry.amount : 0, expense: entry.type === "expense" ? entry.amount : 0 });
      }
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

  const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#9ca3af"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Budget Planner</h1>
        <p className="text-gray-400">Track your income and expenses against UK student living costs.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-green-400">£{totalIncome.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-red-400">£{totalExpenses.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-gray-400">Balance</span>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
            {balance >= 0 ? "+" : ""}£{balance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie chart — expenses by category */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Spending by Category</h2>
          {expenseByCat.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseByCat}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={100}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#111827"
                >
                  {expenseByCat.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`£${value.toLocaleString("en-GB")}`, ""]}
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f9fafb" }}
                />
                <Legend
                  iconSize={10}
                  wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
              Add expense entries to see your spending breakdown
            </div>
          )}
        </div>

        {/* Bar chart — income vs expense */}
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Income vs Expenses</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData} barGap={4}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <Tooltip
                  formatter={(value: number, name: string) => [`£${value.toLocaleString("en-GB")}`, name === "income" ? "Income" : "Expenses"]}
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f9fafb" }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
              Add entries to see income vs expenses over time
            </div>
          )}
        </div>
      </div>

      {/* Quick presets */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-3">💡 Quick Add — UK Student Presets</h2>
        <p className="text-xs text-gray-500 mb-4">Tap a preset to add common student income and expenses.</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_ENTRIES.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                const entry: BudgetEntry = { id: Date.now().toString(), label: preset.label, amount: preset.amount, type: preset.type, category: preset.category, date: new Date().toISOString().split("T")[0] };
                save([...entries, entry]);
              }}
              className="text-xs px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-gray-300 hover:text-white hover:border-dark-500 transition-all"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Manual add form */}
      <div className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden mb-6">
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-dark-700/50 transition-colors"
        >
          <span className="text-sm font-medium text-white">Add Entry Manually</span>
          <Plus className={`w-4 h-4 text-gray-400 transition-transform ${showAdd ? "rotate-45" : ""}`} />
        </button>
        {showAdd && (
          <div className="px-5 pb-5 border-t border-dark-700 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Netflix subscription"
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Amount (£)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Type</label>
              <div className="flex gap-2">
                {(["income", "expense"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 text-xs rounded-lg border transition-colors ${
                      type === t
                        ? t === "income"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                        : "border-dark-600 text-gray-500 hover:text-white"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BudgetCategory)}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {(Object.keys(BUDGET_CATEGORIES) as BudgetCategory[]).map((k) => (
                  <option key={k} value={k}>{BUDGET_CATEGORIES[k].label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={addEntry}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Add Entry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Entries list */}
      {entries.length > 0 && (
        <div className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-dark-700 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">All Entries ({entries.length})</h2>
            <button
              onClick={() => {
                if (confirm("Clear all entries?")) save([]);
              }}
              className="text-xs text-gray-600 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="divide-y divide-dark-700 max-h-96 overflow-y-auto">
            {entries
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry) => (
                <div key={entry.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`shrink-0 w-2 h-2 rounded-full ${entry.type === "income" ? "bg-green-400" : "bg-red-400"}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{entry.label}</p>
                      <p className="text-xs text-gray-500">{BUDGET_CATEGORIES[entry.category].label} · {entry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className={`text-sm font-semibold ${entry.type === "income" ? "text-green-400" : "text-red-400"}`}>
                      {entry.type === "income" ? "+" : "-"}£{entry.amount.toLocaleString("en-GB")}
                    </p>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Calculator className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No entries yet. Add your income and expenses above.</p>
        </div>
      )}
    </div>
  );
}
