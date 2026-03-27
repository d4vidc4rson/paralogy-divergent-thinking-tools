# Divergent Thinking Systems for Convergent Machines
### Unintelligent Tools for AI
#### A [Paralogy](https://paralogy.ai) Product

AI models are pattern-completion machines. They're trained on the sum of human thought, so they're also trained on the sum of human conventional thought. Left to their own logic, they converge. They average. They produce what's most probable, not what's most interesting.

There's now substantial evidence for this. Researchers at [CHI 2025](https://dl.acm.org/doi/10.1145/3706598.3713778) found that AI-assisted workflows are subject to what they call "mechanised convergence," where users with access to GenAI tools produce a less diverse set of outcomes for the same task compared to those working without it. In interviews, knowledge workers described AI output as "too cookie cutter, full of cliche," something that requires heavy editing before it's usable. A separate study from the [Royal Society](https://doi.org/10.1098/rsos.241776) confirmed a persistent generalization bias in LLMs — a tendency to extrapolate toward broad, unqualified conclusions even when the source material doesn't warrant them.

The default mode of AI is the middle of the road.

This toolkit is built for when that happens. It's a set of thinking skills, each one designed to interrupt a specific failure mode in AI reasoning, that push the model away from probability (what's most likely to be right) and toward possibility (what hasn't been considered yet). They're packaged with a router that knows which skill to deploy and when. [Research on LLM creativity](https://bioengineer.org/assessing-llms-creative-science-idea-generation-skills/) confirms there's a "sweet spot" where carefully calibrated prompts unlock richer associative thinking — these tools are built to find it.

The result is output you can't get by "prompting harder." Ideas that make experts uncomfortable. Thinking that sounds wrong before it sounds right.

*For when your AI hits a wall. Or worse, doesn't realize it already has.*

**15 tools. A router. Quality gates. Gap-fill loops. Multi-problem triage. For humans. For agents. Built for any problem in any domain.**

---

## What this is

A system of structured thinking tools that force AI to produce genuinely different output — not ten variations on one thought, but ideas from territory the default reasoning actively avoids.

The system works at two levels:

**For humans:** Drop the SKILL.md files into Claude, Cursor, or any LLM that supports custom instructions. Describe your problem. The Router picks the right tool and runs the pipeline.

**For agents:** The same tools become infrastructure layers inside agentic systems — an objective validator, a task decomposer, a differentiation layer, quality gates, and a gap-fill controller. See [docs/for-agents.md](docs/for-agents.md).

---

## The pipeline

| Phase | Tools | What happens |
|-------|-------|-------------|
| **Explore** | Wrong Problem Detector, Dumb Questions Engine | Checks the problem before solving it |
| **Pre-generate** | Strip Down, Blind Spot Scan | Extracts the raw desire, maps the full problem space |
| **Generate** | Guilford Engine, Persona Divergence Engine, Think Wrong, Short Think, Bad on Purpose, Wild to Mild, MacGyver Mode, Random Injection | 8 generation tools, each producing structurally different output |
| **Audit** | Anti-Homogeneity Check, Blind Spot Scan (post) | Diversity grade + coverage audit |
| **Gap-fill** | Router-directed targeted generation | Fills gaps instead of just pointing at them |
| **Polish** | De-Slop | Humanizes the output |

The Router orchestrates the pipeline. You don't manage tool selection — the Router reads the situation and acts.

---

## Does it work?

We ran 10 full pipeline tests across 10 domains, plus a control test (same problem, vanilla Claude, no tools):

| Test | Domain | Special condition | Grade |
|------|--------|-------------------|-------|
| [1](tests/test-1-hospital-ed.md) | Hospital ED overcrowding | Baseline | A- |
| [2](tests/test-2-recidivism.md) | Recidivism reduction | + Gap-fill loop | A |
| [3](tests/test-3-enrollment-wpd-rejected.md) | College enrollment crisis | Human rejected the reframing | A |
| [4](tests/test-4-transit-schools-multi-problem.md) | Transit + teacher shortage | Multi-problem merge | A |
| [5](tests/test-5-downtown-loneliness-ambiguous.md) | Downtown vacancy + loneliness | Ambiguous multi-problem | A |
| [6](tests/test-6-climate-tech-verification.md) | Climate tech go-to-market | All updates verified | A |
| [7](tests/test-7-marketing-premium-launch.md) | Premium product launch in saturated category | Marketing domain | A |
| [8](tests/test-8-engineering-route-optimization.md) | Real-time route optimization (engineering) | Hard-constraint engineering domain | A- |
| [9](tests/test-9-physics-dark-matter.md) | Dark matter detection strategy (physics) | Resource allocation under physical constraints | A- |
| [10](tests/test-10-applied-math-climate-ml.md) | Neural network climate surrogate (applied math) | Mathematical architecture problem | A- |

**The control comparison:** We ran the same climate tech problem through vanilla Claude (no tools). The pipeline produced 65+ ideas including 15 that vanilla Claude didn't touch — FEMA grantees with approved funding and no vendor, DOD procurement programs nobody at the startup knew existed, and a complete reframing from "we can't sell to utilities" to "we're selling to the wrong buyer." Full comparison: [test-6-control-vanilla-vs-tools.md](tests/test-6-control-vanilla-vs-tools.md).

---

## Quick start

### For humans

1. Download the `skills/` directory
2. Add the SKILL.md files to your Claude Projects, Cursor, or any LLM custom instructions
3. Describe your problem. The Router handles the rest.

See [docs/for-humans.md](docs/for-humans.md) for details.

### Via MCP server (easiest — no install required)

**Claude.ai:**

1. Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors)
2. Click **+** → Name: `Divergent Thinking Tools` → URL: `https://mcp.paralogy.ai/mcp`
3. Start a new chat and describe your problem. The Router handles the rest.

**Claude Desktop / Claude Code / Cursor:**

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "url": "https://mcp.paralogy.ai/mcp"
    }
  }
}
```

Add to your config: Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`), Claude Code (project or global MCP settings), or Cursor (`.cursor/mcp.json`).

**Local (if you prefer to self-host):**

```bash
git clone https://github.com/d4vidc4rson/paralogy-divergent-thinking-tools.git
cd paralogy-divergent-thinking-tools/mcp-server
npm install && npm run build
```

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "command": "node",
      "args": ["/path/to/paralogy-divergent-thinking-tools/mcp-server/dist/index.js"]
    }
  }
}
```

All 15 tools become available as MCP tools. No API key needed — the server distributes the skill prompts and your client's LLM executes them. See [mcp-server/README.md](mcp-server/README.md) for full setup.

### For agent developers

The tools map to five infrastructure layers:

- **Objective Validator** (Wrong Problem Detector + Strip Down) — checks goals before agents work on them
- **Task Decomposer** (Blind Spot Scan) — splits work by problem-space region, not subtask
- **Differentiation Layer** (Persona Divergence Engine) — makes multi-agent output actually diverse
- **Quality Gate** (Anti-Homogeneity Check) — rejects convergent output automatically
- **Gap-Fill Controller** (Router) — routes targeted re-generation into empty zones

See [docs/for-agents.md](docs/for-agents.md) for the full agentic architecture, implementation patterns, and use case examples.

---

## The tools

**Exploration:**
- **Wrong Problem Detector** — runs 5 checks on the problem before you solve it
- **Dumb Questions Engine** — generates 15-20 questions nobody is asking

**Pre-generation:**
- **Strip Down** — translates briefs into raw human desire
- **Blind Spot Scan** — maps the full problem space before and after ideation

**Generation:**
- **Guilford Engine** — structured five-pass divergent thinking (fluency, flexibility, originality, feasibility, clarity)
- **Persona Divergence Engine** — ideas from 5 radically different constructed worldviews
- **Think Wrong** — single counterintuitive argument that makes experts defensive
- **Short Think** — 30+ gut-level ideas with zero deliberation
- **Bad on Purpose** — deliberately terrible ideas mined for hidden value
- **Wild to Mild** — ideas at 4 altitude levels from Monday Morning to Moonshot
- **MacGyver Mode** — solutions using only existing resources
- **Random Injection** — genuine randomness injected and structurally connected

**Post-generation:**
- **Anti-Homogeneity Check** — diversity audit with letter grades
- **Blind Spot Scan (post)** — coverage audit identifying empty zones

**Polish:**
- **De-Slop** — transforms AI-polished text into authentic human voice

---

## The research

- Guilford, J.P. (1967). *The Nature of Human Intelligence.* The five-dimension divergent thinking framework.
- Ruan et al. (2026). LiveIdeaBench. *Nature Communications.* Validated the framework across 40+ LLMs and 22 scientific domains.
- Doshi & Hauser (2024). *Science Advances.* AI makes individuals more creative but makes everyone's output more similar.
- Wenger & Kenett (2025). LLMs show high creative homogeneity (0.92 cosine similarity) even across model families.

---

## Limitations

- Tested across 10 domains including 3 technical (engineering, physics, applied math) — all scored A or A-. In technical domains, the tools are strongest when the answer is a structural or architectural change and weakest when the answer is a derivation or proof. Notably, the applied math test (Test 10) performed better than expected because the problem's solution WAS structural — the tools produced specific, implementable mathematical modifications (constraint-by-construction output layers, correction algorithms with O(N) complexity), not hand-waving. The tools don't replace domain expertise, but they help experts decide where to point it.
- The tools grade their own output. AHC diversity scores are self-assessed, not externally validated.
- All tests ran on Claude. Other models may handle the complex multi-step instructions differently.
- The full pipeline uses significant context window space. All 15 skills total ~49,000 tokens of system prompt. The minimum viable set (Router + Wrong Problem Detector + Strip Down + Guilford Engine + Anti-Homogeneity Check) is ~18,000 tokens — fits comfortably in Claude's 200K context with plenty of room for conversation. See [for-humans.md](docs/for-humans.md) for the recommended starting configuration.

**The bottom line for technical users:** If your technical problem has a structural answer — you're using the wrong architecture, the wrong mathematical framework, or pointing your resources at the wrong target — the tools will find that. They won't derive your equations or write your code, but they'll make sure you're solving the right problem before you start.

---

## About

Built by [David Carson](https://github.com/d4vidc4rson) at [Paralogy](https://paralogy.ai).
