---
name: draft-follow-up-email
description: Draft a follow-up email after a call or meeting, in the user's own voice, from what was actually said. Checks the user hasn't already followed up, learns their greeting, sign-off and tone from emails they've sent, and uses only facts from the call and Attio. Drafts only, never sends. Use when the user asks for a follow-up, recap or next-steps email to a prospect or customer ("write a follow-up to Leif from today's call"), or when another skill needs one. Not for cold outreach, sequences, bulk email or internal updates.
---

# Draft follow-up email

1. Find the conversation and the people. Use the call the user names, or the notes they paste. To read a recording, use the `analyze-call-recording` skill, or `get-call-recording` if you can't. If it's unclear which call, ask. The recipients are the external people on the call: not workspace members (`list-workspace-members`), and not on the user's email domain. Get their email addresses from their person records (`search-records`).
2. Check whether the user already followed up. Call `search-emails-by-metadata` with the recipients' addresses since the call, and `get-email-content` for anything the user sent. If they already sent a follow-up, say so and stop, unless they want another. If the prospect wrote since, reply to that email instead.
3. Learn the user's voice from 3 to 5 emails they sent to external people. Use `search-emails-by-metadata` with `exclude_automated_participants`, then `get-email-content`, and check the user is the sender. Note their greeting, sign-off, usual length, formality, and habits such as lowercase, exclamation marks or dashes. If you find none, write plainly and say so.
4. Write the email:
   - Open with every recipient's first name ("Hi Martin, James,"), then one sentence that thanks them and names something specific from the call.
   - Then short paragraphs, leaving out any the call didn't cover: their situation in their own words, answers to their questions, what the user will do and by when, what you need from them, and the next step with a date and who should attend.
   - Keep it to their usual length, and never over 300 words. Use bullets only to recap three or more separate topics.
   - Use no headings, bold text or template labels.
   - Commit the user only to what they offered on the call. No "I'll look into…" or "I'll put together…" they didn't say. If the answer to a question is in the call, Attio or what the user told you, put it in. If not, list the question for the user after the draft instead of promising an answer.
   - Don't invent prices, discounts, dates, features, certifications, links or attachments. If something the user must supply is missing, put a short `[gap]` where it goes and list the gaps after the draft.
   - Leave out internal details: stage names, deal values, forecasts, notes and other customers.
   - Write in the prospect's language. Use a short subject that names the topic, or reply in their thread.
5. Reread the draft as the prospect, then edit it. Cut every sentence that carries no fact, answer or action, and any sentence that repeats the one before. Then remove the AI tells listed in [references/ai-tells.md](references/ai-tells.md), keeping anything the user writes in their own emails from step 3.
6. Show the draft: To, Cc, Subject and body, then any gaps and open questions. Say it's ready to send from their own mail client. There is no tool to send email, so never claim it was sent. When another skill is building a preview, give it the draft and let that skill ask.
