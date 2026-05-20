import type { Metadata } from "next";
import ChecklistWrapper from "@/components/ChecklistWrapper";

export const metadata: Metadata = {
  title: "Settlement Checklist — NewstartUK",
  description: "Your interactive 90-day settlement checklist.",
};

export default function ChecklistPage() {
  return <ChecklistWrapper />;
}
