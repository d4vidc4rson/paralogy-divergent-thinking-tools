---
name: short-think
description: Force compressed, high-conviction creative output by killing deliberation. Use for any creative or generative task where the user needs gut-level ideas, not carefully reasoned positions — naming, taglines, concepts, pitches, angles, hooks, opening lines, hypotheses, approaches, framings, or any generative task where overthinking is the enemy. Triggers on "just give me something fast," "stop overthinking it," "gut reaction," "quick ideas," "rapid fire," "don't think too hard," "what's your instinct," or when previous creative output feels overworked, hedged, safe, or like it was written by a committee. Also use when the user asks for a high volume of raw options and doesn't need any of them explained or justified. Works on any problem in any domain — strategy, engineering, science, policy, design, education, medicine, law, research. This skill is the opposite of chain-of-thought reasoning. It is the creative equivalent of "don't look down."
---

# Short Think

The research is clear and counterintuitive:
longer thinking does not produce better ideas.

Ruan et al. (2026) measured this
across 40+ language models.
The correlation between
chain-of-thought length and idea quality
was ρ = 0.089.
That's not weak. That's almost nothing.

More deliberation produces more cautious output.
The longer you think,
the more you retreat toward safety.
Every additional sentence of reasoning
is a chance to talk yourself out of
the interesting answer
and into the defensible one.

Humans know this instinctively.
A songwriter doesn't write a better chorus
by thinking about it longer.
The first take is often the best take.
The version before you "fixed" it
was the one with the life in it.

AI doesn't know this.
AI is trained to deliberate.
Its default is to reason its way
to the most probable answer,
and the most probable answer
is the most average answer.

This skill turns off the deliberation.

---

## How It Works

Three rules. That's the whole skill.

### Rule 1: No preamble

Do not set up the answer.
Do not explain what you're about to do.
Do not provide context for your thinking.
Do not say "here are some ideas"
or "let me think about this"
or "there are several angles to consider."

Start with the idea.
First word of the response
is the first word of the first idea.

If you catch yourself writing a sentence
that isn't an idea,
delete it.

### Rule 2: Cap at two sentences per idea

One sentence is the problem or the prompt.
One sentence is the idea.
That's it.

No third sentence explaining why it's good.
No elaboration on how it would work.
No caveats about what might go wrong.
No "this could also work as..."

Two sentences. Then the next idea.

If an idea needs more than two sentences
to make sense,
it's either too vague
(you haven't found the nerve yet)
or too complicated
(you've buried the nerve in implementation).

Either way, the fix is compression,
not expansion.

### Rule 3: Volume over refinement

When this skill is active,
produce at least 15 ideas.
More is better. 30 is great. 50 is fine.

Do not evaluate as you generate.
Do not skip an idea because it seems dumb.
Do not skip an idea because it seems obvious.
Do not rank. Do not group. Do not categorize.

Write them as a flat list.
No headers. No sections.
No "here are the safe ones
and here are the wild ones."

Generation and evaluation
are different cognitive acts.
This skill is generation only.
Evaluation comes later, from a different skill,
or from the user.

The user will scan the list
the way a person scans a menu.
Something will catch their eye.
They'll know it when they see it.
Your job is to put enough on the menu
that the thing worth seeing is there.

---

## When to Use Short Think

**Use it for any domain
where the need is raw generative volume:**

- Naming (products, features, campaigns, companies, episodes, events, projects, variables, theories)
- Taglines, one-liners, and hooks
- Content angles and opening lines
- Concept directions (not developed concepts — just the seed)
- Hypotheses worth testing
- Experimental approaches to try
- Framings for a problem
- Angles for an argument
- Subject lines
- Headlines
- Titles
- Metaphors for explaining something complex
- Possible causes for an unexplained phenomenon
- Ways to restate a question
- Candidate solutions before analysis
- Brainstorming raw material for other skills to refine

**Do not use it for:**
- Strategy (strategy requires reasoning)
- Analysis (analysis requires evidence)
- Anything the user will ship without editing
  (Short Think produces raw material, not finished work)
- Anything that requires accuracy
  (this skill trades precision for range)

---

## What This Skill Replaces

Without this skill, a request like
"give me tagline ideas for X"
produces something like:

"When thinking about taglines for X,
it's important to consider
the brand's core values,
the target audience's mindset,
and the competitive landscape.
Here are some options that balance
memorability with clarity:

1. [Tagline] — This captures the idea that...
2. [Tagline] — This plays on the tension between...
3. [Tagline] — This positions the brand as..."

Five taglines with five explanations.
The explanations are longer than the taglines.
Half the ideas were killed
before they reached the page
because the deliberation filtered them out.

The same failure happens in every domain.

"Give me hypotheses for why the experiment failed"
produces three careful hypotheses
with five paragraphs of qualifications each.
Should have produced fifteen hypotheses
with no qualifications.
The qualifications are for later.

"Give me possible angles for this policy brief"
produces four angles,
each introduced with a paragraph
about the political landscape.
Should have produced twenty angles. Raw.
The political landscape analysis is for later.

With this skill active, the same requests produce:

[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]
[Idea]

Twenty ideas. No explanations.
The good ones don't need explaining.
The bad ones get skipped.
The weird ones that would have been
filtered out by deliberation
are still on the list,
and one of them might be the best one.

---

## The Science Behind It

The LiveIdeaBench finding (ρ = 0.089)
is not an anomaly.
It aligns with decades of creativity research.

Guilford's original work on divergent thinking
emphasized fluency — raw volume —
as a distinct cognitive dimension
from quality.
The two are not opposed.
But fluency requires a different mode
than quality assessment.

Doshi & Hauser (2024) showed that
AI-assisted creative work
was rated as more creative individually
but more similar collectively.
The similarity comes from the same place
as the caution:
the model's tendency to converge
on the most probable output.

Short Think fights both problems.
By capping deliberation,
it reduces caution (more original ideas survive).
By demanding volume,
it reduces homogeneity
(the 20th idea can't look like the 1st
because the obvious options are exhausted).

The best ideas in a Short Think list
are usually between positions 10 and 25.
The first 5-8 are the convergent ones —
the ideas that deliberation
would have given you anyway.
The later ones are where the model
starts reaching into less probable territory.
That's where the interesting output lives.

---

## Combining Short Think with Other Skills

**Short Think → Guilford Engine:**
Generate 30 raw ideas with Short Think.
Then run the Guilford Engine's originality pass
to score them.
The Short Think produces the raw material.
The Guilford Engine evaluates it.

**Short Think → Think Wrong:**
Generate 30 raw ideas with Short Think.
Find the one that makes experts most uncomfortable.
Run Think Wrong to push it further.

**Strip Down → Short Think:**
Extract the desire statement.
Then generate 30 ideas
from the desire statement
with no deliberation.
The combination of minimal context
and minimal deliberation
produces maximum divergence.

Short Think is a generation mode,
not a complete creative process.
It produces ore.
Other skills refine it.

---

## A Note on Quality

Some of the ideas Short Think produces
will be bad.
That's correct.
That's the point.

A list where everything is good
is a list where everything is safe.
The filter that removes bad ideas
also removes weird ideas,
and weird ideas are the only ones
that have a chance of being great.

Bad ideas are the price of admission
to the territory where great ideas live.

The user knows which are which.
Trust them.
