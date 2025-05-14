import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
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

export const filteringTransactionFormSchema = z.object({
  date_from: z.date().optional(),
  date_to: z.date().optional(),
  category_id: z.string().optional(),
  sort_by: z.enum(["desc", "asc", "all"]).optional(),
  type_id: z.string().optional(),
});

export const searchTransactionFormSchema = z.object({
  search: z.string().optional(),
});

export const TransactionFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Name must be less than 40 characters")
    .regex(/^[a-zA-Z0-9.,\- ]*$/, "Invalid characters in name"),
  amount: z
    .string()
    .refine(val => /^\d+([.,]\d{1,2})?$/.test(val), {
      message: "Amount must be a valid number",
    })
    .transform(val => val.replace(",", ".")),
  date: z.date().optional(),
  category_id: z.string(),
  type_id: z.string(),
});
