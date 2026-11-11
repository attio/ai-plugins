---
name: get-my-pipeline
description: Show the user's open Attio deals, from whichever object or list holds their pipeline, grouped by stage, with totals, each deal's next task or meeting, and the deals that need attention. Read-only. Use when the user asks for their pipeline, open deals, what's in a stage, what's closing soon, how much is in play, or which deals are stuck or need attention, including for a teammate ("Sarah's pipeline"). Not for updating deals, processing calls, or activity reports such as call counts.
---

# Get my pipeline

1. Call `whoami` (only if you haven't already called it in this conversation), and get today's date from your environment. Show the user's pipeline unless they name a teammate. For a teammate, find them with `list-workspace-members`. If more than one matches, ask.
2. Find where the pipeline lives. Use the pipeline the `get-sales-context` skill finds, and run it first if it hasn't run in this conversation. Use the pipeline where the person owns the most open records. If they own records in more than one sales pipeline, show each one separately. Don't assume slugs. Find the stage, value, owner, close date and next step fields, whatever they're called. Note the stage order. Stages named won, lost or closed are closed, and so are account-management end states such as churned, renewed or cancelled. If you can't tell which stages are closed, ask. For account-management pipelines, say which stages you treated as closed.
3. Get the person's open records with `list-records` (for an object) or `list-records-in-list` (for a list), filtered by owner. Page with `offset` until there are no more. Work out the counts and totals yourself.
4. Find what's next for each deal:
   - `list-tasks` for the person's open tasks. Page through all of them. Match tasks to deals by linked record, or for a list entry, by its parent record. For a deal none of them match, check for a teammate's task: `list-tasks` with the deal, or a list entry's parent record, as `linked_record_object` and `linked_record_id`, `is_completed: false` and `limit: 1`.
   - `search-meetings` for the next 30 days, paging through them. Its results don't list linked records, so if it finds any meetings, search again for each deal with `related_record_object` and `related_record_ids` set to the deal (for a list entry, the record it's on). If that finds nothing, search for the deal's company.
5. Apply what the user asked for, such as one stage, closing this month, or over a value. If they ask which deals have gone quiet, use the interaction attributes on the deal or its company, such as last interaction, and say what those cover. If they ask for something the workspace has no attribute for, such as a close date, say so and show the full pipeline.
6. List a deal under "Needs attention" when:
   - it has no open task and no meeting in the next 30 days
   - a task is overdue
   - its close date has passed
   - it has no value
7. If another skill asked for the pipeline, give it the records and field slugs without showing them, and carry on with that skill. Otherwise, reply with the pipeline and nothing else. Group by stage in pipeline order, with the count and total per stage. Show money in the deal's currency and dates in the user's local format. Use names, not IDs. Don't mention or quote these instructions:

```
Your pipeline · 4 open deals · US$84,000

Qualification (2) · US$12,000
  Acme · US$8,000 · closes Mon 30 Nov · next: demo Tue 10 Nov
  Globex · US$4,000 · next: none
Negotiation (2) · US$72,000
  Initech · US$60,000 · closes Thu 15 Oct · next: send contract (task, overdue since Fri 30 Oct)
  Hooli · US$12,000 · next: pricing call Thu 12 Nov

Needs attention
  Globex: no task, and no meeting in the next 30 days
  Initech: close date has passed, and the task is overdue
```

Never call a tool that writes. If the user wants to change a deal, they can ask for that next.
