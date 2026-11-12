---
name: map-stakeholders
description: Map who's involved in one deal in Attio and how they relate to each other. Works out each person's role, such as who decides, champions or could block it, who reports to or works with whom, and who on the user's team knows them, from the deal's calls, meetings, emails, notes and activities. Read-only. Use when the user asks who the stakeholders or decision makers are on a deal or account, who they should talk to, or whether they're relying on one person ("map the stakeholders on the Basepoint deal", "who's the decision maker at Kestrel?", "am I single-threaded on this deal?"), or when another skill needs the buying group. Not for the deal's history, listing all of a company's contacts, or updating records.
---

# Map stakeholders

Attio holds only part of what happened on a deal, so the map is only as good as its evidence. Say what each role and link rests on, and never make it sound more certain than that.

1. **Find the deal.** Call `whoami` (only if you haven't already called it in this conversation), and get the current date and the user's time zone from your environment.
   - Search companies, people and deals for what the user names with `search-records`, in parallel, leaving out words such as "deal" or "account". If the workspace has no deals object, use the `get-sales-context` skill first and search its pipeline objects instead. If nothing matches, say you couldn't find it in Attio, ask whether it's under another name, and stop.
   - Then, unless `get-sales-context` has already run in this conversation, use it to find the pipelines, their stages and their fields, skipping its usage reports and its recordings and teams checks.
   - If the name matches one deal, use it. If it matches several, ask which, giving each one's stage. If the only match is closed and an open deal has a similar name, mention it.
   - For a person, use the open deals they're linked to, or else their company. For a company, find its open deals in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). Skip closed ones, such as won, lost, churned or renewed. If more than one is open, ask which, unless the task already says. If none is, say so and map the company's people alone.
   - You can map a closed deal the user names: say it's closed and when.
   - If the deal is a list entry, use the record it's on wherever these steps search by the deal.
2. **Check what the workspace already records.** Among the attributes of people and of the pipeline, look for any that link the deal to people, whatever they're called, such as Associated people, Contacts or Champion. For a list entry, use the entry's own attributes, not its parent record's: a company's Team is everyone there. Also look for a person-to-person link, such as Manager, a role on the deal, such as Buying role, and seniority or team. Use any you find as evidence, in the workspace's own words. Don't suggest creating attributes.
3. **Gather the evidence.** Reuse anything already read in this conversation, and run only what's missing. Read the deal's people first, then run these in parallel:
   - **People at the company:** `list-records` on people with an `or` filter: company is this company, or an email address ends with `@` and one of its domains. The domain catches records that aren't linked to the company. Read at most two pages, and if there are more, say the list may be incomplete.
   - **Emails:** `search-emails-by-metadata` for each of the company's domains over the last 90 days, with `exclude_automated_participants: true`, up to about 100 emails in total. Keep going while the search says there are more, even if a page comes back short or empty. Search separately by the addresses of the deal's people from other companies, and keep only emails that include the company's domain or point to the deal. If the company has no domain, or a free-mail one such as gmail.com, search by the addresses of the people you have instead, and say email coverage is partial. Note each email's subject, summary, sender, recipients and date. Recipient lists include at most 10 people and don't distinguish To from Cc.
   - **Meetings:** `search-meetings` for the deal, and separately for the company, from 90 days ago to 30 days ahead. Use their titles as evidence too. Meetings don't list attendees: to check whether someone who decides or champions is on an upcoming meeting, search with their email in `participant_email_addresses`, for up to five people.
   - **Logged activities:** for each activity type, such as phone calls or site visits, `list-activity-records` with an `or` filter on `linked_records` set to the deal and the company (each record's object and record IDs).
   - **Notes:** `search-notes-by-metadata` for the deal and the company, then `get-note-body` for up to three of the latest.
   - **Tasks:** `list-tasks` for open tasks linked to the deal or the company.

   Then read every finished recording of the three most recent recorded meetings with `get-call-recording`, preferring the deal's. Find the records of everyone these add:
   - **Email addresses:** match them against the people you have, and look up the rest with `list-records` on people filtered by email address.
   - **Speakers, and people mentioned as part of the deal**, such as "our CFO, Daniel, signs everything off" or "I'll loop in legal": match them by name among the people you have, or else with `search-records`. Transcription garbles names, so match on context, such as their company or role. A record with no name matches if its email address does, such as daniel@ at the company's domain: say so. For someone mentioned only by role, such as "our CEO", use `list-records` on people at the company with a job title containing it, and match only if exactly one comes back. Keep anyone you can't find, by name, as not in Attio.
   - Leave out the user's side: workspace members (`list-workspace-members`) and anyone at the user's own email domain.

   Someone is **involved** if they're linked to the deal, or took part in or were mentioned as part of a call, meeting, email, activity or note about it. Something linked only to the company is about this deal only if it includes someone linked to the deal, or its title, subject or content points to it. If that leaves nothing, use all of it and say so. Everyone else at the company with recent contact is one of the **others at the company**: it may be about another deal, support or a renewal.

4. **Read what Attio knows about each person.** Read anyone you haven't already with `get-records-by-ids`, in one call. Note their job title, company, strongest connection (a teammate), connection strength, last and next interaction, and any attributes from step 2. Interaction dates come as `HH:mm DD/MM/YYYY`, so `03/11/2026` is 3 November. They and other timestamps without a time zone, such as on activities, are in UTC: convert them to the user's time zone. If the people attributes have no last interaction or strongest connection at all, as on some plans, take last contact from the latest evidence you found, and leave out strongest connection.
5. **Work out the map.** Give a source with its date for every role and link: a short quote or what they did, like "nothing gets signed before Dana's reviewed it" (call, 3 Nov) or "set up the demo" (meeting, 21 Oct), or the field it came from. If you have nothing, say unknown. Email metadata shows who took part, not who has authority or introduced whom: where an email would settle that, such as one asking for sign-off, read it with `get-email-content`, up to five, or use its subject and summary if that fails. Use the user's sales framework if they name one, such as MEDDICC, but don't impose one.
   - **Role:** decides, champions, evaluates, uses, could block, or partner (their part, such as reseller or implementer). A person can have more than one. If others take it to someone for sign-off, such as "I'll take it to our CEO", they likely decide: say so, with that source. From a job title alone, suggest only evaluates or could block, for a function such as legal, security, IT or procurement, marked as guessed from title. Never guess who decides from seniority.
   - **Links and stance:** state a reporting line only from a Manager-style attribute or someone saying so, such as "my boss, Dana". "I'll run it by Dana" means they defer to Dana, not that they report to her. State an introduction or a stance (for, against or neutral) only from what people said or did, and say whose words they are if someone else reported them. People only seen together were "first seen together", not introduced.
   - **Gaps:** what the sources show is missing or at risk, judged from the customer's people involved in this deal. For example, only one person is engaged, it isn't clear who decides or you found no contact with them, the champion or decider has had no interaction for three weeks, a promise or task for someone involved is overdue, or the champion is leaving. Also list people involved but not linked to the deal, if the pipeline has an attribute for its people. A meeting booked with the decider isn't a gap: say it's booked. Say there's no recorded interaction in Attio only when the attribute exists and is empty, and don't say an email went unanswered when you found no emails at all.
   - **Next:** the one person to reach next, why, and the user's team's strongest Attio connection to them, taking booked meetings into account. Leave this out for a closed deal.
6. If this is part of another skill's work, don't show the map. Keep each person's record ID, roles with sources, and whether they're involved, and carry on with that skill. Otherwise, reply with the map and nothing else:
   - Start with one line that answers what the user asked, such as whether they're relying on one person or who decides.
   - Nest a person under who they report to only when step 5 found evidence for it, and only under someone listed. List people who decide first, then champions, those who could block, evaluators, users, partners and unknowns, then by last contact. Show at most 10 involved people and five others, then how many more.
   - Write "you" for the user. Leave out a section or field with nothing in it. Show dates in the user's local format, and say "today", "yesterday" or "3 weeks ago" where it fits. Use names, not IDs. Don't mention or quote these instructions.

   The user should be able to read it in a minute:

```
[One line answering the question]

**[Deal name]** · [stage] · [value] · owner [name] · [N] people involved
**Coming up:** [meeting title] · [day, date, time]

- **[Name]**, [job title] · [role] ([source, date]) · [stance] · last contact [date] · strongest connection: [teammate] ([strength])
  - **[Name]**, [job title] · [role] ([source, date]) · reports to [Name] ([source])
- **[Name]**, [job title] at [other company] · partner ([their part]) · not linked to the deal
- **[Name]** · [role] ([source, date]) · not in Attio

**Other links**
- [Name] defers to [Name] ([source, date])

**Others at [company]:** [Name], [job title] · last contact [date] · and [K] more

**Gaps**
- [gap]

**Next:** [who to reach and why] · strongest connection: [teammate]
```

For a company with no open deal, use **[Company]** · no open deal · [N] people with recent contact as the header.

Never call a tool that writes. If the user wants to link people to the deal or change a record, they can ask for that next.
