# Divergent Thinking Tools: Agentic Architecture
## How AI Agents Use the Toolkit as Infrastructure

### The Problem Agents Have

Every LLM-based agent has the same disease: convergence. When an agent receives a task, it produces the most probable output. When 10 agents receive the same task, they produce 10 copies of the most probable output. When 10,000 agent instances run simultaneously across an enterprise, they produce 10,000 copies of the same strategy, the same code, the same analysis, the same recommendation.

This isn't a bug in the agents. It's what they're optimized for. But it means that multi-agent systems, agentic workflows, and AI-assisted decision-making at scale have a hidden failure mode: they LOOK diverse (different agents, different prompts, different contexts) but they PRODUCE convergent output. The appearance of variety without the reality of it.

The Divergent Thinking Tools were built for this exact problem — originally for human-AI interaction, but the architecture maps directly to agentic infrastructure.

---

### Architecture Overview

The tools map to five layers of an agentic system:

| Layer | Role | Tools | What it replaces |
|-------|------|-------|-----------------|
| **1. Objective Validator** | Checks the goal before work begins | Wrong Problem Detector, Strip Down | Nothing — agents currently accept objectives uncritically |
| **2. Task Decomposer** | Splits work across agents by problem-space region | Blind Spot Scan, Dumb Questions Engine | Generic task splitting (by subtask, not by problem-space region) |
| **3. Differentiation Layer** | Ensures each generation agent is structurally different | Persona Divergence Engine, Think Wrong, Bad on Purpose, Random Injection, Short Think | Shallow role prompts ("you are the marketing expert") |
| **4. Quality Gate** | Rejects homogeneous output automatically | Anti-Homogeneity Check, Blind Spot Scan (post) | Nothing — most agent systems have no diversity audit |
| **5. Gap-Fill Controller** | Routes targeted re-generation into empty zones | Gap-Fill Loop (Router) | Nothing — agents generate once and stop |

Plus a formatting/output layer (De-Slop, Guilford formatting) that handles delivery.

---

### Layer 1: Objective Validator

**What it does:** Before any agent begins work on a goal, the Objective Validator runs the Wrong Problem Detector's five checks on the goal itself. This is the single most important layer — and the one that doesn't exist anywhere in current agentic frameworks.

**Why agents need this more than humans:**
When a human receives a bad goal, they sometimes feel it. "This doesn't seem right." They push back. They reinterpret. They bring their own judgment.

An agent doesn't feel anything. It optimizes whatever objective it receives. If a product agent is told "increase signups," it increases signups — even if the real metric is activation. If a research agent is told "find compounds that inhibit protein X," it searches for inhibitors — even if protein X isn't the right target. If a strategy agent is told "grow enrollment to 1,600," it generates enrollment growth strategies — even if the college's survival depends on revenue per student, not headcount.

The WPD is the structural check on the objective function itself.

**Technical integration:**

```
BEFORE any agent begins work:

1. Run WPD.symptom_test(objective)
   → Is this a symptom or a cause?
   → If symptom: extract the cause, flag the rewrite

2. Run WPD.audience_test(objective)
   → Whose problem is this?
   → If mismatch: flag that the stated audience
     and the affected audience are different

3. Run WPD.verb_test(objective)
   → What verb constrains the solution space?
   → Generate 3 alternative verbs, flag if any
     opens a more productive solution space

4. Run WPD.frame_test(objective)
   → Invert the problem statement
   → If the inversion feels more true: flag

5. Run WPD.existence_test(objective)
   → What assumption creates this problem?
   → If the problem disappears when the assumption
     is removed: flag

IF any check fires:
  → Present the rewritten objective alongside the original
  → If human-in-the-loop: let them choose
  → If fully autonomous: proceed with the rewrite
    but log the original for audit
  → If >3 checks fire: HALT and request human review
    (high confidence the objective is wrong)

THEN: Run Strip Down on the confirmed objective
  → Extract the desire statement
  → This becomes the generation seed for all downstream agents
```

**What this replaces:** Nothing. Current agentic frameworks (AutoGPT, CrewAI, LangGraph, etc.) accept objectives at face value. The Objective Validator is a new layer that doesn't exist in the current stack.

**Key design decision — autonomous vs. human-in-the-loop:**

The WPD in human interaction requires a human to choose between the original and rewritten problem. In a fully autonomous agent, three options:

- **Conservative:** Always halt and request human review when any WPD check fires. Safest but slowest.
- **Moderate:** If 1-2 checks fire, proceed with the rewrite but log it. If 3+ fire, halt for human review.
- **Aggressive:** Always proceed with the rewrite. Log the original. Risk: the rewrite might be wrong, and the agent builds an entire strategy on a bad foundation.

Recommendation: **Moderate.** The WPD is good but not infallible. When 3+ checks fire, the confidence that the objective is wrong is high enough to pause. When only 1-2 fire, the rewrite is usually an improvement and the autonomous path is safe.

---

### Layer 2: Task Decomposer

**What it does:** Instead of splitting a problem into subtasks (the standard agentic approach), the Blind Spot Scan maps the full problem space into dimensions and regions. The orchestrator then assigns different REGIONS to different generation agents, ensuring coverage of the entire problem space.

**Why this is better than standard task splitting:**

Standard approach: "Agent 1, research the market. Agent 2, generate product ideas. Agent 3, evaluate feasibility."
Problem: All three agents operate on the same understanding of the problem and produce convergent output within their lane.

Blind Spot Scan approach: "The problem space has 5 dimensions with 4-8 items each. Agent 1 is assigned Dimension 1 (stakeholders) items 3-5 and Dimension 3 (mechanisms) items 1-3. Agent 2 is assigned Dimension 1 items 1-2 and Dimension 4 (time horizon) items 3-4. Etc."

Each agent generates ideas in a different REGION of the problem space, not a different phase of the workflow. The output is diverse by construction because the inputs are non-overlapping.

**Technical integration:**

```
AFTER Objective Validator confirms the goal:

1. Run Blind Spot Scan in pre-generation mode
   → Produces a problem space map with N dimensions
   → Each dimension has M items
   → Total problem space = N × M cells

2. The Dumb Questions Engine generates 15-20 questions
   about the problem
   → Star the 3-5 most dangerous
   → These become additional constraints/seeds
     for generation agents

3. Orchestrator assigns regions to agents:
   → Each agent gets a REGION of the map
     (specific dimensions + items to cover)
   → Each agent also gets 1-2 starred questions
     as generative seeds
   → Regions should overlap slightly (10-20%)
     to allow natural cross-pollination
   → No region should exceed 30% of the total map
     (prevents any single agent from dominating)

4. Assignment algorithm:
   FOR each agent in the pool:
     agent.region = select_region(
       problem_map,
       exclude=already_assigned_regions,
       overlap_tolerance=0.15
     )
     agent.seeds = select_questions(
       starred_questions,
       relevant_to=agent.region
     )
     agent.constraint = (
       "Generate ideas that address {agent.region}."
       "Do not generate ideas for {other_agents_regions}."
     )
```

**What this replaces:** Generic task decomposition (splitting by workflow phase). The Blind Spot Scan produces a COVERAGE map, not a WORKFLOW map. The difference is that coverage-based decomposition prevents the situation where 4 agents all generate ideas in the same region of the problem space.

---

### Layer 3: Differentiation Layer

**What it does:** Ensures that each generation agent is structurally different — not just prompted differently, but operating from a fundamentally different set of assumptions, values, and first instincts.

**The convergence problem in multi-agent systems:**

Current multi-agent frameworks differentiate agents with role prompts:
- "You are the marketing strategist."
- "You are the engineering lead."
- "You are the devil's advocate."

This produces shallow differentiation. Wenger & Kenett (2025) showed that LLMs given different role prompts still produce output with 0.85+ cosine similarity. The roles are costumes. The underlying distribution is the same.

The Persona Divergence Engine produces deep differentiation: conflicting values, conflicting aesthetics, conflicting methods, and specific biases and blind spots. The 0.92 similarity drops to 0.20 with properly constructed personas.

**Technical integration — per-agent configuration:**

```
FOR each generation agent:

  1. PERSONA (via Persona Divergence Engine):
     Construct a full persona with:
     - Core value (what this agent optimizes for)
     - Aesthetic (what "good" looks like to this agent)
     - Method (how this agent approaches problems)
     - Blind spot (what this agent systematically ignores)
     - Adversary (which other agent this one disagrees with)

     Example for a 4-agent system:
     Agent 1: Values speed. Aesthetic: minimal. Method: cut scope.
              Blind spot: quality. Adversary: Agent 4.
     Agent 2: Values elegance. Aesthetic: systematic. Method: frameworks.
              Blind spot: urgency. Adversary: Agent 3.
     Agent 3: Values users. Aesthetic: human-centered. Method: empathy.
              Blind spot: economics. Adversary: Agent 2.
     Agent 4: Values rigor. Aesthetic: evidence-based. Method: data.
              Blind spot: creativity. Adversary: Agent 1.

  2. GENERATION SKILL MIX (per-agent):
     Not every agent runs every skill.
     Assign different generation skills to different agents
     to produce structurally different output types:

     Agent 1: Guilford Engine (structured divergence)
     Agent 2: Think Wrong (counterintuitive single argument)
     Agent 3: Short Think (high-volume raw ideas)
     Agent 4: Bad on Purpose → mine for value

     One agent in the pool should always run
     Random Injection — this is the chaos agent
     whose output can't be predicted from the others.

  3. REGION CONSTRAINT (from Layer 2):
     Each agent generates within its assigned region
     of the problem space map.

  4. ISOLATION:
     Agents generate independently.
     No agent sees another agent's output during generation.
     Cross-pollination happens AFTER generation,
     at the audit layer.
     This prevents the convergence that occurs
     when agents read each other's work
     and unconsciously align.
```

**What this replaces:** Shallow role prompts in multi-agent systems. The Persona Divergence Engine + skill assignment produces agents that are structurally incapable of converging, because they have different values, different methods, and different generation mechanisms.

---

### Layer 4: Quality Gate

**What it does:** After all generation agents produce output, the Quality Gate runs the Anti-Homogeneity Check on the combined pool and the Blind Spot Scan on the combined coverage. If the output fails either check, it's rejected and regeneration is triggered.

**This is the layer most agentic systems are missing.**

Current agent systems have evaluation steps — "does the output satisfy the goal?" But they don't have DIVERSITY evaluation — "is the output actually different from what every other agent produced?" A multi-agent brainstorm can score 10/10 on goal satisfaction while producing 10 identical ideas, and no current system catches this.

**Technical integration:**

```
AFTER all generation agents complete:

1. Collect all ideas from all agents into a single pool

2. Run Anti-Homogeneity Check:
   → Cluster by underlying move (not surface description)
   → Grade: A (5+ clusters, none >30%) through
             D (1-2 clusters, monoculture)
   → ALSO cluster within each agent's output
     (catch agents that were supposed to be different
      but converged anyway)

3. Run Blind Spot Scan (post-generation):
   → Map all ideas onto the pre-generation problem space map
   → Identify empty zones (dimensions × items with zero ideas)
   → Identify thin zones (1 idea where 3+ were expected)

4. GATE DECISION:

   IF AHC grade >= B AND no critical blind spots:
     → PASS. Proceed to Gap-Fill or Output.

   IF AHC grade = C:
     → CONDITIONAL FAIL.
     → Identify the overweight cluster.
     → Re-run generation with 1-2 agents,
       explicitly excluding the overweight move.
     → Re-check after regeneration.
     → Maximum 2 re-runs. Then pass with warning.

   IF AHC grade = D:
     → HARD FAIL.
     → The Persona Divergence Engine failed
       to produce genuine differentiation.
     → Reconstruct personas with more extreme
       value conflicts and regenerate entirely.
     → If second attempt also grades D:
       HALT and flag for human review.

   IF critical blind spots found:
     → Route to Gap-Fill Controller (Layer 5)
```

**Integration with CI/CD and automated pipelines:**

The Quality Gate can be integrated as a step in any automated pipeline. The output is a structured grade:

```json
{
  "ahc_grade": "B+",
  "cluster_count": 8,
  "overweight_cluster": "demand_shaping",
  "overweight_percentage": 0.28,
  "blind_spots": [
    {"dimension": "stakeholders", "item": "families", "ideas": 0},
    {"dimension": "mechanism", "item": "financial_model", "ideas": 1}
  ],
  "within_domain_diversity": {
    "transit": "A-",
    "education": "B"
  },
  "gate_decision": "CONDITIONAL_PASS",
  "action": "gap_fill_required",
  "gap_fill_targets": ["families", "financial_model"]
}
```

This is machine-readable. An orchestrator agent can consume it and make routing decisions automatically.

---

### Layer 5: Gap-Fill Controller

**What it does:** When the Quality Gate identifies gaps, the Gap-Fill Controller determines which generation skill to run, with what constraint, targeting which empty zone — and triggers a targeted re-generation pass.

**This is native agentic control flow.** Agents already work in loops. The Gap-Fill Controller is a specific loop policy:

```
WHEN Quality Gate returns gap_fill_required:

1. Parse the gap targets from the gate output

2. FOR each gap target:

   MATCH gap_type:

     "empty_zone":
       → Route to Guilford Engine agent
       → Constraint: "Generate ideas that address
         {gap_target} and nothing else."
       → The constraint pins generation to the gap
         and prevents drift back to the gravity well.

     "overweight_cluster":
       → Cull the overweight cluster to top 2-3 ideas
       → Route to Persona Divergence Engine agent
       → Exclusion: "Do not generate ideas that
         {describe_overweight_move}."

     "altitude_gap" (all safe or all moonshots):
       → Route to Wild to Mild agent
       → Constraint: only the missing altitudes

     "missing_mechanism":
       → Route to MacGyver Mode agent (tactical gap)
       → Or Random Injection agent (conceptual gap)
       → Or Bad on Purpose agent (territory too
         sensible to enter)

     "missing_stakeholder":
       → Route to Persona Divergence Engine agent
       → Construct persona from the missing
         stakeholder's worldview

3. AFTER gap-fill generation:
   → Run Quality Gate again (Layer 4)
   → But ONLY on new ideas + surviving originals
   → Don't re-audit the entire original pool

4. LOOP LIMIT: Maximum 2 gap-fill cycles
   → After 2: present what exists + flag remaining gaps
   → Diminishing returns after 2 passes
```

**What this replaces:** Nothing. Current agent systems generate once and stop, or regenerate the entire output if it fails evaluation. The Gap-Fill Controller does TARGETED regeneration — it knows WHAT is missing and routes to the specific skill that fills THAT gap. This is dramatically more efficient than blind regeneration.

---

### Putting It All Together: Control Flow

```
User/System → OBJECTIVE

  ┌─────────────────────────────────────┐
  │ Layer 1: Objective Validator         │
  │ WPD(objective) → desire_statement   │
  │ IF 3+ checks fire → HALT for human  │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │ Layer 2: Task Decomposer            │
  │ BSS(desire) → problem_space_map     │
  │ DQE(desire) → starred_questions     │
  │ Assign regions to N agents          │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │ Layer 3: Differentiated Generation  │
  │ N agents, each with:               │
  │   - Unique persona (PDE)           │
  │   - Assigned region (BSS)          │
  │   - Assigned skill (GE/TW/ST/BOP)  │
  │   - Isolation (no cross-reading)   │
  │ → Combined idea pool               │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │ Layer 4: Quality Gate               │
  │ AHC(pool) → grade + clusters       │
  │ BSS(pool, map) → gaps              │
  │ IF grade >= B AND no critical gaps  │◄──┐
  │   → PASS                           │   │
  │ ELSE                               │   │
  │   → Route to Layer 5               │   │
  └──────────────┬──────────────────────┘   │
                 ▼                          │
  ┌─────────────────────────────────────┐   │
  │ Layer 5: Gap-Fill Controller        │   │
  │ Parse gaps → select skill → run     │   │
  │ Targeted generation into gaps       │───┘
  │ Max 2 loops                         │
  └──────────────┬──────────────────────┘
                 ▼
  ┌─────────────────────────────────────┐
  │ Output: De-Slop + format            │
  │ → Diverse, audited, complete output │
  └─────────────────────────────────────┘
```

---

### Future Implementation Paths

> **Note:** The approaches below are planned, not yet shipped. The pseudocode and schemas are illustrative — they show what integration would look like, not working APIs you can call today. Today, the tools exist as SKILL.md files you can use directly with Claude or any LLM that supports custom instructions. See [for-humans.md](for-humans.md) for current usage.

**Approach 1: SDK / Library**

The tools would become functions in a Python/TypeScript library that agent frameworks call:

```python
from paralogy import (
    wrong_problem_detector,
    strip_down,
    blind_spot_scan,
    guilford_engine,
    persona_divergence_engine,
    anti_homogeneity_check,
    gap_fill_controller
)

# Layer 1
wpd_result = wrong_problem_detector(objective)
if wpd_result.checks_fired >= 3:
    raise HumanReviewRequired(wpd_result)
desire = strip_down(wpd_result.confirmed_objective)

# Layer 2
problem_map = blind_spot_scan(desire, mode="pre")
questions = dumb_questions_engine(desire)
agent_assignments = decompose(problem_map, questions, n_agents=4)

# Layer 3
ideas = []
for assignment in agent_assignments:
    persona = persona_divergence_engine.build_persona(
        values=assignment.values,
        blind_spot=assignment.blind_spot
    )
    agent_ideas = assignment.skill.run(
        desire=desire,
        persona=persona,
        region=assignment.region,
        seeds=assignment.questions
    )
    ideas.extend(agent_ideas)

# Layer 4
audit = anti_homogeneity_check(ideas)
gaps = blind_spot_scan(ideas, problem_map, mode="post")

# Layer 5
if audit.grade < "B" or gaps.critical:
    for gap in gaps.critical:
        fill_ideas = gap_fill_controller.fill(
            gap=gap,
            desire=desire,
            existing_ideas=ideas
        )
        ideas.extend(fill_ideas)
    # Re-audit
    audit = anti_homogeneity_check(ideas)
```

**Approach 2: MCP Server**

The tools would run as an MCP (Model Context Protocol) server that any agent framework can connect to. Each tool would be an MCP tool:

```json
{
  "tools": [
    {
      "name": "wrong_problem_detector",
      "description": "Runs 5 checks on an objective. Returns fired_checks, rewritten_objective, confidence.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "objective": {"type": "string"},
          "context": {"type": "string"}
        }
      }
    },
    {
      "name": "anti_homogeneity_check",
      "description": "Audits a set of ideas for genuine diversity. Returns grade, clusters, gaps.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "ideas": {"type": "array", "items": {"type": "string"}},
          "domain_labels": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    {
      "name": "blind_spot_scan",
      "description": "Maps full problem space (pre-gen) or identifies coverage gaps (post-gen).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "desire_statement": {"type": "string"},
          "mode": {"enum": ["pre", "post"]},
          "existing_ideas": {"type": "array", "items": {"type": "string"}}
        }
      }
    }
  ]
}
```

This approach would let any framework (CrewAI, LangGraph, AutoGPT, custom) call the tools without embedding them. The MCP server would handle the LLM calls internally. The agent framework would handle orchestration.

**Approach 3: Orchestrator Agent**

The Router itself could become an orchestrator agent. Instead of a human invoking skills, an orchestrator agent would read the Router's instructions and make routing decisions:

- Receives the objective
- Runs the Multi-Problem Triage (merge/split/track)
- Runs the WPD
- Runs Strip Down
- Decomposes via Blind Spot Scan
- Spawns generation sub-agents with Persona Divergence Engine configurations
- Collects output
- Runs the Quality Gate
- Triggers Gap-Fill if needed
- Formats and delivers

In this model, the Router SKILL.md becomes the orchestrator's system prompt. The other skills become the sub-agents' system prompts. The pipeline runs autonomously.

---

### Use Case Architectures

**1. Research Hypothesis Agent**

A research lab uses an agent to generate hypotheses for a new investigation.

```
Objective: "Identify novel approaches to treating glioblastoma recurrence"

Layer 1 (Objective Validator):
  WPD fires on symptom test: "recurrence" is the symptom,
  "tumor cell dormancy escape" is the cause.
  Strip Down: "Find the mechanism that lets glioblastoma cells
  hide from treatment and wake up after therapy stops."

Layer 2 (Task Decomposer):
  BSS maps: molecular mechanisms, immune evasion,
  tumor microenvironment, metabolic reprogramming,
  dormancy biology, drug delivery, biomarker development

Layer 3 (Differentiated Generation):
  Agent 1 (Guilford, molecular biology persona):
    generates hypotheses about specific molecular pathways
  Agent 2 (Think Wrong, immunology persona):
    generates the counterintuitive argument —
    "stop trying to kill the tumor"
  Agent 3 (Random Injection, ecology persona):
    injects a random concept and finds structural
    parallels with tumor biology
  Agent 4 (Short Think, computational biology persona):
    rapid-fires 30 hypothesis fragments

Layer 4 (Quality Gate):
  AHC clusters the hypotheses.
  BSS identifies: no hypotheses address the
  tumor microenvironment's role in dormancy.

Layer 5 (Gap-Fill):
  Guilford Engine targeted at microenvironment.
  3 new hypotheses generated. Re-audit passes.

Output: 12-15 genuinely different research hypotheses
  spanning molecular, immune, metabolic, microenvironment,
  and computational approaches — with feasibility tags
  and the default hypothesis (what every other lab
  is already pursuing) named explicitly.
```

**2. Product Strategy Multi-Agent System**

A product team uses a multi-agent system to generate feature strategies for a SaaS platform.

```
Objective: "Generate feature ideas for Q3 that increase retention"

Layer 1:
  WPD: "increase retention" may be the wrong verb.
  What if the problem is "decrease the reasons to leave"?
  Strip Down: "Figure out why people stop using this
  and remove those reasons, rather than adding more
  features they'll also stop using."

Layer 2:
  BSS maps: churn reasons (onboarding failure, feature
  confusion, competitor switch, price sensitivity,
  workflow mismatch, integration gaps, support friction)

Layer 3:
  5 agents, each with a different user persona
  (power user, new user, churned user, admin buyer,
  end user who didn't choose the product)
  Each assigned to different churn-reason regions.

Layer 4:
  AHC catches that 3 of 5 agents produced
  "add more dashboard features" — Grade C on that cluster.

Layer 5:
  Gap-fill: Persona Engine with the CHURNED USER
  as the primary persona, explicitly excluding
  "add more features" as a move.
  Produces ideas about removing complexity,
  improving onboarding, and fixing integrations.

Output: Feature strategy that addresses 7 different
  churn reasons instead of 7 variations on "more features."
```

**3. Strategic Decision Debate System**

An executive team uses a multi-agent debate system to evaluate a major strategic decision (M&A, market entry, product pivot).

```
Objective: "Should we acquire Company X?"

Layer 1:
  WPD: "Should we acquire" assumes acquisition is
  the right verb. What about "partner with,"
  "compete against," "ignore," or "build internally"?
  Rewrite: "What is the right relationship with
  Company X's capabilities?"

Layer 2:
  BSS maps: financial impact, cultural fit,
  technology integration, competitive dynamics,
  customer overlap, talent retention, regulatory risk,
  opportunity cost

Layer 3:
  5 debate agents, each with an extreme persona:
  Agent 1: The Acquirer (values growth, blind spot: integration cost)
  Agent 2: The Builder (values independence, blind spot: speed)
  Agent 3: The CFO (values returns, blind spot: strategic vision)
  Agent 4: The Employee (values culture, blind spot: market pressure)
  Agent 5: The Customer (values continuity, blind spot: company needs)

  Each makes the strongest possible case for their position.
  Isolation: they don't read each other during generation.

Layer 4:
  AHC checks whether the debate is real or performative.
  If 4 of 5 agents converge on "acquire" — the debate
  is fake. Grade C.
  BSS checks: did anyone address regulatory risk?
  Talent retention? Cultural integration?

Layer 5:
  Gap-fill: Bad on Purpose generates the case for
  "walk away entirely." Random Injection introduces
  an unexpected frame.

Output: A genuine multi-perspective analysis
  where each position is argued by an agent that
  truly believes it — not a faux debate where
  all agents politely agree.
```

---

### What This Doesn't Replace

The tools don't replace the agent's core capabilities — reasoning, retrieval, code generation, tool use. They operate on top of those capabilities as a control layer and quality layer.

- **Retrieval:** Agents still need RAG, web search, and database access. The tools operate on what the agent DOES with retrieved information, not on the retrieval itself.
- **Reasoning:** Chain-of-thought, tool use, planning — all still needed. The tools specifically address GENERATION (producing ideas, strategies, hypotheses) not ANALYSIS (evaluating, calculating, comparing).
- **Execution:** Agents that write code, send emails, manage workflows — those actions happen AFTER the divergent thinking pipeline produces the strategy. The tools produce the WHAT. The agent executes the HOW.

The tools are not a replacement for agents. They are the layer that prevents agents from being 10,000 copies of the same brain.
