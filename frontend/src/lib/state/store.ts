import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/api-auth-slice";
import { transactionsApi } from "./features/transactions/api-transactions-slice";
import { typesApi } from "./features/types/api-types-slice";
import { categoriesApi } from "./features/categories/api-categories-slice";
import { usersApi } from "./features/users/api-users-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [transactionsApi.reducerPath]: transactionsApi.reducer,
      [typesApi.reducerPath]: typesApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        transactionsApi.middleware,
        typesApi.middleware,
        categoriesApi.middleware,
        usersApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
