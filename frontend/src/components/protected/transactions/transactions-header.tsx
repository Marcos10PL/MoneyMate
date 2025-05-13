import { ScaleIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

type TransactionHeaderProps = {
  incomeSum: number;
  expenseSum: number;
  balance: number;
};

export default function TransactionsHeader({
  incomeSum,
  expenseSum,
  balance,
}: TransactionHeaderProps) {
  return (
    <header className="border-b pt-2 pb-4 font-bold flex flex-wrap items-center justify-center gap-6">
      <div className="flex items-center justify-center gap-2">
        <TrendingUpIcon className="h-6 w-6 text-green-400" />
        <p>{incomeSum} PLN</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <TrendingDownIcon className="h-6 w-6 text-red-400" />
        <p>{expenseSum} PLN</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <ScaleIcon className="h-6 w-6 text-yellow-600" />
        <p>{balance} PLN</p>
      </div>
    </header>
  );
}
