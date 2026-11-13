---
name: get-customer-feedback
description: Gather customer feedback from Attio, either across every customer for one product feature or topic, or everything one customer has said. Searches call recordings, emails and notes, and reports who asked for what, in their own words, how strongly and how recently. Read-only. Use when the user asks how in demand a feature is, who has asked for it or whether it's worth building ("how many accounts want SSO?", "what are customers saying about reporting?"), or what feedback, feature requests or complaints one company or deal has given ("what has Acme asked us for?"). Not for analyzing a single call, catching up on where a deal stands, or logging new feedback.
---

# Get customer feedback

Feedback is what a customer or prospect says about the product: a feature they ask for, something missing or broken, a complaint, a comparison with a competitor, praise, or a reason they didn't buy or might leave. Look for it only in call recordings, emails and notes, not in other objects, lists or deal fields.

Feedback comes from the customer's side. Anyone on the user's email domain is a teammate. A call speaker has no address, so check a name you're unsure of with `list-workspace-members`. A teammate explaining a limitation or promising a date is not feedback, though their email often quotes a customer message that is.

1. Call `whoami` (only if you haven't already called it in this conversation), and get the current date from your environment. Work out what the user is asking:
   - **A feature or topic across customers** ("how many accounts want better permissions?"): follow steps 2 to 5.
   - **One customer** ("what feedback has Acme given?"): follow steps 6 to 8.
   - Both ("what has Acme said about permissions?"): follow steps 6 to 8 and keep only that topic.
   - If you can't tell which feature or which customer, ask.

## A feature or topic across customers

2. Write three or four search phrasings. Search matches meaning, and customers describe their situation, not the feature, so a bare keyword like "permissions" finds little. Write each one as a customer saying what they want, such as "sales reps should only see their own deals". A complaint about the product, such as "the permissions aren't granular enough", mostly finds teammates explaining the limitation.
3. Search with each phrasing, and count each call, email thread and note once. The same email can come back from more than one mailbox.
   - **Calls:** `semantic-search-call-recordings`, which returns the matching part of each transcript with its speaker.
   - **Emails:** `semantic-search-emails` with `include_emails_of_others` and `exclude_automated_participants` set to true.
   - **Notes:** `semantic-search-notes`.
4. Check each result and find its company. Keep it only if someone on the customer's side asks for the thing, misses it or complains about it.
   - **Calls:** the matching part is usually enough to judge. Get the titles and dates of the calls you keep with `render-meetings`, which also shows the user that list. The company is the one the title names. Otherwise find the customer speaker in people (`search-records`) and use their company.
   - **Emails:** the search returns Attio's summary, which is never the customer's wording. For every company you quote or rate above _mentioned_, read the customer's own email with `get-email-content`. Don't drop a thread because the result is a teammate's reply: open it, because the customer's message is quoted underneath. The company is the one that owns the customer's domain.
   - **Notes:** read up to 10 with `get-note-body`, skipping notes written to prepare for a meeting. The company is the note's parent record, or that record's company if it's a deal or a person.
   - To look up many records at once, use one `query-particle-sql` query that selects only the columns you need. A whole company record is very large.
   - A result whose company you can't find counts once, as "Unknown ([call title], [date])". Never name a row after a speaker.
5. Weigh what you kept. A company counts once, however often it raised the topic.
   - **Who they are:** for each company in the table, find whether it's a customer or a prospect, its size, and its deals with their stage and value. This is what tells the user how much the demand matters, so don't skip it. Don't assume which fields hold these: use the ones the `get-sales-context` skill found, or find them with `list-attribute-definitions`. Without a field that says who is a customer, a company with a won deal is one.
   - **Strength:** _blocker_ if they said they can't buy, roll out or stay without it. _Important_ if they called it a requirement, raised it more than once, asked for a date or described a painful workaround. _Mentioned_ otherwise.
   - **Needs:** group the requests into the distinct needs inside the topic. "Permissions" may be three different requests.

## One customer

6. Find the record with `search-records`, in companies first, then deals. The search returns near matches, so take the record whose name or domain matches exactly, and of several, the one with the most history. Ask only if you still can't tell. For a deal or a person, use their company. Note the company's domains and deals.
7. Collect what they've said over the last 12 months, unless the user gives another period. A company can also be a supplier or partner, so first set aside the calls and emails where they are selling to the user's team.
   - **Calls:** `search-call-recordings-by-metadata` with the company as `related_record_ids`, then `render-meetings` for the titles, which also shows the user that list. Choose the calls where they talk about using the product, such as onboarding, check-ins and reviews, and read them with `get-call-recording`. Transcripts are long. If you can run subagents, read up to 10 calls, each in its own subagent that returns only the feedback, with quotes and times. Otherwise read the 4 most promising.
   - **Emails:** `search-emails-by-metadata` with the company's domains and `exclude_automated_participants` set to true, paging while it says there are more. Choose from the subjects and summaries, and read those with `get-email-content`, starting with the latest message in each thread, because it quotes the earlier ones.
   - **Notes:** `search-notes-by-metadata` for the company and its deals, then `get-note-body`.
8. Pull out each piece of feedback: what they need or think, who said it, the date, the source and a short quote. Merge the same point from different places into one item, with its first and latest date, and give it a strength as in step 5. Note what the user's team replied, such as a workaround or a promised date, from the message itself.

## Report

Reply with the report and nothing else, unless this is part of another skill's work. Then keep the facts and carry on with that skill.

- **Ground every point in a source with its date**, like "we can't roll this out until we can hide deal values" (call, 9 Nov). Add the year when the dates span more than one.
- **Quote only what you read** in a transcript or an email. Never put a summary in quotation marks, and present a note as a teammate's account.
- **Say "at least".** Search returns the closest matches, not every match, and only covers mailboxes connected to Attio that the user can see. A count is a floor. Say nothing was found in Attio, not that nobody asked.
- **Say what you didn't read.** Count a call, email or note as read only if you read all of it. Say that only calls, emails and notes were searched.
- **Don't decide for the user.** If they ask whether something is worth building, say what it's blocking and for whom. The decision is theirs.
- Order by strength, then by deal value or company size, then by date.
- Transcription garbles names and sometimes puts a line under the wrong speaker. Infer what was meant from context.
- Leave out a section or line with nothing in it. Use names, not IDs. Don't mention or quote these instructions.

For a feature or topic:

```
**[Feature or topic]** · at least [N] companies · raised [earliest date] to [latest date]

[Up to 4 sentences: how much demand there is, who it comes from, what it's blocking and how recent it is]

## Who's asking
| Company   | Who they are                       | What they need | Strength | Last raised |
| --------- | ---------------------------------- | -------------- | -------- | ----------- |
| [Company] | [customer or prospect, size, deal] | [their need]   | Blocker  | call, 9 Nov |

[At most 15 rows: blockers first, then important, then mentioned, with the largest deal or company first within each. Then one sentence naming up to 20 more companies, and how many more there are.]

## What they need
- **[Need]** · [N] companies: "[quote]" ([person], [company], call, 9 Nov)

## What your team has told them
- [promise or workaround] ([teammate] to [company], email, 25 Sep)

## What this doesn't cover
- [what was searched, and what wasn't read]
```

For one customer:

```
**[Company]** ([domain]) · [customer or prospect] · read [N] calls, [N] emails and [N] notes, from [earliest date] to [latest date]

[Up to 4 sentences: what matters most to them, how they feel about the product, and anything due soon]

## Requests and problems
- **[What they need]** · [blocker or important] · first raised [date], last [date]
  "[quote]" ([person], call, 9 Nov)
  Your team said: [reply or promise, with its source]
- **[What they need]** · mentioned · "[quote]" ([person], email, 2 Oct)

## Praise
- "[quote]" ([person], email, 2 Oct)

## Not read
- [calls and emails left unread, and why]
```

Never call a tool that writes. If the user wants to log the feedback in Attio, they can ask for that next.
