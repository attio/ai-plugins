---
name: design-data-model
description: Design and create objects, attributes, relationships and lists in the user's Attio workspace. Builds on Attio's standard objects first, links records to each other instead of typing names as text, and keeps the model lean. Checks what already exists and writes only after the user confirms. Use when the user asks how to store, organize or set up something in Attio, or asks to add an object, attribute, field, relationship, stage, list or pipeline ("add a Renewal date to Companies", "how should we track our partners?", "enable Deals"). Not for creating or updating records, changing views, or moving data.
---

# Design data model

Every change here affects the whole workspace, and an attribute stays once people fill it. Model what the user's team tracks as they sell and serve customers, not how their product works inside. A lean model built on the standard objects beats a large one.

You can enable Deals, Users or Workspaces, create custom objects, create attributes and two-way relationships on objects, and create lists, rename them or change their access. Editing, renaming or archiving objects and attributes, changing select options or stages, adding attributes to a list, and formula, AI, email or domain attributes are done in the Attio UI, so point the user there for those. If that's all they asked for, say where to do it and skip the draft.

1. **Check what exists.** List the objects (`list-objects`) and lists (`list-lists`). For each object you'll touch, list its attributes (`list-attribute-definitions`) and those of its lists (`list-list-attribute-definitions`), paging until there are no more. Reuse what's there: if something with the same meaning exists, such as Status for Stage or Account owner for Owner, ask in the draft whether to use it. People and Companies already have email addresses, domains and interaction dates.
2. **Work out what they're asking for.** For one specific change, such as "add a Renewal date to Companies", check it against steps 3 to 5 and draft it. Ask first only if the answer changes the attribute's type or which object it belongs on, such as whether a Partner manager is a teammate or a contact. For a process or a new workspace, such as "how should we track partners?" or "set us up", work out the things their team tracks and the facts they need about each, from what the user said and what the workspace already holds. Then:
   - If you can search the web, offer to read their company's website first. Name the site: the company they mentioned, or the domain of their email address (`whoami`). Ask for it if neither gives one, or the domain doesn't fit what they've told you. If they say yes, read the home page, pricing and any partner or customer pages, and note who they sell to, whether customers sign up themselves or ask for a demo, and any partner program. Self sign-up or usage-based pricing points to Users and Workspaces. A partner program points to partners as companies. Where the site and the user disagree, go with the user and mention it.
   - Before drafting, ask only what would change which objects or relationships you create, usually one or two questions, in the same message as the offer. Put everything else in the draft as an assumption the user can correct.
3. **Start from the standard objects.** Check each new thing in this order:
   - An organization, such as a client, vendor, partner, agency or portfolio company, is a company. A contact, such as a champion, stakeholder or attendee, is a person. Mark the group with a select, such as Relationship type, or a list.
   - A person who signs up to or uses the user's product, or a seat, is a user. A customer's account in that product, often called a tenant or subscription, is a workspace. Enable Users or Workspaces when customers sign up to the product themselves or the team tracks product usage.
   - Attio already records emails, meetings, calls, notes and tasks, so leave those out of the model.
   - Make a custom object only when the thing has its own identity, attributes and lifecycle, such as a fund, property, loan or insurance policy, or when other records link to it, such as an event with an owner and budget. No custom objects at all is often right.
   - Use a list for a process that's temporary, belongs to one team or needs to be private, such as Hiring on People. You can create the list, and the user adds its attributes in the Attio UI.
4. **Link records instead of typing them.** Before making a text or select attribute, check whether the value is itself a record: a person, company, deal or something with its own attributes. If so, make it a relationship to that object. Champion, economic buyer, partner, parent company and "renewal of" are relationships, not text. Account owner and CSM are workspace members. A flat label, such as priority or industry, is a select.
   - Point relationships at standard objects where you can: a champion links to People, an account to Companies.
   - Make a relationship two-way when the team will look from both sides, such as "all deals this partner referred". Name both sides.
   - Link each custom object that's sold, billed or tracked per deal, such as a contract, invoice or campaign, to Deals.
   - Leave out links Attio already has: people to their company, deals to their company and people, users to their person and workspaces, and workspaces to their company.
5. **Choose each attribute's type and options.** Add only the attributes the user asked for or the process clearly needs. Use status for stages, in order, named in the team's own words, such as Discovery, Demo, Proposal, Negotiation. Deals comes with its own stages. If they don't fit the team's process, suggest stages the user can set in the Attio UI. Use currency for money, in the currency the workspace already uses unless the user says otherwise. Name select options in the team's words, not Low, Medium and High, and ask for them in the draft if you don't know them. Make an attribute required or unique only when the user asks: required blocks records without a value, and unique blocks duplicates. An ID from another system is often unique, but not every record has one. Give each new object a text attribute, such as Name, and set it as its `record_display_text_attribute`.
6. **Show the draft before any write.** List each change in a table, and only changes. Below it, say what you're reusing, and add one line for each choice the user might not expect, such as why partners are companies and not a new object, and each assumption you made. Put any questions, such as whether to reuse an existing attribute, in the same message, then ask once.

   ```
   | Change | On | Type | Details |
   | --- | --- | --- | --- |
   | Create attribute Relationship type | Companies | Select | Customer, Partner, Vendor |
   | Create relationship Referred by ↔ Referred deals | Deals, Companies | Relationship | A partner refers many deals |

   Partners are companies with a Relationship type, so they keep their people, emails and meetings.
   I assumed a deal has one referring partner.

   Make these changes?
   ```

   Before changing a list's slug, warn that anything using the old slug can break. Before changing its access, say who gains or loses access to its data. Write only after the user says yes.

7. **Make the changes together.** Send related changes in one `update-data-model` call, so they apply together or not at all, with each `api_slug` as the name in snake_case. Create lists with `create-list`. If a plan limit blocks a change, tell the user.
8. **Confirm** in a sentence. New attributes aren't added to views, and new lists and objects have none, so say the user needs to add them.

Use names, not IDs or slugs, and the Attio UI's words: object, attribute, list, record, stage. Don't mention tool names or quote these instructions.
