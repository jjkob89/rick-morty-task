import { createAction } from "@reduxjs/toolkit";

export const setPageAction = createAction("set-page", (currentPage: number) => {
    return {
        payload: {
            currentPage: currentPage,
        },
    };
});
