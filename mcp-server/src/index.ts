#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

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
  for (const skill of skills) {
    server.tool(
      skill.name,
      skill.description,
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
  const repoRoot = path.resolve(__dirname, "..", "..");
  const skillsDir = path.join(repoRoot, "skills");
  const mode = process.env.TRANSPORT || "stdio";
  const port = parseInt(process.env.PORT || "3000", 10);

  if (mode === "http") {
    // Remote mode: HTTP transport for hosted deployment
    const { createServer } = await import("node:http");
    const { StreamableHTTPServerTransport } = await import(
      "@modelcontextprotocol/sdk/server/streamableHttp.js"
    );
    const { isInitializeRequest } = await import(
      "@modelcontextprotocol/sdk/types.js"
    );
    const { randomUUID } = await import("node:crypto");

    const sessions: Record<string, { transport: InstanceType<typeof StreamableHTTPServerTransport>; server: McpServer }> = {};

    const httpServer = createServer(async (req, res) => {
      // CORS headers for remote access
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, mcp-session-id");
      res.setHeader("Access-Control-Expose-Headers", "mcp-session-id");

      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      // Favicon
      if (req.url === "/favicon.ico") {
        const faviconPath = path.join(repoRoot, "public", "images", "favicon-64x64-div-think-tools.png");
        if (fs.existsSync(faviconPath)) {
          const icon = fs.readFileSync(faviconPath);
          res.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" });
          res.end(icon);
        } else {
          res.writeHead(404);
          res.end();
        }
        return;
      }

      // Health check
      if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const skillCount = loadSkills(skillsDir).length;
        const faviconExists = fs.existsSync(path.join(repoRoot, "public", "images", "favicon-64x64-div-think-tools.png"));
        res.end(JSON.stringify({ status: "ok", tools: skillCount, repoRoot, faviconExists }));
        return;
      }

      // Only handle /mcp endpoint
      if (req.url !== "/mcp") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const sessionId = req.headers["mcp-session-id"] as string | undefined;

      if (req.method === "GET") {
        // SSE stream for existing session
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
        } else {
          res.writeHead(400);
          res.end("Invalid session");
        }
        return;
      }

      if (req.method === "DELETE") {
        // Session cleanup
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res);
          delete sessions[sessionId];
        } else {
          res.writeHead(400);
          res.end("Invalid session");
        }
        return;
      }

      if (req.method === "POST") {
        // Parse body
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(chunk as Buffer);
        }
        const body = JSON.parse(Buffer.concat(chunks).toString());

        // Existing session
        if (sessionId && sessions[sessionId]) {
          await sessions[sessionId].transport.handleRequest(req, res, body);
          return;
        }

        // New session
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

        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Invalid request — send an initialize request without a session ID to start" },
          id: null,
        }));
        return;
      }

      res.writeHead(405);
      res.end("Method not allowed");
    });

    httpServer.listen(port, () => {
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
