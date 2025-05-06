"use client";

import { cn } from "@/lib/utils";
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
import { SignUpForm as SignUpFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/zod-schemas";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SignUpFormType) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your data below to create an account
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
            <div className="mt-4 text-red-400 text-sm text-center">
              {errors.email?.message ||
                errors.name?.message ||
                errors.password?.message ||
                errors.confirmPassword?.message}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
