import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <LoginForm />;
}
