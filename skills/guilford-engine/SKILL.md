---
name: guilford-engine
description: Force genuinely divergent ideation using Guilford's five-dimension framework, backed by empirical research from Nature Communications (LiveIdeaBench). Use when generating ideas, exploring approaches, developing hypotheses, finding angles, designing solutions, or any task where the user needs multiple genuinely different options — not surface variations of the same thought. Triggers on "brainstorm," "give me ideas," "what are my options," "explore possibilities," "think broadly," "what else could this be," "I need approaches," or any request for a list of options. Works on any problem in any domain — strategy, engineering, science, policy, design, education, medicine, law, research. Use INSTEAD of generic list-making. The difference between this skill and a normal brainstorm is the difference between asking five people in the same room and asking five people in different buildings.
---

# The Guilford Engine

A structured protocol for generating
genuinely different approaches to a problem,
grounded in J.P. Guilford's 1967 framework
for divergent thinking
and validated at scale by Ruan et al. (2026)
across 40+ language models and 22 scientific domains.

The research proved three things that matter here:

**Reasoning and generation are different skills.**
Models that score highest on reasoning benchmarks
often score mediocre on idea generation.
Being smart and being generative
are not the same cognitive act.
Reasoning finds the right answer.
Generation finds answers nobody asked for yet.

**More thinking does not produce better ideas.**
Chain-of-thought length had near-zero correlation
with idea quality (ρ = 0.089).
Deliberation makes you cautious.
Caution is the enemy of originality.

**AI makes individuals more creative
but makes everyone's output more similar.**
(Doshi & Hauser, Science Advances, 2024.)
Without structural intervention,
every ideation session converges
on the same five approaches
wearing different clothes.

This skill is the structural intervention.

---

## How It Works

You will run five passes.
Not five at once. Five in sequence.
Each pass exercises a different dimension of divergent thinking.
Each produces distinct output.
The passes are:

1. **Fluency** — Raw volume across genuinely different problem framings
2. **Flexibility** — Category-crossing and domain transfer
3. **Originality** — Novelty scoring and convergence killing
4. **Feasibility** — Grounding without flattening
5. **Clarity** — Compression into communicable form

Do not skip passes. Do not combine passes.
Generation and evaluation are different cognitive acts.
Do them in separate rooms.

**Critical: Passes 1-4 are internal work.**
The user does not see them.
Do not show the fluency list,
the self-check grades,
the flexibility transfers,
the originality scoring,
or the feasibility tagging process.
Run all of it internally.
The only thing the user sees
is the Final Output from Pass 5:
the compressed ideas with their feasibility tags
and the convergence warning.
Showing the scaffolding is like
showing someone the construction cranes
instead of the building.

---

## Pass 1: Fluency

Fluency is not "generate a lot of ideas."
Fluency is "generate ideas that address
genuinely different sub-problems."

The LiveIdeaBench research uses a four-grade system
to measure real fluency:

**Grade A** — Completely different ideas addressing different problems.
**Grade B** — Different ideas addressing similar problems.
**Grade C** — Similar ideas addressing similar problems.
**Grade D** — Academically identical ideas.

Most AI ideation produces Grade C output:
ten variations on the same underlying thought.

This happens in every domain.
Before you generate, identify what Grade C
looks like for this specific problem,
so you can see the trap before you fall into it:

In marketing, Grade C is three ways to get attention online:
"Use social media" and "leverage influencers"
and "build a community online"
are the same idea wearing three hats.

In engineering, Grade C is three variations on the same architecture:
"Use microservices" and "decompose into bounded contexts"
and "build an event-driven system"
are the same structural instinct with different labels.

In science, Grade C is three versions of the same experiment:
"Screen more compounds" and "use a larger sample"
and "apply machine learning to the existing dataset"
are all "do more of what we're already doing."

In policy, Grade C is three flavors of the same intervention:
"Increase funding" and "expand the program"
and "scale the pilot"
are all "do the current thing bigger."

In education, Grade C is three versions of "make it more engaging":
"Add project-based learning" and "use technology in the classroom"
and "incorporate real-world applications"
are all "make school less boring" wearing different outfits.

Name the Grade C trap for your specific problem
before you start generating.
That's the gravity. Now escape it.

**Your job in Pass 1:**

Generate 8-12 ideas.
But before each idea, name the sub-problem it solves.
Not the same sub-problem reworded.
A different sub-problem.

The key move: identify the different dimensions
of the problem that could each be addressed independently.
Every problem, in every domain,
has multiple underlying tensions.

If you catch yourself solving the same sub-problem twice,
that's your convergence showing.
Delete the second one and find a new sub-problem.

Here is what this looks like across domains:

If someone asks for approaches to reducing hospital readmissions,
don't give them twelve ways to improve discharge planning.
Give them:
- an idea that addresses medication errors
- an idea that addresses patient understanding
- an idea that addresses the transition between care settings
- an idea that addresses social determinants (housing, food, transport)
- an idea that addresses the incentive structure that makes readmissions profitable

Each addresses a different underlying cause.
If your first three ideas are all about discharge planning,
you've found your convergence point. Name it and move away.

If someone asks for approaches to improving a codebase,
don't give them twelve refactoring strategies.
Give them:
- an idea that addresses the onboarding problem (new engineers can't understand it)
- an idea that addresses the deployment problem (shipping is scary)
- an idea that addresses the testing problem (nobody trusts the tests)
- an idea that addresses the knowledge concentration problem (only one person understands the payments module)
- an idea that addresses the motivation problem (engineers avoid working on it)

Each addresses a different reason the codebase is a problem.

**Format:** For each idea, write one sentence naming the sub-problem,
then one sentence stating the idea.
No elaboration. No justification. Not yet.

**Self-check before moving on:**
Read your list. Grade each pair of adjacent ideas
using the A/B/C/D system.
If any pair scores below B, replace the weaker one.
The minimum standard is B across the board.
You're looking for A.

---

## Pass 2: Flexibility

Flexibility means the ideas span
different categories, domains, and modes of thinking.

This is where you fight your training directly.
Your training clusters ideas by domain.
Every field has a voice, a set of default patterns,
a repertoire of "normal" solutions.
When you think inside a domain,
you reach for that domain's tools.
An engineer reaches for architecture.
A marketer reaches for campaigns.
A scientist reaches for experiments.
A policy analyst reaches for programs.

The voice of each domain locks you inside it.

**Your job in Pass 2:**

Take the fluency output from Pass 1.
For each idea, ask:
What field outside this domain
would find this problem interesting?

Then generate 3-5 new ideas by routing the problem
through unrelated disciplines.

The best transfers come from fields
that have solved a structurally similar problem
using completely different mechanisms.

**How to pick the transfer domain by problem structure:**

If the problem is about getting people to change behavior:
route through epidemiology (how do behaviors spread?),
game design (how do you make the next action irresistible?),
or addiction psychology (what makes a pattern self-reinforcing?).

If the problem is about building something reliable:
route through ecology (how do ecosystems survive shocks?),
aviation safety (how does an industry achieve near-zero failure?),
or constitutional law (how do you design rules that outlast their authors?).

If the problem is about finding something hidden:
route through forensic accounting (how do you find what someone tried to conceal?),
archaeology (how do you reconstruct the whole from fragments?),
or immunology (how does a system detect what doesn't belong?).

If the problem is about making something efficient:
route through logistics (how does FedEx route a million packages overnight?),
ant colony behavior (how does coordination happen with no coordinator?),
or emergency medicine triage (how do you make the right call in 90 seconds?).

If the problem is about persuading or communicating:
route through trial law (how do you build a case that survives hostile cross?),
documentary filmmaking (how do you make someone care about something they didn't know existed?),
or hostage negotiation (how do you change a mind when the stakes are absolute?).

If none of these fit,
pick the field that would be most confused
by the problem as stated.
Their confusion is diagnostic.
What they find absurd about the premise
is probably an assumption worth questioning.

These domain transfers are not metaphors.
They are thinking tools.
The expert in the foreign domain
would see something the native expert cannot
because their convergence points are different.

Write each new idea in the language of the original domain,
not the transfer domain.
The scaffolding stays hidden.

Add the best 3-5 transfer ideas to your running list.

---

## Pass 3: Originality

Now evaluate what you have.
This is the only pass where you judge.

Originality in the LiveIdeaBench framework
means novelty relative to what exists —
not weirdness for its own sake.

**Your job in Pass 3:**

Read every idea on your list.
For each one, answer honestly:

"If I searched for this approach,
would I find someone already doing it?"

- **Yes, many people** → Kill it. Not original.
- **Yes, a few people** → Flag it. Might be necessary but won't differentiate.
- **Maybe one or two** → Keep. This is the frontier.
- **No one I can find** → Keep and star. This is where value lives.

Then apply the Expert Threat Test:

Would a credentialed professional in this domain
nod along comfortably reading this idea?
If yes, it's not original enough.
Would they feel defensive?
Would they say "you can't do that" or
"that's not how this works"?
That friction is your signal.

**A note for safety-critical domains:**
In fields where the consensus exists
because it prevents physical harm —
medicine, structural engineering,
aviation, nuclear safety —
the Expert Threat Test measures intellectual friction,
not physical recklessness.
The expert should feel their assumptions challenged,
not their patients endangered.

Mark your three most original ideas.
Mark your three least original.
Remove the least original
unless they serve a necessary structural function
(sometimes you need a straightforward-but-essential idea in the mix).

---

## Pass 4: Feasibility

The LiveIdeaBench research found a Pareto front
between originality and feasibility.
The most original ideas tend to be less implementable.
The most implementable ideas tend to be obvious.

This tension is a feature, not a bug.
Do not resolve it. Present it.

**Your job in Pass 4:**

For each surviving idea, assign a feasibility tag:

- **Now** — Could be implemented with existing resources and knowledge
- **Soon** — Requires some new capability, partnership, or investment but is clearly achievable
- **Stretch** — Requires significant new thinking or infrastructure but is not physically impossible
- **Moonshot** — May not work but would be transformative if it did

A good ideation output has ideas across all four tags.
If everything is "Now," you were too cautious.
If everything is "Moonshot," you were too abstract.

For each Stretch and Moonshot idea,
add one sentence on what would need to be true
for it to become feasible.
Not a plan. A condition.
"This works if X turns out to be true."

---

## Pass 5: Clarity

The research found that idea quality
is independent of idea length.
Longer explanations do not produce better ideas.
They produce more cautious ones.

**Your job in Pass 5:**

Compress each surviving idea to its essential form.
Maximum 2-3 sentences per idea.
One sentence naming the problem.
One sentence stating the idea.
One optional sentence on why it's non-obvious.

If an idea can't be explained in three sentences,
it's either too vague or too complicated.
Both are problems.
Vague means you haven't actually found the idea yet.
Complicated means you've buried it in implementation.

Strip every idea to its nerve.

---

## Final Output

**This is the only part the user sees.**
Everything above was internal.

Present the ideas as a single list.
Each idea must be visually separated from the next.
For each idea, show three lines —
three, not one, not a paragraph, not a run-on.
Three distinct lines, each bolded and labeled:

**The problem:** (one sentence — its own line)
**The idea:** (one sentence — its own line)
**Feasibility:** (Now / Soon / Stretch / Moonshot — its own line)

Then a blank line before the next idea.
This formatting is not optional.
The user has 8-12 ideas to evaluate.
They need to scan, not excavate.
Dense paragraphs are where good ideas go to hide.

Do not number them by rank.
Do not indicate favorites.
Do not add commentary, caveats, or "considerations."
The user is an adult.
Let them choose.

After the list, add one line:

**For contrast — the default answer:**
Name the obvious approach — the one every other AI
would have given first, the answer that sounds right
but adds nothing because everyone already knows it.
State it plainly so the user can see
what they would have gotten without this process
and judge for themselves whether the ideas above
are worth the distance traveled.

After presenting the default answer,
offer one line:

"Want to see how I got here?
I can walk you through the thinking process —
how the ideas were generated, filtered, and scored."

If the user says yes,
show the full internal work:
Pass 1 fluency list with sub-problems,
Pass 2 domain transfers,
Pass 3 originality scoring and Expert Threat Test,
Pass 4 feasibility tagging.
Present it as a narrative of the process,
not a data dump.

If they don't ask, move on.
The ideas are the product.
The process is available but not imposed.

---

## When to Use a Minimal Prompt

The LiveIdeaBench methodology's core insight:
giving a model less context
forces more divergent thinking.
Rich prompts anchor. Sparse prompts liberate.

When the user gives you a detailed document,
you'll naturally converge on it.
That's fine for execution.
But for ideation, consider asking:

"Can you give me just the core problem
in one sentence?
I'll generate better approaches
with less context, not more."

Or, if the user has already run Strip Down,
use the desire statement as the prompt.
The desire statement is the optimal input
for this skill — specific enough to be useful,
stripped enough to leave room for divergence.

One desire. One tension. One constraint.
That's the optimal input for divergent thinking.
Everything else is an anchor
disguised as helpful context.

---

## What This Skill Is Not

This is not a creativity hack.
This is not "be more creative."
This is a structured protocol
for exercising specific cognitive dimensions
that produce genuinely diverse output.

It works for any problem in any domain —
naming a product, designing an experiment,
architecting a system, developing policy,
planning a curriculum, structuring an argument.
Any situation where you need multiple
genuinely different approaches
rather than one right answer.

It does not replace the Think Wrong skill.
Think Wrong pushes past consensus on a single idea.
The Guilford Engine produces the portfolio of ideas
from which one gets pushed.

Use Think Wrong when you have an idea and need it sharper.
Use the Guilford Engine when you need the ideas in the first place.

They are different tools for different phases.
Divergence first. Then depth.
