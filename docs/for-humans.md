# For Humans: Using the Divergent Thinking Tools

## Setup

### Claude (Projects or Skills)

1. Download the `skills/` directory from this repo
2. In Claude, go to your Project or Skills settings
3. Add each SKILL.md file as a custom skill
4. The Router (`skills/router/SKILL.md`) is the orchestrator — always include it

You don't need to add all 18 tools at once. The minimum viable set:

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

### Cursor / Other Dev Tools

Same SKILL.md files work as custom instructions in Cursor, Windsurf, or any tool that supports system prompts. Paste the contents of the Router + whichever tools you want into the system prompt or rules file.

### Any LLM (Direct Prompting)

For any LLM, paste a SKILL.md file into the system prompt or the beginning of the conversation. Less elegant than the skills feature but it works. Start with the Router.

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

### The poetry variants

Three tools have poetry variants (Strip Down-P, Guilford Engine-P, Think Wrong-P). Same instructions, same output quality, slightly different register. The -P versions have more lyrical/rhythmic instructions. Use whichever you prefer — the output is comparable.

The one concrete difference: Guilford Engine-P has slightly cleaner output formatting (the 3-line format was backported to the prose version based on testing, so they're now equivalent).

---

## Tips

- **Start with one problem.** The pipeline is powerful but it produces a lot of output. Start with a single focused problem before trying multi-problem scenarios.
- **Push back on Strip Down.** The desire statement confirmation step is where your judgment matters most. If the statement doesn't feel true, say so. Your correction IS the desire statement.
- **Don't skip the audit.** The Anti-Homogeneity Check is the bullshit detector. If you generated 10 ideas, run it — you probably have 4 ideas wearing costumes.
- **The gap-fill loop is the biggest upgrade.** In testing, the pipeline went from A- to A consistently once the gap-fill loop was added. It turns "here's what's missing" into "here's what's missing, and here's how we filled it."
- **De-Slop is optional but recommended.** If you're going to share the output with anyone, run De-Slop. AI-generated strategy text sounds like AI-generated strategy text, and that undermines the ideas inside it.
