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
import { SignUpForm as SignUpFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/zod-schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useLazyGetXSRFQuery,
  useRegisterMutation,
} from "@/lib/state/features/auth/api-auth-slice";
import Spinner from "../spinner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [trigger] = useLazyGetXSRFQuery();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useRouter();

  const onSubmit = async (data: SignUpFormType) => {
    await trigger();
    register(data)
      .unwrap()
      .then(() => {
        toast.success("Sign up successful!");
        navigate.push("/dashboard");
      })
      .catch(error => {
        console.error("Register failed:", error);
        toast.error(
          errorMessage(error.status, {
            422: "Email already exists. Please try again.",
          })
        );
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            By signing up, you agree to use of cookies. If you wish to opt out
            later, you can delete your account.
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
                  {...registerForm("email")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...registerForm("name")} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  {...registerForm("password")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  type="password"
                  id="password_confirmation"
                  {...registerForm("password_confirmation")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading ? <Spinner /> : "Sign Up"}
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
                errors.password_confirmation?.message}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
