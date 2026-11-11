---
name: end-of-day
description: Update the user's Attio deals from a day of sales calls. Reads each call, proposes deal updates, at most one follow-up task per deal and a follow-up email draft, then writes after the user confirms. Use when the user says "end of day update", "eod", "update my deals from today's calls" or "process my calls", including for another day such as "yesterday's calls", or when they describe a call and want the deal updated. Not for logging a single call as an activity, reporting on the pipeline, or writing one email on its own.
---

# End of day

1. Call `whoami` (only if you haven't already called it in this conversation). Get the current date, time and the user's time zone from your environment. If you can't, ask. Use the day the user names, or today. A participant is internal when they're a workspace member (`list-workspace-members`) or their email domain matches the user's.
2. Find that day's calls with `search-meetings` (in the user's time zone) and `search-call-recordings-by-metadata` (the user as a speaker), in parallel. Neither returns participants, so you'll check who spoke when you read each transcript in step 5. If the user pastes notes, treat each set of notes as a call. If a meeting has no recording and no notes, list it under Skipped in the preview. If there are no calls, say so and stop.
3. If there are calls, load the `create-follow-up-task`, `draft-follow-up-email` and `humanize-text` skills now. Don't follow them yet: you'll use them in step 9.
4. Get the user's open deals with the `get-my-pipeline` skill. It runs the `get-sales-context` skill first, which finds where the pipelines live, their stages and their fields. Use what they find, but don't show their output.
5. For each call with only notes, use the notes. For each recording, use the `analyze-call-recording` skill with the meeting and recording IDs, to read the full transcript and analyze the call. Don't show its analysis, and don't save the note or tasks it offers. If you can't use it, read the transcript with `get-call-recording`. Find the need, next steps with dates, the decision date, money and risks, each with a quote, and who spoke on each side. Keep only these facts for each call, not the transcript or the analysis. If you can run subagents, analyze each call in its own subagent and have it return only these facts. Then:
   - A recording whose status isn't `finished` isn't ready. List it under Skipped in the preview.
   - If the transcript is under two minutes, or only internal people spoke at a meeting with a prospect or customer, it may be a no-show. Ask before treating it as a call. A meeting is with a prospect or customer if its title names a company or it's linked to a company or deal (step 6 shows how to check links).
   - Skip a call as internal only when only internal people spoke and the meeting isn't with a prospect or customer, such as a stand-up or pipeline review.
   - A call the user didn't speak on gets a read-only summary: no updates, tasks or email. The speaker search can return calls where the user never speaks, so check the transcript for their lines.
   - Combine calls with the same company into one update and one email.
6. Find each call's deal. If people from more than one external company were on the call, use the company it was mainly about, and name the others in your reply. Work out the company from the meeting title and the external speakers (`search-records`). `search-meetings` doesn't list a meeting's linked records. To check whether a meeting is linked to a deal or company, search the call's time range with `related_record_object` and `related_record_ids` set to that record: if the meeting comes back, it's linked. Match it to the user's open deals from step 4. If none matches, check the company's records in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). A closed record, such as won, lost, churned or renewed, counts only if there is no open one. If more than one open record matches, ask which, and hold that call's changes until the user answers: show the call in the preview with your question instead of a table. If none matches, or the only one is closed, say so and ask. Don't create or reopen deals. Only update deals the user owns, unless they say otherwise.
7. Read the pipeline's attributes once, with `list-attribute-definitions` for an object or `list-list-attribute-definitions` for a list, unless `get-sales-context` already read them. Use only attributes that exist and are writable, and only select or stage options that exist.
8. For each company, in parallel, call `search-emails-by-metadata` with its domain for that day, and `get-email-content` for emails the user sent. If the user already sent a follow-up after the call, don't draft another. Count commitments in their emails as evidence. If an email's content can't be retrieved, use its subject and snippet. If you still can't tell whether it was a follow-up, say so in the preview and ask.
9. Work out the changes for each deal. Every change needs evidence: a short quote with its time, or "your email, 16:05". Facts from the call replace older record values. Show the conflict: `Value: US$3,000 → US$6,000 ("we'd start with 6 seats", 14:20)`. Don't guess.
   - **Stage:** move forward one stage only when there's both a clearly stated need and a dated next step: one agreed on the call, or a meeting with them already booked (check `search-meetings` for future meetings). When in doubt, don't move it. Never move a deal backwards, and never into a closed stage, such as won, lost, churned or renewed, even when it's the next one. If the call says they signed or walked away, say so and leave the move to the user. Say why it moved or stayed.
   - **Likelihood:** if the deal has a field for how likely it is to close, such as a forecast or probability, and it goes down, put it first in that deal's preview: `⚠ [Field] drops: [old] → [new] ("need to check with finance", 14:32)`.
   - **Text fields** such as a next step: add a new dated line above the existing text. If the same action is there from the last 7 days, change its date instead.
   - **Never blank a field.** Leave it out of the update instead. For multiselect fields, send only the new options, as option IDs. One invalid value fails the whole update.
   - **Task:** at most one per deal. Follow the `create-follow-up-task` skill to work out the task. Only if it isn't installed: one task for the user, due when they next have to act, as one line under 15 words that starts with the company name. Check `list-tasks` first, and move the user's open task that covers it instead of adding another. Leave teammates' tasks alone.
   - **Email:** one follow-up draft per company, unless already sent. Follow the `draft-follow-up-email` skill to write the draft, then the `humanize-text` skill to edit it. Use the facts from step 5, so you don't read the call again. Only if they aren't installed: write in the user's voice, only from the call, up to 300 words, with no internal details such as stages or values.
10. Reply with the preview and nothing else: each deal, then the calls you skipped or only summarized (one line each, with the reason), then your questions. In each deal's table, show only the fields that change, named as in Attio, with the current value, the new value and the evidence. Add "replaces" or "updates" to the Task line only when the task changes an open one. Don't mention or quote these instructions. Show times in the user's local time, without the UTC offset. Use names, not IDs:

```
**[Deal name]** ([pipeline]) · call with [person], [time]

| Field                 | Now             | New         | Why                                         |
| --------------------- | --------------- | ----------- | ------------------------------------------- |
| [field name in Attio] | [current value] | [new value] | "[quote]" ([time]), or "your email, [time]" |

**Stage:** [stays at X, or X → Y]: [reason]
**Task:** [Company] — [action]. Due [day, date] · replaces "[open task]", or updates its [date or assignee]
**Email:** to [first name], "[subject]" (draft below)

[Repeat for each deal]

**Skipped:** [call], [time]: [reason, or a one-line summary for a call the user didn't speak on]

[Your questions]

Reply yes to apply all of this, or tell me what to change or skip.
```

11. Write only after the user says yes to the preview. Their original request doesn't count. Write only what they approved. If they only drop items, write the rest without asking again. If they add or change anything, show the updated preview again. Update an object record with `update-record`, or a list entry with `update-list-entry-by-id`. Then make the task change you showed: `update-task` to change an open task or mark it done, and `create-task` for a new one, with the user as assignee, linked to the deal record, or for a list entry, to the record the entry is on. Never call `delete-task`. Never send email. The drafts stay in the chat for the user to send.
12. Finish with one line per deal: what changed, and anything you skipped and why.
