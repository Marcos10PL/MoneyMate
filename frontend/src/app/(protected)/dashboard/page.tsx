"use client";

import { useLogoutMutation } from "@/lib/state/features/auth/api-auth-slice";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    logout({})
      .unwrap()
      .then(() => {
        console.log("Logout successful!");
        router.push("/login");
      })
      .catch(error => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome to your dashboard!</p>

      <button
        onClick={() => handleLogout()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        LOGOUT
      </button>
    </div>
  );
}
