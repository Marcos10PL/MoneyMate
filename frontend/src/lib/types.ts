import { z } from "zod";
import {
  categoryFormSchema,
  filteringTransactionFormSchema,
  loginFormSchema,
  searchTransactionFormSchema,
  signUpFormSchema,
  transactionFormSchema,
} from "./zod-schemas";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;
export type SearchTransactionForm = z.infer<typeof searchTransactionFormSchema>;
export type FilteringTransactionForm = z.infer<
  typeof filteringTransactionFormSchema
>;
export type TransactionForm = z.infer<typeof transactionFormSchema>;
export type CategoryForm = z.infer<typeof categoryFormSchema>;

type Meta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

// auth
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

// transactions
export type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: string;
  type: Type["name"];
  date: string;
};

export type TransactionResponse = {
  data: {
    transactions: Transaction[];
    message: string;
    income_sum: number;
    expense_sum: number;
    balance: number;
  };
  meta: Meta;
};

export type TransactionParams = {
  page: number;
  per_page: number;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  search?: string;
  type_id?: string;
};

// types
export type Type = {
  id: number;
  name: "income" | "expense";
};

export type TypeResponse = {
  data: {
    message: string;
    types: Type[];
  };
};

// categories
export type Category = {
  id: number;
  name: string;
  type: Type;
};

export type CategoryResponse = {
  data: {
    message: string;
    categories: Category[];
  };
  meta: Meta;
};

export type CategoryParams = {
  per_page: number;
  page: number;
};

//users
export type UserResponse = {
  data: {
    message: string;
    users: User[];
  };
  meta: Meta;
};

export type UserParams = {
  per_page: number;
  page: number;
};
