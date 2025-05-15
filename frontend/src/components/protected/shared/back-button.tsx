"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
};

export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      onClick={() => router.back()}
      variant="outline"
    >
      <ArrowLeftIcon />
      <span>Back</span>
    </Button>
  );
}
