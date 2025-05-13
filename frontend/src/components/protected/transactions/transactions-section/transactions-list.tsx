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
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <p className="text-red-400">Error loading transactions</p>
      </Layout>
    );
  }

  if (transactions.length === 0) {
    return (
      <Layout>
        <p className="text-muted-foreground">No transactions found</p>
      </Layout>
    );
  }

  return (
    <section className="pt-4 space-y-2">
      {transactions.map(transaction => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        );
      })}

      {lastPage !== 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      )}
    </section>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-32">{children}</div>
  );
}
