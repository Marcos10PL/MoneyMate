import {
  Category,
  CategoryForm,
  CategoryParams,
  CategoryResponse,
} from "@/lib/types";
import baseQuery from "../../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQuery,
  tagTypes: ["Categories"],
  endpoints: builder => ({
    getCategories: builder.query<CategoryResponse, Partial<CategoryParams>>({
      query: ({ per_page = 1000, page = 1 }) => {
        let url = "categories";
        const params = new URLSearchParams();

        if (per_page) params.append("per_page", per_page.toString());
        if (page) params.append("page", page.toString());

        if (params.toString()) url += `?${params.toString()}`;
        return url;
      },
      providesTags: result =>
        result
          ? [
              ...result.data.categories.map(({ id }) => ({
                type: "Categories" as const,
                id,
              })),
              "Categories",
            ]
          : ["Categories"],
    }),
    createCategory: builder.mutation<Category, CategoryForm>({
      query: category => ({
        url: "categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: result =>
        result
          ? [{ type: "Categories", id: result.id }, "Categories"]
          : ["Categories"],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: id => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
