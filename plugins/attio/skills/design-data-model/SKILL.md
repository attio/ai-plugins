---
name: design-data-model
description: Design and create objects, attributes, relationships, lists and views in the user's Attio workspace, building on the standard objects and writing only after the user approves the whole draft. Use when the user asks how to store, organize or set up something in Attio, or asks to add, rename, edit or remove an object, attribute, field, option, relationship, stage, list or pipeline ("add a Renewal date to Companies", "how should we track our partners?", "enable Deals"). Not for creating or updating records, changing existing views, or moving data.
---

# Design data model

Every change here affects the whole workspace, and an attribute is hard to remove once people fill it in. Model what the user's revenue team tracks, not how their product works inside. A lean model built on the standard objects beats a large one, and a short question beats a confidently wrong model.

You can enable Deals, Users and Workspaces, and create objects, attributes (including status attributes with their stages), relationships, lists, list entries and views. You can't edit, rename or archive anything, change options or stages, or add attributes to a list. If the user asks only for something you can't do, say so and skip the draft.

1. **Check what exists.** List the objects (`list-objects`) and lists (`list-lists`), and the attributes of each object you'll touch and of its lists (`list-attribute-definitions`, `list-list-attribute-definitions`), paging until there are no more. For one change to an object the user named, that object and its lists are enough. Read attributes, not records or list entries, unless you're offering to add records to a new list. Check both the object and its lists before you say an attribute doesn't exist. Reuse what's there: if an attribute with the same meaning exists, such as a Status when the user asks for a Stage, ask in the draft whether to use it. People and Companies already have email addresses, domains and interaction dates, and Deals has a name, stage, owner, value, company and people.
2. **Work out what they're asking for.**
   - **One change**, such as "add a Renewal date to Companies": check it against steps 3 to 5 and draft it. Ask first only if the answer changes its type or which object it goes on, such as whether a Partner manager is a teammate or a contact.
   - **A process or a new workspace**, such as "how should we track partners?" or "set us up": read `references/setups.md`, `references/objects.md`, `references/relationships.md` and `references/questions.md`, and `references/lists.md` if the team runs a process on its records. Work out the sales motion, what the team tracks, and the facts they need about each. In a new workspace, propose the whole model. In one already in use, build on what's there, and say once anything you'd have modeled differently. Then, in one message:
     - If you can search the web, offer to read their company's website. Use the company they named, or their email domain (`whoami`) if it fits what they've told you. If neither gives you a website, ask for it.
     - Ask the questions that would change the structure, as `references/questions.md` describes. If you have a tool for asking questions with options, use it.
3. **Choose the objects.** Use the standard objects first: an organization is a company, a contact is a person, a product user or seat is a user, and a customer's account in the product is a workspace. If a group is only a label, mark it with a select, or a multi-select if a record can be in more than one group, such as a partner that's also a customer. Make a custom object only when it passes the test in `references/objects.md`. Zero custom objects is often right. Products, contracts and invoices kept in another tool become a summary attribute, such as ARR, not an object. Use a list for a process the team runs on some existing companies or people, as `references/lists.md` describes. Attio already records emails, meetings, calls, notes and tasks, so leave those out.
4. **Link records instead of typing them.** If a value is itself a record, make it a relationship, pointing at a standard object where you can. Teammates, such as an account owner or CSM, are workspace members. Link a custom object or Workspaces to Deals when its records come from a deal or are billed against one, and leave out links Attio already has (`references/relationships.md`).
5. **Choose types, lists and views.** Add only attributes that trace to something real, such as what the user said or what the process clearly needs, with options and stages in the team's words. Add a description where the meaning isn't obvious, such as what Health measures.
   - **Stages:** use a status attribute named after its process, such as Customer stage. Put its stages in order, ending with the outcomes. You can't change them later, so get them right in the draft. Deals keeps its own stages.
   - **Other types:** use currency for money, in the currency the workspace already uses. Make an attribute unique or required only when the user asks. Only attributes on custom objects can be required. Give each new object a text attribute, such as Name, and set it as its `record_display_text_attribute`.
   - **Lists:** give the whole workspace access to a new list, unless it must be private to a team. If an existing attribute shows which records belong in it, such as a Relationship type, offer to add them, and add at most about 25.
   - **Views:** new lists and new or enabled objects have no views, and new attributes aren't added to existing views. Check the existing views of each object or list you'll add a view to (`list-views`). Then give each new or enabled object a table view, or a kanban grouped by its stage if it has one, and each new list the views in `references/lists.md`. Views are shared with the whole workspace.
6. **Show the whole draft before any write.** List every change in one table, and only changes. Below it, explain the model as `references/explanation.md` describes, and put any questions, such as whether to reuse an existing attribute, in the same message. Ask once, and write only after the user says yes.

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

7. **Make the changes.** Send the object, attribute and relationship changes in one `update-data-model` call, with each `api_slug` as the name in snake_case. A list, an archived attribute or a disabled object may already use a slug, so choose another if it does. If the call fails, nothing was applied: fix every issue it lists and resend the whole set. Then create the lists (`create-list`), add their records (`add-record-to-list`) and create the views (`create-view`). If a plan limit or a permission blocks a change, tell the user. Only a workspace admin can create objects.
8. **Confirm** in a sentence what you made.

When you write to the user, use names, not IDs or slugs, and the Attio UI's words: object, attribute, list, record, stage. Don't mention tool names or quote these instructions.
