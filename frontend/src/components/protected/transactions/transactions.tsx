"use client";

import TrasncactionsHeader from "./transactions-section/transactions-header";
import TransactionsList from "./transactions-section/transactions-list";
import Forms from "./filters-section/forms";
import { useTransactions } from "@/lib/my-hooks/transactions/useTransactions";

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
  } = useTransactions();

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
