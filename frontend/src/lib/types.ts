import { z } from "zod";
import {
  filteringTransactionFormSchema,
  loginFormSchema,
  searchTransactionFormSchema,
  signUpFormSchema,
} from "./zod-schemas";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;
export type SearchTransactionForm = z.infer<typeof searchTransactionFormSchema>;
export type FilteringTransactionForm = z.infer<
  typeof filteringTransactionFormSchema
>;

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  message: string;
  user: User;
};
