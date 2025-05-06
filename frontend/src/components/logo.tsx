import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("text-lg font-bold", className)}>
      <div className="flex">
        <span className="text-yellow-600">Money</span>Mate
        <Coins className="inline-block" size={20} />
      </div>
    </div>
  );
}
