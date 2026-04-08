<p align="center">
  <img src="public/images/paralogy-prism-v3.png" width="350" />
</p>

<h1 align="center">Divergent Thinking Tools</h1>

<h4 align="center">A <a href="https://paralogy.ai">Paralogy</a> Product</h4>

<p align="center"><strong>Everyone using AI is getting more or less the same output. This tool fixes that.</strong></p>

<p align="center">Divergent Thinking Tools is a pipeline of structured skills, each one designed to break a specific failure mode in AI reasoning, packaged with a router that knows which skill to deploy and when.</p>

<p align="center">AI models are pattern-completion machines. Trained on the sum of human thought, they're also trained on the sum of human <em>conventional</em> thought. They converge. They average. They produce what's most probable, not what's most valuable.</p>

<p align="center">Researchers at <a href="https://dl.acm.org/doi/10.1145/3706598.3713778">CHI 2025</a> call it "mechanised convergence." AI makes any one person's output better, but it makes everyone's output more similar. It nudges groups toward smaller, less diverse sets of ideas. A <a href="https://doi.org/10.1098/rsos.241776">Royal Society study</a> confirmed a persistent generalization bias in LLMs. Knowledge workers describe AI output as "too cookie cutter, full of cliche."</p>

---

<div align="center">

| 10/10 A or A- | 65+ ideas | 15 tools |
|:-:|:-:|:-:|
| Pipeline test results | vs 22 from vanilla Claude | Full pipeline |

</div>

---

<p align="center"><a href="#quick-start">Quick Start</a> · <a href="#the-tools">The Tools</a> · <a href="#for-agents">For Agents</a> · <a href="#the-pipeline">The Pipeline</a> · <a href="#test-results">Test Results</a> · <a href="#before--after">Before & After</a> · <a href="#the-research">Research</a> · <a href="#limitations">Limitations</a></p>

---

## Quick Start

### Install via npx

No clone, no build, no API key. The server distributes skill prompts — your client's LLM executes them.

**Claude Code:**

```bash
claude mcp add divergent-thinking-tools -- npx -y divergent-thinking-tools-mcp
```

<details>
<summary><strong>Codex</strong></summary>

```bash
codex mcp add divergent-thinking-tools -- npx -y divergent-thinking-tools-mcp
```
</details>

<details>
<summary><strong>Claude Desktop / Cursor</strong></summary>

Add to your config (`~/Library/Application Support/Claude/claude_desktop_config.json` or `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "command": "npx",
      "args": ["-y", "divergent-thinking-tools-mcp"]
    }
  }
}
```
</details>

### Hosted server (no install at all)

If you'd rather not run anything locally, connect to the hosted server.

**Claude.ai:**

1. Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors)
2. Click **+** → Name: `Divergent Thinking Tools` → URL: `https://mcp.paralogy.ai/mcp`
3. Start a new chat and describe your problem. The Router handles the rest.

<details>
<summary><strong>Claude Code / Codex (terminal)</strong></summary>

```bash
claude mcp add divergent-thinking-tools --transport http https://mcp.paralogy.ai/mcp
codex mcp add divergent-thinking-tools --transport http https://mcp.paralogy.ai/mcp
```
</details>

<details>
<summary><strong>Claude Desktop / Cursor (config file)</strong></summary>

```json
{
  "mcpServers": {
    "divergent-thinking-tools": {
      "url": "https://mcp.paralogy.ai/mcp"
    }
  }
}
```
</details>

<details>
<summary><strong>ChatGPT (Plus, Pro, Team, Enterprise, or Edu)</strong></summary>

1. Go to **Settings → Apps → Advanced settings** → toggle **Developer mode** on
2. Click **Create app** → Name: `Paralogy` → URL: `https://mcp.paralogy.ai/mcp` → Authentication: `No Auth`
3. Check the acknowledgment box and click **Create**
4. Start a new chat and describe your problem. Reference tools explicitly for best results: *"Use the Paralogy app's think-wrong tool to..."*

See [mcp-server/README.md](mcp-server/README.md) for full ChatGPT setup details.
</details>

<details>
<summary><strong>OpenClaw</strong></summary>

```bash
openclaw mcp set divergent-thinking-tools '{"url":"https://mcp.paralogy.ai/mcp"}'
```

All 15 tools become available to any OpenClaw agent. See [docs/for-openclaw.md](docs/for-openclaw.md) for dedicated agent and multi-agent pipeline setups.
</details>

<details>
<summary><strong>SKILL.md files (manual — no MCP)</strong></summary>

1. Download the `skills/` directory
2. Add the SKILL.md files to your Claude Projects, Cursor, or any LLM custom instructions
3. Describe your problem. The Router handles the rest.

See [docs/for-humans.md](docs/for-humans.md) for details.
</details>

---

## The Tools

**Exploration:**
- **Wrong Problem Detector** — runs 5 checks on the problem before you solve it
- **Dumb Questions Engine** — generates 15-20 questions nobody is asking

**Pre-generation:**
- **Strip Down** — translates detailed briefs into raw human desire, so the AI generates from internal associations instead of rephrasing your words back at you
- **Blind Spot Scan** — maps the full problem space before and after ideation

**Generation (8 tools, each structurally different):**
- **Guilford Engine** — structured five-pass divergent thinking (fluency, flexibility, originality, feasibility, clarity)
- **Persona Divergence Engine** — ideas from 5 radically different constructed worldviews
- **Think Wrong** — single counterintuitive argument that makes experts defensive, not comfortable
- **Short Think** — 30+ gut-level ideas with zero deliberation
- **Bad on Purpose** — deliberately terrible ideas, then reverse-engineers the hidden value inside them
- **Wild to Mild** — ideas at 4 altitude levels from Monday Morning to Moonshot
- **MacGyver Mode** — solutions using only existing resources, no new budget, no new hires
- **Random Injection** — injects an unrelated concept and forces deep structural connections to the problem

**Post-generation:**
- **Anti-Homogeneity Check** — diversity audit with letter grades
- **Blind Spot Scan (post)** — coverage audit identifying empty zones

**Polish:**
- **De-Slop** — transforms AI-polished text into authentic human voice

---

## For Agents

The tools map to five infrastructure layers inside agentic systems:

| Layer | Tools | Purpose |
|-------|-------|---------|
| **Objective Validator** | Wrong Problem Detector + Strip Down | Checks goals before agents work on them |
| **Task Decomposer** | Blind Spot Scan | Splits work by problem-space region, not subtask |
| **Differentiation Layer** | Persona Divergence Engine | Makes multi-agent output actually diverse |
| **Quality Gate** | Anti-Homogeneity Check | Rejects convergent output automatically |
| **Gap-Fill Controller** | Router | Routes targeted re-generation into empty zones |

See [docs/for-agents.md](docs/for-agents.md) for the full agentic architecture, implementation patterns, and use case examples.

---

## The Pipeline

```
  Explore          Pre-generate        Generate           Audit            Gap-fill          Polish
    │                   │                  │                 │                 │                │
    ▼                   ▼                  ▼                 ▼                 ▼                ▼
┌─────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌─────────┐
│  Wrong   │     │  Strip Down │     │ Guilford │     │  Anti-   │     │  Router  │     │ De-Slop │
│ Problem  │────▶│  + Blind   │────▶│ + Persona│────▶│Homogene- │────▶│ targeted │────▶│  human  │
│ Detector │     │  Spot Scan │     │ + 6 more │     │ity Check │     │ regen    │     │  voice  │
└─────────┘     └─────────────┘     └──────────┘     └──────────┘     └──────────┘     └─────────┘
 Check the       Extract raw         8 generators,    Diversity grade   Fill gaps,        Strip
 problem first   desire, map the     each producing   + coverage audit  don't just        the AI
                 full space          structurally                       point at them      polish
                                     different output
```

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

## Test Results

10 full pipeline tests across 10 domains:

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

---

## Before & After

Same problem. Same model. Climate tech go-to-market strategy.

**Vanilla Claude (no tools):**

```
22 ideas — conventional channels, obvious partnerships,
standard go-to-market playbook. Solid but predictable.
```

**With the pipeline:**

```
65+ ideas — including 15 that vanilla Claude didn't touch:

  • FEMA grantees with approved funding and no vendor
  • DOD procurement programs nobody at the startup knew existed
  • Complete reframing: "we can't sell to utilities" →
    "we're selling to the wrong buyer"
```

Same model. Same problem. 3x the ideas. The difference is structural — the pipeline forces the model into territory its default reasoning actively avoids.

Full comparison: [test-6-control-vanilla-vs-tools.md](tests/test-6-control-vanilla-vs-tools.md).

---

## The Research

- [Guilford, J.P. (1967). *The Nature of Human Intelligence.*](https://en.wikipedia.org/wiki/The_Nature_of_Human_Intelligence) The five-dimension divergent thinking framework.
- [Ruan et al. (2026). LiveIdeaBench. *Nature Communications.*](https://www.nature.com/articles/s41467-026-70245-1) Validated the framework across 40+ LLMs and 22 scientific domains.
- [Doshi & Hauser (2024). *Science Advances.*](https://www.science.org/doi/10.1126/sciadv.adn5290) AI makes individuals more creative but makes everyone's output more similar.
- [Wenger & Kenett (2025).](https://arxiv.org/abs/2501.19361) LLMs show high creative homogeneity (0.92 cosine similarity) even across model families.
- [Research on LLM creativity](https://bioengineer.org/assessing-llms-creative-science-idea-generation-skills/) confirms a "sweet spot" where carefully calibrated prompts unlock richer associative thinking.

---

## Limitations

- Tested across 10 domains including 3 technical (engineering, physics, applied math) — all scored A or A-. Strongest at structural and architectural reframing; weakest when the answer is a derivation or proof. The tools don't replace domain expertise, but they help experts decide where to point it.
- The tools grade their own output. Diversity scores are self-assessed, not externally validated.
- All tests ran on Claude. Other models may handle the complex multi-step instructions differently.
- **Via MCP server:** lightweight. Tool descriptions cost ~1,500 tokens total. Each skill prompt loads only when called. **Via SKILL.md files:** the full set is ~49,000 tokens of system prompt. The minimum viable set is ~18,000 tokens. See [docs/for-humans.md](docs/for-humans.md) for the recommended starting configuration.

---

Built by [David Carson](https://github.com/d4vidc4rson) at [Paralogy](https://paralogy.ai).
