# Divergent Thinking Systems for Convergent Machines
### Unintelligent Tools for AI
#### A [Paralogy](https://paralogy.ai) Product

AI gives everyone the same ideas.

Doshi & Hauser proved it in *Science Advances* (2024): AI-assisted creative output is rated more creative individually but is significantly more similar collectively. Wenger & Kenett (2025) confirmed that LLMs produce ideas with 0.92 cosine similarity — even across different model families. Ten ideas from an AI brainstorm are usually three ideas wearing costumes.

These tools fix that.

**15 tools. A router. Quality gates. Gap-fill loops. Multi-problem triage. Built for any problem in any domain.**

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

We ran 11 full pipeline tests across 11 domains, plus a control test (same problem, vanilla Claude, no tools):

| Test | Domain | Special condition | Grade |
|------|--------|-------------------|-------|
| [1](tests/test-1-hospital-ed.md) | Hospital ED overcrowding | Baseline | A- |
| [2](tests/test-2-recidivism.md) | Recidivism reduction | + Gap-fill loop | A |
| [3](tests/test-3-enrollment-wpd-rejected.md) | College enrollment crisis | Human rejected the reframing | A |
| [4](tests/test-4-museum-poetry-variants.md) | Museum attendance collapse | Poetry variants tested | A |
| [5](tests/test-5-transit-schools-multi-problem.md) | Transit + teacher shortage | Multi-problem merge | A |
| [6](tests/test-6-downtown-loneliness-ambiguous.md) | Downtown vacancy + loneliness | Ambiguous multi-problem | A |
| [7](tests/test-7-climate-tech-verification.md) | Climate tech go-to-market | All updates verified | A |
| [8](tests/test-8-marketing-premium-launch.md) | Premium product launch in saturated category | Marketing domain | A |
| [9](tests/test-9-engineering-route-optimization.md) | Real-time route optimization (engineering) | Hard-constraint engineering domain | A- |
| [10](tests/test-10-physics-dark-matter.md) | Dark matter detection strategy (physics) | Resource allocation under physical constraints | A- |
| [11](tests/test-11-applied-math-climate-ml.md) | Neural network climate surrogate (applied math) | Mathematical architecture problem | A- |

**The control comparison:** We ran the same climate tech problem through vanilla Claude (no tools). The pipeline produced 65+ ideas including 15 that vanilla Claude didn't touch — FEMA grantees with approved funding and no vendor, DOD procurement programs nobody at the startup knew existed, and a complete reframing from "we can't sell to utilities" to "we're selling to the wrong buyer." Full comparison: [test-7-control-vanilla-vs-tools.md](tests/test-7-control-vanilla-vs-tools.md).

---

## Quick start

### For humans

1. Download the `skills/` directory
2. Add the SKILL.md files to your Claude Projects, Cursor, or any LLM custom instructions
3. Describe your problem. The Router handles the rest.

See [docs/for-humans.md](docs/for-humans.md) for details.

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

**Poetry variants** (same instructions, different register):
- **Strip Down-P**, **Guilford Engine-P**, **Think Wrong-P**

---

## The research

- Guilford, J.P. (1967). *The Nature of Human Intelligence.* The five-dimension divergent thinking framework.
- Ruan et al. (2026). LiveIdeaBench. *Nature Communications.* Validated the framework across 40+ LLMs and 22 scientific domains.
- Doshi & Hauser (2024). *Science Advances.* AI makes individuals more creative but makes everyone's output more similar.
- Wenger & Kenett (2025). LLMs show high creative homogeneity (0.92 cosine similarity) even across model families.

---

## Limitations

- Tested across 11 domains including 3 technical (engineering, physics, applied math) — all scored A or A-. In technical domains, the tools are strongest when the answer is a structural or architectural change and weakest when the answer is a derivation or proof. Notably, the applied math test (Test 11) performed better than expected because the problem's solution WAS structural — the tools produced specific, implementable mathematical modifications (constraint-by-construction output layers, correction algorithms with O(N) complexity), not hand-waving. The tools don't replace domain expertise, but they help experts decide where to point it.
- The tools grade their own output. AHC diversity scores are self-assessed, not externally validated.
- All tests ran on Claude. Other models may handle the complex multi-step instructions differently.
- The full pipeline uses significant context window space. All 18 skills total ~58,000 tokens of system prompt. The minimum viable set (Router + Wrong Problem Detector + Strip Down + Guilford Engine + Anti-Homogeneity Check) is ~18,000 tokens — fits comfortably in Claude's 200K context with plenty of room for conversation. See [for-humans.md](docs/for-humans.md) for the recommended starting configuration.

---

## About

Built by [David Carson](https://www.linkedin.com/in/davidcarson/) at [Paralogy](https://paralogy.ai).
