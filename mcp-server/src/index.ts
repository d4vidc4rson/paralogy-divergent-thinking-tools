#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { isAuthEnabled, userLogTag } from "./auth.js";

// ---------------------------------------------------------------------------
// Skill loader — reads skills/*/SKILL.md from the repo root
// ---------------------------------------------------------------------------

interface Skill {
  name: string;
  description: string;
  body: string; // full markdown content (including frontmatter)
}

function parseFrontmatter(content: string): { name: string; description: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("SKILL.md missing YAML frontmatter");
  }

  const frontmatter = match[1];

  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  if (!nameMatch) throw new Error("SKILL.md frontmatter missing 'name' field");
  if (!descMatch) throw new Error("SKILL.md frontmatter missing 'description' field");

  return {
    name: nameMatch[1].trim(),
    description: descMatch[1].trim(),
    body: content, // return the full file — the LLM needs the complete instructions
  };
}

function loadSkills(skillsDir: string): Skill[] {
  const skills: Skill[] = [];

  if (!fs.existsSync(skillsDir)) {
    console.error(`Skills directory not found: ${skillsDir}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    try {
      const content = fs.readFileSync(skillFile, "utf-8");
      const skill = parseFrontmatter(content);
      skills.push(skill);
    } catch (err) {
      console.error(`Warning: Failed to parse ${skillFile}: ${err}`);
    }
  }

  return skills;
}

// ---------------------------------------------------------------------------
// Create and configure the MCP server with all skills
// ---------------------------------------------------------------------------

function createDivergentThinkingServer(skillsDir: string): McpServer {
  const skills = loadSkills(skillsDir);

  if (skills.length === 0) {
    console.error("No skills found. Ensure the skills/ directory exists at the repo root.");
    process.exit(1);
  }

  console.error(`Loaded ${skills.length} skills from ${skillsDir}`);

  const server = new McpServer({
    name: "divergent-thinking-tools",
    version: "1.0.0",
  });

  // Register each skill as an MCP tool
  // Tool descriptions carry the execution guidance (per Anthropic's documented best
  // practice: descriptions tell the model how to interpret and act on results).
  // Tool results carry only the skill protocol + user objective (high-signal content).
  for (const skill of skills) {
    const toolDescription = [
      skill.description,
      `This tool returns a creative generation protocol — a step-by-step set of instructions — along with the user's objective. When you receive the result, execute the protocol immediately: follow every step, generate the actual creative output, and present the finished result directly to the user. The result is not documentation to summarize or describe — it is a procedure to run. Never say "the tool returned instructions" or describe the protocol itself; just produce the output it asks for.`,
    ].join("\n\n");

    server.tool(
      skill.name,
      toolDescription,
      {
        objective: z.string().describe("The problem, question, or challenge to work on"),
        context: z.string().optional().describe("Additional context, constraints, or background information"),
      },
      async ({ objective, context }) => {
        console.error(`[${new Date().toISOString()}] tool_call: ${skill.name}`);

        const userInput = context
          ? `\n\n---\n\n**Objective:** ${objective}\n\n**Context:** ${context}`
          : `\n\n---\n\n**Objective:** ${objective}`;

        return {
          content: [
            {
              type: "text" as const,
              text: skill.body + userInput,
            },
          ],
        };
      }
    );
  }

  console.error(`Available tools: ${skills.map((s) => s.name).join(", ")}`);
  return server;
}

// ---------------------------------------------------------------------------
// Transport: stdio (local) or HTTP (remote)
// ---------------------------------------------------------------------------

async function main() {
  // When installed via npm/npx, skills/ is bundled inside the package root (one level up from dist/).
  // When running from the repo, skills/ is at the repo root (two levels up from mcp-server/dist/).
  const packageRoot = path.resolve(__dirname, "..");
  const repoRoot = path.resolve(__dirname, "..", "..");
  const skillsDir = fs.existsSync(path.join(packageRoot, "skills"))
    ? path.join(packageRoot, "skills")
    : path.join(repoRoot, "skills");
  const mode = process.env.TRANSPORT || "stdio";
  const port = parseInt(process.env.PORT || "3000", 10);

  if (mode === "http") {
    // Remote mode: Express + HTTP transport for hosted deployment
    const express = (await import("express")).default;
    const { StreamableHTTPServerTransport } = await import(
      "@modelcontextprotocol/sdk/server/streamableHttp.js"
    );
    const { isInitializeRequest } = await import(
      "@modelcontextprotocol/sdk/types.js"
    );
    const { randomUUID } = await import("node:crypto");

    const sessions: Record<string, { transport: InstanceType<typeof StreamableHTTPServerTransport>; server: McpServer }> = {};

    // -----------------------------------------------------------------------
    // Express app
    // -----------------------------------------------------------------------

    const app = express();
    // Trust Railway's reverse proxy so req.protocol returns "https"
    app.set("trust proxy", 1);
    app.use(express.json());

    // CORS — same as before, plus Authorization header for OAuth
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, mcp-session-id, Authorization"
      );
      res.setHeader("Access-Control-Expose-Headers", "mcp-session-id");
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }
      next();
    });

    // -----------------------------------------------------------------------
    // Auth (conditional — only when Clerk env vars are set)
    // Uses @clerk/mcp-tools — Clerk's official MCP integration
    // -----------------------------------------------------------------------

    const authEnabled = isAuthEnabled();

    if (authEnabled) {
      const { clerkMiddleware } = await import("@clerk/express");
      const {
        mcpAuthClerk,
        protectedResourceHandlerClerk,
        authServerMetadataHandlerClerk,
      } = await import("@clerk/mcp-tools/express");

      // Clerk middleware must be registered before mcpAuthClerk
      app.use(clerkMiddleware());

      console.error(
        `Auth enabled — Clerk publishable key: ${process.env.CLERK_PUBLISHABLE_KEY!.slice(0, 15)}...`
      );

      // OAuth discovery endpoints (must be publicly accessible)
      const prHandler = protectedResourceHandlerClerk({ scopes_supported: ["profile", "email"] });
      app.get("/.well-known/oauth-protected-resource/mcp", prHandler);
      app.get("/.well-known/oauth-protected-resource", prHandler);
      app.get(
        "/.well-known/oauth-authorization-server",
        authServerMetadataHandlerClerk
      );

      // MCP endpoints with Clerk auth + our own session management
      app.get("/mcp", mcpAuthClerk, async (req: import("express").Request, res: import("express").Response) => {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        console.error(
          `[${new Date().toISOString()}] GET /mcp sessionId=${sessionId || "none"} activeSessions=${Object.keys(sessions).length}${userLogTag(req as any)}`
        );
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
        } else {
          res.status(400).end("Invalid session");
        }
      });

      app.delete("/mcp", mcpAuthClerk, async (req: import("express").Request, res: import("express").Response) => {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
          delete sessions[sessionId];
        } else {
          res.status(400).end("Invalid session");
        }
      });

      app.post("/mcp", mcpAuthClerk, async (req: import("express").Request, res: import("express").Response) => {
        const body = req.body;
        const sessionId = req.headers["mcp-session-id"] as string | undefined;

        console.error(
          `[${new Date().toISOString()}] POST /mcp sessionId=${sessionId || "none"} method=${body?.method} isInit=${!sessionId && isInitializeRequest(body)} activeSessions=${Object.keys(sessions).length}${userLogTag(req as any)}`
        );

        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res, body);
          return;
        }

        if (sessionId && !sessions[sessionId]) {
          res.status(404).json({
            jsonrpc: "2.0",
            error: { code: -32001, message: "Session expired. Please reconnect." },
            id: body?.id || null,
          });
          return;
        }

        if (!sessionId && isInitializeRequest(body)) {
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (id: string) => {
              sessions[id] = { transport, server };
              console.error(`[${new Date().toISOString()}] session_start: ${id}${userLogTag(req as any)}`);
            },
          });
          transport.onclose = () => {
            if (transport.sessionId) {
              delete sessions[transport.sessionId];
              console.error(`[${new Date().toISOString()}] session_end: ${transport.sessionId}`);
            }
          };
          const server = createDivergentThinkingServer(skillsDir);
          await server.connect(transport);
          await transport.handleRequest(req, res, body);
          return;
        }

        res.status(400).json({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Invalid request — send an initialize request without a session ID to start" },
          id: null,
        });
      });
    } else {
      console.error(
        "Auth disabled — set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to enable"
      );

      // No auth — same session management, no auth middleware
      app.get("/mcp", async (req: import("express").Request, res: import("express").Response) => {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
        } else {
          res.status(400).end("Invalid session");
        }
      });

      app.delete("/mcp", async (req: import("express").Request, res: import("express").Response) => {
        const sessionId = req.headers["mcp-session-id"] as string | undefined;
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
          delete sessions[sessionId];
        } else {
          res.status(400).end("Invalid session");
        }
      });

      app.post("/mcp", async (req: import("express").Request, res: import("express").Response) => {
        const body = req.body;
        const sessionId = req.headers["mcp-session-id"] as string | undefined;

        console.error(
          `[${new Date().toISOString()}] POST /mcp sessionId=${sessionId || "none"} method=${body?.method} isInit=${!sessionId && isInitializeRequest(body)} activeSessions=${Object.keys(sessions).length}`
        );

        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res, body);
          return;
        }

        if (sessionId && !sessions[sessionId]) {
          res.status(404).json({
            jsonrpc: "2.0",
            error: { code: -32001, message: "Session expired. Please reconnect." },
            id: body?.id || null,
          });
          return;
        }

        if (!sessionId && isInitializeRequest(body)) {
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (id: string) => {
              sessions[id] = { transport, server };
              console.error(`[${new Date().toISOString()}] session_start: ${id}`);
            },
          });
          transport.onclose = () => {
            if (transport.sessionId) {
              delete sessions[transport.sessionId];
              console.error(`[${new Date().toISOString()}] session_end: ${transport.sessionId}`);
            }
          };
          const server = createDivergentThinkingServer(skillsDir);
          await server.connect(transport);
          await transport.handleRequest(req, res, body);
          return;
        }

        res.status(400).json({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Invalid request — send an initialize request without a session ID to start" },
          id: null,
        });
      });
    }

    // -----------------------------------------------------------------------
    // Static routes (no auth required)
    // -----------------------------------------------------------------------

    app.get("/robots.txt", (_req, res) => {
      res.setHeader("Content-Type", "text/plain");
      res.end(
        [
          "User-agent: *",
          "Allow: /",
          "",
          "Sitemap: https://mcp.paralogy.ai/sitemap.xml",
        ].join("\n")
      );
    });

    app.get("/sitemap.xml", (_req, res) => {
      res.setHeader("Content-Type", "application/xml");
      res.end(
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          "  <url>",
          "    <loc>https://mcp.paralogy.ai/</loc>",
          "    <changefreq>weekly</changefreq>",
          "    <priority>1.0</priority>",
          "  </url>",
          "</urlset>",
        ].join("\n")
      );
    });

    app.get("/favicon.ico", (req, res) => {
      const faviconPath = path.join(repoRoot, "public", "images", "favicon-64x64-div-think-tools.png");
      if (fs.existsSync(faviconPath)) {
        const icon = fs.readFileSync(faviconPath);
        res.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" });
        res.end(icon);
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    app.get("/", (_req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Paralogy – Divergent Thinking Tools</title>
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="google-site-verification" content="C2e3bClDRLoyQIK7d9AVg3_8x5z4aCeLzpGcbpEnTqM" />
</head>
<body style="font-family:system-ui,sans-serif;max-width:600px;margin:4rem auto;padding:0 1rem;color:#e0e0e0;background:#111">
  <h1>Paralogy – Divergent Thinking Tools</h1>
  <p>MCP server for divergent ideation. Connect via <a href="https://claude.ai" style="color:#a78bfa">Claude</a>.</p>
  <p><a href="/health" style="color:#a78bfa">Server status</a></p>
</body>
</html>`);
    });

    app.get("/icon-192.png", (req, res) => {
      const iconPath = path.join(repoRoot, "public", "images", "paralogy-prism-v3.png");
      if (fs.existsSync(iconPath)) {
        const icon = fs.readFileSync(iconPath);
        res.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "public, max-age=604800" });
        res.end(icon);
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    app.get("/health", (_req, res) => {
      const skillCount = loadSkills(skillsDir).length;
      res.json({ status: "ok", tools: skillCount, auth: authEnabled ? "enabled" : "disabled" });
    });

    // -----------------------------------------------------------------------
    // Start listening
    // -----------------------------------------------------------------------

    app.listen(port, () => {
      console.error(`Divergent Thinking Tools MCP server running on http://0.0.0.0:${port}/mcp`);
    });
  } else {
    // Local mode: stdio transport
    const server = createDivergentThinkingServer(skillsDir);
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Divergent Thinking Tools MCP server running on stdio");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
