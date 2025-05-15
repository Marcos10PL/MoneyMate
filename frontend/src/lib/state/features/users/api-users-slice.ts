import { UserParams, UserResponse } from "@/lib/types";
import baseQuery from "../../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  endpoints: builder => ({
    getUsers: builder.query<UserResponse, UserParams>({
      query: ({ per_page = 10, page = 1 }) => {
        let url = "users";
        const params = new URLSearchParams();

        if (per_page) params.append("per_page", per_page.toString());
        if (page) params.append("page", page.toString());

        if (params.toString()) url += `?${params.toString()}`;
        return url;
      },
      providesTags: result =>
        result
          ? [
              ...result.data.users?.map(({ id }) => ({
                type: "Users" as const,
                id,
              })),
              "Users",
            ]
          : ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;
