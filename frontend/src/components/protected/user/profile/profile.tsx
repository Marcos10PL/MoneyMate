"use client";

import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { User } from "@/lib/types";
import {
  MailIcon,
  ShieldUserIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";
import Header from "../../shared/header";
import { Button } from "@/components/ui/button";
import { useDeleteAccountMutation } from "@/lib/state/features/auth/api-auth-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import Input from "./input";

export default function Profile() {
  const [user] = useLocalStorage<User | null>("user", null);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const router = useRouter();

  const handleDeleteAccount = () => {
    deleteAccount({})
      .unwrap()
      .then(() => {
        toast.success("Account deleted successfully.");
        router.push("/login");
      })
      .catch(error => {
        console.error("Failed to delete account:", error);
        toast.error("Failed to delete account. Please try again later.");
      });
  };

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
      <section className="pt-4 pb-2">
        <form className="flex flex-col justify-center items-center gap-2">
          <Input value={user.name} Icon={UserIcon} />
          <Input value={user.email} Icon={MailIcon} />
          <Input
            value={new Date(user.created_at).toLocaleDateString()}
            Icon={TimerIcon}
          />
          <Input value={user.role} Icon={ShieldUserIcon} />
          <Button
            className="mt-2 max-w-sm w-full"
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Delete Account"}
          </Button>
        </form>
      </section>
    </>
  );
}
