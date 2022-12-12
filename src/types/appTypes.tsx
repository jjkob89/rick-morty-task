import React from "react";

export interface Character {
    checked: boolean;
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    image: string;
}

export interface CharactersSet {
    info: {
        count: number;
        pages: number;
        next: "string" | null;
        prev: "string" | null;
    };
    results: Character[];
}

export interface TableData {
    currentData: Character[] | undefined;
    globalSelect: (checked: boolean) => void;
}
