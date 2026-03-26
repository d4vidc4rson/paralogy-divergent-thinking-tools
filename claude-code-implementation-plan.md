# Divergent Thinking Tools — Claude Code Implementation Plan

## What you have now

A project folder (`divergent-thinking-tools/`) containing the complete repo structure: 18 SKILL.md files, 8 pipeline tests, 5 docs, 2 examples, and a README. Everything needed to ship Phase 1 immediately and build Phase 2 from.

## What you're building

**Phase 1:** GitHub repo (public, open source) — the tools, tests, docs, and README
**Phase 2:** MCP server — exposes the tools as callable endpoints for agents and Claude users
**Phase 3:** Metered API + SDK — if demand warrants (don't build speculatively)

---

## Phase 1: GitHub Repo

**Goal:** Get the repo live, public, and looking sharp. This is the landing page.

### Step 1: Initialize and push

Open Claude Code in the `divergent-thinking-tools` directory (the unzipped folder, minus the `{skills` junk folder).

Tell Claude Code:

```
Initialize a git repo here. Create a .gitignore (standard Node/Python, 
plus .DS_Store, .env). Add all files. Make the initial commit with 
message "Initial release: 15 tools, 7 pipeline tests, full docs." 
Set up a remote at github.com/paralogy/divergent-thinking-tools 
(or whatever org/repo name I confirm) and push.
```

### Step 2: Add a LICENSE

Tell Claude Code:

```
Add an MIT license file. Copyright 2025-2026 Paralogy / David Carson.
```

MIT is right for this — you want adoption, not protection. The value isn't in the SKILL.md files (which anyone can read and copy). The value is in the system, the testing, and eventually the MCP server.

### Step 3: GitHub repo settings

Do these manually in GitHub:
- Add description: "Divergent Thinking Systems for Convergent Machines. Unintelligent Tools for AI."
- Add topics: `ai`, `divergent-thinking`, `creativity`, `llm-tools`, `claude`, `mcp`, `prompt-engineering`, `brainstorming`, `ai-agents`
- Set the website URL to paralogy.ai (or dumbify.io, wherever you want traffic to go)
- Pin the repo on your GitHub profile

### Step 4: Release tag

Tell Claude Code:

```
Create a git tag v1.0.0 with message "Initial release: 15 tools, 
router with gap-fill loop and multi-problem triage, 7 pipeline tests 
across 7 domains, vanilla comparison, agentic architecture doc." 
Push the tag.
```

Then create a GitHub Release from the tag with a short description pulling from the README.

**Phase 1 is done.** The repo is live. People can find it, star it, download the skills, and read the tests. Time estimate: 30 minutes in Claude Code.

---

## Phase 2: MCP Server

**Goal:** Expose the Divergent Thinking Tools as an MCP server that Claude, Cursor, and any MCP-compatible agent framework can connect to.

You've already built this pattern with the Dumbify MCP server, so the architecture is familiar. The difference: Dumbify's MCP tools are data operations (get config, create draft, list drafts). The Divergent Thinking MCP tools are LLM-powered — each tool call triggers an Anthropic API call under the hood.

### Architecture

```
divergent-thinking-tools/
├── skills/                    ← Existing (source of truth)
├── tests/                     ← Existing
├── docs/                      ← Existing
├── examples/                  ← Existing
├── server/                    ← NEW: The MCP server
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts           ← MCP server entry point
│   │   ├── tools/             ← One file per tool
│   │   │   ├── wrong-problem-detector.ts
│   │   │   ├── strip-down.ts
│   │   │   ├── blind-spot-scan.ts
│   │   │   ├── guilford-engine.ts
│   │   │   ├── persona-divergence-engine.ts
│   │   │   ├── think-wrong.ts
│   │   │   ├── short-think.ts
│   │   │   ├── bad-on-purpose.ts
│   │   │   ├── wild-to-mild.ts
│   │   │   ├── macgyver-mode.ts
│   │   │   ├── random-injection.ts
│   │   │   ├── dumb-questions-engine.ts
│   │   │   ├── anti-homogeneity-check.ts
│   │   │   ├── de-slop.ts
│   │   │   └── router.ts
│   │   ├── pipeline.ts        ← Orchestrates multi-tool pipelines
│   │   ├── skill-loader.ts    ← Reads SKILL.md files as system prompts
│   │   └── anthropic.ts       ← Anthropic API client wrapper
│   └── .env.example
└── README.md                  ← Updated to mention MCP server
```

### How each tool works internally

Every MCP tool follows the same pattern:

1. Load the corresponding SKILL.md from `../skills/{tool-name}/SKILL.md`
2. Send it as the system prompt to the Anthropic API (Claude Sonnet for speed, Opus for quality)
3. Send the user's input as the user message
4. Return Claude's response as the tool result

The SKILL.md files are the instructions. The Anthropic API is the engine. The MCP server is the interface.

```typescript
// Simplified pattern for every tool:

async function runTool(toolName: string, input: string): Promise<string> {
  const skillPath = path.join(__dirname, '../../skills', toolName, 'SKILL.md');
  const systemPrompt = fs.readFileSync(skillPath, 'utf-8');
  
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: input }]
  });
  
  return response.content[0].text;
}
```

### Step 1: Scaffold the MCP server

Tell Claude Code:

```
I need to build an MCP server in the server/ directory of this repo.
It should follow the same pattern as my Dumbify MCP server at 
dumbify.io/api/mcp/mcp. 

Tech stack: TypeScript, the MCP SDK (@modelcontextprotocol/sdk), 
and the Anthropic SDK (@anthropic-ai/sdk).

The server exposes these tools (I'll list them in a second). 
Each tool loads a SKILL.md file from ../skills/{tool-name}/SKILL.md 
as the system prompt, sends it to the Anthropic API with the user's 
input, and returns the response.

Start by scaffolding the project structure with package.json, 
tsconfig.json, and the src/ directory. Don't implement the tools yet — 
just get the MCP server running with a single test tool.
```

### Step 2: Implement the skill loader

Tell Claude Code:

```
Create a skill-loader.ts module that:
1. Reads a SKILL.md file from the skills/ directory by tool name
2. Strips the YAML front matter (the --- block at the top)
3. Returns the markdown content as a string for use as a system prompt
4. Caches loaded skills in memory so we don't read from disk on every call
```

### Step 3: Implement the Anthropic API wrapper

Tell Claude Code:

```
Create an anthropic.ts module that:
1. Initializes the Anthropic client with the API key from env
2. Exposes a function runWithSkill(skillContent, userInput, options) that:
   - Takes the skill content as system prompt
   - Takes the user input as the user message
   - Takes optional params (model, max_tokens, temperature)
   - Returns the text response
3. Default model: claude-sonnet-4-20250514
4. Default max_tokens: 4096
5. Temperature: 1.0 (we want divergence, not convergence)
```

### Step 4: Implement the individual tools

Tell Claude Code:

```
Now implement each MCP tool. Here are the tools and their schemas:

1. wrong_problem_detector
   Input: { objective: string, context?: string }
   Output: { checks_fired: number, original_problem: string, 
             rewritten_problem: string, check_results: object[] }
   Uses: skills/wrong-problem-detector/SKILL.md

2. strip_down  
   Input: { document: string }
   Output: { desire_statement: string, concerns: string[] }
   Uses: skills/strip-down/SKILL.md

3. blind_spot_scan
   Input: { desire_statement: string, mode: "pre" | "post", 
            existing_ideas?: string[] }
   Output: { dimensions: object[], gaps?: object[] }
   Uses: skills/blind-spot-scan/SKILL.md

4. guilford_engine
   Input: { desire_statement: string, constraint?: string }
   Output: { ideas: object[], default_answer: string }
   Uses: skills/guilford-engine/SKILL.md

5. persona_divergence_engine
   Input: { problem: string, n_personas?: number, 
            required_personas?: string[] }
   Output: { personas: object[], ideas_by_persona: object[] }
   Uses: skills/persona-divergence-engine/SKILL.md

6. think_wrong
   Input: { problem: string }
   Output: { convergence_point: string, argument: string, 
             expert_pushback: string }
   Uses: skills/think-wrong/SKILL.md

7. short_think
   Input: { problem: string, count?: number }
   Output: { ideas: string[] }
   Uses: skills/short-think/SKILL.md

8. bad_on_purpose
   Input: { problem: string }
   Output: { terrible_ideas: object[], mined_value: object[] }
   Uses: skills/bad-on-purpose/SKILL.md

9. wild_to_mild
   Input: { problem: string }
   Output: { monday_morning: string[], this_quarter: string[], 
             this_year: string[], moonshot: string[] }
   Uses: skills/wild-to-mild/SKILL.md

10. macgyver_mode
    Input: { problem: string, inventory?: string }
    Output: { inventory: object, solutions: object[] }
    Uses: skills/macgyver-mode/SKILL.md

11. random_injection
    Input: { problem: string }
    Output: { random_word: string, deep_study: string, 
              principle_transfers: object[] }
    Uses: skills/random-injection/SKILL.md

12. dumb_questions_engine
    Input: { territory: string }
    Output: { assumptions: string[], questions: string[], 
              starred: string[] }
    Uses: skills/dumb-questions-engine/SKILL.md

13. anti_homogeneity_check
    Input: { ideas: string[], domain_labels?: string[] }
    Output: { grade: string, clusters: object[], 
              diagnosis: string, gaps: string[] }
    Uses: skills/anti-homogeneity-check/SKILL.md

14. de_slop
    Input: { text: string, intensity?: "light" | "medium" | "heavy",
             context?: string }
    Output: { original: string, transformed: string }
    Uses: skills/de-slop/SKILL.md

15. router
    Input: { problem: string, context?: string, mode?: string }
    Output: { diagnosis: string, recommended_pipeline: string[], 
              reasoning: string }
    Uses: skills/router/SKILL.md

For each tool, the implementation should:
- Load the skill via skill-loader
- Format the user input into a clear prompt 
  (including the input fields naturally in the message)
- Call the Anthropic API via the anthropic wrapper
- Parse the response into the structured output schema
  (use a follow-up API call with JSON mode if needed 
  to structure free-text responses)
- Return the structured result
```

### Step 5: Implement the pipeline orchestrator

Tell Claude Code:

```
Create a pipeline.ts module that orchestrates multi-tool pipelines.
It should expose a run_pipeline tool on the MCP server with:

Input: { 
  problem: string, 
  context?: string,
  mode?: "full" | "quick" | "explore_only",
  gap_fill?: boolean 
}

The pipeline tool:
1. Calls the router to determine which tools to run and in what order
2. Executes each tool in sequence, passing output forward
3. If gap_fill is true (default), runs the audit tools after generation
   and triggers targeted re-generation for any gaps found
4. Returns the complete pipeline result with all intermediate outputs

For "quick" mode: just WPD + Strip Down + Guilford Engine
For "explore_only" mode: just WPD + Dumb Questions Engine
For "full" mode: the complete 7-phase pipeline

The pipeline should handle the multi-problem triage:
- Check if the problem contains multiple distinct challenges
- If so, run the triage logic from the router 
  (merge / merge with domain tracks / split)
- Execute accordingly
```

### Step 6: Testing

Tell Claude Code:

```
Test the MCP server locally:
1. Start the server
2. Connect to it from Claude desktop app (or via MCP inspector)
3. Call the wrong_problem_detector with the SolaVault brief 
   from our Test 7
4. Verify it fires on the customer-segment problem
5. Call the guilford_engine with a simple problem 
   and verify the 3-line format appears in the output
6. Call the anti_homogeneity_check with a set of 10 ideas 
   (some deliberately similar) and verify it catches the clustering
7. Call run_pipeline in quick mode and verify the sequence executes
```

### Step 7: Deploy

Tell Claude Code:

```
Deploy the MCP server. Options based on what I already use:
- If Vercel: serverless function at /api/mcp 
  (same pattern as Dumbify)
- If standalone: deploy to Railway, Fly.io, or Render

The server needs:
- ANTHROPIC_API_KEY in env
- The skills/ directory accessible at runtime 
  (either bundled or read from the repo)
- CORS headers for cross-origin MCP connections

Set up the deployment and give me the MCP server URL 
I can share with users.
```

### Step 8: Update README

Tell Claude Code:

```
Update the README.md to add a "Connect via MCP" section 
after the "Quick start" sections:

### Connect via MCP

Add the Divergent Thinking Tools MCP server to Claude, Cursor, 
or any MCP-compatible tool:

Server URL: https://[your-domain]/api/mcp

Available tools: [list the 15 tools + run_pipeline]

This gives you access to all tools programmatically — 
useful for agent workflows, automated pipelines, 
and integration with other systems.
```

**Phase 2 is done.** The MCP server is live. Anyone can connect to it from Claude, Cursor, or any agent framework that supports MCP. Time estimate: 2-4 sessions in Claude Code, depending on complexity.

---

## Phase 3: Metered API + SDK (Build Only If Demand Warrants)

Don't build this yet. Build it when you see:
- Developers calling the MCP tools and asking for a cleaner interface
- Agent framework teams wanting to integrate
- Enough volume to justify metering

### What it would look like

**API wrapper** around the MCP server:

```
POST https://api.paralogy.ai/v1/pipeline
Headers: Authorization: Bearer {api_key}

{
  "problem": "Our app has low retention",
  "mode": "full",
  "gap_fill": true
}

Response: {
  "pipeline_id": "pip_abc123",
  "phases": [...],
  "ideas": [...],
  "ahc_grade": "A-",
  "clusters": [...],
  "gaps_filled": [...],
  "total_tokens": 42000,
  "cost": "$0.84"
}
```

**Python SDK:**

```python
pip install paralogy

from paralogy import Pipeline

result = Pipeline(api_key="...").run(
    problem="Our app has low retention",
    mode="full"
)
print(result.ideas)
print(result.ahc_grade)
```

**Metering:** 
- Per-tool-call pricing (e.g., $0.05 per individual tool call)
- Per-pipeline-run pricing (e.g., $0.50 for quick, $2.00 for full)
- Free tier: 10 pipeline runs/month
- Pro tier: 100 runs/month for $49
- Enterprise: unlimited, custom

### When to build it

Signs that Phase 3 is needed:
- 50+ GitHub stars and people asking "can I call this from my code?"
- 10+ MCP connections from developers (not just your own usage)
- Someone emails you saying "we want to integrate this into our agent platform"

Until then, the MCP server (Phase 2) handles everything. Don't build infrastructure ahead of demand.

---

## Phase 2.5: Anthropic Ecosystem Integration (Parallel to Phase 2)

This is the distribution play that could leapfrog everything.

### Claude MCP Directory

Once the MCP server is live, submit it to Anthropic's MCP server directory (if one exists, or request inclusion). The Divergent Thinking Tools would be a featured MCP integration — Claude users could connect with one click.

### Anthropic Case Study / Featured Integration

The 7-test battery + vanilla comparison is the kind of rigorous evaluation Anthropic's team respects. After Phase 2 ships:

1. Write a concise case study (1-2 pages) showing the pipeline test results
2. Send it to Anthropic's developer relations or partnerships team
3. Ask if they'd feature it as a "what you can build with Claude skills + MCP" example

The pitch: "We built a system of 15 tools that force Claude to produce genuinely diverse output. We tested it across 7 domains. We compared it to vanilla Claude on the same problem. Here are the results."

This costs you an email. The upside is distribution to every Claude user.

### Claude Skills Marketplace (if/when it launches)

Anthropic has been building toward a skills/tools marketplace. If they launch one, the Divergent Thinking Tools should be among the first listed. The repo, the tests, and the MCP server make you ready for this the moment it opens.

---

## Summary: What to Tell Claude Code, in Order

| Session | What to do | Time estimate |
|---------|-----------|---------------|
| **1** | Initialize git repo, add LICENSE, push to GitHub, create release tag | 30 min |
| **2** | Scaffold MCP server (project structure, skill-loader, Anthropic wrapper) | 1-2 hours |
| **3** | Implement individual tools (15 tool handlers) | 2-3 hours |
| **4** | Implement pipeline orchestrator + multi-problem triage | 1-2 hours |
| **5** | Test all tools locally, fix issues | 1-2 hours |
| **6** | Deploy MCP server, update README, test live connection | 1-2 hours |
| **Later** | API + SDK (only if demand warrants) | TBD |

Total for Phases 1-2: approximately 6-12 hours of Claude Code sessions across a week or so.

---

## Key Decisions You'll Need to Make

1. **GitHub org:** `paralogy/divergent-thinking-tools` or `davidcarson/divergent-thinking-tools` or something else?

2. **MCP server hosting:** Vercel (like Dumbify), Railway, Fly.io, or somewhere else?

3. **Model for MCP tool calls:** Sonnet (faster, cheaper, good enough for most tools) or Opus (better for Think Wrong and Persona Divergence Engine)? Could default to Sonnet with an option to upgrade individual calls to Opus.

4. **Open source the server too?** The skills are already open. The server code could be open (people can self-host) or closed (they must use your hosted version). Recommendation: open-source the server, monetize through the hosted version and eventually metering.

5. **API key management:** When the MCP server calls the Anthropic API, whose API key is used? Options:
   - Your key (you absorb the cost, simpler for users, you control billing)
   - User provides their own key (zero cost to you, more friction for users)
   - Your key with metering (you mark up the Anthropic cost, this becomes the business model)
   
   Recommendation for Phase 2: your key, no metering, absorb the cost. It'll be small at first and the adoption matters more than the revenue. Add metering in Phase 3 when volume justifies it.
