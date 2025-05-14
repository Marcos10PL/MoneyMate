import { subMonths } from "date-fns";

export const today = new Date();
export const monthAgo = subMonths(today, 1);
