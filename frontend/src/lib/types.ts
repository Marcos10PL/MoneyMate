import { z } from "zod";
import { loginFormSchema, signUpFormSchema } from "./zod-schemas";

export type LoginForm = z.infer<typeof loginFormSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;