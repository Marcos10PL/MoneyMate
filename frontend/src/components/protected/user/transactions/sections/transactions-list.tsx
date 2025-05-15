import { Transaction } from "@/lib/types";
import TransactionCard from "../elements/transaction-card";
import Pagination from "../../../shared/list/pagination";
import ErrorMsg from "@/components/protected/shared/response/error-msg";
import Loading from "@/components/protected/shared/response/loading";
import NotFoundMsg from "@/components/protected/shared/response/not-found-msg";

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
        <ErrorMsg msg="Error loading transactions" />
      ) : isLoading ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <NotFoundMsg msg="Transactions not found" />
      ) : (
        transactions.map(transaction => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
    </section>
  );
}
