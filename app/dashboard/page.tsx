import type { Metadata } from "next";
import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Dashboard — NewstartUK",
  description: "Track your 90-day UK settlement progress.",
};

export default function Dashboard() {
  return <DashboardWrapper />;
}
