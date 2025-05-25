"use client";

import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { User } from "@/lib/types";
import { MailIcon, ShieldUserIcon, TimerIcon, UserIcon } from "lucide-react";
import Header from "../../shared/header";
import { useDeleteAccountMutation } from "@/lib/state/features/auth/api-auth-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Input from "./input";
import DeleteAlert from "../../shared/list/delete-alert";
import { useState } from "react";

export default function Profile() {
  const [user] = useLocalStorage<User | null>("user", null);
  const [open, setOpen] = useState(false);
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
          <DeleteAlert
            open={open}
            setOpen={setOpen}
            handleDelete={handleDeleteAccount}
            isLoading={isLoading}
            id={user.id.toString()}
            textButton
          />
        </form>
      </section>
    </>
  );
}
