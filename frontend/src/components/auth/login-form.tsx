"use client";

import { cn, errorMessage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm as LoginFormType } from "@/lib/types";
import { loginFormSchema } from "@/lib/zod-schemas";
import Error from "./error";
import {
  useLazyGetXSRFQuery,
  useLoginMutation,
} from "@/lib/state/features/auth/api-auth-slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "../spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const [trigger] = useLazyGetXSRFQuery();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useRouter();

  const onSubmit = async (data: LoginFormType) => {
    await trigger();
    login(data)
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate.push("/dashboard");
      })
      .catch(error => {
        console.error("Login failed:", error);
        toast.error(
          errorMessage(error.status, {
            422: "Invalid credentials. Please try again.",
          })
        );
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your data below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading ? <Spinner /> : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            <Error error={errors.email?.message || errors.password?.message} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
