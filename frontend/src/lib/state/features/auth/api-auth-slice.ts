import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../base-query";
import { AuthResponse, LoginForm, SignUpForm, User } from "@/lib/types";
import { logout, setUser } from "./auth-slice";
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        setLoggedInCookie(true);
        dispatch(setUser(user));
      },
    }),
    register: builder.mutation<User, SignUpForm>({
      query: userData => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: AuthResponse) => response.user,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        setLoggedInCookie(true);
        dispatch(setUser(user));
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        setLoggedInCookie(false);
        dispatch(logout());
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
