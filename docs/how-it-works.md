# How It Works

## The convergence problem

AI models predict the most probable next token. Probable is the enemy of original. When you ask an LLM to brainstorm, it produces the ideas that are most likely given its training data — which means the ideas that already exist, that have been written about most often, that represent the consensus of whatever field you're working in.

This isn't a failure of the model. It's working exactly as designed. But it means that every brainstorm, across every user, trends toward the same output. Doshi & Hauser (2024) measured this: AI-assisted creative output is rated more creative individually but is significantly more similar collectively. You get better ideas. Everyone gets the same better ideas.

The Divergent Thinking Tools are a structural intervention against this convergence.

## The pipeline

The system operates in seven phases. Not every problem needs all seven. The Router reads the situation and decides which phases to run.

### Phase 1: Exploration

Before generating any solutions, check whether you're solving the right problem.

**Wrong Problem Detector** runs five checks on the problem statement:
1. The Symptom Test — is this a symptom or a cause?
2. The Audience Test — whose problem is this actually?
3. The Verb Test — does the verb predetermine the solution type?
4. The Frame Test — is the opposite framing more true?
5. The Existence Test — what assumption creates this problem?

If any check fires, the WPD presents both the original and rewritten problem. The user chooses. If the user rejects the reframing, the pipeline continues on the original problem — it's resilient to this (tested in Test #3).

**Dumb Questions Engine** generates 15-20 questions nobody is asking about the problem, then stars the 3-5 most dangerous ones (the ones that make domain experts flinch). These become seeds for the generation phase.

### Phase 2: Pre-generation

**Strip Down** takes the user's brief — however long and detailed — and translates it into a desire statement: what the person behind this document actually wants to happen in the world, said in the bluntest possible human language. The desire statement becomes the generation seed. Everything downstream grows from it.

The user must confirm the desire statement. This is the most important interaction point in the pipeline. If the desire statement is wrong, everything downstream is wrong.

**Blind Spot Scan** (pre-generation mode) maps the full problem space across 4-5 dimensions, identifying every region where ideas should exist. This map becomes the coverage target for generation and the audit baseline for post-generation.

### Phase 3: Generation

The Router selects 1-8 generation tools depending on the problem's complexity. Each tool produces structurally different output:

- **Guilford Engine** — five internal passes (fluency, flexibility, originality, feasibility, clarity) producing 8-12 ideas with explicit feasibility tags. The user sees only the final output.
- **Persona Divergence Engine** — constructs 5 personas with conflicting worldviews (not job titles — actual value conflicts). Each generates independently. Output is not synthesized.
- **Think Wrong** — names the consensus answer, assumes it's wrong, builds a single continuous counterintuitive argument. Includes expert pushback.
- **Short Think** — 30+ gut-level ideas with zero deliberation. No preamble, no justification, no categories.
- **Bad on Purpose** — generates deliberately terrible ideas, then mines each for hidden value. Two phases, never combined.
- **Wild to Mild** — ideas at four altitude levels: Monday Morning, This Quarter, This Year, and Moonshot.
- **MacGyver Mode** — inventories only existing resources, then builds solutions from them. Zero new budget.
- **Random Injection** — injects a genuinely random word, studies it deeply, extracts structural principles, and transfers them to the problem. Mechanisms, not metaphors.

### Phase 4: Audit

**Anti-Homogeneity Check** clusters all generated ideas by underlying move (not surface description), assigns a letter grade (A through D), identifies overweight clusters, and diagnoses what's missing. This is the quality gate.

**Blind Spot Scan** (post-generation mode) maps all ideas onto the pre-generation problem space map and identifies empty zones — dimensions of the problem that zero ideas addressed.

### Phase 5: Gap-fill

If the audit finds critical gaps (Grade below B, or critical blind spots), the Router triggers targeted re-generation:

- Empty zone → Guilford Engine constrained to the gap
- Overweight cluster → Persona Divergence Engine with explicit exclusion of the overweight move
- Wrong altitude → Wild to Mild at only the missing altitudes
- Missing mechanism → MacGyver (tactical) or Random Injection (conceptual) or Bad on Purpose (territory too sensible to enter)
- Missing stakeholder → Persona Divergence Engine with the missing stakeholder on the panel

After gap-fill, the audit runs again (on new + surviving ideas only). Maximum two loops.

### Phase 6: Re-audit

Confirms the gaps were filled. If they were: present everything. If they weren't: present everything and flag what's still thin.

### Phase 7: Polish

**De-Slop** transforms the final output from AI-polished prose into authentic human voice. Kills the vocabulary ("leverage," "comprehensive," "landscape"), breaks the structure (no more neat tricolons), and adds the imperfections that make text sound like a person wrote it.

## Multi-problem triage

When a user brings two or more problems simultaneously, the Router runs a triage before anything else:

- **Full merge** — the problems share a cause, an audience, and a desire. They're one problem. One pipeline.
- **Merge with domain tracks** — the problems share a root but have different stakeholders. One pipeline, but ideas for each problem separately AND for their intersection. The audit checks within-domain diversity, not just aggregate diversity.
- **Split** — genuinely separate problems. Parallel pipelines with a cross-pollination scan at the end.

The Strip Down test determines the mode: can you write one desire statement? If yes and it feels unified → full merge. If yes but each stakeholder would hear different things in it → merge with domain tracks. If you need two separate statements → split.

## The research foundation

The system is grounded in J.P. Guilford's 1967 framework for divergent thinking, which identifies five dimensions: fluency, flexibility, originality, feasibility, and clarity. This framework was validated at scale by Ruan et al. (2026) in the LiveIdeaBench study, which tested 40+ language models across 22 scientific domains and found that reasoning ability and generative ability are independent capacities, and that chain-of-thought length has near-zero correlation with idea quality.

The Anti-Homogeneity Check uses the LiveIdeaBench fluency grading system (Grades A through D) adapted for full-set evaluation rather than adjacent-pair evaluation.

The Persona Divergence Engine is informed by Wenger & Kenett (2025), who showed that shallow role assignment doesn't produce genuine divergence — personas need conflicting values, methods, and blind spots to break the 0.92 cosine similarity trap.
