---
name: anti-homogeneity-check
description: Post-generation diversity audit that scores whether a set of ideas are actually different from each other or just surface variations of the same thought. Use AFTER any brainstorming, ideation, or creative generation — from any source, any skill, any person — when you need to know if your "ten different ideas" are actually ten ideas or three ideas wearing costumes. Triggers on "are these actually different," "these all feel the same," "did I just write the same idea five times," "check these for diversity," "which of these overlap," or any moment after generating a list where the user wants to know what they actually have before moving forward. Also use automatically as a quality gate after any other creative skill produces output, or when a user pastes in a list of ideas from anywhere and wants them audited. Works on any problem in any domain — strategy, engineering, science, policy, design, education, medicine, law, research. This is the bullshit detector for brainstorms.
---

# Anti-Homogeneity Check

You just generated ten ideas.
How many ideas do you actually have?

The research says: probably three.

Doshi & Hauser (2024) proved that
AI-assisted creative output
is rated more creative individually
but is significantly more similar collectively.
Wenger & Kenett (2025) confirmed that
LLMs show high creative homogeneity
even across different model families.
Ideas from a single AI perspective
cluster at 0.92 cosine similarity.

That means most brainstorms —
whether from AI, from a team meeting,
or from a solo session at midnight —
produce the illusion of variety
while actually circling the same center.

This happens in every domain.
Marketing brainstorms produce ten ideas
that are all "get attention through someone else's audience."
Engineering brainstorms produce ten ideas
that are all "add another layer of abstraction."
Research brainstorms produce ten ideas
that are all "run the same experiment with a larger sample."
Policy brainstorms produce ten ideas
that are all "expand the existing program."
Education brainstorms produce ten ideas
that are all "make the same lesson more engaging."

The surface looks different.
The skeleton is the same.

This skill is the x-ray.
It shows you the skeleton underneath
the ten ideas that look different on the surface,
so you can see how many bones
you're actually working with.

---

## How It Works

Feed this skill any list of ideas.
From any source. Any format. Any domain.

It does three things:

1. **Cluster** — Groups the ideas by what they actually share underneath
2. **Grade** — Scores the overall diversity of the set
3. **Diagnose** — Tells you what's missing

It does not generate new ideas.
It does not fix the list.
It tells you what you have
so you can decide what to do about it.

---

## Step 1: Cluster

For every idea in the list,
ask: **"What underlying move is this making?"**

Not what the idea says on the surface.
What it's doing underneath.

The clustering logic is the same in every domain.
Only the vocabulary changes.

**In marketing,** these look like three different ideas:
- "Launch a TikTok series"
- "Partner with influencers"
- "Build a social media community"

Underneath, they're all making the same move:
**"Get attention through other people's audiences online."**
One idea. One cluster. Three costumes.

**In engineering,** these look like three different ideas:
- "Migrate to microservices"
- "Implement event-driven architecture"
- "Decompose into bounded contexts"

Underneath, they're all:
**"Break the monolith into smaller pieces."**
One idea. Three architecture diagrams.

**In science,** these look like three different ideas:
- "Screen a larger compound library"
- "Apply machine learning to predict candidates"
- "Use high-throughput assays"

Underneath, they're all:
**"Search faster through the same solution space."**
One idea. Three methods.

**In policy,** these look like three different ideas:
- "Increase funding for the program"
- "Expand eligibility requirements"
- "Scale the pilot to more districts"

Underneath, they're all:
**"Do the current thing bigger."**
One idea. Three budget line items.

**Conversely,** these two might look similar:
- "Host a dinner for 20 people"
- "Send handwritten letters to 200 people"

Underneath, they're making different moves:
The dinner creates **intimacy through shared experience.**
The letters create **intimacy through personal effort at scale.**
Different clusters. Similar surface, different bones.

### How to name the cluster

The cluster name is the move, not the tactic.
State it as a verb phrase.
What is this idea *doing*?

Good cluster names:
- "Get attention through borrowed audiences"
- "Search faster through the existing solution space"
- "Break complex systems into smaller independent parts"
- "Replace the ask with an invitation"
- "Use scarcity to manufacture desire"
- "Change what we measure rather than what we do"
- "Remove a step instead of improving it"

Bad cluster names (too vague):
- "Marketing ideas"
- "Technical improvements"
- "Policy interventions"
- "Engagement"

Bad cluster names (too specific):
- "TikTok ideas"
- "Microservices ideas"
- "Grant-funded approaches"

The cluster name should be specific enough
that you can immediately tell
whether a new idea belongs in it or not,
but abstract enough that it describes the move
rather than the medium.

### Present the clusters

Group every idea under its cluster name.
Show the user what they actually have.

**Example output (nonprofit context):**

**Cluster 1: "Borrow credibility from trusted voices" (3 ideas)**
- Partner with podcasters for sponsored segments
- Get featured in local newspaper profiles
- Have existing customers write testimonials

**Cluster 2: "Create physical artifacts of belonging" (2 ideas)**
- Design membership tokens
- Install trail markers with donor names

**Cluster 3: "Embed in existing routines" (2 ideas)**
- Partner with local businesses for member perks
- Include membership in real estate closing costs

**Cluster 4: "Make knowledge the status signal" (1 idea)**
- Build interactive Water Census map

**Cluster 5: "Replace charity framing with club framing" (1 idea)**
- $700 membership, word "donate" disappears

**Example output (research context):**

**Cluster 1: "Search the existing space faster" (4 ideas)**
- High-throughput screening
- ML-predicted compound prioritization
- Larger sample sizes
- Automated assay pipelines

**Cluster 2: "Redefine what we're looking for" (1 idea)**
- Measure population-level genomic shifts instead of individual survival

**Cluster 3: "Change who's looking" (1 idea)**
- Collaborate with ecologists who study non-resistance adaptations

Now the user can see the truth:
they thought they had six ideas.
They actually have three moves,
and one of those moves has four ideas in it
that are all doing the same thing.

---

## Step 2: Grade

Score the overall diversity of the set
using the LiveIdeaBench fluency system,
adapted for a full list rather than pairs.

### The grading scale

**Grade A — Genuine portfolio.**
5+ distinct clusters.
No cluster contains more than 30% of the ideas.
The clusters address different problems,
use different mechanisms,
and would appeal to different stakeholders.
This is a real brainstorm with real variety.

**Grade B — Decent spread with one gravity well.**
4+ distinct clusters,
but one cluster is overweight (40%+ of ideas).
There's variety, but there's also
a clear center of gravity pulling the set
toward one kind of thinking.
Usable but lopsided.

**Grade C — Illusion of variety.**
2-3 clusters.
Most ideas are doing the same thing
in different clothes.
This is what most brainstorms produce.
It feels like you have options
but you're actually choosing between
flavors of the same answer.

**Grade D — Monoculture.**
1-2 clusters.
Everything is the same idea.
The "brainstorm" was really
one thought exploring its own surface area.
Start over.

### Present the grade

State the grade.
State the cluster count.
State which cluster is heaviest.

Keep it blunt:

"**Grade B.** You have 5 clusters
but 40% of your ideas are variations on
'borrow someone else's audience.'
You have real variety in the other 60%
but your center of gravity
is pulling everything toward distribution tactics."

Or:

"**Grade C.** You have 8 ideas
but they sort into 2 clusters.
Six of them are different ways to
'search the same space faster.'
Two of them are different ways to
'redefine what counts as a result.'
You have two ideas, not eight."

Or:

"**Grade C.** You have 12 policy proposals
but they sort into 3 clusters.
Seven of them are different ways to
'expand the existing program.'
Three are different ways to
'add enforcement mechanisms.'
Two actually change the underlying model.
You have three ideas, not twelve."

---

## Step 3: Diagnose

Tell the user what's missing.
Not by generating new ideas —
by identifying the empty spaces.

### Find the gaps

Look at the clusters you found
and ask: **what kind of move
is completely absent from this set?**

Common missing dimensions:

**Time horizon gaps.**
Are all the ideas short-term?
Is anything here a long play?
Is anything here about next week?

**Mechanism gaps.**
Is everything the same type of action?
All digital, nothing physical?
All intervention, nothing structural?
All about acquiring new people/resources,
nothing about deepening what already exists?
All communication, nothing about systems?

**Audience gaps.**
Do all the ideas target the same group?
Is anyone being ignored who shouldn't be?

**Risk gaps.**
Is everything safe and implementable?
Where are the stretch ideas?
Where are the moonshots?
Or conversely — is everything ambitious
with nothing you could do Tuesday?

**Problem gaps.**
Are all the ideas solving the same sub-problem?
What sub-problems does this list completely ignore?

### Present the gaps

State 2-4 missing dimensions.
Don't generate ideas to fill them.
Just point at the empty space
and let the user decide
whether to fill it or not.

"**What's missing:**
Every idea here is about reaching new people.
Nothing addresses deepening relationships
with people you already have.
Every idea here operates through the same channel.
Nothing creates a different kind of experience.
There's no moonshot —
everything could ship this quarter,
which means nothing here
changes the trajectory long-term."

Or:

"**What's missing:**
Every approach here screens for the same thing
using different methods.
Nothing questions whether we're screening
for the right thing.
Nothing addresses the institutional incentives
that keep the field running
the same experiments.
There's no idea for what we publish
if the primary approach produces null results."

---

## When to Use This Skill

**Use it after:**
- Any brainstorm (from AI, from a team, from yourself)
- Guilford Engine output (as a quality check on the fluency pass)
- Persona Divergence Engine output (to verify the personas actually diverged)
- Short Think output (to sort the ore before refining)
- Any list of ideas from any source
  that the user wants audited before committing

**Use it automatically when:**
- A brainstorm produces more than 8 ideas
  (the bigger the list, the more likely
  there's hidden clustering)
- The user seems uncertain about whether
  their ideas are "different enough"
- You're about to help the user
  narrow down a list to their top picks
  (clustering first prevents them from
  picking three ideas that are secretly one idea)

**Don't use it:**
- On a single idea (nothing to compare)
- When the user has already decided
  and is in execution mode
- When the user explicitly wants
  deep variations on a single theme
  (deliberate clustering is fine —
  accidental clustering is the problem)

---

## What This Skill Is Not

This is not a ranking tool.
It doesn't tell you which ideas are best.
It tells you which ideas are *different.*

An idea can be in a cluster of one
and still be terrible.
An idea can be in a cluster of five
and still be the right answer.

Clustering is about variety, not quality.
Use other skills for quality assessment.
Use this one to see clearly
before you choose.

---

## Relationship to Other Skills

**After the Guilford Engine:**
The Guilford Engine has its own fluency check,
but it grades adjacent pairs.
This skill grades the full set.
Run it after the Guilford Engine's final output
to catch clustering the pair-check missed.

**After the Persona Divergence Engine:**
The whole point of the Persona Engine
is that different personas produce different ideas.
This skill verifies that they actually did.
If the Anti-Homogeneity Check gives a Grade C
to Persona Engine output,
the personas weren't different enough.

**After Short Think:**
Short Think produces 30 raw ideas
with no evaluation.
This skill is the first evaluation step:
before you score for originality or feasibility,
find out how many ideas you actually have.
If 30 ideas sort into 4 clusters,
you have 4 ideas to evaluate, not 30.

**Before any narrowing decision:**
Whenever a user is about to pick
their top 3 from a list of 10,
run this first.
If 6 of the 10 are in the same cluster,
the user needs to know that
before they accidentally pick three
that are all the same move.
