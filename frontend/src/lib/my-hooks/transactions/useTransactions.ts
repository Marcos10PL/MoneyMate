import { useGetTransactionsQuery } from "@/lib/state/features/transactions/api-transactions-slice";
import {
  FilteringTransactionForm,
  SearchTransactionForm,
  TransactionParams,
} from "@/lib/types";
import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
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

  const perPage = 10;

  const { data, isLoading, isError, isFetching } = useGetTransactionsQuery({
    page: currentPage,
    per_page: perPage,
    ...filters,
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
      start_date: data.date_from?.toString(),
      end_date: data.date_to?.toString(),
      sort_by: data.sort_by,
      type_id: data.type_id,
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsPageChanging(true);
  }, [currentPage]);

  useEffect(() => {
    if (!isFetching && isPageChanging) {
      setIsPageChanging(false);
    }
  }, [isFetching, isPageChanging]);

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
  };
};
