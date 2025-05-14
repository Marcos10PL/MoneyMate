"use client";

import TransactionsList from "../transactions/sections/transactions-list";
import DashboardHeader from "./header/dashboard-header";
import { monthAgo, today } from "@/lib/vars";
import { useTransactions } from "@/lib/hooks/transactions/useTransactions";

export default function Dashboard() {
  const {
    setCurrentPage,
    currentPage,
    data,
    isError,
    isLoading,
    isPageChanging,
  } = useTransactions({
    per_page: 5,
    start_date: monthAgo.toISOString(),
    end_date: today.toISOString(),
  });

  return (
    <>
      <DashboardHeader
        incomes={data?.data.income_sum ?? 0}
        expenses={data?.data.expense_sum ?? 0}
        balance={data?.data.balance ?? 0}
        isLoading={isLoading}
      />

      <section className="pt-4">
        <h2 className="text-center font-bold">
          This month&apos;s transactions ({data?.meta.total})
        </h2>
        <TransactionsList
          transactions={data?.data.transactions ?? []}
          isLoading={isLoading || isPageChanging}
          isError={isError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={data?.meta.last_page ?? 1}
        />
      </section>
    </>
  );
}
