"use client";

import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { User } from "@/lib/types";
import { MailIcon, ShieldUserIcon, TimerIcon, UserIcon } from "lucide-react";
import Header from "../../shared/header";

export default function Profile() {
  const [user] = useLocalStorage<User | null>("user", null);

  if (!user) {
    return (
      <div className="text-center py-4">
        Sorry, we couldn&apos;t find your profile. Please log in again.
      </div>
    );
  }

  return (
    <>
      <Header title="Profile" />
      <section className="py-4 flex flex-col justify-center items-center gap-6 *:flex *:items-center *:gap-2 *:border-b *:py-3 *:text-center">
        <p>
          <UserIcon />
          {user.name}
        </p>
        <p>
          <MailIcon />
          {user.email}
        </p>
        <p>
          <TimerIcon />
          {new Date(user.created_at).toLocaleDateString()}
        </p>
        <p>
          <ShieldUserIcon />
          {user.role}
        </p>
      </section>
    </>
  );
}
