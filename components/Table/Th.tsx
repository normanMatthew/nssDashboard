"use client"
import React from "react";

type ToggleSortFn = (field: string) => void;

interface SortState {
    sortField: string,
    sortOrder: string,
    toggleSort: ToggleSortFn;
}

export function Th({
    label,
    field,
    sort,
}: {
    label: string;
    field: string;
    sort: SortState;
}) {
    const { sortField, sortOrder, toggleSort } = sort;
    return (
        <th
            onClick={() => toggleSort(field)}
            className="border px-2 py-2 cursor-pointer hover:bg-gray-50 select-none"
        >
            {label}{sortField === field ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </th>
    );
}