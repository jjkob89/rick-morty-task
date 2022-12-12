import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Filters } from "../types/apiTypes";
import { CharactersSet } from "../types/appTypes";

const responseTransform = (rawData: CharactersSet) => {
    rawData.results.forEach((element) => {
        element.checked = false;
    });
    return rawData;
};

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
            transformResponse: responseTransform,
        }),
        getCharactersPage: builder.query<CharactersSet, Filters>({
            query: (arg: Filters) => {
                return `/?page=${arg.currentPage}&name=${arg.nameFilter}&species=${arg.speciesFilter}`;
            },
            transformResponse: responseTransform,
        }),
    }),
});

export const { useGetAllCharactersQuery, useLazyGetCharactersPageQuery } =
    apiRickMorty;
