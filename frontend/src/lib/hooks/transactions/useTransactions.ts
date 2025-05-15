import { useGetTransactionsQuery } from "@/lib/state/features/transactions/api-transactions-slice";
import {
  FilteringTransactionForm,
  SearchTransactionForm,
  TransactionParams,
} from "@/lib/types";
import { useState } from "react";
import usePagination from "../usePagination";

export const useTransactions = ({
  page,
  per_page = 10,
  category_id,
  start_date,
  end_date,
  sort_by,
  search,
  type_id,
}: Partial<TransactionParams>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<
    Omit<TransactionParams, "per_page" | "page">
  >({
    category_id: undefined,
    start_date: undefined,
    end_date: undefined,
    sort_by: undefined,
    search: undefined,
    type_id: undefined,
  });

  const { data, isLoading, isError, isFetching } = useGetTransactionsQuery({
    page: page || currentPage,
    per_page: per_page,
    type_id: type_id ?? filters.type_id,
    category_id: category_id ?? filters.category_id,
    start_date: start_date ?? filters.start_date,
    end_date: end_date ?? filters.end_date,
    sort_by: sort_by ?? filters.sort_by,
    search: search ?? filters.search,
  });

  const { isPageChanging } = usePagination({
    isFetching,
    isLoading,
    dataLength: data?.data.transactions.length ?? 0,
    currentPage,
    setCurrentPage,
  });

  const onSubmitFilter = (data: FilteringTransactionForm) => {
    if (data.category_id === "all") {
      data.category_id = undefined;
    }

    if (data.type_id === "all") {
      data.type_id = undefined;
    }

    if (data.sort_by === "all") {
      data.sort_by = undefined;
    }

    setFilters({
      ...filters,
      category_id: data.category_id,
      start_date: data.date_from?.toISOString(),
      end_date: data.date_to?.toISOString(),
      sort_by: data.sort_by,
      type_id: data.type_id,
    });
    setCurrentPage(1);
  };

  const onSubmitSearch = (data: SearchTransactionForm) => {
    setFilters({
      ...filters,
      search: data.search,
    });
  };

  const onResetSearch = () => {
    setFilters({
      ...filters,
      search: undefined,
    });
  };

  return {
    onSubmitFilter,
    onSubmitSearch,
    onResetSearch,
    currentPage,
    setCurrentPage,
    setFilters,
    data,
    isLoading,
    isError,
    isPageChanging,
  } as const;
};
