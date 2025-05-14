import { Transaction } from "@/lib/types";
import Spinner from "@/components/spinner";
import TransactionCard from "../elements/transaction-card";
import Pagination from "../elements/pagination";

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
  return (
    <section className="pt-4 space-y-2">
      {isError ? (
        <Layout>
          <p className="text-red-400">Error loading transactions</p>
        </Layout>
      ) : isLoading ? (
        <Layout>
          <Spinner />
        </Layout>
      ) : transactions.length === 0 ? (
        <Layout>
          <p className="text-muted-foreground">No transactions found</p>
        </Layout>
      ) : (
        transactions.map(transaction => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))
      )}

      {lastPage > 1 && (
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
