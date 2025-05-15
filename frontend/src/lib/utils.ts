import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const setLoggedInCookie = (role: string) => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `role=${role}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
};

type ErrorsArray = {
  [key: number]: string;
};

const defaultErrors = {
  401: "Unauthorized. Please log in.",
  403: "Access denied. You do not have permission.",
  404: "Resource not found.",
  500: "Internal server error.",
  502: "Bad gateway.",
  503: "Service unavailable. Try again later.",
  504: "Gateway timeout. Try again later.",
};

export const errorMessage = (
  status: number,
  customMessages?: Partial<ErrorsArray>
) => {
  const allMessages: ErrorsArray = { ...defaultErrors, ...customMessages };

  if (allMessages[status]) {
    return allMessages[status];
  }

  if (status.toString().startsWith("4")) {
    return "Client error. Please check your request.";
  }

  if (status.toString().startsWith("5")) {
    return "Server error. Please try again later.";
  }

  return "An unexpected error occurred.";
};
