import ManagmentPanel from "@/components/protected/admin/panel/managment-panel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return <ManagmentPanel />;
}
