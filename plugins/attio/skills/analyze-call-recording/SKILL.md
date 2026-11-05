---
name: analyze-call-recording
description: Analyze a recorded call in Attio. Finds the call recording, reads the full transcript, classifies the call (discovery, demo, evaluation check-in, negotiation or other) and writes an analysis suited to that type. Use whenever the user asks to analyze, review, debrief or summarize a call or meeting recording, or wants feedback on how a call went, even if they only name the meeting, the person or the company they spoke to.
---

# Analyze call recording

## 1. Find the recording

In Attio, a meeting is a calendar event and a call recording is a transcript attached to a meeting. A meeting can have no recording, one recording or several (several is an edge case, e.g. when the call recorder leaves and rejoins). `get-call-recording` needs both `meeting_id` and `call_recording_id`.

| The user gives                                  | Do this                                                                                                                                                         |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An Attio link or both IDs                       | Use the two UUIDs directly                                                                                                                                      |
| A meeting title                                 | `search-call-recordings-by-metadata` with `meeting_title_query`                                                                                                 |
| A person or company                             | `search-records` for its record ID, then `search-call-recordings-by-metadata` with `speaker_person_record_ids` (person) or `related_record_ids` (company, deal) |
| A topic ("the call where they raised security") | `semantic-search-call-recordings`                                                                                                                               |
| "My last call"                                  | `whoami` (skip if you already know who the user is), then `search-call-recordings-by-metadata` with `speaker_workspace_member_ids`                              |
| A date                                          | `search-meetings`, then use its `call_recording_ids`                                                                                                            |

Add a time range whenever the user gives one. Results are newest first.

If more than one recording could match, list the candidates with title, date and participants, and ask which one. Metadata search returns no titles, so get them from `search-meetings` over the same time range. Analyzing the wrong call wastes more of the user's time than one question does.

If the meeting has no recording, say so. Calls logged from a dialer are activity records, not call recordings, and this skill does not cover them.

## 2. Read the full transcript

Fetch the recording with `get-call-recording` and read all of it before you form a view. The call type often becomes clear late, for example when pricing comes up near the end.

- If `status` is not complete, tell the user the transcript is partial.
- Work out which speakers are on the user's side (`whoami`, `list-workspace-members`) and which are external.
- Transcription garbles names of people, companies and products. Infer the intended word from context, and do not quote the error as fact.

## 3. Classify the call

Pick one primary type and read its reference file.

| Type                | Signals                                                                                                      | Reference                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------- |
| Discovery           | The seller asks about the buyer's situation, problems and process. Little or no product is shown.            | `references/discovery.md`   |
| Demo                | The seller walks through the product and the buyer reacts.                                                   | `references/demo.md`        |
| Evaluation check-in | The buyer is already trialing, piloting or reviewing. The call covers progress, blockers and open questions. | `references/evaluation.md`  |
| Negotiation         | Pricing, terms, contract, procurement or the final decision.                                                 | `references/negotiation.md` |
| Other               | Anything that is not a sales conversation with a prospect, or a call too unclear to place.                   | `references/other.md`       |

Calls often mix types, such as discovery that turns into a demo. Choose the type that took most of the call and mention the secondary one. State the type and your reason first, so the user can correct you before reading on.

## 4. Write the analysis

```
**[Meeting title]** · [date] · [participants, grouped by side]
**Call type:** [type] ([one-line reason])

## Summary
[2 to 4 sentences: what the call was for and where it landed]

[Sections from the reference file]

## Next steps
- [Owner]: [action] ([date, if one was stated])

## Gaps and risks
- [What should have come up and did not, or signals that put the outcome at risk]
```

- **Ground every point in the transcript.** For the points that matter most, quote a short phrase with its timestamp, like "I have a budget" (8:54).
- **Keep it short.** The user should be able to act on it in a minute. Leave out a section that has nothing in it, and put the missing topic under Gaps and risks.
- **Use the user's methodology.** Do not impose a sales framework. If the user names one, such as MEDDICC or BANT, structure the analysis around it.

## 5. Offer to save

Do not write to Attio unless the user asks. At the end, offer to save the analysis as a note on the related record (`create-note`) and the next steps as tasks (`create-task`).
