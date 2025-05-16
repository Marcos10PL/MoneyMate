"use client";

import TrasncactionsHeader from "./sections/transactions-header";
import Forms from "./sections/forms";
import { useTransactions } from "@/lib/hooks/transactions/useTransactions";
import TransactionsList from "./sections/transactions-list";

export default function Transactions() {
  const {
    onSubmitFilter,
    onSubmitSearch,
    onResetSearch,
    currentPage,
    setCurrentPage,
    data,
    isLoading,
    isError,
    isPageChanging,
  } = useTransactions({ per_page: 7 });

  return (
    <>
      <Forms
        onSubmitFilter={onSubmitFilter}
        onSubmitSearch={onSubmitSearch}
        onResetSearch={onResetSearch}
      />

      <TrasncactionsHeader
        incomeSum={data?.data.income_sum ?? 0}
        expenseSum={data?.data.expense_sum ?? 0}
        balance={data?.data.balance ?? 0}
        total={data?.meta.total ?? 0}
      />

      <TransactionsList
        transactions={data?.data.transactions ?? []}
        isLoading={isLoading || isPageChanging}
        isError={isError}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={data?.meta.last_page ?? 1}
      />
    </>
  );
}
