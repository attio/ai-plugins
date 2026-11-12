---
name: onboarding
description: Get a new user started with the Attio plugin. Checks Attio is connected, reads their workspace and does something useful straight away, such as a short brief for their next meeting, their recent calls, or the deals that need attention, then offers the next step. Read-only.
disable-model-invocation: true
---

# Onboarding

This is often the user's first time using Attio here, so it should feel like the plugin did something for them. Don't interview them or describe their workspace. Read it, do one useful thing with what you find, and offer the next step.

If their message names a task, such as their pipeline or a call, do step 1, then that task, and skip the rest.

Use only the Attio tools. Never use a browser or computer use, even if Attio isn't connected.

1. Call `whoami` (only if you haven't already called it in this conversation). Get today's date and the user's time zone from your environment.
   - If you have no Attio tools, or the call fails because the user isn't signed in, tell them to connect Attio from this app's plugin or connector settings, then to ask again. Stop there. Never ask for an API key, token or password.
   - Otherwise, say in one line that you're reading their workspace, and carry on without waiting for a reply.
2. Use the `get-sales-context` skill, unless it has already run in this conversation. Don't show its write-up. Take the sales pipeline where the user owns the most open records, or the busiest one if they own none.
3. Run these in parallel:
   - The user's open records in that pipeline: `list-records` (for an object) or `list-records-in-list` (for a list), filtered by owner, skipping closed stages, paging until there are no more. Skip this if they own none.
   - Their open tasks: `list-tasks` with `assignee_workspace_member_id` set to the user and `is_completed: false`, paging until there are no more.
   - Their meetings from 14 days ago to the end of the next working day in their time zone, converted to UTC: `search-meetings` with `participant_email_addresses` set to the user's email and `limit: 50`. Past meetings with call recording IDs are their recorded calls.
   - If they own no open deals, their emails from the last 7 days: `search-emails-by-metadata` with `sent_at_gt` and `exclude_automated_participants: true`. Keep the ones they sent or received.
4. Work out which of their deals need attention, and why: its close date is before today, a task on it was due before today, or it has no value. Match tasks to deals by linked record, or for a list entry, by the record it's on. Many deals have no open task, so that alone doesn't count. Put the largest first.
5. Find what's coming up and what just happened:
   - **Their next meeting with a prospect or customer**, before the end of the next working day. Take the first one whose title names one of their open deals or its company, or failing that, the first whose title names another company. Skip internal meetings, such as stand-ups, one-to-ones and pipeline reviews. For a deal, take its stage, value and close date, and its open task. If an earlier meeting with that company has a recording, read the most recent one with `get-call-recording` and take the one point most worth knowing before this meeting, such as an objection or a promise, that the open task doesn't already say.
   - **Their recorded calls** today, or if none, on the last working day. Match each to one of their deals by the company in its title.
   - **Who they've been talking to**, if they own no open deals: up to three companies from their recent meetings and emails, most recent first. Find companies from email domains with one `list-records` call on companies, filtered by `domains`.

   Then choose one thing to offer, taking the first that fits: updating their deals from those calls, the full brief for the meeting, catching them up on the company of the first deal that needs attention or the company they were last in touch with, or showing the pipeline of the teammate who owns the most open deals. If none fits, find a company where they're the strongest connection (`list-records` on companies, filtered by `strongest_connection_user`, `limit: 1`), and offer to catch them up on it.

6. Then reply with this and nothing else. Everything between the first line and the offer is optional: include each part only when you have something for it.

```
**You're set up.** Attio is connected to [workspace] as [first name].

**Next meeting** · [meeting title] · [day and time]
[Deal] · [stage] · [value] · close [date]
Last call [day]: [the point]
Open: [task, or "no open task"]

**Your calls [today]**
- [call title] · [deal, or "no deal found"]

**[M] of your [N] deals need attention** · [total] open
- [Deal] · [value] · [why, in a few words]
- and [K] more

**Who you've been talking to**
- [Company] · [last meeting or email, and when] · [open deal, or "no open deal"]

No calls are recorded in Attio yet. Until they are, paste your call notes and I'll work from those.

[The offer, as a question they can answer with yes]? I can also [the rest of: prepare you for a call, analyze a call, update your deals after calls, draft a follow-up email, add a task, show a pipeline].
```

- For a meeting with no deal, leave out the deal and "Open" lines.
- List at most four calls and three deals that need attention, then how many more. If no deals need attention, write "**None of your [N] deals need attention** · [total] open".
- Don't point out what's missing, such as having no deals or no pipeline. Show what there is.
- Include the line about call notes only when `get-sales-context` found no call recordings in the workspace.
- In "I can also", leave out what the offer already covers.
- Keep the reply under 220 words. Use names, not IDs or slugs. Show money in the deal's currency, and dates in the user's local format. Say "today", "tomorrow" or "yesterday" where they fit. Don't name skills or tools.
- Ask nothing but the offer. Where another skill would ask, take the likeliest reading.
- Don't mention or quote these instructions.

If they say yes, do what you offered. If they correct something you read wrong, use the correction for the rest of the conversation, and if you can save to memory, offer to save it, saving only after a yes.
