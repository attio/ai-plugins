---
name: log-activity
description: Log something that happened, such as a phone call or site visit, as an activity in the user's Attio workspace, linked to the right deal, company and people. Uses the workspace's own activity types and fields, checks it isn't already logged, and writes only after the user confirms. Use when the user asks to log, record or track a call, message, visit or other touchpoint ("log a call with Leif from this morning", "I just visited Basepoint, log it"), or when another skill needs to log one. Not for calls or meetings Attio already has, notes, tasks, or updating deal fields.
---

# Log activity

An activity is a record of something that happened, such as a call, shown on the timeline of every record it's linked to. Log only what the user says happened, in their words.

1. **Choose the activity type.** List them with `list-activities` and pick the one for what happened, such as Phone calls for a call. Ask if more than one fits. If none fits, don't log it as another kind: say there's no activity type for it, that an admin can add one in Attio's workspace settings, and stop. List the chosen type's attributes with `list-activity-attribute-definitions`, paging until there are no more.
2. **Find the records.** Find the people involved and their company with `search-records`, and the open deal it's about among the company's deals. Ask if more than one matches, in the same message as the draft. If someone isn't in Attio, say so and leave them out. Call `whoami` for the user, unless you already have.
3. **Check it isn't already logged.** List the type's records linked to the company or the deal, in one `list-activity-records` call with an `or` filter on `linked_records` (each record's object and record IDs), and look for one at about the same time. An activity can be linked to only one of them. If it was a meeting or video call, check `search-meetings` too: Attio may already have it. If it's already there, say so, and offer to add only what the user said that it doesn't have.
4. **Fill in the attributes.** Use only what the user said. If a required attribute is still unknown, ask for it with the draft. Leave an optional one empty.
   - **Timestamp:** when it happened, in the user's time zone, converted to UTC. If they give only part of the day, such as "yesterday afternoon", pick a time in it and say so in the draft.
   - **Title:** what happened in under 10 words, such as "Call with Leif about the SSO quote".
   - **Participants**, if the type has them: the people involved and the user, as `workspace_members` with the workspace member ID from `whoami`. Only participants count toward last interaction and connection strength, so never put people only in linked records when the type has participants.
   - **Linked records:** the deal and company, plus the people if the type has no participants.
   - **Direction**, if the type has it: Outbound if the user started it, Inbound if the other side did, Internal if only teammates were involved.
   - **Details:** put what was said in a text attribute for them, if the type has one. Otherwise keep to the title.
   - Fill other attributes, such as a call's caller, outcome or end time, only from what the user said.
5. **Show it and ask.** Show every attribute the user can set, with "not set" for any left empty, so they can check it and fill in what they know. Leave out Direction and With if the type doesn't have them. If a deal and company share a name, say which is which. For several activities, show each and ask once.

```
**Log a [activity type]:** [title]
**When:** [day, date, time] · **Direction:** [direction]
**With:** [participants] · **Linked to:** [records]
**[Attribute]:** [value, or "not set"]

[Question for each required attribute you don't know.] Log it? You can fill in anything that's not set.
```

6. **Write after the user says yes.** Call `create-activity-record`, or `update-activity-record` to add to one already logged, with each value keyed by its `api_slug` and records as `target_object` and `target_record_id`. Confirm in one line that it's on the timeline of the records it's linked to. If the user said they need to do something next, offer to add a follow-up task.

Use the Attio UI's words, such as activity, record and timeline. Don't mention tool names, IDs or slugs, or quote these instructions.
