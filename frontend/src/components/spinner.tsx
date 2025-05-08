import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return <LoaderIcon className={cn("animate-spin", className)} />;
}
