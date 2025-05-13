import { Transaction } from "@/lib/types";
import TransactionCard from "./transaction-card";
import Spinner from "@/components/spinner";
import Pagination from "./pagination";

type TransactionCardProps = {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  lastPage: number;
};

export default function TransactionsList({
  transactions,
  isError,
  isLoading,
  currentPage,
  setCurrentPage,
  lastPage,
}: TransactionCardProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-400">Error loading transactions</p>
      </div>
    );
  }

  return (
    <section className="pt-4 space-y-2">
      {transactions.map(transaction => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        );
      })}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
    </section>
  );
}
