import Users from "@/components/protected/admin/users/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Users",
};

export default function Page() {
  return <Users />;
}
