# Test Results Summary

## Eight pipeline tests across eight domains

Every test deployed all 15 tools in a full pipeline. Human decisions were simulated at interaction points by making choices a domain expert would plausibly make.

| Test | Domain | Special Condition | Final Clusters | AHC Grade | Gaps Remaining | Overall |
|------|--------|-------------------|----------------|-----------|----------------|---------|
| 1 | Hospital ED overcrowding | Baseline (pre-gap-fill) | 8 | B+ | 3 unfilled | **A-** |
| 2 | Recidivism reduction | + Gap-fill loop | 13 | A | 0 | **A** |
| 3 | College enrollment crisis | Human rejected WPD reframing | 13 | A | 0 | **A** |
| 4 | Natural history museum | Poetry variants (-p) | 14 | A | 0 | **A** |
| 5 | Transit + teacher shortage | Multi-problem (obvious connection) | 14 | A | 0 | **A** |
| 6 | Downtown vacancy + loneliness | Multi-problem (ambiguous connection) | 13 | A | 0 | **A** |
| 7 | Climate tech go-to-market | All updates verified | 9 | A | 0 | **A** |
| 8 | Premium product launch (marketing) | Full pipeline | 12 | A | 0 | **A** |

## What each test proved

**Test 1 (Hospital ED):** The pipeline works end-to-end. All 15 tools deployed. The Wrong Problem Detector reframed "ED throughput optimization" to "community healthcare access problem." But 3 critical blind spots (post-discharge, PCP integration, financial model) went unfilled because the gap-fill loop didn't exist yet.

**Test 2 (Recidivism):** The gap-fill loop works. Same pipeline quality as Test 1, but the three critical gaps identified by the audit were filled in one targeted loop. Grade jumped from A- to A.

**Test 3 (College Enrollment):** The pipeline is resilient to human rejection. The simulated president rejected the Wrong Problem Detector's reframing ("I can't tell my board the real problem isn't enrollment"). The pipeline continued on the original problem and compensated — the Dumb Questions Engine independently resurfaced the WPD's insights as questions, and the generation tools found revenue diversification ideas through the back door. Final grade: A, same as when the WPD was accepted.

**Test 4 (Museum):** Poetry variants produce comparable output. Strip Down-P has a slightly more lyrical register. Guilford Engine-P has better output formatting (the 3-line format was backported to the prose version). Think Wrong-P produces identical functional output. The -P variants are a stylistic option, not a quality tier.

**Test 5 (Transit + Schools):** The pipeline handles multi-problem scenarios. Two problems (transit collapse + teacher shortage) were brought simultaneously. The Wrong Problem Detector found a shared structural root (both institutions designed for a world that no longer exists). The pipeline merged them into one track and produced ideas that were transit-only, schools-only, AND genuinely integrated. The bus-fleet/school-transportation merger was the breakthrough: $900K in school bus contracts + 78% empty bus capacity = an obvious match nobody had made.

**Test 6 (Downtown + Loneliness):** The pipeline handles ambiguous multi-problem connections. Downtown vacancy and adult loneliness FEEL related but have partially independent causes. The triage correctly identified a partial shared root (loss of gathering infrastructure) and merged with domain tracks. Also exposed the need for a third triage option beyond merge/split.

**Test 7 (Climate Tech):** All updates verified. The Guilford Engine's 3-line format produced cleaner, more scannable output. The gap-fill loop worked. The router handled a single problem without friction.

**Test 8 (Premium Product Launch):** Full pipeline in a marketing domain. A DTC sparkling water brand launching into a saturated category at a 7x price premium. The pipeline produced 12 distinct clusters spanning placement, product, content, pricing, scarcity, subscription, community, press, gifting, and category creation. The Wrong Problem Detector reframed from "marketing strategy" to "category creation." Random Injection (mushroom) produced directly actionable ideas. Grade: A.

## Control comparison (vanilla Claude vs. pipeline)

The same climate tech problem from Test 7 was given to vanilla Claude with no tools.

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

Full comparison: [test-7-control-vanilla-vs-tools.md](../tests/test-7-control-vanilla-vs-tools.md)

## Key findings across all tests

1. **The Gap-Fill Loop was the biggest single improvement** (A- → A consistently after it was added)
2. **The Wrong Problem Detector reframing is valuable but not structurally required** — the pipeline compensates when the human rejects it
3. **The poetry variants are stylistically different but functionally equivalent** — one formatting improvement was backported
4. **Multi-problem triage needs three options** (full merge, merge with domain tracks, split) — not two
5. **Random Injection consistently produced the most "from outside the frame" ideas** — coral reef, mycelium, sourdough, campfire, dandelion, composting, tide pool all generated actionable transfers
6. **The Persona Divergence Engine produced the most specific, immediately actionable ideas** — Colonel Henderson (DOD budget), Elena Vasquez (FEMA grants), Priya Sundaram (8-hour interconnection), because constructed personas with real-world constraints produce real-world leads
7. **Every skill justified its existence** — no skill was unnecessary across 8 tests
