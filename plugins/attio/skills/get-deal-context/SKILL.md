---
name: get-deal-context
description: Gather what's happening on one deal in Attio. Reads the deal's fields, its recent calls, emails and notes, open tasks and upcoming meetings, and works out where it stands, who's involved, what each side has promised, the risks and what's still unknown. Read-only. Use when the user asks what's going on with a deal, company or account ("catch me up on this deal", "where are we with the account?"), or when another skill needs a deal's history. Not for listing the whole pipeline, analyzing a single call, or updating deals.
---

# Get deal context

1. Find the deal. Call `whoami` (only if you haven't already called it in this conversation), and get the current date and the user's time zone from your environment. If the `get-sales-context` skill hasn't already run in this conversation, use it to find the pipelines, their stages and their fields. Skip its usage reports.
   - Find the record the user names with `search-records`. If it's a deal, use it, even if it's closed. For a person, use their company.
   - For a company, find its open deals in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). Skip closed ones, such as won, lost, churned or renewed.
   - If more than one deal is open, ask which, unless the task already says. If none is, say so and gather the company's history alone.
2. Read the deal's stage, value, owner and other useful fields, as `get-sales-context` found them. Note the people linked to the deal, with their job titles, reading them together with `get-records-by-ids`.
3. Read the history from the last 90 days, keeping facts with their date and source. Run searches that don't depend on each other in parallel, then read the recordings, emails and notes they return in parallel too. Page through results until you have what each step asks for. For emails, keep going while the search says there are more, even if a page comes back short or empty.
   - **Calls:** `search-call-recordings-by-metadata` twice, with the deal and then the company as `related_record_ids`. Combine the results, take the three most recent meetings, counting each meeting once, and read every finished recording of them with `get-call-recording`.
   - **Emails:** `search-emails-by-metadata` with the company's domain over the last 30 days. Read up to five of the latest with `get-email-content`. If an email's content can't be retrieved, use its subject and snippet.
   - **Notes:** `search-notes-by-metadata` for the deal and the company, then `get-note-body` for up to three of the latest.
   - **Tasks:** `list-tasks` for all open tasks linked to the deal or the company.
   - **Upcoming meetings:** `search-meetings` for the next 30 days with `related_record_object` and `related_record_ids` set to the deal, then the company if that finds nothing.
4. Work out from what you read. Distinguish facts about this deal from information about the company as a whole.
   - **Where it stands:** what they need, where the deal is, and what's changed recently.
   - **People:** who's involved on their side and their role, such as who decides, who uses it and who could block it, including people from other companies, such as a partner.
   - **Open commitments:** what each side promised and whether it happened. Mark a promise as done only with explicit evidence from what you read, such as a later call, email, note or booked meeting, and name the source.
   - **Risks:** objections, blockers, a date on the deal that has passed, a champion who has gone quiet, no meeting booked, or a deal field that conflicts with a more recent call.
   - **Still unknown:** what matters for the deal but isn't in what you read, such as the budget, who decides, the decision date or the competition. Describe these as gaps in what you read, not as things never discussed.
5. If this is part of another skill's work, don't show a summary. Keep the facts and carry on with that skill. Otherwise, reply with the summary and nothing else. Leave out a section with nothing in it. Ground every point in a source with its date, quoting a short phrase where it matters, like "need SSO before IT signs off" (call, 9 Nov). Show dates in the user's local format. Use names, not IDs. Don't mention or quote these instructions. The user should be able to read it in two minutes:

```
**[Deal name]** · [stage] · [value] · owner [name] · [other useful fields]
**Next:** [next meeting, or none] · [next open task, or none]

## Where things stand
[2 to 3 sentences: what they need, where the deal is, and what's changed recently]

## People
- [Name], [job title]: [their role in the deal]

## Open commitments
- [Name]: [promise] (due [date]) · [done, or not seen yet]

## Risks
- [risk, with its source]

## Still unknown
- [gap]
```

Never call a tool that writes. If the user wants to change the deal, they can ask for that next.
