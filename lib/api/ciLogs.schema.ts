// Shared API Schema - is the linchpin of phase 3.8. If the front/backend don't share the same type, the system will drift.
export type CiLogsQuery = {
    page?: number;
    pageSize?: number;
    sortField?: CiLogsSortField;
    sortOrder?: "asc" | "desc";
    status?: CiStatus;
    repo?: string;
    branch?: string;
};

export type CiLogsSortField =
    | "createdAt"
    | "status"
    | "repo"
    | "branch";

export type CiStatus =
    | "success"
    | "failure"
    | "pending";

export type CiLog = {
    id: string;
    eventType: string;
    status: CiStatus;
    repo: string;
    branch: string;
    commit: string;
    timestamp: string;
}

export type CiLogsSuccessResponse = {
    data: CiLog[];
    meta: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
};

export type CiLogsErrorResponse = {
    error: {
        code:
        | "INVALID_QUERY"
        | "OUT_OF_RANGE"
        | "RATE_LIMITED"
        | "INTERNAL_ERROR";
        message: string;
        details?: Record<string, string>;
    };
};

export type CiLogsResponse = 
    | CiLogsSuccessResponse
    | CiLogsErrorResponse;