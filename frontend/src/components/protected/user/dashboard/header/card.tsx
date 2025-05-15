import { Card as CardUI } from "@/components/ui/card";

const colors = {
  income: "dark:text-green-300 text-green-800",
  expense: "dark:text-red-300 text-red-800",
  balance: "dark:text-blue-300 text-blue-800",
};

type CardProps = {
  amount: number;
  isLoading: boolean;
  color: keyof typeof colors;
  title: string;
};

export default function Card({ amount, isLoading, color, title }: CardProps) {
  return (
    <CardUI
      className={`flex flex-col items-center justify-center ${colors[color]}`}
    >
      <div className="text-center space-y-1">
        <h2 className="text-sm uppercase tracking-widest">{title}</h2>
        <p className="text-2xl font-semibold">
          {isLoading ? "..." : `${amount} PLN`}
        </p>
      </div>
    </CardUI>
  );
}
