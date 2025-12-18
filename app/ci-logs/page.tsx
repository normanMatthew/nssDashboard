"use client"
import React, { useRef } from "react";
import { ICiWebHookLog } from "@/lib/models/CiWebhookLog";
import { useCallback, useState, useEffect } from "react";
import { Th } from "components/Table/Th";
import { StatusTags } from "components/Table/StatusTags";
import { usePolling } from "@/lib/hooks/usePolling";

interface CiLogTableRow extends ICiWebHookLog {
    _id: string,
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

    const [isPolling, setIsPolling] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    function toggleSort(field: string) {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    }

    const latestTimestampRef = useRef<string | null>(null);

    const fetchLogs = useCallback(async () => {
        setIsPolling(true);

        try {
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

            if (!data.logs?.length) return;

            const newestTimestamp = data.logs[0]?.timestamp;

            if (latestTimestampRef.current === newestTimestamp) {
                return; //no changes - skip update
            }

            latestTimestampRef.current = newestTimestamp;

            setLogs(data.logs);
            setTotalPages(data.totalPages);
            setLastUpdated(new Date());
        } finally {
            setIsPolling(false);
        }
    }, [page, filterStatus, filterRepo, filterBranch, sortField, sortOrder,]);

    //Fetch logs from API route
    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    usePolling({
        callback: fetchLogs,
        intervalMs: 10_000,
        enabled: true,
    });

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

            {/* Live UI indicator */}
            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <span 
                        className={`h-2 w-2 rounded-full ${
                            isPolling ? "bg-green-500 animate-pulse" : "bg-gray-400"
                        }`}
                    />
                    <span>{isPolling ? "Live Polling" : "Idle"}</span>
                </div>

                {lastUpdated && (
                    <span>Last Updated: {lastUpdated.toLocaleDateString()}</span>
                )}
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