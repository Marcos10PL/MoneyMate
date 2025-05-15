import { subMonths } from "date-fns";
import {
  ArrowLeftRightIcon,
  HomeIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

export const today = new Date();
export const monthAgo = subMonths(today, 1);

export const userLinks = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRightIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
] as const;

export const adminLinks = [
  { name: "Admin", href: "/admin", icon: ShieldIcon },
  ...userLinks,
] as const;
