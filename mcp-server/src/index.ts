#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

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
  const body = match[2];

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
// MCP Server
// ---------------------------------------------------------------------------

async function main() {
  // Resolve the skills directory relative to the repo root
  // The server lives in mcp-server/dist/index.js, skills are at repo-root/skills/
  const repoRoot = path.resolve(__dirname, "..", "..");
  const skillsDir = path.join(repoRoot, "skills");

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
        // Compose the full prompt: skill instructions + user's input
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

  // Connect via stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Divergent Thinking Tools MCP server running on stdio");
  console.error(`Available tools: ${skills.map((s) => s.name).join(", ")}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
