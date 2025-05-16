import Categories from "@/components/protected/admin/categories/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Categories",
};

export default function Page() {
  return <Categories />;
}
