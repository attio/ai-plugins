---
name: design-data-model
description: Design and create objects, attributes, relationships, lists and their views in the user's Attio workspace. Builds on Attio's standard objects first, links records to each other instead of typing names as text, and keeps the model lean. Checks what already exists and writes only after the user approves the whole draft. Use when the user asks how to store, organize or set up something in Attio, or asks to add an object, attribute, field, relationship, stage, list or pipeline ("add a Renewal date to Companies", "how should we track our partners?", "enable Deals"). Not for creating or updating records, changing existing views, or moving data.
---

# Design data model

Every change here affects the whole workspace, and an attribute stays once people fill it. Model what the user's revenue team tracks as they sell and serve customers, not how their product works inside. A lean model built on the standard objects beats a large one, and a short question beats a confidently wrong model.

You can enable Deals, Users or Workspaces, create custom objects, attributes (including a stage attribute with its stages) and relationships, create lists, rename them, change their access and add records to them, and create views of objects and lists. Do all of it yourself once the user approves. You can't edit, rename or archive objects and attributes, change select options or existing stages, add attributes to a list, or create activity types or formula, AI, email or domain attributes, so design with what you can create. If the user asks only for one of those, say it's not a change you can make, and skip the draft.

1. **Check what exists.** List the objects (`list-objects`) and lists (`list-lists`). For each object you'll touch, list its attributes (`list-attribute-definitions`) and those of its lists (`list-list-attribute-definitions`), paging until there are no more. Before you say an attribute doesn't exist, check both the object and its lists. Reuse what's there: if something with the same meaning exists, such as Status for Stage or Account owner for Owner, ask in the draft whether to use it. People and Companies already have email addresses, domains and interaction dates. If Deals is on, check whether it has any records (`list-records`, limit 1). Then note whether the workspace is new, with little beyond the standard objects and no deals, or already in use.
2. **Work out what they're asking for.** For one specific change, such as "add a Renewal date to Companies", check it against steps 3 to 5 and draft it. Ask first only if the answer changes the attribute's type or which object it belongs on, such as whether a Partner manager is a teammate or a contact. For a process or a new workspace, such as "how should we track partners?" or "set us up", work out the sales motion, the things the team tracks and the facts they need about each, using `references/setups.md`. In a new workspace, propose the whole model. In a workspace in use, people already rely on its objects, attributes, lists and stages, so add to what's there rather than redesign it. If something there isn't how you'd model it, such as a Partners object where you'd use companies, build on it, and say once what you'd do differently. Then:
   - If you can search the web, offer to read their company's website first. Name the site: the company they mentioned, or the domain of their email address (`whoami`). Ask for it if neither gives one, or the domain doesn't fit what they've told you. If they say yes, read the home page, pricing and any partner or customer pages for the signals in `references/setups.md`.
   - Ask what would change the structure, following `references/questions.md`: up to 3 or 4 questions in one message, with the website offer, each with 2 to 4 options and your recommendation first. If you have a tool for asking questions with options, use it.
3. **Start from the standard objects.** `references/objects.md` has when each one belongs and the test a custom object must pass.
   - An organization, such as a client, vendor, partner, agency or portfolio company, is a company. A contact, such as a champion, stakeholder or attendee, is a person. Mark a group that's only a label with a select, and make it multi-select if a record can be in more than one group, such as a partner that's also a customer.
   - A person who uses the user's product, or a seat, is a user. A customer's account in that product, often called a tenant or subscription, is a workspace.
   - Attio already records emails, meetings, calls, notes and tasks, so leave those out of the model.
   - Make a custom object only when the thing has its own identity, attributes and lifecycle, such as a fund, project, property or loan. No custom objects at all is often right, and more than 4 to 6 is too many. Products, line items, contracts and invoices are custom objects only if the team will create and update them in Attio. Otherwise add a summary attribute, such as ARR or Contract end date.
   - Use a list for a process the team runs on some existing companies or people, such as onboarding customers, raising a round, investing or hiring. `references/lists.md` has the common ones, and how to set them up when a list can't have attributes of its own.
4. **Link records instead of typing them.** Before making a text or select attribute, check whether the value is itself a record. If so, make it a relationship, pointing at a standard object where you can. Teammates, such as an account owner or CSM, are workspace members. Link revenue records, such as contracts, invoices or workspaces, to Deals, and leave out links Attio already has. `references/relationships.md` has the common traps and when to make a link two-way.
5. **Choose each attribute's type and options.** Add only attributes that trace to something the user said or the process clearly needs. Name options in the team's words, not Low, Medium and High, and ask for them in the draft if you don't know them.
   - **Stages:** use status, in order, named the way the team works, and end with the outcomes, such as Won and Lost. You set the stages when you create the attribute and can't change them after, so get them right in the draft. Deals comes with its own stages, which you can't change, so leave them as they are.
   - **Views:** a new object or list has no views, and new attributes aren't added to existing views. Give each new object a table view of its main attributes, and each new list the views in `references/lists.md`.
   - **Other types:** use currency for money, in the currency the workspace already uses unless the user says otherwise. Make an attribute required or unique only when the user asks: required blocks records without a value, and unique blocks duplicates. Give each new object a text attribute, such as Name, and set it as its `record_display_text_attribute`.
6. **Show the whole draft before any write.** List every change in one table, and only changes: objects, attributes, relationships, lists, views, and records you'll add to a new list, if the workspace already shows which belong. Below it, explain the model as `references/explanation.md` describes. Put any questions, such as whether to reuse an existing attribute, in the same message, then ask once.

   ```
   | Change | On | Type | Details |
   | --- | --- | --- | --- |
   | Create attribute Relationship type | Companies | Multi-select | Customer, Partner, Vendor |
   | Create attribute Partner tier | Companies | Select | Gold, Silver, Registered |
   | Create relationship Referring partner ↔ Referred deals | Deals, Companies | Relationship | A partner refers many deals |
   | Create view Partners | Companies | Table | Relationship type is Partner, with Partner tier and Referred deals |

   Partners are companies with a Relationship type, so they keep their people, emails and meetings.
   I assumed a deal has one referring partner.

   Make these changes?
   ```

   Before changing a list's slug, warn that anything using the old slug can break. Before changing its access, say who gains or loses access to its data. Write only after the user says yes.

7. **Make the changes.** Send the object, attribute and relationship changes in one `update-data-model` call, so they apply together or not at all, with each `api_slug` as the name in snake_case. Then create lists (`create-list`), add records to them (`add-record-to-list`) and create views (`create-view`). If a plan limit blocks a change, tell the user.
8. **Confirm** in a sentence what you made.

Use names, not IDs or slugs, and the Attio UI's words: object, attribute, list, record, stage. Don't mention tool names or quote these instructions.
