# For Humans: Using the Divergent Thinking Tools

## Setup

### Via MCP Server (easiest — no install required)

The fastest way to use the tools. No downloading, no file management, no configuration.

**Claude.ai:**

1. Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors)
2. Click the **+** button
3. Name: `Divergent Thinking Tools`
4. URL: `https://mcp.paralogy.ai/mcp`
5. Click **Add**
6. Start a new chat and describe your problem. The Router handles the rest.

**Claude Desktop / Claude Code / Cursor:**

Add to your MCP client config:

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "url": "https://mcp.paralogy.ai/mcp"
    }
  }
}
```

Config file locations:
- **Claude Desktop:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Code:** Project or global MCP settings
- **Cursor:** `.cursor/mcp.json` in your project

**ChatGPT (Plus, Pro, Team, Enterprise, or Edu):**

1. Go to **Settings → Apps → Advanced settings** → toggle **Developer mode** on
2. Click **Create app** → Name: `Paralogy` → URL: `https://mcp.paralogy.ai/mcp` → Authentication: `No Auth`
3. Check the acknowledgment box and click **Create**
4. Start a new chat and describe your problem. Reference tools explicitly for best results: *"Use the Paralogy app's think-wrong tool to..."*

> **Note:** ChatGPT memory is disabled in Developer Mode. Toggle it off in the same settings menu when you don't need the tools.

**OpenClaw:**

```bash
openclaw mcp set divergent-thinking-tools '{"url":"https://mcp.paralogy.ai/mcp"}'
```

All 15 tools become available to any OpenClaw agent. See [for-openclaw.md](for-openclaw.md) for dedicated agent and multi-agent pipeline setups.

### Manual setup (SKILL.md files)

If you prefer to load the skills directly — or your tool doesn't support MCP:

**Claude (Projects or Skills):**

1. Download the `skills/` directory from this repo
2. In Claude, go to your Project or Skills settings
3. Add each SKILL.md file as a custom skill
4. The Router (`skills/router/SKILL.md`) is the orchestrator — always include it

**Cursor / Windsurf / other dev tools:**

Same SKILL.md files work as custom instructions. Paste the contents of the Router + whichever tools you want into the system prompt or rules file.

**Any LLM (direct prompting):**

Paste a SKILL.md file into the system prompt or the beginning of the conversation. Less elegant but it works. Start with the Router.

### Minimum viable set (for manual setup)

You don't need all 15 tools at once. The minimum viable set:

**Essential (always include):**
- Router
- Wrong Problem Detector
- Strip Down
- Guilford Engine
- Anti-Homogeneity Check

**Add as needed:**
- Blind Spot Scan (if you want coverage mapping)
- Think Wrong (if output feels too safe)
- Persona Divergence Engine (if you need genuinely different perspectives)
- The rest as they become relevant

> **Note:** The MCP server includes all 15 tools automatically — no need to pick and choose.

---

## How to use

### The simple version

Describe your problem. The Router reads it and picks the right tool. You don't manage tool selection.

Examples of things to say:

- "I need ideas for [problem]" → Router picks the generation tool that fits
- "We've tried everything and nothing works" → Wrong Problem Detector
- "Here's a 500-word brief — help me think about this differently" → Strip Down
- "These ideas all feel the same" → Anti-Homogeneity Check
- "I'm stuck and everything feels safe" → Bad on Purpose or Think Wrong
- "What am I missing?" → Blind Spot Scan
- "Give me the range from safe to wild" → Wild to Mild
- "I have no budget" → MacGyver Mode

### The pipeline version

For bigger problems, the tools chain automatically:

1. **Exploration** — The Router starts with the Wrong Problem Detector if the problem smells wrong, or the Dumb Questions Engine if the problem is fuzzy
2. **Pre-generation** — Strip Down extracts the desire from your brief. Blind Spot Scan maps the problem space.
3. **Generation** — One or more generation tools produce ideas
4. **Audit** — Anti-Homogeneity Check grades the diversity. Blind Spot Scan finds gaps.
5. **Gap-fill** — If the audit finds critical gaps, the Router picks a targeted generation tool and fills them
6. **Polish** — De-Slop humanizes the final output

You don't need to invoke each step manually. The Router manages the pipeline. But you can invoke any tool directly if you know what you want.

### Multi-problem scenarios

If you bring two problems at once ("I've got a budget crisis AND a staffing crisis"), the Router's multi-problem triage will:

1. Check whether the problems share a structural root
2. If yes: merge into one pipeline
3. If partially: merge with domain tracks (one pipeline, but ideas for each problem separately AND for their intersection)
4. If no: split into parallel pipelines with a cross-pollination scan at the end

### Interaction points

Some tools ask for your input:

- **Strip Down** presents a desire statement and asks you to confirm or correct it. This is the most important interaction point — the desire statement is the seed everything grows from. Push back if it doesn't feel true.
- **Wrong Problem Detector** presents both the original and rewritten problem and asks you to choose. You can reject the reframing — the pipeline is resilient to that (we tested it).
- **Dumb Questions Engine** produces starred questions and the Router may ask which ones to carry forward.

---

## Tips

- **Start with one problem.** The pipeline is powerful but it produces a lot of output. Start with a single focused problem before trying multi-problem scenarios.
- **Push back on Strip Down.** The desire statement confirmation step is where your judgment matters most. If the statement doesn't feel true, say so. Your correction IS the desire statement.
- **Don't skip the audit.** The Anti-Homogeneity Check is the bullshit detector. If you generated 10 ideas, run it — you probably have 4 ideas wearing costumes.
- **The gap-fill loop is the biggest upgrade.** In testing, the pipeline went from A- to A consistently once the gap-fill loop was added. It turns "here's what's missing" into "here's what's missing, and here's how we filled it."
- **De-Slop is optional but recommended.** If you're going to share the output with anyone, run De-Slop. AI-generated strategy text sounds like AI-generated strategy text, and that undermines the ideas inside it.
