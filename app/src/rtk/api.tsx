import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Filters } from "../types/apiTypes";
import { CharactersSet } from "../types/appTypes";

export const apiRickMorty = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://rickandmortyapi.com/api/character",
    }),
    endpoints: (builder) => ({
        getAllCharacters: builder.query<CharactersSet, undefined>({
            query: () => {
                return "";
            },
        }),
        getCharactersPage: builder.query<CharactersSet, Filters>({
            query: (arg: Filters) => {
                return `/?page=${arg.currentPage}&name=${arg.nameFilter}&species=${arg.speciesFilter}`;
            },
        }),
    }),
});

export const { useGetAllCharactersQuery, useLazyGetCharactersPageQuery } =
    apiRickMorty;
