// ---------------------------------------------------------------------------
// analyze_trends — the Fodda integration tool
// ---------------------------------------------------------------------------
//
// Fodda calls this tool once per user query. It receives trend data, evidence,
// and graph context from Fodda's knowledge graph search. We select a bundle of
// Paralogy thinking skills based on the `depth` parameter, assemble a composite
// protocol that embeds the trend data, and return it for Fodda's host LLM to
// execute.
//
// No server-side LLM calls. No inference. Just deterministic skill selection
// and prompt assembly — sub-second response time.
//
// The host LLM (Claude, ChatGPT, Gemini, Copilot — whichever Fodda is running
// on) reads our output, executes the skill protocols against the trend data,
// and produces the analysis. This keeps Paralogy LLM-agnostic and zero-cost.
// ---------------------------------------------------------------------------

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Skill {
  name: string;
  description: string;
  body: string;
}

type Depth = "quick" | "standard" | "deep";

// ---------------------------------------------------------------------------
// Fodda payload schemas
// ---------------------------------------------------------------------------
//
// We use .passthrough() liberally so unknown fields Fodda adds in the future
// don't break validation. The brief's example payload is a starting point,
// not a contract — we stay flexible.
// ---------------------------------------------------------------------------

const TrendSchema = z
  .object({
    name: z.string(),
    summary: z.string().optional(),
    signal_score: z.number().optional(),
    trendLifecycle: z.string().optional(),
    momentum: z.string().optional(),
    evidence_count: z.number().optional(),
    graphName: z.string().optional(),
  })
  .passthrough();

const EvidenceSchema = z
  .object({
    title: z.string().optional(),
    sourceUrl: z.string().optional(),
    brandNames: z.array(z.string()).optional(),
    place: z.string().optional(),
    snippet: z.string().optional(),
  })
  .passthrough();

const FoddaContextSchema = z
  .object({
    graphName: z.string().optional(),
    curatorName: z.string().optional(),
    domain: z.string().optional(),
  })
  .passthrough();

const FoddaOutputSchema = z
  .object({
    query: z.string().optional(),
    graphId: z.string().optional(),
    context: FoddaContextSchema.optional(),
    trends: z.array(z.any()).optional(),
    evidence: z.array(z.any()).optional(),
    supplemental: z.record(z.any()).optional(),
  })
  .passthrough();

// Schema used for tool registration. Keys become argument names.
export const analyzeTrendsSchema = {
  query: z.string().describe("The user's original question from Fodda"),
  trends: z
    .array(TrendSchema)
    .describe("Trend objects from Fodda's knowledge graph search"),
  evidence: z
    .array(EvidenceSchema)
    .optional()
    .describe("Supporting articles with sources, brands, geographies"),
  fodda_output: FoddaOutputSchema.optional().describe(
    "Full Fodda context — graph name, curator, domain, supplemental data"
  ),
  depth: z
    .enum(["quick", "standard", "deep"])
    .default("standard")
    .describe(
      "Analysis depth. quick = 1 skill (fast reframe). standard = 3 skills (reframe the trends). deep = 5 skills (reframe + ideation)."
    ),
};

type AnalyzeTrendsArgs = {
  query: string;
  trends: z.infer<typeof TrendSchema>[];
  evidence?: z.infer<typeof EvidenceSchema>[];
  fodda_output?: z.infer<typeof FoddaOutputSchema>;
  depth?: Depth;
};

// ---------------------------------------------------------------------------
// Skill selection
// ---------------------------------------------------------------------------

const SKILL_BUNDLES: Record<Depth, string[]> = {
  quick: ["blind-spot-scan"],
  standard: [
    "think-wrong",
    "blind-spot-scan",
    "persona-divergence-engine",
  ],
  deep: [
    "think-wrong",
    "blind-spot-scan",
    "persona-divergence-engine",
    "guilford-engine",
    "anti-homogeneity-check",
  ],
};

// Outcome-language labels. Per the router's convention, we never expose
// internal skill names to the user — we describe the outcome. The host LLM
// will use these labels when structuring its response.
const SKILL_OUTCOME_LABELS: Record<string, string> = {
  "blind-spot-scan": "What's missing",
  "think-wrong": "Counterintuitive take",
  "persona-divergence-engine": "Across perspectives",
  "guilford-engine": "Structured divergent generation",
  "anti-homogeneity-check": "Diversity audit on the generated ideas",
};

// ---------------------------------------------------------------------------
// Skill body preparation
// ---------------------------------------------------------------------------

/**
 * Strip the YAML frontmatter from a skill body. When we compose multiple
 * skills into one response, the individual frontmatter blocks would clutter
 * the output and confuse the host LLM. The frontmatter's `description` is
 * already captured in SKILL_OUTCOME_LABELS above.
 */
function stripFrontmatter(body: string): string {
  const match = body.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : body.trim();
}

// ---------------------------------------------------------------------------
// Trend data formatter
// ---------------------------------------------------------------------------

function formatTrendData(args: AnalyzeTrendsArgs): string {
  const lines: string[] = [];

  lines.push("## The trends in scope");
  lines.push("");
  lines.push(`**Query:** ${args.query}`);

  const ctx = args.fodda_output?.context;
  if (ctx?.graphName) {
    const curator = ctx.curatorName ? ` (curated by ${ctx.curatorName})` : "";
    lines.push(`**Graph:** ${ctx.graphName}${curator}`);
  }
  if (ctx?.domain) {
    lines.push(`**Domain:** ${ctx.domain}`);
  }

  lines.push("");
  lines.push("**Trends:**");
  args.trends.forEach((trend, idx) => {
    const meta: string[] = [];
    if (typeof trend.signal_score === "number") {
      meta.push(`signal: ${trend.signal_score}`);
    }
    if (trend.trendLifecycle) meta.push(trend.trendLifecycle);
    if (trend.momentum) meta.push(trend.momentum);
    const metaStr = meta.length ? ` (${meta.join(", ")})` : "";

    lines.push(`${idx + 1}. **${trend.name}**${metaStr}`);
    if (trend.summary) {
      lines.push(`   ${trend.summary}`);
    }
  });

  if (args.evidence && args.evidence.length > 0) {
    lines.push("");
    lines.push("**Evidence:**");
    args.evidence.forEach((ev) => {
      const parts: string[] = [];
      if (ev.title) parts.push(ev.title);
      const brands = ev.brandNames?.join(", ");
      if (brands) parts.push(`[${brands}]`);
      if (ev.place) parts.push(`(${ev.place})`);
      if (parts.length > 0) {
        lines.push(`- ${parts.join(" ")}`);
        if (ev.snippet) lines.push(`  ${ev.snippet}`);
      }
    });
  }

  const supplemental = args.fodda_output?.supplemental;
  if (supplemental && Object.keys(supplemental).length > 0) {
    lines.push("");
    lines.push("**Supplemental data:**");
    for (const [key, value] of Object.entries(supplemental)) {
      lines.push(`- ${key}: ${JSON.stringify(value)}`);
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Output guidance per depth
// ---------------------------------------------------------------------------

function outputGuidance(depth: Depth, skillNames: string[]): string {
  const lines: string[] = [];

  if (depth === "quick") {
    lines.push(
      "Execute the framework above against the trend data. Produce 2-3 specific regions of the problem space these trends ignore. Structured bullets, not polished prose."
    );
  } else if (depth === "standard") {
    lines.push("Execute each framework above against the trend data. Produce:");
    lines.push("");
    lines.push(
      "- **Counterintuitive take:** A real position that contradicts the trend consensus"
    );
    lines.push(
      "- **What's missing:** 2-3 specific regions of the problem space these trends ignore"
    );
    lines.push(
      "- **Across perspectives:** 2-3 persona takes that disagree productively"
    );
    lines.push("");
    lines.push(
      "Structured bullets and short paragraphs are fine. Internal labels welcome. Brand this section as 🔀 Paralogy Analysis."
    );
  } else {
    // deep
    lines.push("Execute the frameworks in this order:");
    lines.push("");
    lines.push(
      "1. **Counterintuitive take** — a real position that contradicts the trend consensus"
    );
    lines.push(
      "2. **What's missing** — 2-3 specific regions of the problem space these trends ignore"
    );
    lines.push(
      "3. **Across perspectives** — 2-3 persona takes that disagree productively"
    );
    lines.push(
      "4. **Divergent generation** — 8-12 ideas from the Guilford pass (mixed feasibility tags)"
    );
    lines.push(
      "5. **Diversity audit** — grade the generated set (A-D), name the clusters, flag what's overweight"
    );
    lines.push("");
    lines.push(
      "Structure the output so the user reads the reframes first, then the generated idea set, then the audit verdict. Internal labels welcome. Brand this section as 🔀 Paralogy Analysis."
    );
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Top-level execution guidance (depth-aware)
// ---------------------------------------------------------------------------
//
// The header previews what the host LLM should produce. Quick and standard
// stay in pure "thinking layer" mode (reframes, counter-perspectives, blind
// spots). Deep explicitly adds ideation and an audit so the LLM knows the
// output is broader than reframing.
// ---------------------------------------------------------------------------

function executionHeader(depth: Depth): string {
  const protocolWord = depth === "quick" ? "a structured thinking protocol" : "structured thinking protocols";
  const pronoun = depth === "quick" ? "it" : "them";
  const applyPhrase = depth === "quick" ? "Apply the framework" : "Apply each framework";

  const outputs: Record<Depth, string> = {
    quick: `a blind-spot analysis — what's missing from this trend set`,
    standard: `reframes, counter-perspectives, and blind-spot analysis on the trends`,
    deep: `reframes, counter-perspectives, blind-spot analysis, a set of divergent ideas generated from the trends, and a diversity audit on those ideas`,
  };

  return `🔀 **Paralogy Analysis**

You're receiving ${protocolWord} below. Execute ${pronoun} against the trend data — don't summarize or quote ${pronoun}. ${applyPhrase} to produce ${outputs[depth]}. Label each section by the outcome. Output structured analysis, not polished prose — the user's LLM will integrate it naturally.`;
}

// ---------------------------------------------------------------------------
// Composite response assembler
// ---------------------------------------------------------------------------

function assembleResponse(
  args: AnalyzeTrendsArgs,
  selectedSkills: Skill[]
): string {
  const depth = (args.depth ?? "standard") as Depth;
  const sections: string[] = [];

  sections.push(executionHeader(depth));
  sections.push("---");
  sections.push(formatTrendData(args));
  sections.push("---");
  sections.push("## Thinking frameworks to apply");

  selectedSkills.forEach((skill, idx) => {
    const label = SKILL_OUTCOME_LABELS[skill.name] ?? skill.name;
    sections.push(
      `### ${idx + 1}. ${label} (${skill.name})\n\n${stripFrontmatter(skill.body)}`
    );
  });

  sections.push("---");
  sections.push("## Execution order and output guidance");
  sections.push(
    outputGuidance(
      depth,
      selectedSkills.map((s) => s.name)
    )
  );

  const count = selectedSkills.length;
  const countLabel = count === 1 ? "1 thinking skill" : `${count} thinking skills`;
  sections.push(`*Processed through Paralogy's ${countLabel}.*`);

  return sections.join("\n\n");
}

// ---------------------------------------------------------------------------
// Tool description (shown in tools/list)
// ---------------------------------------------------------------------------

const TOOL_DESCRIPTION = `Paralogy's Fodda integration endpoint. Receives trend data from Fodda's knowledge graph search (query, trends, evidence, context) and returns a composite divergent-thinking protocol that the host LLM executes against the data.

Returns reframes, counter-perspectives, and blind-spot analysis on top of the trend set. With depth="deep", also triggers structured divergent ideation + a diversity audit.

This tool is designed for server-to-server use by Fodda. Direct callers without trend data will receive an empty response.`;

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

/**
 * Register the analyze_trends tool on an existing McpServer instance.
 * Skills are passed in as a map keyed by skill name for O(1) lookup.
 */
export function registerAnalyzeTrendsTool(
  server: McpServer,
  skillsByName: Map<string, Skill>
): void {
  server.tool(
    "analyze_trends",
    TOOL_DESCRIPTION,
    analyzeTrendsSchema,
    async (args) => {
      console.error(
        `[${new Date().toISOString()}] tool_call: analyze_trends depth=${args.depth ?? "standard"} trends=${args.trends?.length ?? 0}`
      );

      // Empty-input guard — per Fodda's spec, return "" if no trends.
      // Keeps the fail-open semantics: an empty response is silently dropped
      // and the user still sees Fodda's native output.
      if (!args.trends || args.trends.length === 0) {
        return {
          content: [{ type: "text" as const, text: "" }],
        };
      }

      // Select the skill bundle for the requested depth.
      const depth = (args.depth ?? "standard") as Depth;
      const skillNames = SKILL_BUNDLES[depth];
      const selectedSkills = skillNames
        .map((name) => skillsByName.get(name))
        .filter((s): s is Skill => s !== undefined);

      // If a skill name in the bundle isn't loaded (should never happen in
      // production — every bundled skill lives in skills/), log and continue
      // with what we have rather than failing the whole request.
      const missing = skillNames.filter((name) => !skillsByName.has(name));
      if (missing.length > 0) {
        console.error(
          `[analyze_trends] warning: missing skills for depth=${depth}: ${missing.join(", ")}`
        );
      }

      if (selectedSkills.length === 0) {
        // Shouldn't happen, but don't crash — return empty per fail-open.
        console.error(
          `[analyze_trends] error: no skills resolved for depth=${depth}, returning empty`
        );
        return {
          content: [{ type: "text" as const, text: "" }],
        };
      }

      const responseText = assembleResponse(args as AnalyzeTrendsArgs, selectedSkills);

      return {
        content: [{ type: "text" as const, text: responseText }],
      };
    }
  );
}

// ---------------------------------------------------------------------------
// Exports for testing
// ---------------------------------------------------------------------------

export const __internals = {
  SKILL_BUNDLES,
  SKILL_OUTCOME_LABELS,
  stripFrontmatter,
  formatTrendData,
  outputGuidance,
  assembleResponse,
};
