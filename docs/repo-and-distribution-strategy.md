# Divergent Thinking Systems — Repo & Distribution Strategy

## One Repo

```
paralogy/divergent-thinking-tools/
│
├── README.md                          ← The front door (see below)
├── LICENSE
│
├── skills/                            ← The source of truth
│   ├── router/SKILL.md
│   ├── wrong-problem-detector/SKILL.md
│   ├── strip-down/SKILL.md
│   ├── blind-spot-scan/SKILL.md
│   ├── guilford-engine/SKILL.md
│   ├── persona-divergence-engine/SKILL.md
│   ├── short-think/SKILL.md
│   ├── bad-on-purpose/SKILL.md
│   ├── think-wrong/SKILL.md
│   ├── wild-to-mild/SKILL.md
│   ├── macgyver-mode/SKILL.md
│   ├── random-injection/SKILL.md
│   ├── dumb-questions-engine/SKILL.md
│   ├── anti-homogeneity-check/SKILL.md
│   ├── de-slop/SKILL.md
│   ├── strip-down-p/SKILL.md          ← Poetry variants
│   ├── guilford-engine-p/SKILL.md
│   └── think-wrong-p/SKILL.md
│
├── tests/                             ← The 7 pipeline tests
│   ├── test-1-hospital-ed.md
│   ├── test-2-recidivism.md
│   ├── test-3-enrollment-wpd-rejected.md
│   ├── test-4-museum-poetry-variants.md
│   ├── test-5-transit-schools-multi-problem.md
│   ├── test-6-downtown-loneliness-ambiguous.md
│   ├── test-7-climate-tech-verification.md
│   └── test-7-control-vanilla-vs-tools.md
│
├── docs/
│   ├── how-it-works.md                ← Deeper explanation of the pipeline
│   ├── for-agents.md                  ← The agentic architecture doc
│   ├── for-humans.md                  ← How to use as Claude/Cursor skills
│   └── test-results-summary.md        ← The cross-test comparison table
│
└── examples/                          ← Quick-start examples
    ├── single-problem.md              ← "Here's a problem, here's what the tools produce"
    └── multi-problem.md               ← "Here are two problems, here's what happens"
```

### Why this structure

**`skills/` is the source of truth.** Every SKILL.md file is both:
- A Claude/Cursor custom skill (drop it into your skills folder and it works)
- The specification for an agent integration (the logic is the same, the interface changes)

The SKILL.md files are the source of truth — they work both as Claude/Cursor custom skills (drop into your skills folder) and as the specification for agent integrations (same logic, different interface). Everything else is packaging.

**`tests/` is the proof.** Seven full pipeline tests across seven domains, with a vanilla-Claude control comparison. This is the thing that turns "we have divergent thinking tools" into "here's what they actually produce, and here's what you get without them." The tests are the sales pitch for anyone technical enough to read them.

**`docs/` separates the audiences** without separating the repo. A human user reads `for-humans.md`. A developer building agents reads `for-agents.md`. Both reference the same `skills/` directory.

**`examples/` is the 2-minute demo.** Someone lands on the repo, reads the README, and wants to see it work. The examples show a before/after in the smallest possible surface area.

---

## The README

This is the single most important file. It's the front door for everyone — humans, developers, agents, investors, journalists. It needs to do three things in under 60 seconds of reading:

1. **Name the problem** (AI output all sounds the same)
2. **Name the solution** (structured tools that force genuine divergence)
3. **Show the proof** (link to the tests, the control comparison, the results)

Here's a draft:

---

# Divergent Thinking Systems for Convergent Machines
### Unintelligent Tools for AI
#### A Paralogy Product

AI gives everyone the same ideas.

Doshi & Hauser proved it in *Science Advances* (2024): AI-assisted creative output is rated more creative individually but is significantly more similar collectively. Wenger & Kenett (2025) confirmed that LLMs produce ideas with 0.92 cosine similarity — even across different model families. Ten ideas from an AI brainstorm are usually three ideas wearing costumes.

These tools fix that.

**15 tools. 5 pipeline phases. A router. Quality gates. Gap-fill loops. Built for any problem in any domain.**

The system works as custom tools in Claude, Cursor, or any LLM that supports custom instructions. It also works as infrastructure layers inside agentic systems (multi-agent brainstorming, automated research, strategic decision systems).

### What they do

| Phase | Tools | What happens |
|-------|-------|-------------|
| **Explore** | Wrong Problem Detector, Dumb Questions Engine | Checks the problem before solving it |
| **Pre-generate** | Strip Down, Blind Spot Scan | Extracts the real desire, maps the full problem space |
| **Generate** | Guilford Engine, Persona Divergence Engine, Think Wrong, Short Think, Bad on Purpose, Wild to Mild, MacGyver Mode, Random Injection | 8 generation skills, each producing structurally different output |
| **Audit** | Anti-Homogeneity Check, Blind Spot Scan (post) | Diversity grade + coverage audit |
| **Gap-fill** | Router-directed targeted generation | Fills gaps instead of just pointing at them |

Plus De-Slop for humanizing the output and a Router that orchestrates the pipeline.

### Does it work?

We ran 7 full pipeline tests across 7 domains:

| Test | Domain | Result |
|------|--------|--------|
| Hospital ED overcrowding | Healthcare × policy × systems | A- (pre-gap-fill) |
| Recidivism reduction | Criminal justice × workforce × policy | A |
| College enrollment crisis | Higher ed × marketing × identity | A (WPD rejected by user — pipeline resilient) |
| Museum attendance collapse | Cultural institutions × community × science comm | A (poetry variants tested) |
| Transit + teacher shortage | Multi-problem: transportation × education | A (problems merged on shared root) |
| Downtown vacancy + loneliness | Multi-problem: urban econ × public health | A (ambiguous connection — triage tested) |
| Climate tech go-to-market | Startup × energy × hardware × venture | A (all updates verified) |

We also ran a control test: the same climate tech problem answered by vanilla Claude (no tools). The pipeline produced 65+ ideas including 15 that vanilla Claude didn't touch — FEMA grantees with approved funding and no vendor, DOD procurement programs nobody at the startup knew existed, and a complete reframing from "we can't sell to utilities" to "we're selling to the wrong buyer." The full comparison is in `tests/test-7-control-vanilla-vs-tools.md`.

### Quick start: Humans

1. Download the skills from `skills/`
2. Add them to your Claude Projects, Cursor, or any LLM custom skills
3. Describe your problem. The Router picks the right tool.
4. See `docs/for-humans.md` for details.

### Quick start: Agent developers

The same tools work as infrastructure inside agentic systems:

- **Objective Validator** (WPD + Strip Down) — checks goals before agents work on them
- **Task Decomposer** (Blind Spot Scan) — splits work by problem-space region, not subtask
- **Differentiation Layer** (Persona Divergence Engine) — makes multi-agent output actually diverse
- **Quality Gate** (Anti-Homogeneity Check) — rejects convergent output automatically
- **Gap-Fill Controller** (Router) — routes targeted re-generation into empty zones

See `docs/for-agents.md` for the full agentic architecture.

### The research

- Guilford, J.P. (1967). *The Nature of Human Intelligence.* The five-dimension framework.
- Ruan et al. (2026). LiveIdeaBench. *Nature Communications.* Validated the framework across 40+ LLMs and 22 scientific domains.
- Doshi & Hauser (2024). *Science Advances.* AI makes individuals more creative but makes everyone's output more similar.
- Wenger & Kenett (2025). LLMs show high creative homogeneity even across model families.

### About

Built by [David Carson](link) at [Paralogy](link). Part of the Dumbify universe of counterintuitive thinking.

---

## How People Access the Tools

### For humans (today — this is already working):

**Claude Skills:** Download the SKILL.md files, add to Claude Projects or Claude's custom skills feature. The Router handles orchestration. This is how you're using them now.

**Cursor / other dev tools:** Same SKILL.md files work as custom instructions in Cursor, Windsurf, or any tool that supports system prompts or skill files.

**Direct prompting:** For any LLM, you can paste a SKILL.md into the system prompt or conversation. It's not as elegant as the skills feature but it works.

The barrier to entry is: download files, add to your tool. No API key, no account, no integration. This is the adoption path that gets the most users fastest.

### For agents (next — this is the product opportunity):

Three paths, in order of build complexity:

**Path A: MCP Server (build this first)**

You already have the Dumbify MCP server running. The pattern is proven. Build a Paralogy MCP server that exposes each tool as an MCP tool:

```
Tools exposed:
- wrong_problem_detector(objective, context) → checks, rewrite, confidence
- strip_down(document) → desire_statement
- blind_spot_scan(desire, mode, existing_ideas) → map or gaps
- guilford_engine(desire, constraint) → ideas[]
- think_wrong(problem) → argument
- persona_divergence_engine(problem, n_personas) → persona_ideas[]
- anti_homogeneity_check(ideas) → grade, clusters, gaps
- gap_fill(gaps, desire, existing_ideas) → fill_ideas[]
- router(problem, context) → pipeline_plan
```

Any agent framework that supports MCP (Claude, Cursor, custom agents) can connect to this server and call the tools. The tools run on your server, the agent runs wherever it runs.

**Advantage:** Works with any MCP-compatible framework immediately. No SDK to maintain. The server is the product.

**Revenue:** Per-tool-call pricing. Every time an agent calls `anti_homogeneity_check`, that's a billable event.

**Path B: Python/TypeScript SDK (build after MCP)**

A library that wraps the MCP calls (or runs the tools locally) with a clean API:

```python
pip install paralogy
```

```python
from paralogy import Pipeline

pipeline = Pipeline(model="claude-sonnet-4-20250514")
result = pipeline.run(
    problem="Our app has low retention",
    skills=["wpd", "strip_down", "guilford", "ahc"],
    gap_fill=True
)

print(result.ideas)          # The ideas
print(result.ahc_grade)      # "A-"
print(result.clusters)       # Cluster analysis
print(result.gaps_filled)    # What the gap-fill loop added
```

**Advantage:** Developers can embed the tools directly in their code. Better DX than raw MCP calls. The SDK handles the pipeline orchestration (which skill runs when, the gap-fill loop, the audit).

**Revenue:** Metered API (the SDK calls the Paralogy API under the hood). Or open-source SDK + hosted API for the LLM calls.

**Path C: Hosted API (build last, or maybe never)**

A REST API that handles everything:

```
POST /v1/pipeline
{
  "problem": "Our app has low retention",
  "mode": "full",  // or "quick" for just WPD + Guilford
  "gap_fill": true
}
```

Returns the full pipeline output as structured JSON.

**Advantage:** Lowest friction for developers. No library installation. Just an API call.

**Disadvantage:** Highest build and ops burden. You're running infrastructure.

**Revenue:** Per-pipeline-run. Tiered by complexity (quick = $0.10, full = $1.00, multi-problem = $2.00).

### Recommendation: Build order

1. **Ship the GitHub repo with skills + tests + docs.** This is free, it's credible, it's shareable. The tests ARE the marketing. When someone reads the vanilla-vs-pipeline comparison, they get it. This costs you nothing except organizing what you already have.

2. **Build the MCP server.** You already know how (Dumbify MCP). Expose the tools as MCP tools. Claude users and agent developers can connect immediately. This is the fastest path to "agents use these tools."

3. **Build the SDK if demand warrants.** Once developers are calling the MCP tools and asking for a cleaner interface, build the SDK. Let demand drive this — don't build it speculatively.

4. **Don't build a hosted API unless you have to.** The MCP server and SDK can call the Anthropic API (or any LLM API) directly. You don't need to run inference infrastructure. Let Anthropic/OpenAI handle the compute.

---

## How to Communicate What These Tools Do

This is the hardest part. The headline does the heavy lifting:

**Divergent Thinking Systems for Convergent Machines**
*Unintelligent Tools for AI*

### The problem statement (lead with this)

**"Divergent Thinking Systems for Convergent Machines."**

That's the headline. It names the problem (convergent machines) and the solution (divergent thinking systems) in eight words. "Convergent machines" is a phrase that doesn't exist yet and sticks once you hear it.

### The tagline

**"Unintelligent Tools for AI."**

The Dumbify wink. Pairs with the headline without needing a subline between them.

### The proof statement

**"We tested it. 7 domains. 65+ ideas vs. 22 from vanilla Claude on the same problem. The pipeline found buyers the startup didn't know existed. Vanilla Claude produced a consulting memo."**

### Where to communicate

**The Dumbify ecosystem.** This IS a Dumbify idea — "the counterintuitive insight that making AI dumber (less convergent, less probable, less polished) makes it more useful." A Dumbify episode on AI convergence, with the tools as the product, is the most natural launch vehicle you have. The audience already trusts your voice and already buys the "dumb is smart" thesis.

**GitHub README.** The tests are the marketing. The vanilla-vs-pipeline comparison is the sales pitch. Technical people will read the tests and either believe or not — and the tests are strong.

**LinkedIn / professional audience.** The architecture doc (agentic infrastructure) speaks to the developer/enterprise audience. "Here's how your multi-agent system is producing 10 copies of the same idea, and here's the infrastructure layer that fixes it." This is a David Carson talk, not a blog post — you're the guy who advised Nike and Coca-Cola on counterintuitive thinking, and now you're applying it to AI systems.

**Anthropic / Claude ecosystem.** The tools are built for Claude skills. The MCP server runs on Claude. You're building inside Anthropic's ecosystem. A featured integration or case study from Anthropic would be the highest-leverage distribution event possible. The 7-test battery is the kind of rigorous evaluation that Anthropic's team would respect.

### What NOT to do

- Don't call it "AI creativity." Everyone claims that. It means nothing.
- Don't lead with the research citations. Lead with the problem and the proof. The research backs it up when someone asks "why does this work?"
- Don't build a landing page before shipping the repo. The repo IS the landing page for the people who matter first (developers, power users, agent builders). A marketing site comes after the product has users.
- Don't try to explain all 15 tools upfront. Lead with the pipeline (5 phases) and the result (7 tests, vanilla comparison). Let people discover individual tools after they're convinced the system works.

---

## The Narrative Arc

Here's how this story unfolds over time:

**Phase 1 (now):** Ship the GitHub repo. Skills + tests + docs. Free. The tests are the marketing. Early adopters are Claude power users and developers who read the tests and get it.

**Phase 2 (next month):** Build the MCP server. Agents can now call the tools. Announce via Dumbify (episode on AI convergence) and LinkedIn (agentic architecture post). Target: 50-100 GitHub stars, 10-20 MCP connections.

**Phase 3 (next quarter):** Dumbify episode on AI convergence becomes the canonical explanation. The vanilla-vs-pipeline comparison becomes the shareable artifact. Target: first developer integrations, first agent use cases, first "this changed how we brainstorm" testimonials.

**Phase 4 (6 months):** SDK if demand warrants. Enterprise conversations with companies running multi-agent systems. The Quality Gate (AHC) becomes the product that sells itself — "your agents are all producing the same output, and here's the grade to prove it."

**Phase 5 (year):** The tools are infrastructure. "We run Paralogy's quality gate on all our agent output" is a normal sentence in agent-heavy companies. The convergence problem is named (because Dumbify named it), and the tools are the standard solution.
