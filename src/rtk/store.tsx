import { configureStore } from "@reduxjs/toolkit";
import { apiRickMorty } from "./api";

export const store = configureStore({
    reducer: {
        [apiRickMorty.reducerPath]: apiRickMorty.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([apiRickMorty.middleware]);
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
