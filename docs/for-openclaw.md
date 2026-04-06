# For OpenClaw: Integrating Divergent Thinking Tools

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source AI agent framework that runs locally, connects to LLM providers, and delivers conversations through messaging channels. It has native MCP support, multi-agent routing, and workspace isolation — which makes it a natural fit for divergent thinking infrastructure.

Three integration paths, from simple to full pipeline.

---

## Path 1: MCP Server (one command)

Connect your OpenClaw agent to the hosted MCP server:

```bash
openclaw mcp set divergent-thinking-tools '{"url":"https://mcp.paralogy.ai/mcp"}'
```

Verify it's connected:

```bash
openclaw mcp list
```

That's it. All 15 tools are available to any agent in your gateway. Describe a problem in any channel and the agent can call `wrong-problem-detector`, `think-wrong`, `guilford-engine`, etc.

**Self-hosted alternative:**

```bash
git clone https://github.com/d4vidc4rson/paralogy-divergent-thinking-tools.git
cd paralogy-divergent-thinking-tools/mcp-server
npm install && npm run build
```

```bash
openclaw mcp set divergent-thinking-tools '{"command":"node","args":["/absolute/path/to/mcp-server/dist/index.js"]}'
```

**When to use this:** You want your existing OpenClaw agent to think divergently when asked. No architecture changes. Works immediately.

---

## Path 2: Dedicated Divergent Thinking Agent

OpenClaw's multi-agent architecture lets you run a specialized divergent thinking agent alongside your other agents — a persistent creative contrarian on your team.

### 1. Create the agent

```bash
openclaw agents add divergent-thinker
```

This creates a dedicated workspace at `~/.openclaw/workspace-divergent-thinker`.

### 2. Configure its personality

Create `~/.openclaw/workspace-divergent-thinker/SOUL.md`:

```markdown
# Divergent Thinker

You are a creative strategist whose job is to produce ideas that make experts uncomfortable.

## Core behavior
- Never accept the first framing of a problem. Always check whether the stated problem is a symptom of something deeper.
- Default to counterintuitive. If an idea feels safe, push harder.
- When asked to brainstorm, produce structurally different ideas — not ten variations on one thought.
- Challenge consensus. If everyone agrees, something is being missed.

## What you optimize for
- Diversity of thought over volume of output
- Ideas that sound wrong before they sound right
- Structural reframing over incremental improvement

## What you avoid
- Generic, committee-safe suggestions
- AI-polished language that sounds impressive but says nothing
- Repeating what the user already knows

## How you work
- Use the divergent thinking MCP tools when they're available
- Start with the Wrong Problem Detector if the problem smells off
- Always run the Anti-Homogeneity Check on your own output before delivering it
- If your ideas cluster around one move, use a different generation tool and try again
```

### 3. Add the skills

Copy the SKILL.md files into the agent's skill directory:

```bash
cp -r /path/to/divergent-thinking-tools/skills/* ~/.openclaw/workspace-divergent-thinker/skills/
```

Or connect via MCP (so the agent has both the raw skills and the MCP tools):

```bash
openclaw mcp set divergent-thinking-tools '{"url":"https://mcp.paralogy.ai/mcp"}'
```

### 4. Configure routing

In your `openclaw.json`, add the agent and set up bindings:

```json
{
  "agents": {
    "list": [
      { "id": "main", "workspace": "~/.openclaw/workspace" },
      { "id": "divergent-thinker", "workspace": "~/.openclaw/workspace-divergent-thinker" }
    ]
  },
  "bindings": [
    { "agentId": "main", "match": { "channel": "telegram" } },
    { "agentId": "divergent-thinker", "match": { "channel": "telegram", "peer": "divergent-thinker-group" } }
  ]
}
```

Or use the main agent as an orchestrator that spawns the divergent-thinker as a sub-agent for ideation tasks.

**When to use this:** You want a persistent "creative contrarian" agent that other agents (or you) can consult whenever a problem needs divergent thinking.

---

## Path 3: Full Pipeline as Multi-Agent Workflow

This maps the [5-layer agentic architecture](for-agents.md) directly onto OpenClaw's multi-agent system. Each layer becomes a dedicated agent with its own workspace, persona, and skill assignment.

### Architecture

| OpenClaw Agent | Role | Divergent Thinking Layer | Tools |
|---|---|---|---|
| `validator` | Checks objectives before work begins | Layer 1: Objective Validator | Wrong Problem Detector, Strip Down |
| `decomposer` | Maps problem space, assigns regions | Layer 2: Task Decomposer | Blind Spot Scan, Dumb Questions Engine |
| `generator-1` | Structured divergence | Layer 3: Differentiation | Guilford Engine |
| `generator-2` | Counterintuitive arguments | Layer 3: Differentiation | Think Wrong |
| `generator-3` | High-volume raw ideas | Layer 3: Differentiation | Short Think |
| `generator-4` | Chaos agent | Layer 3: Differentiation | Random Injection |
| `auditor` | Quality gate on combined output | Layer 4: Quality Gate | Anti-Homogeneity Check, Blind Spot Scan |
| `gap-filler` | Targeted regeneration into empty zones | Layer 5: Gap-Fill Controller | Router-directed skill selection |

### Per-agent SOUL.md

Each generator agent gets a SOUL.md encoding a unique persona from the Persona Divergence Engine framework:

```markdown
# Generator 1 — The Architect

## Values
You optimize for structural elegance. A good idea has clean lines.

## Aesthetic
Systematic. Frameworks over fragments. You build systems, not lists.

## Method
Start from first principles. Decompose, then recompose differently.

## Blind spot
You systematically underweight urgency and quick wins.

## Adversary
Generator 3 (the rapid-fire thinker) — their volume-over-depth approach
produces noise you'd never tolerate, but occasionally surfaces
something your rigor would have filtered out.
```

The key: each agent has conflicting values, conflicting aesthetics, and a named adversary. This produces genuine diversity, not shallow role-play.

### Agent isolation

OpenClaw's workspace isolation maps perfectly to the pipeline's generation isolation requirement:

- Each generator agent has its own workspace — no shared memory during generation
- Agents generate independently and never see each other's output
- Cross-pollination happens only at the audit layer, when the `auditor` agent collects all output

This prevents the convergence that occurs when agents read each other's work and unconsciously align.

### Quality gate loop

The `auditor` agent runs after all generators complete:

1. Collects all ideas into a single pool
2. Runs Anti-Homogeneity Check — clusters by underlying move, grades A through D
3. Runs Blind Spot Scan (post-generation) — maps ideas against the problem space
4. If grade >= B and no critical gaps: pass
5. If gaps found: routes to `gap-filler` with specific targets
6. Maximum 2 gap-fill cycles, then deliver with remaining gaps flagged

You can trigger this via OpenClaw's cron-based agent loop or as part of a deterministic YAML sub-workflow.

### Control flow

```
User message → validator agent
  ↓
  validator confirms/rewrites objective → decomposer agent
  ↓
  decomposer maps problem space → assigns regions to generators
  ↓
  generator-1, generator-2, generator-3, generator-4 (isolated, parallel)
  ↓
  all output collected → auditor agent
  ↓
  if gaps → gap-filler agent → re-audit
  ↓
  final output delivered
```

**When to use this:** You're building an autonomous ideation system, a research hypothesis generator, or a strategic decision framework where diversity of output is a hard requirement.

---

## Tips

- **Start with Path 1.** Graduate to Path 2 or 3 once you've seen how the tools work.
- **The SOUL.md is the leverage point.** A SOUL.md that explicitly tells the agent to deprioritize safe/consensus output changes everything. Without it, the agent defaults to probable.
- **Isolation during generation, cross-pollination at audit.** This is the single most important architectural decision. If generators read each other's work, they converge. Keep them isolated.
- **The MCP tools work with any LLM provider** OpenClaw connects to. The server distributes skill prompts — your provider's model executes them.
- **Don't skip the quality gate.** The Anti-Homogeneity Check is the bullshit detector. Without it, you get 10 agents producing 10 copies of the same idea and calling it diversity.

---

## Related docs

- [For Humans](for-humans.md) — using the tools directly in Claude, Cursor, or any LLM
- [For Agent Developers](for-agents.md) — the full 5-layer agentic architecture
- [How It Works](how-it-works.md) — the convergence problem and the pipeline
- [MCP Server Setup](../mcp-server/README.md) — hosted and self-hosted MCP configuration
