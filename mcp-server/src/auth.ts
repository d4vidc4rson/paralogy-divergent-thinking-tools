/**
 * Clerk OAuth authentication for the MCP server.
 *
 * Uses @clerk/mcp-tools — Clerk's official MCP integration library.
 * When CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are set, the server
 * requires authentication. Without them, auth is disabled and the server runs open.
 */

import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

export function isAuthEnabled(): boolean {
  return !!(process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}

// ---------------------------------------------------------------------------
// User info extraction from authenticated requests
// ---------------------------------------------------------------------------

/**
 * Extract user identity from an authenticated Express request.
 * Returns null if auth is not enabled or no auth info is present.
 */
export function getAuthUser(req: { auth?: AuthInfo }): {
  userId: string;
  email?: string;
} | null {
  if (!req.auth) return null;
  const userId = req.auth.clientId || (req.auth.extra?.userId as string);
  if (!userId) return null;
  return { userId, email: req.auth.extra?.email as string | undefined };
}

/**
 * Format user info for log lines. Returns "" if no auth, or " user=X email=Y".
 */
export function userLogTag(req: { auth?: AuthInfo }): string {
  const user = getAuthUser(req);
  if (!user) return "";
  let tag = ` user=${user.userId}`;
  if (user.email) tag += ` email=${user.email}`;
  return tag;
}
