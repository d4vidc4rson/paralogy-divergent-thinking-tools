/**
 * Fodda-specific Bearer token authentication for the `analyze_trends` tool.
 *
 * Option B from the Fodda integration plan: `analyze_trends` is gated by a
 * shared Bearer token, while the other 15 consumer-facing skills remain open.
 * Keeps the clean division: consumer tools are public, Fodda integration is
 * server-to-server authenticated.
 *
 * Configuration:
 *   FODDA_BEARER_TOKEN env var — the shared secret, matched exactly against
 *   the token in the Authorization header.
 *
 * Behavior:
 *   - If env var is NOT set: analyze_trends returns 503 (fails closed — an
 *     unconfigured server should not accidentally expose the Fodda endpoint).
 *   - If Authorization header is missing or malformed: 401.
 *   - If token doesn't match: 403.
 *   - If token matches: request proceeds to the MCP transport as normal.
 *
 * Scope:
 *   The check fires ONLY on tools/call for "analyze_trends". All other MCP
 *   methods (initialize, tools/list, tools/call for other tool names) pass
 *   through untouched.
 */

import { timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";

// ---------------------------------------------------------------------------
// JSON-RPC shape helpers
// ---------------------------------------------------------------------------

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: {
    name?: string;
    [k: string]: unknown;
  };
}

/**
 * Returns true if the JSON-RPC body is a tools/call for the analyze_trends
 * tool — i.e. the Fodda integration endpoint.
 */
export function isFoddaToolCall(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const b = body as JsonRpcRequest;
  return b.method === "tools/call" && b.params?.name === "analyze_trends";
}

// ---------------------------------------------------------------------------
// Token comparison
// ---------------------------------------------------------------------------

/**
 * Constant-time comparison of two strings. Prevents timing attacks on the
 * Bearer token. Node's timingSafeEqual requires equal-length buffers, so we
 * pad/truncate safely up front.
 */
function tokensMatch(expected: string, received: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Auth result type
// ---------------------------------------------------------------------------

type AuthResult =
  | { ok: true }
  | { ok: false; status: number; code: number; message: string };

// ---------------------------------------------------------------------------
// Auth check
// ---------------------------------------------------------------------------

/**
 * Validate the Bearer token on a Fodda tool call. Does not mutate the request.
 * Only call this after isFoddaToolCall(body) has already returned true.
 */
export function checkFoddaAuth(req: Request): AuthResult {
  const expected = process.env.FODDA_BEARER_TOKEN;

  // Fail closed if the operator hasn't configured the token yet.
  if (!expected || expected.length === 0) {
    return {
      ok: false,
      status: 503,
      code: -32003,
      message:
        "Service unavailable: analyze_trends requires FODDA_BEARER_TOKEN to be configured on the server.",
    };
  }

  const header = req.headers.authorization;
  if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
    return {
      ok: false,
      status: 401,
      code: -32001,
      message:
        "Authentication required for analyze_trends: include an Authorization: Bearer <token> header.",
    };
  }

  const received = header.slice("Bearer ".length).trim();
  if (received.length === 0 || !tokensMatch(expected, received)) {
    return {
      ok: false,
      status: 403,
      code: -32002,
      message: "Invalid bearer token.",
    };
  }

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Response helper
// ---------------------------------------------------------------------------

/**
 * Send a JSON-RPC error response for a failed Fodda auth check. Preserves
 * the request's id so the client can correlate the error with its call.
 */
export function sendAuthError(
  res: Response,
  body: unknown,
  result: Extract<AuthResult, { ok: false }>
): void {
  const id =
    body && typeof body === "object"
      ? ((body as JsonRpcRequest).id ?? null)
      : null;
  res.status(result.status).json({
    jsonrpc: "2.0",
    error: { code: result.code, message: result.message },
    id,
  });
}

// ---------------------------------------------------------------------------
// Status helper (for /health and startup logs)
// ---------------------------------------------------------------------------

export function foddaAuthConfigured(): boolean {
  return !!(
    process.env.FODDA_BEARER_TOKEN &&
    process.env.FODDA_BEARER_TOKEN.length > 0
  );
}
