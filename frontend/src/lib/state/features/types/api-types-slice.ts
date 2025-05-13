import { Type, TypeResponse } from "@/lib/types";
import baseQuery from "../../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const typesApi = createApi({
  reducerPath: "typesApi",
  baseQuery: baseQuery,
  endpoints: builder => ({
    getTypes: builder.query<Type[], void>({
      query: () => "types",
      transformResponse: (response: TypeResponse) => response.data.types,
    }),
  }),
});

export const { useGetTypesQuery } = typesApi;
