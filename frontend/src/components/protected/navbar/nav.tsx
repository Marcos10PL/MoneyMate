"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowLeftRightIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRightIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="fixed md:static bottom-0 left-0 right-0 mx-auto md:mx-0 py-2 md:py-0 min-w-full bg-white dark:bg-black border-t dark:border-t-neutral-800 border-t-neutral-200 md:border-t-0 md:bg-transparent md:min-w-fit">
      <NavigationMenuList>
        {links.map(link => (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild className="md:uppercase md:font-bold">
              <Link
                href={link.href}
                passHref
                className={cn(
                  "flex flex-col justify-center items-center md:flex-row gap-0 md:gap-2 w-24 md:w-fit",
                  pathname === link.href
                    ? "border bg-neutral-100 dark:bg-neutral-900 pointer-events-none"
                    : "border border-transparent"
                )}
              >
                <link.icon className="!h-6 md:!h-4 !w-6 md:!w-4" />
                <p>{link.name}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
