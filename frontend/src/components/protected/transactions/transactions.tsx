"use client";

import { useGetTransactionsQuery } from "@/lib/state/features/transactions/api-transactions-slice";
import { useState } from "react";
import TrasncactionsHeader from "./transactions-header";
import TransactionsList from "./transactions-section/transactions-list";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError, isFetching } = useGetTransactionsQuery({
    page: currentPage,
    per_page: perPage,
  });

  return (
    <>
      <TrasncactionsHeader
        incomeSum={data?.data.income_sum ?? 0}
        expenseSum={data?.data.expense_sum ?? 0}
        balance={data?.data.balance ?? 0}
      />

      <TransactionsList
        transactions={data?.data.transactions ?? []}
        isLoading={isLoading || isFetching}
        isError={isError}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={data?.meta.last_page ?? 1}
      />
    </>
  );
}
