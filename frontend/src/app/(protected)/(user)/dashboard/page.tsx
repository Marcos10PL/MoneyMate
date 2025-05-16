import Dashboard from "@/components/protected/user/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <Dashboard />;
}
