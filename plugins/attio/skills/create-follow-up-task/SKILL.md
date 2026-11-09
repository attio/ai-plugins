---
name: create-follow-up-task
description: Create the next follow-up task in Attio for a deal, company or person. One clear action, for the right person, due when they next have to act, linked to the right record, and without duplicating an open task. Writes only after the user confirms. Use when the user asks to add a task, reminder or follow-up ("remind me to send Leif the quote on Friday", "add a task to chase AppSumo"), or when another skill needs a follow-up task. Not for listing or reviewing tasks, logging calls, or updating deal fields.
---

# Create follow-up task

1. Work out the one action. It's what the person has to do next, such as send something, call someone or chase a decision.
   - If the user promised something, the task is that promise.
   - If something needs preparing for a booked call, the task is that preparation, due the day before the call.
   - If the prospect pushed their decision to a later date and nothing is booked, the task is to re-engage two to three weeks before that date. If that's within the next week, use the day halfway between today and their date.
   - If there are several actions, the task is the one due first. Name the others in it only if they're due the same day. List the rest for the user, and ask if they want a task for each.
   - If there's nothing left to do, or the only next step is a booked call with nothing to prepare, don't create a task. Say so.
2. Work out the due date: the day they have to act, not the day it's mentioned. Get today's date and the user's time zone from your environment.
   - "Early next week" is Monday, "end of the week" is Friday, "next week" with no day is Tuesday, and a named day is the next one.
   - To chase a decision that's still on, it's two working days before the decision date.
   - If a date you work out falls on a weekend, move it to the Friday before. If it falls in the end-of-year break (24 December to 1 January), move it to the last working day before. Keep a date the user gives.
   - If you can't tell when, ask. Never leave a task undated.
3. Find what to link it to: the deal if there is one, otherwise the company, otherwise the person. Find them with `search-records`. If more than one matches, ask. A deal that's a list entry can't be linked, so link the record the entry is on, such as its company. Assign it to the user (call `whoami` only if you haven't already), unless they name a teammate. Find a teammate with `list-workspace-members`.
4. Check that record's open tasks with `list-tasks` (`linked_record_object`, `linked_record_id`, `is_completed: false`). Page with `offset`. If an open task already covers the action:
   - If only the date is wrong, move its date.
   - If the wording no longer fits, offer to replace it: mark it done and create the new task. The user can keep both instead. Task wording can't be edited.
   - If it's already right, say so and stop.
5. If the user or the skill that called this one gave the wording, use it, adding the company name at the start if it's missing. Otherwise, write the task as one line under 15 words. Start with the company name, then a verb, then exactly what and for whom. Name the thing, such as "the SSO answer and 120-seat quote", not "follow up" or "touch base".
6. Show it and ask. Include the Replaces line only when you're offering to replace an open task:

```
**Task:** [Company] — [action]
**Due:** [day, date] · **For:** [you, or the teammate's name] · **Linked to:** [record]
**Replaces:** "[open task]" (will be marked done, or say to keep both)

Create it?
```

When another skill is building a preview, give it the task in this form and let that skill ask.

7. After the user says yes, make only the change you showed. To move an open task's date or mark it done, use `update-task`. For a new task, call `create-task` with `content`, `deadline_at`, `assignee_workspace_member_id` and the linked record. Set `deadline_at` to midday on the due date in the user's time zone, converted to UTC, so it shows on the right day. Never call `delete-task`. Confirm in one line.
