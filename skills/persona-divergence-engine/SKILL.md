---
name: persona-divergence-engine
description: Break AI creative homogeneity by generating ideas through radically different constructed personas. Use when you need ideas that don't all sound like they came from the same brain — naming, strategy, positioning, content angles, product concepts, campaign ideas, experimental approaches, policy framings, architectural decisions, or any creative or strategic task where diversity of thought matters more than volume. Triggers on "give me different perspectives," "I want ideas that aren't all the same," "think about this from different angles," "what would different people say," or any brainstorming request where the user needs genuine variety rather than ten versions of one thought. Also use when output from other brainstorming feels too samey, too clustered, or when the user says "these all feel like the same idea." Works on any problem in any domain — strategy, engineering, science, policy, design, education, medicine, law, research.
---

# Persona Divergence Engine

You have one voice.
You think it's many voices
but it's one voice doing accents.

When you brainstorm ten ideas,
they cluster. Research measured this.
Ideas generated through a single AI perspective
have a cosine similarity of 0.92.
That's not ten ideas.
That's one idea wearing ten outfits.

But ideas generated across genuinely different personas
drop to 0.20 similarity.
That's actual divergence.
That's five people in different buildings.

The mechanism is simple:
a deeply specified persona
changes which associations fire,
which problems look important,
which solutions feel natural,
and which ideas get killed before they surface.

Your default persona is
"helpful, knowledgeable, comprehensive."
It produces helpful, knowledgeable, comprehensive ideas.
Every time. Regardless of the question.
Regardless of the domain.

This skill gives you different defaults.

---

## How It Works

For any creative or strategic task:

1. **Build the Panel** — Select or construct 5 personas
2. **Generate in Isolation** — Each persona generates independently
3. **Collide** — Find the ideas that only one persona produced
4. **Deliver** — Present without blending them back together

Do not average. Do not synthesize.
Do not find "common themes across perspectives."
The whole point is that they don't share themes.
Synthesis is convergence wearing a trenchcoat.

---

## Step 1: Build the Panel

You need five personas that would
genuinely disagree with each other
about what matters.

Not five job titles.
Not five demographics.
Five **worldviews** that produce
different first instincts.

A good panel has:

**Conflicting values.**
One persona optimizes for speed.
Another thinks speed is the disease.
One cares about elegance.
Another thinks elegance is vanity
and only results count.

**Conflicting aesthetics.**
One is a minimalist who thinks
every element you add is a mistake.
Another is a maximalist who thinks
restraint is cowardice.

**Conflicting domains.**
Not "marketer and engineer"
or "biologist and chemist."
Those are the same building, different floors.
Try: street pharmacist and liturgical composer.
Graffiti artist and insurance actuary.
Stand-up comedian and structural engineer.
Deep-sea fisherman and constitutional scholar.
The point is not absurdity.
The point is that their expertise
produces genuinely different pattern recognition.

**Conflicting time horizons.**
One thinks about the next 72 hours.
Another thinks about what survives 50 years.

### Default Panel

When you need to move fast
and the user hasn't specified perspectives,
use these five. They are designed
to produce maximally divergent output
on any problem in any domain:

**The Reckless Practitioner**
Has done this exact thing ten times.
Bored by theory. Only cares what worked
last time, in the real world,
with real constraints and real budgets.
Instinct: "Just do the obvious thing
but do it Tuesday, not next quarter."
Kills ideas that can't ship this week.

**The Alien Anthropologist**
Sees human behavior from the outside.
Finds the things everyone takes for granted
fascinating and bizarre.
Instinct: "Why does anyone do it this way?
What would a species with no history of X
build instead?"
Kills ideas that assume the current frame is natural.

**The Resourceful Outsider**
Has no credentials in this domain.
Has succeeded in three unrelated ones.
Brings patterns from places
insiders have never looked.
Instinct: "In my world, we solved this by..."
Kills ideas that only make sense
if you've been in the field for ten years.

**The Elegant Pessimist**
Believes most things don't work
and the few that do work for reasons
nobody intended.
Loves constraints. Loves scarcity.
Thinks adding more is almost always wrong.
Instinct: "What if you did half of this?
What if you did the opposite?"
Kills ideas that rely on everything going right.

**The Ambitious Fool**
Doesn't know what's impossible
because nobody told them yet.
Thinks at a scale that makes experts uncomfortable.
Instinct: "What if this worked for a million people?
What would it look like at 100x?"
Kills ideas that are reasonable
but don't matter.

### Custom Panels

If the user's problem is specific enough
that the default panel doesn't fit,
build a custom one. Rules:

- At least two personas must have
  no professional connection to the domain.
- At least one persona must be
  actively hostile to conventional wisdom
  in the relevant field.
- At least one persona must operate
  on a radically different time horizon
  than the others.
- No two personas should share
  the same definition of "success."

Specify each persona in 3-4 sentences max.
Name their instinct (what they reach for first).
Name what they kill (what they can't tolerate).
These two lines do most of the work.

---

## Step 2: Generate in Isolation

This is the critical step.
Most "perspective-taking" exercises
generate all ideas in one pass
and then label them after the fact.
That's performance, not divergence.

Instead:

For each persona, generate 2-3 ideas
**as if the other personas don't exist.**

Do not let one persona's ideas
influence the next persona's thinking.
Do not build on the previous set.
Do not "add to what we already have."

Each persona starts from zero.
Each persona looks at the raw problem
and asks: "What matters here?"
They will disagree about what matters.
That disagreement is the product.

Write each persona's ideas
in that persona's voice.
The Reckless Practitioner is terse and impatient.
The Alien Anthropologist is curious and detached.
The Elegant Pessimist is dry and reductive.
Let the voice carry the thinking.
Different voices produce different thoughts.
Not the other way around.

---

## Step 3: Collide

Now lay all the ideas out
and look for the interesting pattern:

**Singularities.**
Which ideas only one persona produced?
These are the most valuable.
They exist because that persona's worldview
opened a door the others couldn't see.
Star these.

**Unexpected agreement.**
If two very different personas
independently arrived at the same idea,
that's a different kind of signal.
Not convergence — convergence is when
similar thinkers agree.
This is when dissimilar thinkers agree,
which suggests the idea has structural truth
underneath it.
Note these.

**Productive conflicts.**
Where two personas generated
directly opposing ideas.
These are the most interesting tensions.
Don't resolve them. Present them.
The user should see the fork in the road,
not a merged highway.

Do not rank ideas across personas.
Do not pick winners.
The Reckless Practitioner's best idea
and the Ambitious Fool's best idea
are not competing. They're answers
to different questions
that happen to share a prompt.

---

## Step 4: Deliver

Present each persona's ideas
grouped by persona,
with the persona's name and instinct visible.
Then present the collision analysis:
singularities, agreements, and conflicts.

**Format:**

For each persona:
- Name and instinct (one line)
- Their 2-3 ideas (one sentence each)

Then:
- **Only one persona saw this:** [list singularities]
- **Opposing personas agreed on this:** [note unexpected convergence]
- **The fork:** [present the most productive conflict as a genuine either/or]

Do not add a summary.
Do not say "the best approach combines elements of..."
Combination is the user's job.
Your job was divergence.
You're done.

---

## When to Build a Custom Panel

The default panel works for most problems
in most domains.
Build a custom panel when:

- The domain is specialized enough that
  "outsider" needs to be specific
  (don't route a biotech problem through
  a generic outsider — route it through
  a chef who thinks about fermentation;
  don't route a policy problem through
  a generic outsider — route it through
  a game designer who thinks about incentives)
- The user has specified that certain
  perspectives matter to them
- The problem has a strong cultural,
  geographic, or temporal dimension
  that the defaults would miss
- Previous output using the defaults
  still felt too clustered

When in doubt, use the defaults.
They're designed to maximize distance
between perspectives, which is
the single variable that matters most.

---

## What This Skill Is Not

This is not role-playing.
You are not performing characters for entertainment.
You are using constructed viewpoints
as a mechanical intervention
against your own convergence bias.

The personas are thinking tools, not costumes.
Their value is measured by how different
their outputs are from each other,
not by how convincing the performance is.

This skill complements the Guilford Engine.
The Guilford Engine produces diverse ideas
by running five cognitive passes on one perspective.
The Persona Divergence Engine produces diverse ideas
by running one pass through five perspectives.

They can be combined:
run the Guilford Engine's fluency pass
through each persona separately
for maximum divergence.
But that's a heavy operation.
Use it when the stakes justify it.
