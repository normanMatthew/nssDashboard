import { CiLogsQuery, CiLogsSortField, CiStatus } from "./ciLogs.schema";

type ValidationResult<T> = 
    | { ok: true; value: T }
    | {
        ok: false;
        error: {
            code: "INVALID_QUERY";
            message: string;
            details?: Record<string, string>;
        };
    };

//constants
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;  

const SORT_FIELDS: CiLogsSortField[] = [
    "createdAt",
    "status",
    "repo",
    "branch",
];

//validator function
export function validateCiLogsQuery(
    raw: URLSearchParams
): ValidationResult<Required<CiLogsQuery>> {
    const errors: Record<string, string> = {};

    const page = Number(raw.get("page") ?? DEFAULT_PAGE);
    if(!Number.isInteger(page) || page < 1) {
        errors.page = "Page must be an integer >= 1";
    }

    const pageSize = Number(raw.get("pageSize") ?? DEFAULT_PAGE_SIZE);
    if (
        !Number.isInteger(pageSize) ||
        pageSize < 1 ||
        pageSize > MAX_PAGE_SIZE
    ) {
        errors.pageSize = `pageSize must be between 1 and ${MAX_PAGE_SIZE}`
    }

    const sortField = raw.get("sortField") as CiLogsSortField | null;
    if (sortField && !SORT_FIELDS.includes(sortField)) {
        errors.sortField = "Invalid sortField";
    }

    const sortOrder = raw.get("sortOrder");
    if (sortOrder && sortOrder !== "asc" && sortOrder !== "desc") {
        errors.sortOrder = "Invalid sortOrder";
    }

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            error: {
                code: "INVALID_QUERY",
                message: "Invalid query parameters",
                details: errors,
            },
        };
    }

    return {
        ok: true,
        value: {
            page,
            pageSize,
            sortField: sortField ?? "createdAt",
            sortOrder: (sortOrder as "asc" | "desc") ?? "desc",
            status: raw.get("status") as CiStatus | undefined,
            repo: raw.get("repo")?.trim() || undefined,
            branch: raw.get("branch")?.trim() || undefined,
        }
    }
}