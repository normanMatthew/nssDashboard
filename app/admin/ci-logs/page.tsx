"use client"
import React from "react";
import styles from "@/ui/ci-logs/ci-logs.module.css";
import { connectToDatabase } from "@/lib/utils";
import CiWebhookLog, { ICiWebHookLog } from "@/lib/models/CiWebhookLog";
import { useState, useEffect } from "react";

interface CiLogTableRow extends ICiWebHookLog {
    _id: string,
}

const PAGE_SIZE = 10;

export default function CiLogsDashBoardPage (){
    const [logs, setLogs] = useState<CiLogTableRow[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterStatus, setFilterStatus] = useState<string>("");

    //Fetch logs from API route
    useEffect(() => {
        async function fetchLogs () {
            const res = await fetch(`/api/ci-logs?page=${page}&status=${filterStatus}`);
            const data = await res.json();
            setLogs(data.logs);
            setTotalPages(data.totalPages);
        }
        fetchLogs();
    }, [page, filterStatus]);

    return (
        <div className="mb-4">
            
        </div>
    );
}