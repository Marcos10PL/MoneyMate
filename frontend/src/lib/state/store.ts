import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/api-auth-slice";
import { transactionsApi } from "./features/transactions/api-transactions-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [transactionsApi.reducerPath]: transactionsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        transactionsApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
