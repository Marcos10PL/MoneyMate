import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../base-query";
import { AuthResponse, LoginForm, SignUpForm, User } from "@/lib/types";
import { setLoggedInCookie } from "@/lib/utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: builder => ({
    login: builder.mutation<User, LoginForm>({
      query: userData => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: AuthResponse) => response.user,
      async onQueryStarted(_, { queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        setLoggedInCookie(true);
        localStorage.setItem("user", JSON.stringify(user));
      },
    }),
    register: builder.mutation<User, SignUpForm>({
      query: userData => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: AuthResponse) => response.user,
      async onQueryStarted(_, { queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        setLoggedInCookie(true);
        localStorage.setItem("user", JSON.stringify(user));
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        setLoggedInCookie(false);
        localStorage.removeItem("user");
      },
    }),
    getXSRF: builder.query<void, void>({
      query: () => `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetXSRFQuery,
  useLazyGetXSRFQuery,
} = authApi;
