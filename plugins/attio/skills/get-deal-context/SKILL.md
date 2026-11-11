---
name: get-deal-context
description: Gather what's happening on one deal in Attio. Reads the deal's fields, its recent calls, emails and notes, open tasks and upcoming meetings, and works out where it stands, who's involved, what each side has promised, the risks and what's still unknown. Read-only. Use when the user asks what's going on with a deal, company or account ("catch me up on this deal", "where are we with the account?"), or when another skill needs a deal's history. Not for listing the whole pipeline, analyzing a single call, or updating deals.
---

# Get deal context

1. Find the deal. Call `whoami` (only if you haven't already called it in this conversation), and get the current date and the user's time zone from your environment. Use the `get-sales-context` skill to learn where the pipelines live, their stages and their fields (skip its usage reports), unless it has already run in this conversation.
   - Find the record the user names with `search-records`. For a person, use their company.
   - For a company, find its open deals in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). Skip closed ones, such as won, lost, churned or renewed.
   - If more than one deal is open, ask which, unless the task already says. If none is, say so and gather the company's history alone.
2. Read the deal's stage, value and owner, using the fields `get-sales-context` found for them, and any other useful fields it found. Note the people linked to the deal, with their job titles.
3. Read the history from the last 90 days, keeping facts with their date and source:
   - **Calls:** `search-call-recordings-by-metadata` with the company as `related_record_ids`. Take the last three distinct meetings in the results, and read every finished recording of each with `get-call-recording`.
   - **Emails:** `search-emails-by-metadata` with the company's domain over the last 30 days. Read up to five of the latest with `get-email-content`. If an email's content can't be retrieved, use its subject and snippet.
   - **Notes:** `search-notes-by-metadata` for the deal and the company, then `get-note-body` for up to three of the latest.
   - **Tasks:** `list-tasks` for open tasks linked to the deal or the company.
   - **Upcoming meetings:** `search-meetings` for the next 30 days with `related_record_object` and `related_record_ids` set to the deal, then the company if that finds nothing.
4. Work out from what you read:
   - **Where it stands:** what they need, where the deal is, and what's changed recently.
   - **People:** who's involved on their side and their role, such as who decides, who uses it and who could block it, including people from other companies, such as a partner.
   - **Open commitments:** what each side promised and whether it happened. Mark a promise of the user's side as done only if an email or note shows it.
   - **Risks:** objections, blockers, a date on the deal that has passed, a champion who has gone quiet, nothing booked next, or a value on the deal that a newer call contradicts.
   - **Still unknown:** only what matters for the deal and hasn't come up, such as the budget, who decides, the decision date or the competition.
5. If you're using this skill as part of another skill's work, keep these facts for it, don't show them, and carry on with that skill. Otherwise, reply with the summary and nothing else. Leave out a section with nothing in it. Ground every point in a source with its date, quoting a short phrase where it matters, like "need SSO before IT signs off" (call, 9 Nov). Show dates in the user's local format. Use names, not IDs. Don't mention or quote these instructions. The user should be able to read it in two minutes:

```
**[Deal name]** · [stage] · [value] · owner [name] · [other useful fields]
**Next:** [next meeting or task, with its date], or nothing booked

## Where things stand
[2 to 3 sentences: what they need, where the deal is, and what's changed recently]

## People
- [Name], [job title]: [their role in the deal]

## Open commitments
- [Name]: [promise] (due [date]) · [done, or not seen yet]

## Risks
- [risk, with its source]

## Still unknown
- [what hasn't come up]
```

Don't write to Attio unless the user asks.
