"use client"
import React from "react";
import { ICiWebHookLog } from "@/lib/models/CiWebhookLog";
import { useState, useEffect } from "react";

interface CiLogTableRow extends ICiWebHookLog {
    _id: string,
}

type ToggleSortFn = (_: string) => void;

interface SortState {
    sortField: string,
    sortOrder: string,
    toggleSort: ToggleSortFn;
}

//tailwind component for status tags
function StatusTags({ status }: { status: string }) {
    const colors: Record<string, string> = {
        success: "bg-green-100 text-green-800",
        failure: "bg-red-100 text-red-800",
        cancelled: "bg-gray-200 text-gray-700",
        running: "bg-blue-100 text-blue-800",
        queued: "bg-yellow-100 text-yellow-800",
        unknown: "bg-gray-100 text-gray-600"
    };

    const style = colors[status] || colors.unknown;

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style}`}>
            {status.toUpperCase()}
        </span>
    );
}

export default function CiLogsDashBoardPage() {
    const [logs, setLogs] = useState<CiLogTableRow[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterRepo, setFilterRepo] = useState("");
    const [filterBranch, setFilterBranch] = useState("");

    const [sortField, setSortField] = useState("timestamp");
    const [sortOrder, setSortOrder] = useState("desc");

    function toggleSort(field: string) {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    }

    //Fetch logs from API route
    useEffect(() => {
        async function fetchLogs() {
            const params = new URLSearchParams({
                page: page.toString(),
                status: filterStatus,
                repo: filterRepo,
                branch: filterBranch,
                sortField,
                sortOrder,
            });

            const res = await fetch(`/api/ci-logs?${params.toString()}`);
            const data = await res.json();

            setLogs(data.logs);
            setTotalPages(data.totalPages);
        }
        fetchLogs();
    }, [page, filterStatus, filterRepo, filterBranch, sortField, sortOrder]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">CI Webhook Logs</h1>

            {/* Filter */}
            <div className="flex gap-4 mb-4">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border px-2 py-1"
                >
                    <option value="">All Status</option>
                    <option value="success">Success</option>
                    <option value="failure">Failure</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <input
                    value={filterRepo}
                    onChange={(e) => setFilterRepo(e.target.value)}
                    placeholder="Filter Repo..."
                    className="border px-2 py-1"
                />

                <input
                    value={filterBranch}
                    onChange={(e) => setFilterBranch(e.target.value)}
                    placeholder="Filter Branch..."
                    className="border px-2 py-1"
                />
            </div>

            {/* Table */}
            <table className="w-full table-auto border-collapse border border-gray-300">
                {/* NOTE: encapsulates a set of table rows (<tr> elements), indicating that they comprise the head of a table with information about the table's columns. */}
                <thead>
                    <tr className="bg-gray-100">
                        <Th label="Timestamp" field="timestamp" sort={{ sortField, sortOrder, toggleSort }} />
                        <Th label="Repo" field="repo" sort={{ sortField, sortOrder, toggleSort }} />
                        <Th label="Commit" field="commit" sort={{ sortField, sortOrder, toggleSort }} />
                        <Th label="Branch" field="branch" sort={{ sortField, sortOrder, toggleSort }} />
                        <Th label="Status" field="status" sort={{ sortField, sortOrder, toggleSort }} />
                    </tr>
                </thead>
                {/* NOTE: tbody html element encapsulates a set of table rows, indicating that they comprise the body of a table's main data */}
                <tbody>
                    {logs.map((log) => (
                        <tr key={log._id}>
                            <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
                            <td className="border px-2 py-1">{log.repo}</td>
                            <td className="border px-2 py-1">{log.commit}</td>
                            <td className="border px-2 py-1">{log.branch}</td>
                            <td className="border px-2 py-1">
                                <StatusTags status={log.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>{page} / {totalPages}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}



//Table Header Component
function Th({
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
            {label}{" "}
            {sortField === field ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </th>
    )
}