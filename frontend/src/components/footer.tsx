import { cn } from "@/lib/utils";
import Logo from "./logo";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "text-sm opacity-50 flex items-center justify-center py-5 gap-2 mb-24 md:mb-2",
        className
      )}
    >
      <p>2025 © All rights reserved</p>
      <span>|</span>
      <Logo className="text-sm" />
    </footer>
  );
}
