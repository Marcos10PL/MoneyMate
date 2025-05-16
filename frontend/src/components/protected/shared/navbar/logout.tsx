"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/lib/state/features/auth/api-auth-slice";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

export default function Logout() {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    logout({})
      .unwrap()
      .then(() => {
        location.reload();
        toast.success("Logout successful");
      })
      .catch(error => {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      });
  };

  return (
    <Button onClick={() => handleLogout()}>
      {isLoading ? <Spinner /> : <LogOutIcon />}
    </Button>
  );
}
