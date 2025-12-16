import type { H3Event } from 'h3';

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: {
    duration: number;
    changes: number;
    last_row_id: number;
  };
}

interface D1ExecResult {
  count: number;
  duration: number;
}

/**
 * Get the D1 database instance from the Cloudflare context
 */
export function useD1(event: H3Event): D1Database {
  const { cloudflare } = event.context;
  
  if (!cloudflare?.env?.DB) {
    throw createError({
      statusCode: 500,
      message: 'D1 database not available. Make sure DB binding is configured in wrangler.toml'
    });
  }
  
  return cloudflare.env.DB as D1Database;
}

/**
 * Helper to format dates for SQLite
 */
export function toSQLiteDate(date?: Date | string): string {
  if (!date) return new Date().toISOString();
  return new Date(date).toISOString();
}

/**
 * Helper to parse SQLite dates
 */
export function fromSQLiteDate(dateStr: string): Date {
  return new Date(dateStr);
}
