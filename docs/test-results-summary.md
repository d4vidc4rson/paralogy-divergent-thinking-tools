# Test Results Summary

## Ten pipeline tests across ten domains

Every test deployed all 15 tools in a full pipeline. Human decisions were simulated at interaction points by making choices a domain expert would plausibly make.

| Test | Domain | Special Condition | Final Clusters | AHC Grade | Gaps Remaining | Overall |
|------|--------|-------------------|----------------|-----------|----------------|---------|
| 1 | Hospital ED overcrowding | Baseline (pre-gap-fill) | 8 | B+ | 3 unfilled | **A-** |
| 2 | Recidivism reduction | + Gap-fill loop | 13 | A | 0 | **A** |
| 3 | College enrollment crisis | Human rejected WPD reframing | 13 | A | 0 | **A** |
| 4 | Transit + teacher shortage | Multi-problem (obvious connection) | 14 | A | 0 | **A** |
| 5 | Downtown vacancy + loneliness | Multi-problem (ambiguous connection) | 13 | A | 0 | **A** |
| 6 | Climate tech go-to-market | All updates verified | 9 | A | 0 | **A** |
| 7 | Premium product launch (marketing) | Full pipeline | 12 | A | 0 | **A** |
| 8 | Real-time route optimization (engineering) | Hard-constraint engineering domain | 11 | A- | 0 | **A-** |
| 9 | Dark matter detection strategy (physics) | Resource allocation under physical constraints | 10 | A- | 0 | **A-** |
| 10 | Neural network climate surrogate (applied math) | Mathematical architecture problem | 8 | A- | 0 | **A-** |

## What each test proved

**Test 1 (Hospital ED):** The pipeline works end-to-end. All 15 tools deployed. The Wrong Problem Detector reframed "ED throughput optimization" to "community healthcare access problem." But 3 critical blind spots (post-discharge, PCP integration, financial model) went unfilled because the gap-fill loop didn't exist yet.

**Test 2 (Recidivism):** The gap-fill loop works. Same pipeline quality as Test 1, but the three critical gaps identified by the audit were filled in one targeted loop. Grade jumped from A- to A.

**Test 3 (College Enrollment):** The pipeline is resilient to human rejection. The simulated president rejected the Wrong Problem Detector's reframing ("I can't tell my board the real problem isn't enrollment"). The pipeline continued on the original problem and compensated — the Dumb Questions Engine independently resurfaced the WPD's insights as questions, and the generation tools found revenue diversification ideas through the back door. Final grade: A, same as when the WPD was accepted.

**Test 4 (Transit + Schools):** The pipeline handles multi-problem scenarios. Two problems (transit collapse + teacher shortage) were brought simultaneously. The Wrong Problem Detector found a shared structural root (both institutions designed for a world that no longer exists). The pipeline merged them into one track and produced ideas that were transit-only, schools-only, AND genuinely integrated. The bus-fleet/school-transportation merger was the breakthrough: $900K in school bus contracts + 78% empty bus capacity = an obvious match nobody had made.

**Test 5 (Downtown + Loneliness):** The pipeline handles ambiguous multi-problem connections. Downtown vacancy and adult loneliness FEEL related but have partially independent causes. The triage correctly identified a partial shared root (loss of gathering infrastructure) and merged with domain tracks. Also exposed the need for a third triage option beyond merge/split.

**Test 6 (Climate Tech):** All updates verified. The Guilford Engine's 3-line format produced cleaner, more scannable output. The gap-fill loop worked. The router handled a single problem without friction.

**Test 7 (Premium Product Launch):** Full pipeline in a marketing domain. A DTC sparkling water brand launching into a saturated category at a 7x price premium. The pipeline produced 12 distinct clusters spanning placement, product, content, pricing, scarcity, subscription, community, press, gifting, and category creation. The Wrong Problem Detector reframed from "marketing strategy" to "category creation." Random Injection (mushroom) produced directly actionable ideas. Grade: A.

**Test 8 (Route Optimization — Engineering):** First test in a hard-constraint engineering domain. The WPD reframed "our solver is too slow" to "we have an architecture problem, not a solver problem" — 5/5 checks fired. The Persona Divergence Engine produced the test's most actionable ideas: an ex-competitor engineer revealing what "3-second re-optimization" actually means (greedy insertion at 18-25% suboptimal), and a dispatcher defining three acceptance tests that should drive the entire engineering effort. Random Injection (immune system) produced genuine structural transfers, not metaphors. Think Wrong and Short Think were less effective than in non-technical domains — they produced correct but unsurprising output for a technical audience. The tools work best at the architectural and framing level; they don't replace algorithmic expertise. Grade: A-.

**Test 9 (Dark Matter Detection — Physics):** The WPD reframed "we can't find WIMPs" to "you have a resource allocation problem, not a detector sensitivity problem." The Guilford Engine's portfolio idea — 5 small experiments covering 5 candidates for the cost of one €500M detector — is a genuinely fundable strategy. MacGyver Mode identified three near-zero-cost ideas (reanalyze existing data for non-WIMP signals, Gaia dark matter halo analysis, quantum sensor audit) that are the test's highest-ROI output. Think Wrong and Short Think showed the same pattern as engineering: correct but not novel to the field. The tools help physicists decide WHERE to point their expertise; the physics itself still requires physicists. Grade: A-.

**Test 10 (Neural Network Climate Surrogate — Applied Math):** The strongest technical test. The WPD reframed "the neural network violates constraints" to "the constraints aren't built into the architecture" — and Check 5 produced the residual learning idea, a real mathematical contribution. The Dumb Questions Engine produced the three specific architectural constraints that constitute the actual solution: conservation-by-residual (predict N-1 values, compute Nth as exact residual), monotonicity-by-cumulative-parameterization (softplus increments), and spectral-by-summation. The Persona Engine produced the most mathematically substantive contributions of any test — a POD/reduced basis expert, a physics-informed ML researcher naming specific literature, and a structure-preserving mathematician introducing port-Hamiltonian neural networks. Random Injection (thermostat) produced a specific O(N) correction algorithm, not a metaphor. Think Wrong argued "ML might be the wrong tool entirely — reduced basis methods solve this with guarantees NNs can't provide." The tools performed better here than on the engineering or physics tests because the problem's solution IS structural — moving constraints from the loss function to the network architecture is exactly the kind of reframing these tools do best. Grade: A- (borderline A).

## Control comparison (vanilla Claude vs. pipeline)

The same climate tech problem from Test 6 was given to vanilla Claude with no tools.

| Metric | Vanilla Claude | Pipeline |
|--------|---------------|----------|
| Distinct ideas | ~22 | ~65+ |
| Immediately actionable ideas | 3-4 | 8-10 |
| Problem reframed? | No | Yes — "customer-segment problem, not sales problem" |
| Buyer segments with specific entry points | 4 (generic) | 9+ (with specific programs, people, mechanisms) |
| Ideas from outside the problem frame | 0 | 4+ (from Bad on Purpose mining, Random Injection, deliberate reversal) |
| Self-audit of output quality | None | Full AHC + Blind Spot Scan + gap-fill |
| Organizational/operational ideas | 0 | 5+ (team reorg, manufacturing readiness) |

The pipeline and vanilla Claude overlapped on ~13 ideas (60% of vanilla's output appeared in both). The pipeline's genuine additions were: FEMA grantees with approved funding and no vendor, DOD DPA Title III procurement, the 8-hour system configuration insight for solar developers, storage-as-a-service model, and the complete problem reframing from "sell better to utilities" to "stop selling to utilities entirely."

Full comparison: [test-6-control-vanilla-vs-tools.md](../tests/test-6-control-vanilla-vs-tools.md)

## Key findings across all tests

1. **The Gap-Fill Loop was the biggest single improvement** (A- → A consistently after it was added)
2. **The Wrong Problem Detector reframing is valuable but not structurally required** — the pipeline compensates when the human rejects it
3. **Multi-problem triage needs three options** (full merge, merge with domain tracks, split) — not two
4. **Random Injection consistently produced the most "from outside the frame" ideas** — coral reef, mycelium, sourdough, campfire, dandelion, composting, tide pool all generated actionable transfers
5. **The Persona Divergence Engine produced the most specific, immediately actionable ideas** — Colonel Henderson (DOD budget), Elena Vasquez (FEMA grants), Priya Sundaram (8-hour interconnection), because constructed personas with real-world constraints produce real-world leads
6. **Every skill justified its existence** — no skill was unnecessary across 10 tests
7. **The tools work across technical domains but the value shifts** — strongest at structural/architectural reframing, weakest at derivation and proof. Three technical tests (engineering, physics, applied math) all scored A-. Think Wrong and Short Think were less effective in engineering and physics, but Think Wrong recovered in the math test where it argued "ML might be the wrong tool entirely"
8. **The tools perform best on technical problems whose answer is structural** — Test 10 (applied math) outperformed Tests 8 and 9 because the solution was an architectural change (move constraints from loss function to network structure), which is exactly the kind of reframing these tools do. When a technical problem has a structural answer, the tools find it
