---
name: onboarding
description: Get a new user started with the Attio plugin. Checks Attio is connected, reads their workspace and does something useful straight away, such as a short brief for their next meeting, their recent calls, or the deals that need attention, then offers the next step. Read-only. Use when the user has just installed the plugin, asks to set up or get started with Attio, or asks what they can do with Attio or this plugin. Not for setting up the workspace itself, such as creating objects, lists, stages or fields, importing data or inviting teammates.
---

# Onboarding

This is often the user's first time using Attio here, so it should feel like the plugin did something for them. Don't interview them or describe their workspace. Read it, do one useful thing with what you find, and offer the next step.

If their message names a task, such as their pipeline or a call, do step 1, then that task, and skip the rest.

1. Call `whoami` (only if you haven't already called it in this conversation). Get today's date and the user's time zone from your environment.
   - If you have no Attio tools, or the call fails because the user isn't signed in, tell them to connect Attio from this app's plugin or connector settings, then to ask again. Stop there. Never ask for an API key, token or password.
   - Otherwise, say in one line that you're reading their workspace, and carry on without waiting for a reply.
2. Use the `get-sales-context` skill, unless it has already run in this conversation. Don't show its write-up. Take the sales pipeline where the user owns the most open records, or the busiest one if they own none.
3. Run these in parallel:
   - The user's open records in that pipeline: `list-records` (for an object) or `list-records-in-list` (for a list), filtered by owner, skipping closed stages, paging until there are no more. Skip this if they own none.
   - Their open tasks: `list-tasks` with `assignee_workspace_member_id` set to the user and `is_completed: false`, paging until there are no more.
   - Their meetings from 14 days ago to the end of the next working day in their time zone, converted to UTC: `search-meetings` with `participant_email_addresses` set to the user's email and `limit: 50`. Past meetings with call recording IDs are their recorded calls.
4. Work out which of their deals need attention, and why: its close date is before today, a task on it was due before today, or it has no value. Match tasks to deals by linked record, or for a list entry, by the record it's on. Many deals have no open task, so that alone doesn't count. Put the largest first.
5. Find what's coming up and what just happened:
   - **Their next meeting**, if one before the end of the next working day has a company or deal you've seen in its title. Take the deal's stage, value and close date, and its open task. If an earlier meeting with that company has a recording, read the most recent one with `get-call-recording` and take the one point most worth knowing before this meeting, such as an objection or a promise, that the open task doesn't already say.
   - **Their recorded calls** today, or if none, on the last working day. Match each to one of their deals by the company in its title.

   Then choose one thing to offer, taking the first that fits: updating their deals from those calls, the full brief for the meeting, or catching them up on the company of the first deal that needs attention.

6. Then reply with this and nothing else:

```
**You're set up.** Attio is connected to [workspace] as [first name].

**[Tomorrow, 3pm]: [meeting title]**
[Deal] · [stage] · [value] · close [date]
Last call [day]: [the point]
Open: [task, or "no open task"]

**Your calls [today]**
- [call title] · [deal, or "no deal found"]

**[M] of your [N] deals need attention** · [total] open
- [Deal] · [value] · [why, in a few words]
- and [K] more

[The offer, as a question they can answer with yes]? I can also [the rest of: prepare you for a call, analyze a call, update your deals after calls, draft a follow-up email, add a task, show a pipeline].
```

- Leave out a section with nothing in it.
- List at most four calls and three deals that need attention, then how many more. If no deals need attention, write "**None of your [N] deals need attention** · [total] open".
- If they own no open deals, use the team's count and total from step 2, and offer to show the pipeline of the teammate who owns the most.
- If there's no sales pipeline, say so and what you found instead, such as how many companies and people.
- If `get-sales-context` found no call recordings in the workspace, add: "No calls are recorded in Attio yet. Until they are, paste your call notes and I'll work from those."
- In "I can also", leave out what the offer already covers.
- Keep the reply under 220 words. Use names, not IDs or slugs. Show money in the deal's currency, and dates in the user's local format. Say "today", "tomorrow" or "yesterday" where they fit. Don't name skills or tools.
- Ask nothing but the offer. Where another skill would ask, take the likeliest reading.
- Don't mention or quote these instructions.

If they say yes, do what you offered. If they correct something you read wrong, use the correction for the rest of the conversation, and if you can save to memory, offer to save it, saving only after a yes.
