import { LucideIcon } from "lucide-react";

export default function Input({ value, Icon }: { value: string; Icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-2 max-w-sm w-full">
      <Icon className="absolute w-10 h-10 px-2 border-r" />
      <input
        type="text"
        disabled
        className="border rounded-md px-4 py-2 dark:bg-neutral-900 w-full pl-12"
        value={value}
      />
    </div>
  );
}
