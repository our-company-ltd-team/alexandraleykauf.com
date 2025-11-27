/**
 * Logging utility with colored output
 */
export declare const logger: {
    info: (message: string) => void;
    success: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    migration: (name: string, status: "pending" | "running" | "applied" | "failed") => void;
    table: (headers: string[], rows: string[][]) => void;
    newline: () => void;
    header: (title: string) => void;
};
//# sourceMappingURL=logger.d.ts.map