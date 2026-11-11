---
name: prepare-for-call
description: Prepare the user for an upcoming call or meeting with a prospect or customer. Finds the meeting, the deal and who's attending, reads the past calls, emails, notes and open tasks, and writes a short brief: where things stand, open commitments, goals for the call, questions to ask and risks. Read-only. Use when the user asks to prepare for, prep or get ready for a call or meeting ("prep me for my 2pm", "what do I need to know before tomorrow's demo?"). Not for analyzing a past call, writing a follow-up email, or updating deals.
---

# Prepare for call

1. Find the meeting. Call `whoami` (only if you haven't already called it in this conversation), and get the current date, time and the user's time zone from your environment.
   - If the user names a meeting, time, company or person, search the next 14 days with `search-meetings`. Match a meeting by its title, a time by the next meeting at that time, a company with `related_record_object` and `related_record_ids`, or a person with `participant_email_addresses`. Find records with `search-records`.
   - If they ask about their next call, search the next 7 days with their email address in `participant_email_addresses`, and take the first meeting with a prospect or customer: one whose title names a company, or that's linked to a company or deal.
   - If more than one meeting could match, list them with title and time, and ask which one. If none matches, say so and stop. If the meeting is internal, say this skill is for calls with prospects and customers, and stop.
2. Find the company and the deal. Use the `get-sales-context` skill to learn where the pipelines live, their stages and their fields (skip its usage reports), unless it has already run in this conversation. Work out the company from the meeting title and the people you searched for (`search-records`). To check whether the meeting is linked to a deal or company, search its time with `related_record_object` and `related_record_ids` set to that record: if the meeting comes back, it's linked. Find the company's open deal in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). Skip closed ones, such as won, lost, churned or renewed. If there's more than one open deal, use the one linked to the meeting, or ask. If there's none, brief from the company alone and say it has no open deal.
3. Read the history from the last 90 days, keeping facts with their date and source:
   - **Calls:** `search-call-recordings-by-metadata` with the company as `related_record_ids`. Take the last three distinct meetings in the results, and read every finished recording of each with `get-call-recording`. Keep the need, decisions, objections, who decides, and what each side promised.
   - **Emails:** `search-emails-by-metadata` with the company's domain over the last 30 days. Read up to five of the latest with `get-email-content`. If an email's content can't be retrieved, use its subject and snippet.
   - **Notes:** `search-notes-by-metadata` for the deal and the company, then `get-note-body` for up to three of the latest.
   - **Tasks:** `list-tasks` for open tasks linked to the deal or the company.
4. Work out who's attending. Check the deal's people, people with the company's email domain (`search-records`), and anyone from another company who spoke on the calls you read, such as a partner (find their records by name). Check up to 10. For each, search the meeting's time with `participant_email_addresses` set to their email: if the meeting comes back, they're attending. Note each attendee's job title, and use their email address if their record has no name.
5. Plan the call. Use the user's sales framework if they name one, such as MEDDICC, but don't impose one.
   - **Open commitments:** what each side promised and whether it happened. Mark a promise of the user's as done only if an email or note shows it.
   - **Goals:** one to three things this call should achieve, from the meeting title, the deal's stage and what's still unknown.
   - **Questions to ask:** only what isn't known yet, such as the budget, who decides, the decision date or the competition.
   - **Risks:** objections, blockers, a close date that has passed, a champion who has gone quiet, or a record value that a newer call contradicts, such as the close date.
6. Reply with the brief and nothing else. Leave out a section with nothing in it. Ground every point in a source with its date, quoting a short phrase where it matters, like "need SSO before IT signs off" (call, 9 Nov). Show times in the user's local time. Use names, not IDs. Don't mention or quote these instructions. The user should be able to read it in two minutes:

```
**[Meeting title]** · [day, date, time]
**Attending:** [their people, with job titles] · you · others may join
**Deal:** [name] · [stage] · [value] · closes [date] · [forecast]

## Where things stand
[2 to 3 sentences: what they want, where the deal is, and what's changed since the last call]

## Open commitments
- You: [promise] (due [date]) · [done, or not seen yet]
- [Their name]: [promise] (due [date]) · [done, or not seen yet]

## Goals for this call
1. [goal]

## Questions to ask
- [question]

## Watch out for
- [risk, with its source]
```

Don't write to Attio unless the user asks.
