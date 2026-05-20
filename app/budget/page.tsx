import type { Metadata } from "next";
import BudgetWrapper from "@/components/BudgetWrapper";

export const metadata: Metadata = {
  title: "Budget Planner — NewstartUK",
  description: "Track your UK student income and expenses.",
};

export default function BudgetPage() {
  return <BudgetWrapper />;
}
