"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Pencil,
  X,
} from "lucide-react";
import { SEED_TASKS } from "@/lib/seed-data";
import Navigation from "@/components/Navigation";

const PRIORITY_COLORS: Record<string, string> = {
  "Very High": "text-red-500 bg-red-50 border border-red-200",
  "High": "text-amber-600 bg-amber-50 border border-amber-200",
  "Medium": "text-blue-500 bg-blue-50 border border-blue-200",
  "Low": "text-muted bg-civic-50 border border-civic-200",
};

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<typeof SEED_TASKS[0]>>({});
  const [filter, setFilter] = useState<"ALL" | "active" | "inactive">("ALL");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = tasks.filter((t) => {
    if (filter === "active") return t.active;
    if (filter === "inactive") return !t.active;
    return true;
  });

  const startEdit = (task: typeof SEED_TASKS[0]) => {
    setEditing(task.taskId);
    setEditForm({ ...task });
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === editing ? { ...t, ...editForm } as typeof SEED_TASKS[0] : t))
    );
    setEditing(null);
  };

  return (
    <Navigation>
      <div className="max-w-6xl mx-auto space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-muted hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-navy">Task Manager</h1>
          <span className="text-xs text-muted ml-auto">{tasks.length} tasks total</span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {(["ALL", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f ? "bg-primary text-white" : "bg-white text-muted border border-border"
              }`}
            >
              {f === "ALL" ? "All" : f === "active" ? "Active" : "Inactive"} ({tasks.filter(t => f === "ALL" ? true : f === "active" ? t.active : !t.active).length})
            </button>
          ))}
          <button onClick={() => setShowAdd(true)} className="btn-primary text-xs ml-auto">
            <Plus className="w-3 h-3" /> Add Task
          </button>
        </div>

        {/* Table */}
        <div className="card overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-muted font-medium">ID</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Title</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden sm:table-cell">Stage</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden md:table-cell">Category</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Priority</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Active</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden lg:table-cell">AI</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden lg:table-cell">Risk</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.taskId} className="border-b border-civic-50 last:border-0 hover:bg-civic-50/50">
                  <td className="py-2 px-2 font-mono text-muted whitespace-nowrap">{task.taskId}</td>
                  <td className="py-2 px-2 text-navy max-w-[200px]">
                    <p className="truncate">{task.title}</p>
                  </td>
                  <td className="py-2 px-2 text-muted hidden sm:table-cell">{task.stage}</td>
                  <td className="py-2 px-2 text-muted hidden md:table-cell">{task.category}</td>
                  <td className="py-2 px-2">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    {task.active ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-civic-300" />
                    )}
                  </td>
                  <td className="py-2 px-2 hidden lg:table-cell">
                    {task.aiHelperAllowed ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-civic-300" />}
                  </td>
                  <td className="py-2 px-2 hidden lg:table-cell">
                    {task.riskWarning ? (
                      <span className="text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /></span>
                    ) : (
                      <span className="text-civic-200">—</span>
                    )}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => startEdit(task)}
                      className="text-primary hover:underline text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-white">
                <h2 className="font-semibold text-navy">Edit Task</h2>
                <button onClick={() => setEditing(null)} className="btn-ghost p-1.5"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">Task ID</label>
                  <input value={editForm.taskId ?? ""} readOnly className="input-field text-xs opacity-60" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">Title</label>
                  <input value={editForm.title ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} className="input-field text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">Priority</label>
                    <select
                      value={editForm.priority ?? ""}
                      onChange={(e) => setEditForm((f) => ({ ...f, priority: e.target.value as typeof editForm.priority }))}
                      className="select-field text-xs"
                    >
                      {["Very High", "High", "Medium", "Low"].map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">Stage</label>
                    <select
                      value={editForm.stage ?? ""}
                      onChange={(e) => setEditForm((f) => ({ ...f, stage: e.target.value as typeof editForm.stage }))}
                      className="select-field text-xs"
                    >
                      {["PRE", "D1", "D7", "D30", "D90", "GROW"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">Category</label>
                    <input
                      value={editForm.category ?? ""}
                      onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value as typeof editForm.category }))}
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">Guidance slug</label>
                    <input
                      value={editForm.guidanceSlug ?? ""}
                      onChange={(e) => setEditForm((f) => ({ ...f, guidanceSlug: e.target.value }))}
                      className="input-field text-xs"
                      placeholder="e.g. how-to-register-with-a-gp"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">Risk warning</label>
                  <textarea
                    value={editForm.riskWarning ?? ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, riskWarning: e.target.value }))}
                    className="input-field text-xs resize-none"
                    rows={2}
                    placeholder="Optional risk warning to show on task detail..."
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs text-navy">
                    <input
                      type="checkbox"
                      checked={editForm.active ?? true}
                      onChange={(e) => setEditForm((f) => ({ ...f, active: e.target.checked }))}
                      className="accent-primary"
                    />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-xs text-navy">
                    <input
                      type="checkbox"
                      checked={editForm.aiHelperAllowed ?? true}
                      onChange={(e) => setEditForm((f) => ({ ...f, aiHelperAllowed: e.target.checked }))}
                      className="accent-primary"
                    />
                    AI Helper allowed
                  </label>
                </div>
              </div>
              <div className="flex gap-2 p-4 border-t border-border sticky bottom-0 bg-white">
                <button onClick={() => setEditing(null)} className="btn-ghost flex-1 justify-center">Cancel</button>
                <button onClick={saveEdit} className="btn-primary flex-1 justify-center">Save changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Navigation>
  );
}
