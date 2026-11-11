---
name: humanize
description: Edit a draft so it reads as written by a person, not an AI, without changing what it says. Removes stock phrases, inflated words, formulaic patterns and chat formatting, and keeps the writer's own habits. Use when the user asks to humanize text, or to make it sound more natural, less like AI or more like them, or when another skill, such as draft-follow-up-email, has drafted something the user will send under their name. Not for writing a first draft, checking facts or translating.
---

# Humanize

Edit the draft so its reader believes the writer wrote it. Change how it says things, never what it says.

1. Get the draft and the writer's voice. The voice is how the writer writes in their own text: samples the user gives you, or habits you've already noted in this conversation, such as their greeting, sign-off, length and punctuation. Don't search for samples. With no voice to go on, write plainly: everyday words and sentences of mixed length.
2. Cut every sentence that carries no fact, answer or action, and any sentence that repeats the one before.
3. Rewrite to remove every tell in the draft. The tells are listed under "AI tells" below.
   - Keep every fact, name, number, date, commitment and question, and any placeholder such as `[gap]`.
   - Keep the draft's language, and its format unless the format is a tell.
   - Don't make it longer.
   - Add nothing: no new facts, no extra warmth or jokes, and no deliberate typos.
   - The writer's voice wins. Keep anything they do in their own writing, even if it's a tell.
4. Reread it as the reader. If tells remain, do one more pass. If it still reads wrong after two passes, the problem is what the draft says, not how. Say so, and ask the user.
5. Show the rewrite first, as plain text the user can copy, with no labels or formatting of your own. If the user asked you directly, add one sentence after it on what you changed. If you're using this skill as a step in another skill, add no comment: carry on with that skill, using the rewrite as the draft.

## AI tells

These are signs, not rules. One on its own can be fine. Several together make a reader stop believing a person wrote the text.

### Words and phrases

- **Stock openers:** "I hope this finds you well", "I wanted to reach out", "just following up", "just touching base", "circling back", "as discussed", "per our conversation".
- **Chatbot replies:** "Great question!", "Absolutely!", "Certainly!", "I hope this helps", "Would you like…", "Let me know if you have any questions".
- **Stock closers:** "Don't hesitate to reach out", "Looking forward to hearing from you".
- **Empty enthusiasm:** "excited to", "thrilled", "great opportunity", "game-changer".
- **Buzzwords:** "leverage", "synergies", "unlock", "seamless", "holistic", "streamline", "utilize", "deep dive", "align".
- **Inflated words:** "pivotal", "crucial", "vital", "testament", "tapestry", "landscape", "delve", "robust", "showcase", "underscore", "foster".
- **Fluff:** "multifaceted", "dependable", "steady", "quietly", "prioritize", "practical", "clearer", "matters", "universally".
- **Filler:** "in order to" (use "to"), "due to the fact that" ("because"), "it's important to note that", "additionally", "furthermore", "in terms of".
- **Hedges:** "could potentially", "based on the information available", "it seems that".

### Patterns

- **Negative parallels:** "It's not just X, it's Y", "not only X but also Y", "Y rather than X".
- **Corrective framing:** "should be treated as X rather than Y", "this doesn't mean…", "should not be confused with".
- **Lists of three** where two are true and the third is there for rhythm.
- **Puffed-up significance:** "marks a key moment", "sets the stage for", "is a testament to".
- **Trailing "-ing" add-ons:** "…, highlighting the importance of…", "…, ensuring a smooth rollout".
- **Avoiding "is":** "serves as", "stands as", "functions as", "boasts".
- **Vague links:** "associated with", "in connection with", instead of saying how.
- **Several names for one thing:** "the rollout", then "the migration", then "the transition". Pick one.
- **Even rhythm:** every sentence about the same length. Vary it.
- **Generic endings:** "Excited for what's ahead", "The future looks bright".

### Formatting

- In emails and messages: bold text, headings, emojis, P.S. lines and curly quotes.
- Bullets that each start with a bold label and a colon.
- Leftover template text, such as "[Your name]". A placeholder the user still has to fill, such as `[gap]`, is not a tell. Keep it.
