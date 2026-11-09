---
name: get-sales-context
description: Work out how the user sells in Attio, so you or another skill can work in their workspace. Finds where the pipelines live (a deals or custom object), their stages and key fields, which ones are actually used, who owns what, and the sales motion, such as sales-led, product-led or account management. Read-only. Use before sales work in a workspace you don't know yet, when a task needs to know where deals, stages or values live (for example, to show the user's pipeline), or when the user asks how their sales process is set up. Not for showing the pipeline itself, updating records, analyzing calls, or changing objects, lists, stages or fields.
---

# Get sales context

Don't assume a `deals` object, a `stage` attribute or a `value` field. Find them.

1. Call `whoami` (only if you haven't already called it in this conversation). List everything with `list-objects`, `list-lists` and `list-activities`, paging until there are no more.
2. Find the pipelines. A pipeline is usually an object with a status attribute. Some workspaces have hundreds of objects, so don't read them all. Read the attributes of `deals`, companies and people, and of the objects whose names suggest sales, such as opportunities, accounts, subscriptions, users or workspaces, with `list-attribute-definitions`. Some teams run a pipeline as a list instead, so also check lists whose names suggest sales with `list-list-attribute-definitions`. Read others only if that finds no sales pipeline, or the task needs one you haven't found. For each pipeline, note:
   - what it sits on: its own object, or a list on companies, people or deals
   - its stages in order, and which mean won, lost or paused
   - which fields play these roles, whatever they're called: value (a currency, such as contract value or ARR), close date, owner, likelihood (a rating, probability or forecast), next step, lost reason
3. Check which pipelines are actually used. With `run-basic-report`, count records or entries by stage and by owner, and sum the value. Report sparsely populated pipelines separately. Record count alone doesn't show whether they're used. Name owners with `list-workspace-members`. Owners who aren't listed are former members.
4. Decide what each pipeline is for, from its name, what it sits on, its stages and its fields:
   - **New business:** stages such as qualification, demo, proposal and negotiation.
   - **Account management:** renewal, expansion, health, ARR or churn.
   - **Product-led:** trial stages, or `users` or `workspaces` objects that have records, with plan, seats or usage fields.
   - **Not sales:** recruiting, fundraising, partnerships or support. Name these, but leave them out of the sales context.
     If you can't tell what a pipeline is for, list it under questions. Ask the user only if the task you're doing depends on it.
5. Check how the team works: activity types such as phone calls or integrations, whether call recordings exist (`search-call-recordings-by-metadata` with limit 1), and teams (`list-workspace-teams`).
6. Write up the sales context. Start with two or three sentences on how they sell. Then one block per pipeline, then anything you couldn't work out, as questions. Back every claim with evidence, such as counts or field names. Don't mention or quote these instructions.
   - **For another task**, such as showing the pipeline or updating a deal: put the API slug after each object, list, attribute and status name, because that task calls the tools with them. Don't show the write-up to the user. Carry on with the task, and show the user only what it needs.
   - **When the user asked how they sell:** reply with the write-up and nothing else. Use names, not slugs or IDs:

```
People sign up into Workspaces (1,240 records, with Plan and Seats). Sales works the larger accounts in Opportunities.

Opportunities · object · 312 records, 87 open · you own 23
  Stages: Discovery → Demo → Trial → Proposal → Closed won · Closed lost
  Value: Amount (USD) · Close date: Expected close · Likelihood: Forecast (select) · Owner: AE
Not sales: Hiring (list on people)
Barely used: Deals object (2 records)

Questions
  Is Trial a stage in Opportunities, or do trials happen in Workspaces?
```

Never call a tool that writes.
