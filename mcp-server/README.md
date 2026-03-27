# Divergent Thinking Tools — MCP Server

An MCP (Model Context Protocol) server that makes all 15 Divergent Thinking Tools available to any MCP-compatible client — Claude Desktop, Cursor, or any agent framework that supports MCP.

The server distributes the tool prompts. All LLM calls happen on your side, using your own API key or subscription. The server itself makes zero API calls.

## Quick start (hosted — no install required)

The fastest way to use the tools. Connect to the hosted server — no cloning, no terminal, no npm:

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "url": "https://mcp.paralogy.ai/mcp"
    }
  }
}
```

Add the config above to your MCP client:
- **Claude Desktop:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Code:** Project or global MCP settings
- **Cursor:** `.cursor/mcp.json` in your project

That's it. All 15 tools are immediately available.

---

## Self-hosted setup (optional)

If you prefer to run the server locally:

### 1. Clone and build

```bash
git clone https://github.com/d4vidc4rson/paralogy-divergent-thinking-tools.git
cd paralogy-divergent-thinking-tools/mcp-server
npm install
npm run build
```

### 2. Connect to your MCP client

#### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "command": "node",
      "args": ["/absolute/path/to/paralogy-divergent-thinking-tools/mcp-server/dist/index.js"]
    }
  }
}
```

#### Claude Code

Add to your project or global settings:

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "command": "node",
      "args": ["/absolute/path/to/paralogy-divergent-thinking-tools/mcp-server/dist/index.js"]
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "command": "node",
      "args": ["/absolute/path/to/paralogy-divergent-thinking-tools/mcp-server/dist/index.js"]
    }
  }
}
```

### 3. Use the tools

Once connected, your client will have access to all 15 tools. Start with the **router** — describe your problem and it will tell you which tools to use:

```
Use the divergent-thinking-tools-router tool with objective: "We need to reduce customer churn but every strategy we've tried plateaus at 15%"
```

## Available tools

| Tool | What it does |
|------|-------------|
| `divergent-thinking-tools-router` | **Start here.** Routes your problem to the right tools. |
| `wrong-problem-detector` | Checks if you're solving the right problem before you start |
| `strip-down` | Strips briefs to raw human desire so ideas aren't anchored |
| `dumb-questions-engine` | Generates questions nobody is asking about your problem |
| `blind-spot-scan` | Maps what you forgot to think about |
| `guilford-engine` | Structured divergent ideation (5 dimensions, research-backed) |
| `persona-divergence-engine` | Ideas through radically different constructed personas |
| `think-wrong` | Pushes toward counterintuitive, non-obvious approaches |
| `short-think` | Fast, gut-level ideas — kills overthinking |
| `bad-on-purpose` | Deliberately terrible ideas, then mines them for value |
| `wild-to-mild` | Full spectrum from moonshots to Monday-morning moves |
| `macgyver-mode` | Solutions using only what you already have |
| `random-injection` | Injects randomness and forces structural connections |
| `anti-homogeneity-check` | Audits whether your ideas are actually different |
| `de-slop` | Transforms AI-polished text into authentic human voice |

## How it works

Each tool accepts two parameters:
- **`objective`** (required) — the problem or challenge to work on
- **`context`** (optional) — additional constraints, background, or domain information

When you call a tool, the server returns the full skill instructions along with your input. Your LLM reads those instructions and executes the skill. No API calls are made by the server — everything runs in your client's context.

## Remote hosting

The hosted server is live at **`https://mcp.paralogy.ai/mcp`** — this is what the quick start config above connects to. Health check: `https://mcp.paralogy.ai/health`.

If you want to deploy your own instance, the server supports HTTP transport:

```bash
TRANSPORT=http PORT=3000 node dist/index.js
```

The server will listen on `http://0.0.0.0:3000/mcp`. Deploy to Railway, Render, or Fly.io — the hosting platform provides the `PORT` environment variable automatically.

## Two transport modes

| Mode | When to use | How to run |
|------|-------------|------------|
| **stdio** (default) | Local use with Claude Desktop, Claude Code, Cursor | `node dist/index.js` |
| **http** | Remote hosting for Claude.ai, web clients, shared teams | `TRANSPORT=http node dist/index.js` |

## Requirements

- Node.js 18+
- An MCP-compatible client
