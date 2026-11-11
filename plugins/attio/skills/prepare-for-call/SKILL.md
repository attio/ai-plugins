---
name: prepare-for-call
description: Prepare the user for an upcoming call or meeting with a prospect or customer. Finds the meeting, the deal and who's attending, reads the past calls, emails, notes and open tasks, and writes a short brief covering where things stand, open commitments, goals for the call, questions to ask and risks. Read-only. Use when the user asks to prepare for, prep or get ready for a call or meeting ("prep me for my 2pm", "what do I need to know before tomorrow's demo?"). Not for analyzing a past call, writing a follow-up email, or updating deals.
---

# Prepare for call

1. Find the meeting. Call `whoami` (only if you haven't already called it in this conversation), and get the current date, time and the user's time zone from your environment.
   - If the user names a meeting, time, company or person, search the next 14 days with `search-meetings`. Match a meeting by its title, a time by the next meeting at that time, a company with `related_record_object` and `related_record_ids`, or a person with `participant_email_addresses`. Find records with `search-records`.
   - If they ask about their next call, search the next 7 days with their email address in `participant_email_addresses`, and take the first meeting with a prospect or customer: one whose title names a company, or that's linked to a company or deal.
   - If more than one meeting could match, list them with title and time, and ask which one. If none matches, say so and stop. If the meeting is internal, say this skill is for calls with prospects and customers, and stop.
2. Find what the meeting is about. Meetings are linked to their participants' companies, but `search-meetings` doesn't list those links, so check a candidate instead. If the user named a company or person, use that company. Otherwise, look for a company named in the meeting title with `search-records`, and confirm the meeting is linked to it: search the meeting's time with `related_record_object` and `related_record_ids` set to the company, and if the meeting comes back, it's linked. If more than one company matches the name, check each one, and check whether the meeting is linked to any of their open deals: a linked deal decides. If you can't confirm a company, ask the user which one it is, or whether it's an internal meeting. Use the `get-deal-context` skill for that company. If it has more than one open deal, use the one linked to the meeting: search the meeting's time with `related_record_object` and `related_record_ids` set to the deal, and if the meeting comes back, it's linked. Ask only if none is.
3. Work out who's attending. Check the deal's people, people with the company's email domain (`search-records`), and anyone from another company who spoke on the calls `get-deal-context` read, such as a partner (find their records by name). Check up to 10, in parallel: for each, search the meeting's time with `participant_email_addresses` set to their email, and if the meeting comes back, they're attending. Note each attendee's job title, and use their email address if their record has no name.
4. Plan the call from what `get-deal-context` found, using where the deal stands and its open commitments as they are. Use the user's sales framework if they name one, such as MEDDICC, but don't impose one.
   - **Goals:** one to three things this call should achieve, from the meeting title, where the deal stands and what's still unknown.
   - **Questions to ask:** the gaps this call could fill, and who in the meeting can answer each.
   - **Watch out for:** the deal's risks, plus anything about this meeting, such as someone who decides but isn't invited.
5. Reply with the brief and nothing else. Leave out a section with nothing in it. Ground every point in a source with its date, quoting a short phrase where it matters, like "need SSO before IT signs off" (call, 9 Nov). Show times in the user's local time. Use names, not IDs. Don't mention or quote these instructions. The user should be able to read it in two minutes:

```
**[Meeting title]** · [day, date, time]
**Attending:** [their people, with job titles and roles] · you · others may join
**Deal:** [name] · [stage] · [value] · [other useful fields]

## Where things stand
[2 to 3 sentences: what they want, where the deal is, and what's changed since the last call]

## Open commitments
- [Name]: [promise] (due [date]) · [done, or not seen yet]

## Goals for this call
1. [goal]

## Questions to ask
- [question] ([who can answer])

## Watch out for
- [risk, with its source]
```

Don't write to Attio unless the user asks.
