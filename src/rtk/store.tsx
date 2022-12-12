import { configureStore } from "@reduxjs/toolkit";
import { apiRickMorty } from "./api";
import { mainReducer } from "./reducers/mainReducer";

export const store = configureStore({
    reducer: {
        mainReducer: mainReducer,
        [apiRickMorty.reducerPath]: apiRickMorty.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([apiRickMorty.middleware]);
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
