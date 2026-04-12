/**
 * Clerk OAuth authentication for the MCP server.
 *
 * Uses the MCP SDK's built-in auth helpers to proxy OAuth to Clerk.
 * When CLERK_DOMAIN and SERVER_BASE_URL are set, the server requires
 * authentication. Without them, auth is disabled and the server runs open.
 */

import type { Application, RequestHandler } from "express";
import { randomUUID } from "node:crypto";

import { mcpAuthRouter, getOAuthProtectedResourceMetadataUrl } from "@modelcontextprotocol/sdk/server/auth/router.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";
import { ProxyOAuthServerProvider } from "@modelcontextprotocol/sdk/server/auth/providers/proxyProvider.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import type { OAuthClientInformationFull } from "@modelcontextprotocol/sdk/shared/auth.js";
import type { OAuthRegisteredClientsStore } from "@modelcontextprotocol/sdk/server/auth/clients.js";

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

export function isAuthEnabled(): boolean {
  return !!(process.env.CLERK_DOMAIN && process.env.SERVER_BASE_URL);
}

// ---------------------------------------------------------------------------
// Clerk JWT verification via JWKS
// ---------------------------------------------------------------------------

// jose is ESM-only — dynamically imported and cached at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _jose: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _jwks: any = null;

async function getJose() {
  if (!_jose) _jose = await import("jose");
  return _jose;
}

async function getJWKS() {
  if (!_jwks) {
    const jose = await getJose();
    const domain = process.env.CLERK_DOMAIN!;
    _jwks = jose.createRemoteJWKSet(
      new URL(`https://${domain}/.well-known/jwks.json`)
    );
  }
  return _jwks;
}

async function verifyClerkJWT(token: string): Promise<AuthInfo> {
  const jose = await getJose();
  const domain = process.env.CLERK_DOMAIN!;
  const jwks = await getJWKS();
  const { payload } = await jose.jwtVerify(token, jwks, {
    issuer: `https://${domain}`,
  });

  return {
    token,
    clientId: (payload.azp as string) || (payload.sub as string) || "unknown",
    scopes: payload.scope ? (payload.scope as string).split(" ") : [],
    expiresAt: payload.exp,
    extra: {
      userId: payload.sub,
      email: (payload as Record<string, unknown>).email,
    },
  };
}

// ---------------------------------------------------------------------------
// Proxy provider with local dynamic client registration
// ---------------------------------------------------------------------------

class ClerkProxyProvider extends ProxyOAuthServerProvider {
  private _localClients = new Map<string, OAuthClientInformationFull>();

  /** Inject a shared client map (used to avoid circular reference in constructor) */
  _setClientMap(map: Map<string, OAuthClientInformationFull>): void {
    this._localClients = map;
  }

  get clientsStore(): OAuthRegisteredClientsStore {
    const clients = this._localClients;
    return {
      getClient: async (clientId: string) => clients.get(clientId),
      registerClient: async (
        client: Omit<OAuthClientInformationFull, "client_id" | "client_id_issued_at">
      ): Promise<OAuthClientInformationFull> => {
        const clientId = randomUUID();
        const full: OAuthClientInformationFull = {
          ...client,
          client_id: clientId,
          client_id_issued_at: Math.floor(Date.now() / 1000),
        } as OAuthClientInformationFull;
        clients.set(clientId, full);
        console.error(
          `[${new Date().toISOString()}] oauth_client_registered: ${clientId}`
        );
        return full;
      },
    };
  }
}

// ---------------------------------------------------------------------------
// Setup: mount auth router + return bearer-auth middleware
// ---------------------------------------------------------------------------

export interface AuthSetupResult {
  /** Middleware to protect MCP endpoints — validates Bearer token */
  authMiddleware: RequestHandler;
}

export function setupAuth(app: Application, serverBaseUrl: string): AuthSetupResult {
  const domain = process.env.CLERK_DOMAIN!;

  // Client store is shared between the provider constructor and the overridden
  // clientsStore getter. We pass a getClient that reads from the same map the
  // overridden getter writes to. The override in ClerkProxyProvider adds
  // registerClient, which the SDK's mcpAuthRouter needs for dynamic registration.
  const localClients = new Map<string, OAuthClientInformationFull>();

  const provider = new ClerkProxyProvider({
    endpoints: {
      authorizationUrl: `https://${domain}/oauth/authorize`,
      tokenUrl: `https://${domain}/oauth/token`,
    },
    verifyAccessToken: verifyClerkJWT,
    getClient: async (clientId: string): Promise<OAuthClientInformationFull | undefined> =>
      localClients.get(clientId),
  });

  // Inject the shared client map so the overridden clientsStore reads/writes it
  provider._setClientMap(localClients);

  // Mount the OAuth router at app root (required by the SDK)
  app.use(
    mcpAuthRouter({
      provider,
      issuerUrl: new URL(serverBaseUrl),
      baseUrl: new URL(serverBaseUrl),
      resourceServerUrl: new URL(`${serverBaseUrl}/mcp`),
      resourceName: "Paralogy MCP Server",
      scopesSupported: [],
    })
  );

  const authMiddleware = requireBearerAuth({
    verifier: provider,
    requiredScopes: [],
    resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(
      new URL(`${serverBaseUrl}/mcp`)
    ),
  });

  console.error(
    `Auth enabled — Clerk domain: ${domain}, server: ${serverBaseUrl}`
  );

  return { authMiddleware };
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
  if (!req.auth?.extra) return null;
  const { userId, email } = req.auth.extra as {
    userId?: string;
    email?: string;
  };
  if (!userId) return null;
  return { userId, email };
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
