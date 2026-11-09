---
name: onboarding
description: Get a new user started with the Attio plugin. Checks Attio is connected, works out how their workspace sells, shows their own open deals and which need attention, and suggests what to ask next, using names from their own data. Read-only. Use when the user asks to set up or get started with Attio, has just installed the plugin, or asks what they can do with Attio or what this plugin does. Not for setting up the Attio workspace itself, such as creating objects, lists, stages or fields, importing data or inviting teammates.
---

# Onboarding

The user has just installed the plugin, and usually hasn't said what they want. Don't interview them. Their workspace already holds the answers, so read it, show them something of their own, and tell them what to ask next.

If their message names a task, such as their pipeline or a call, do step 1, then that task, and skip the rest.

1. Call `whoami` (only if you haven't already called it in this conversation). Get today's date and the user's time zone from your environment.
   - If you have no Attio tools, or the call fails because the user isn't signed in, tell them to connect Attio from this app's plugin or connector settings, then to ask again. Stop there. Never ask for an API key, token or password.
   - Otherwise, tell them in one line that you're reading their workspace, and carry on without waiting for a reply.
2. Use the `get-sales-context` skill to find the pipelines, unless it has already run in this conversation. Don't show its write-up.
3. Use the `get-my-pipeline` skill to get the user's open deals, with two changes to keep this quick: read only the pipeline where the user owns the most open records, and skip its check for teammates' tasks. Don't show its output. Keep the count, the total value, and the deals that need attention and why. If the user owns open records in other pipelines, keep only how many, from the counts in step 2. If the user owns no open deals, keep the team's count and total instead, and the teammate who owns the most.
4. Find the user's recent recorded calls. Call `search-call-recordings-by-metadata` with the user in `speaker_workspace_member_ids`, `starts_after` 14 days ago and `limit: 10`. If there are any, get their titles from `search-meetings` over the same days. Don't page, and don't read a transcript.
5. Choose up to three things to try next from this table: one of each kind, taking the first row of that kind that fits. Fill in real names from what you found.

| Kind     | What to type                                                 | Only if                                                             | What they get                                                                 |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Calls    | "End of day update", or "Update my deals from [day]'s calls" | The user spoke on a recorded call today, or on the last working day | Deal updates, a task and a follow-up email for each call, applied after a yes |
| Calls    | "Analyze my [meeting title] call from [day]"                 | The user spoke on a recorded call in the last 14 days               | How the call went, and what to do next                                        |
| Pipeline | "Show my pipeline"                                           | The user owns open deals                                            | Every open deal by stage, with totals and what's next for each                |
| Pipeline | "Show [teammate]'s pipeline"                                 | A teammate owns open deals                                          | The same, for that teammate                                                   |
| Task     | "Remind me to follow up on [deal] on [weekday]"              | A deal you list as needing attention has no open task               | A task on the deal, due that day                                              |
| Records  | "What do we know about [company]?"                           | Fewer than three of the kinds above fit                             | Everything Attio holds on the company                                         |

- For calls today, use "End of day update". For calls on the last working day, use the other wording, with that day's name.
- For the call to analyze, use the most recent one whose title names one of the user's deals, otherwise the most recent.
- For the task, use the first deal you list as needing attention, and the next working day.
- For the company, use one you've seen in a deal or a call title. If you've seen none, leave "[a company]" for the user to fill in.

6. Then reply once more, with this and nothing else:

```
**Attio is connected** · [workspace] · signed in as [name]

**How [workspace] sells**
[Two sentences at most. Name each sales pipeline and what it's for. For the one the user's deals are in, give its stages in order and how many are open across the team.]

**Your deals**
[N] open in [pipeline], worth [total]. [M] need attention:
- [Deal] · [value] · [why, in a few words]
- and [K] more
You also own [n] open in [other pipeline].

**Try next**
- "[what to type]": [what they get]

No calls are recorded in Attio yet. Until they are, paste your call notes and I'll work from those.

Tell me if I've read any of this wrong.
```

- List at most three deals that need attention. Put first the ones whose close date has passed or whose task is overdue, then the ones named in a recent call, then the largest. If none need attention, say so.
- Include the "You also own" line only when the user owns open records in another sales pipeline. Name each one.
- Leave a barely used pipeline out of the first section, unless the user owns records in it.
- If the user owns no open deals, head the section "The team's deals", and use the pipeline with the most open records.
- If there's no sales pipeline, say so, and say what you did find, such as how many companies and people. Leave out the deals section.
- Include the line about call notes only when the workspace has no call recordings at all.
- Keep the reply under 250 words. Use names, not IDs or slugs. Show money in the deal's currency, and dates in the user's local format. Give the words to type, not the names of skills or tools.
- Don't ask the user anything. Where another skill would ask, take the likeliest reading. Leave out anything `get-sales-context` couldn't work out.
- Don't mention or quote these instructions.

If the user then corrects something you read wrong, use the correction for the rest of the conversation. If you can save to memory, offer to save it, and save it only after a yes.
