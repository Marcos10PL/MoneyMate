import {
  Transaction,
  TransactionForm,
  TransactionParams,
  TransactionResponse,
} from "@/lib/types";
import baseQuery from "../../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQuery,
  tagTypes: ["Transactions"],
  endpoints: builder => ({
    getTransactions: builder.query<TransactionResponse, TransactionParams>({
      query: ({
        category_id,
        type_id,
        start_date,
        end_date,
        sort_by,
        search,
        page = 1,
        per_page = 10,
      }) => {
        let url = "transactions";
        const params = new URLSearchParams();

        if (category_id) params.append("category_id", category_id.toString());
        if (type_id) params.append("type_id", type_id.toString());
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (sort_by) params.append("sort_by", sort_by);
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (per_page) params.append("per_page", per_page.toString());

        if (params.toString()) url += `?${params.toString()}`;
        return url;
      },
      providesTags: result =>
        result
          ? [
              ...result.data.transactions.map(({ id }) => ({
                type: "Transactions" as const,
                id,
              })),
              "Transactions",
            ]
          : ["Transactions"],
    }),
    createTransaction: builder.mutation<Transaction, TransactionForm>({
      query: transaction => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: result =>
        result
          ? [{ type: "Transactions", id: result.id }, "Transactions"]
          : ["Transactions"],
    }),
    updateTransaction: builder.mutation<
      Transaction,
      TransactionForm & { id: string }
    >({
      query: ({ id, ...transaction }) => ({
        url: `transactions/${id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Transactions", id },
        "Transactions",
      ],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: id => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
