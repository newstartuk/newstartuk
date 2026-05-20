"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  Pencil,
  X,
  CheckCircle,
} from "lucide-react";
import { GUIDANCE_PAGES } from "@/lib/guidance-data";
import Navigation from "@/components/Navigation";

const CATEGORY_COLORS: Record<string, string> = {
  Documents: "text-blue-500 bg-blue-50 border border-blue-200",
  Accommodation: "text-amber-500 bg-amber-50 border border-amber-200",
  Money: "text-green-500 bg-green-50 border border-green-200",
  Health: "text-red-500 bg-red-50 border border-red-200",
  University: "text-purple-500 bg-purple-50 border border-purple-200",
  Work: "text-pink-500 bg-pink-50 border border-pink-200",
  Safety: "text-orange-500 bg-orange-50 border border-orange-200",
  "Local Life": "text-teal-500 bg-teal-50 border border-teal-200",
};

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState(GUIDANCE_PAGES);
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL"
    ? guides
    : guides.filter((g) => g.category === filter);

  const categories = [...new Set(guides.map((g) => g.category))];

  return (
    <Navigation>
      <div className="max-w-5xl mx-auto space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-muted hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-navy">Guidance Manager</h1>
          <span className="text-xs text-muted ml-auto">{guides.length} articles total</span>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === "ALL" ? "bg-primary text-white" : "bg-white text-muted border border-border"
            }`}
          >
            All ({guides.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat ? "bg-primary text-white" : "bg-white text-muted border border-border"
              }`}
            >
              {cat} ({guides.filter((g) => g.category === cat).length})
            </button>
          ))}
        </div>

        {/* Guides table */}
        <div className="card overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-muted font-medium">Slug</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Title</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden sm:table-cell">Category</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden md:table-cell">Last reviewed</th>
                <th className="text-left py-2 px-2 text-muted font-medium hidden lg:table-cell">Related tasks</th>
                <th className="text-left py-2 px-2 text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((guide) => (
                <tr key={guide.slug} className="border-b border-civic-50 last:border-0 hover:bg-civic-50/50">
                  <td className="py-2 px-2 font-mono text-muted whitespace-nowrap">{guide.slug}</td>
                  <td className="py-2 px-2 text-navy">
                    <p className="font-medium truncate max-w-[200px]">{guide.title}</p>
                  </td>
                  <td className="py-2 px-2 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[guide.category] ?? "text-muted bg-civic-50"}`}>
                      {guide.category}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-muted hidden md:table-cell">{guide.lastReviewed}</td>
                  <td className="py-2 px-2 text-muted hidden lg:table-cell">{guide.relatedTaskIds.length} tasks</td>
                  <td className="py-2 px-2">
                    <Link href={`/guides/${guide.slug}`} className="text-primary hover:underline text-xs">
                      View ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-civic-50 border border-civic-200 rounded-xl p-4 text-xs text-muted">
          <strong className="text-navy">MVP note:</strong> Full guide editor (create, edit, publish) will be implemented in a future sprint. Currently, guides are managed by editing <code className="bg-civic-100 px-1 rounded">lib/guidance-data.ts</code> directly in the codebase. Set up the Supabase database and integrate it with this admin panel in Sprint 5.
        </div>
      </div>
    </Navigation>
  );
}
