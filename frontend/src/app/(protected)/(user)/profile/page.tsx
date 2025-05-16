import Profile from "@/components/protected/user/profile/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Dashboard() {
  return <Profile />;
}
