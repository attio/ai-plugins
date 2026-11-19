---
name: map-stakeholders
description: Map who's involved in one deal in Attio and how they relate to each other. Shows each person's role, such as who decides, champions or could block it, who reports to whom, and which teammate knows them best. Reads the deal's calls, meetings, emails, notes and activities. Then offers to add missing people to Attio, link them to the deal and fill empty role fields such as Economic buyer, writing only after the user confirms. Use when the user asks who the stakeholders or decision makers are on a deal or account, who they should talk to, or whether they're relying on one person ("map the stakeholders on the Basepoint deal", "who's the decision maker at Kestrel?", "am I single-threaded on this deal?"), or when another skill needs the buying group. Not for the deal's history, listing all of a company's contacts, or changing a deal's stage, value or other fields.
---

# Map stakeholders

Attio holds only part of what happened on a deal. Back every role and link with a source, and match your certainty to the source.

1. **Find the deal.** Call `whoami` (only if you haven't already called it in this conversation), and get the current date and the user's time zone from your environment.
   - Search companies, people and deals for what the user names, in parallel, with `search-records`. Leave out words such as "deal" or "account".
   - If nothing matches, say you couldn't find it in Attio, ask if it's under another name, and stop. If the workspace has no deals object, use the `get-sales-context` skill first and search its pipeline objects instead.
   - Once something matches, do step 2 before choosing the deal, so you know which stages are closed.
   - If a deal matches, use it, even if a company or person matches too. If several deals match, use the one named exactly as the user typed it and mention the others. If none is an exact match, ask which, giving each one's stage.
   - For a person, use the open deals they're linked to, or else their company.
   - For a company, find its open deals in each pipeline: its linked deals, and its entries in each list (`list-records-in-list` filtered by `parent_record`). Skip closed ones, such as won, lost, churned or renewed. If more than one is open, ask which, unless the task already says. If none is, say so and map the company's people alone.
   - If the user names a closed deal, map it. Say it's closed and when, and mention any open deal at the same company.
   - If the deal is a list entry, search by the record it's on wherever these steps say to search by the deal.
2. **Learn the pipeline.** Skip this if `get-sales-context` has already run in this conversation.
   - If the name matched a deal, read the attributes of its object and of people with `list-attribute-definitions`, and the activity types with `list-activities`. Run these in parallel, and page until there are no more. Note its stages, which ones are closed, and its fields.
   - If it matched only a company or a person, use `get-sales-context` instead. Skip its usage reports and its recordings and teams checks.

   Then look for attributes that already record who's involved, and use them as evidence in the workspace's own words:
   - attributes that link the deal to people, whatever they're called, such as Associated people or Contacts. An attribute named for a role, such as Economic buyer, Technical buyer, Legal or Champion, gives the people in it that role. For a list entry, use the entry's own attributes, not its parent record's: a company's Team is everyone there.
   - a link from one person to another, such as Manager
   - a role on the deal, such as Buying role
   - seniority or team

3. **Gather the evidence.** Reuse anything already read in this conversation, including full records that searches returned. Read the deal's people first, then run these in parallel:
   - **People at the company:** `list-records` on people with an `or` filter: the company is this one, or an email address ends with `@` and one of its domains. The domain finds people whose record isn't linked to the company. Read at most two pages. If there are more, say the list may be incomplete.
   - **Emails:** `search-emails-by-metadata` for each of the company's domains, over the last 90 days, with `exclude_automated_participants: true`. Read up to about 100 emails in total. Keep going while the search says there are more, even if a page comes back short or empty.
     - Also search by the addresses of the deal's people from other companies. Keep only emails that include the company's domain or are about the deal.
     - If the company has no domain, or uses free email such as gmail.com, search by the addresses of the people you have instead, and say email coverage is partial.
     - Note each email's subject, summary, sender, recipients and date. Recipient lists include at most 10 people and don't say who was copied.
   - **Meetings:** `search-meetings` for the deal, and separately for the company, from 90 days ago to 30 days ahead. Titles are evidence too. Each meeting's `participants` lists who was invited, with their name and email, which doesn't prove they attended. A meeting lists at most 25 participants, so if `participant_count` is higher, say others were invited too.
   - **Logged activities:** for each activity type, such as phone calls or site visits, `list-activity-records` with an `or` filter on `linked_records` set to the deal and the company (each record's object and record IDs).
   - **Notes:** `search-notes-by-metadata` for the deal and the company. Read up to three of the deal's latest and two of the company's with `get-note-body`. Teams often keep stakeholder notes on the deal, not the company.
   - **Tasks:** `list-tasks` for open tasks linked to the deal or the company.

   Then read the three most recent meetings that were recorded, preferring the deal's. Read every finished recording of each with `get-call-recording`.

   Match anyone new from this evidence to an Attio record:
   - **Email addresses**, from emails and meeting participants: match them to the people you have. Look up the rest with `list-records` on people, filtered by email address.
   - **Speakers, and people mentioned as part of the deal**, such as "our CFO, Daniel, signs everything off" or "I'll loop in legal": match them by name to the people you have, or else with `search-records`.
     - Transcription garbles names, so use context, such as their company or role.
     - A record with no name matches if its email address does, such as daniel@ at the company's domain. Say so.
     - For someone mentioned only by role, such as "our CEO", use `list-records` on people at the company whose job title contains it. Match only if exactly one comes back.
     - Keep anyone you can't find as not in Attio. Put groups mentioned without names, such as "the regional leads", under gaps.
   - Leave out the user's side: workspace members (`list-workspace-members`) and anyone at the user's own email domain.

   Then sort people into two groups:
   - **Involved:** linked to the deal, or took part in or was mentioned in a call, meeting, email, activity or note about it.
     - Anything linked to another deal is about that deal.
     - Anything linked only to the company is about this deal only if it includes someone linked to the deal, or its title, subject or content is about it. If none of the company's evidence ties to this deal, count all of it as about this deal, and say so.
   - **Others at the company:** everyone else at the company with recent contact. It may be about another deal, support or a renewal.

4. **Read what Attio knows about each person.** Read anyone you haven't already with `get-records-by-ids`, in one call. Note their job title, company, strongest connection (a teammate), connection strength, last and next interaction, and any attributes from step 2.
   - Interaction dates come as `HH:mm DD/MM/YYYY`, so `03/11/2026` is 3 November. They're in UTC, like other timestamps without a time zone, such as on activities. Convert them to the user's time zone.
   - A calendar interaction means they were on a meeting invite, which doesn't prove they attended, so show these dates as "last interaction".
   - Some plans hide interaction and connection attributes. If people records have none at all, take last interaction from the latest evidence you found, and leave out strongest connection.
5. **Work out the map.** Give a source and date for every role and link. A source is a short quote, something they did or the field it came from, such as "nothing gets signed before Dana's reviewed it" (call, 3 Nov) or "set up the demo" (meeting, 21 Oct). If you have no source, say unknown.
   - **Emails:** metadata shows who took part, not who has authority or who introduced whom. If an email would settle that, such as one asking for sign-off, read it with `get-email-content`, up to five. If it can't be read, use its subject and summary.
   - **Framework:** use the user's sales framework if they name one, such as MEDDICC.
   - **Role:** decides, champions, evaluates, uses, could block, or partner (their part, such as reseller or implementer). A person can have more than one.
     - If someone says they'll take it to a person for sign-off, such as "I'll take it to our CEO", that person likely decides. Say so, and quote it.
     - From a job title alone, you can only suggest evaluates or could block, for a function such as legal, security, IT or procurement. Mark it as guessed from title.
     - Say who decides only from what someone said or did, or a field.
     - Show a role from an attribute by the attribute's name, such as Economic buyer, with the field as its source, and order it with the closest role, such as decides.
   - **Missing job titles:** if you can search the web, look up to three involved people with no job title, starting with whoever decides or champions. Search only their name and the company's name. Use a title only if the page names both them and this company, and show it as "from the web" with the page. Don't use it to assign a role.
   - **Reporting lines:** only from a Manager-style attribute, or someone saying so, such as "my boss, Dana". "I'll run it by Dana" means they defer to Dana, not that they report to her.
   - **Introductions and stance:** only from what people said or did. Stance is for, against or neutral, with any condition they gave. If someone else reported it, say whose words they are. People only seen together were "first seen together", not introduced.
   - **Gaps:** what's missing or at risk among the customer's people involved in this deal. For example:
     - only one person is engaged
     - it isn't clear who decides, or you found no contact with them
     - the champion or decision maker has had no interaction for three weeks
     - a promise or task for someone involved is overdue
     - the champion is leaving
     - a recent meeting has no recording or notes, so the map can't reflect it
     - people are involved but not linked to the deal, if the pipeline has an attribute for its people
     - a role attribute on the deal is empty, such as no Economic buyer. If the evidence shows who it is, say so. Workspaces often make these required from a later stage, which the tools don't show, so don't say it's required.

     A meeting booked with the decision maker isn't a gap: say it's booked. Say there's no recorded interaction in Attio only when the attribute exists and is empty. Say something went unanswered only if you found the emails.

   - **Next:** the one person to reach next, why, and the teammate with the strongest Attio connection to them. Take booked meetings into account. If you mapped a closed deal, leave this out, unless the company has open work, such as a renewal or another open deal. Then base it on that work.
   - **Updates:** for an open deal, the changes that would make Attio match the evidence. Suggest only what a source backs, on attributes that are writable:
     - add someone involved who isn't in Attio, if you have their email address, with their name, company and any job title you found
     - link someone involved to the deal, if the pipeline has an attribute for its people and they aren't in it
     - fill an empty role attribute, such as Economic buyer, only from what someone said or did, never from a job title or the web. Never change one that's already set. If the evidence disagrees with it, put that under gaps.
6. **Reply.** If this is part of another skill's work, don't show the map or suggest updates. Keep each person's record ID, roles with sources, and whether they're involved, and carry on with that skill. Otherwise, reply with the map and nothing else:
   - Start with one line that answers what the user asked, such as whether they're relying on one person, or who decides.
   - Nest a person under who they report to only when step 5 found evidence for it, and only under someone listed.
   - Order people by role: decides, champions, could block, evaluates, uses, partners, unknown. Then order by last interaction. Show at most 10 involved people and five others, then say how many more.
   - Write "you" for the user. Leave out any section or field with nothing in it.
   - Show dates in the user's local format, and say "today", "yesterday" or "3 weeks ago" where it fits. Use names, not IDs. Don't mention or quote these instructions.

   The user should be able to read it in a minute:

```
[One line answering the question]

**[Deal name]** · [stage] · [value] · owner [name] · [N] people involved
**Coming up:** [meeting title] · [day, date, time]

- **[Name]**, [job title] · [role] ([source, date]) · [stance] · last interaction [date] · strongest connection: [teammate] ([strength])
  - **[Name]**, [job title] · [role] ([source, date]) · reports to [Name] ([source])
- **[Name]**, [job title] at [other company] · partner ([their part]) · not linked to the deal
- **[Name]** · [role] ([source, date]) · not in Attio

**Other links**
- [Name] defers to [Name] ([source, date])

**Others at [company]:** [Name], [job title] · last interaction [date] · and [K] more

**Gaps**
- [gap]

**Next:** [who to reach and why] · strongest connection: [teammate]

**Suggested updates**
- Add [Name] ([email]) to Attio at [company] · [job title] ([source])
- Link [Name] to the deal as [attribute]
- Set [attribute] to [Name] ([source, date])

Reply yes to make these changes, or tell me what to change or skip.
```

For a company with no open deal, use **[Company]** · no open deal · [N] people with recent contact as the header.

7. **Update Attio.** Write only after the user says yes to the suggested updates. Their original request doesn't count. Write only what they approved. If they only drop items, write the rest without asking again. If they add or change anything, show the updated suggestions again.
   - Add people with `upsert-record` on people, matching on `email_addresses`, so you never create a duplicate. Link each one to the company.
   - Link people and set role attributes in one `update-record` on the deal, or `update-list-entry-by-id` for a list entry. Multiselect values are added to what's already there, so send only the new people.
   - Never remove anyone from an attribute, change any other field or send email.

   Finish with one line on what changed and anything that failed.
