import { createReducer } from "@reduxjs/toolkit";
import { DefaultRootState } from "../../types/reduxTypes";
import { setPageAction } from "../actions/genericActions";

const initialState: DefaultRootState = { currentPage: null };

export const mainReducer = createReducer(initialState, (builder) => {
    builder.addCase(setPageAction, (state, action) => {
        state.currentPage = action.payload.currentPage;
        return state;
    });
});
