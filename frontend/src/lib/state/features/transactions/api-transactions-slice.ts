import { TransactionParams, TransactionResponse } from "@/lib/types";
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
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (sort_by) params.append("sort_by", sort_by);
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString()); 
        if (per_page) params.append("per_page", per_page.toString()); 

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return url;
      },
    }),
    // getTransactionById: builder.query({
    //   query: (id: string) => `transactions/${id}`,
    // }),
    // createTransaction: builder.mutation({
    //   query: transaction => ({
    //     url: "transactions",
    //     method: "POST",
    //     body: transaction,
    //   }),
    // }),
    // updateTransaction: builder.mutation({
    //   query: ({ id, ...transaction }) => ({
    //     url: `transactions/${id}`,
    //     method: "PUT",
    //     body: transaction,
    //   }),
    // }),
    // deleteTransaction: builder.mutation({
    //   query: id => ({
    //     url: `transactions/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useGetTransactionsQuery,
  // useCreateTransactionMutation,
  // useUpdateTransactionMutation,
  // useGetTransactionByIdQuery,
} = transactionsApi;
