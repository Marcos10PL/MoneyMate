import { Category, CategoryResponse } from "@/lib/types";
import baseQuery from "../../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQuery,
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      transformResponse: (response: CategoryResponse) =>
        response.data.categories,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
