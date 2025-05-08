import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLoggedInCookie } from "../utils";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  credentials: "include",
  prepareHeaders: headers => {
    const xsrfToken = document.cookie
      .split("; ")
      .find(cookie => cookie.trim().startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (xsrfToken) headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));

    const origin = window.location.origin;
    headers.set("Origin", origin);
    headers.set("Accept", "application/json");

    return headers;
  },
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 419) {
    api.dispatch({ type: "auth/logout" });

    if (typeof window !== "undefined") {
      window.location.href = "/login";
      setLoggedInCookie(false);
    }
  }

  return result;
};

export default baseQuery;
