import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 10 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .nonempty({
      message: "Email is required",
    }),
  password: passwordSchema,
});

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .nonempty({
        message: "Email is required",
      }),
    name: z.string().min(1, "Name is required"),
    password: passwordSchema,
    password_confirmation: z.string().min(1, "Confirm password is required"),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });
