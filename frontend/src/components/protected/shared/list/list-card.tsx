import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ListCard({ children, className = "" }: CardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col md:flex-row px-3 py-2 justify-between items-center",
        className
      )}
    >
      {children}
    </Card>
  );
}

type CardComponentsProps = {
  children: React.ReactNode;
  className?: string;
};

export const ListCardName = ({ children, className }: CardComponentsProps) => (
  <div className={cn("w-full md:w-1/2", className)}>{children}</div>
);

export const ListCardInfo = ({ children, className }: CardComponentsProps) => (
  <div
    className={cn(
      "flex items-center justify-between md:w-1/2 w-full",
      className
    )}
  >
    {children}
  </div>
);

export const ListCardFooter = ({ children, className }: CardComponentsProps) => (
  <div className={cn("flex items-center", className)}>{children}</div>
);
