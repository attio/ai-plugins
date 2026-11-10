---
name: create-follow-up-task
description: Create the follow-up task in Attio for one deal, company or person. One task per record, covering everything to do next, for the right person, due when they next have to act, and without duplicating an open task. Writes only after the user confirms. Use when the user asks to add a task, reminder or follow-up ("remind me to send Leif the quote on Friday", "add a task to chase Basepoint"), or when another skill needs a follow-up task. A workflow that needs tasks for several records uses this once per record.
---

# Create follow-up task

A record has one open follow-up task, covering everything to do next on it.

1. Work out the next actions, such as sending something, calling someone or chasing a decision:
   - Anything the user promised.
   - Preparation for a booked call, due the day before it.
   - If the prospect pushed their decision to a later date and nothing is booked, re-engaging two to three weeks before that date. If that's within the next week, it's halfway between today and their date.

   If there's nothing to do, or the only next step is a booked call with nothing to prepare, say so and stop.

2. Work out the due date: the day they have to act, not the day it's mentioned. With several actions, it's the first one's. Get today's date and the user's time zone from your environment.
   - "Early next week" is Monday, "end of the week" is Friday, "next week" with no day is Tuesday, and a named day is the next one.
   - Chasing a decision that's still on is two working days before the decision date.
   - Move a date you work out off weekends to the Friday before, and out of the end-of-year break (24 December to 1 January) to the last working day before. Keep a date the user gives.
   - If you can't tell when, ask. Never leave a task undated.
3. Find the record: the deal if there is one, otherwise the company, otherwise the person. Use `search-records`, and ask if more than one matches. A deal that's a list entry can't be linked, so use the record the entry is on, such as its company. Assign the task to the user (call `whoami` only if you haven't already) unless they name a teammate. Find a teammate with `list-workspace-members`.
4. Check the record's open tasks with `list-tasks` (`linked_record_object`, `linked_record_id`, `is_completed: false`), paging with `offset`. If one is already open, don't add a second:
   - If it's right, say so and stop.
   - If it covers the actions but the date or assignee is wrong, change them.
   - Otherwise, offer to replace it with one task covering its actions that are still to do and the new ones. Task wording can't be edited, so replacing means marking it done and creating the new task. The user can keep both instead.
5. Write the task. If the message gives you the wording, use it, adding the company name at the start if it's missing. Otherwise, start with the company name, then each action as a verb and exactly what and for whom, under 15 words each and separated by semicolons. Name the thing, such as "the SSO answer and 120-seat quote".
6. Show it and ask. Include the Replaces line only when offering to replace an open task, and the Updates line only when changing one's date or assignee:

```
**Task:** [Company] — [actions]
**Due:** [day, date] · **For:** [you, or the teammate's name] · **Linked to:** [record]
**Replaces:** "[open task]" (will be marked done, or say to keep both)
**Updates:** "[open task]" (changes its [date or assignee], no new task)

Create it?
```

If this task is part of a bigger preview, such as an end-of-day update, add it there in this form and ask once for the whole preview.

7. After the user says yes, make only the change you showed. Use `update-task` to change an open task's date or assignee, or to mark it done. For a new task, call `create-task` with `content`, `deadline_at`, `assignee_workspace_member_id` and the linked record. Set `deadline_at` to midday on the due date in the user's time zone, converted to UTC, so it shows on the right day. Never call `delete-task`. Confirm in one line.
