"use client"
import React from "react";

//tailwind component for status tags
export function StatusTags({ status }: { status: string }) {
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