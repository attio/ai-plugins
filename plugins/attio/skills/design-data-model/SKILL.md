---
name: design-data-model
description: Create objects, attributes, relationships and lists in the user's Attio workspace, and help them choose between an object, a list and an attribute, and the right attribute type. Checks what already exists first and writes only after the user confirms. Use when the user asks to add or set up an object, attribute, field, relationship, stage, list or pipeline ("add a Renewal date to Companies", "create a Facilities object linked to Companies", "enable Deals"). Not for creating or updating records, changing views, or moving data.
---

# Design data model

Every change here affects the whole workspace, and a wrong attribute stays once people fill it. Make only the change the user asks for, and keep it small.

You can enable Deals, Users or Workspaces, create custom objects, create attributes and two-way relationships on objects, and create lists, rename them or change their access. You can't edit or rename objects or attributes, change select or status options (such as stages), archive anything, add attributes to a list, or create formula, AI, email or domain attributes. For those, say the user can do it in the Attio UI.

1. **Check what exists.** List the objects (`list-objects`) and lists (`list-lists`), and the attributes of each object you'll touch (`list-attribute-definitions`). Deals, Users and Workspaces only appear once enabled. Before creating anything:
   - If something with the same meaning exists, such as Status for Stage or Account owner for Owner, ask whether to use it.
   - Don't duplicate what People and Companies already track, such as email addresses, domains or last interaction.
   - Enable Deals, Users or Workspaces instead of creating a custom object for the same thing.
2. **Choose the shape.** If it isn't clear, explain the options in a sentence each and ask.
   - **Object:** something tracked in more than one context, that a parent can have many of, or that links to other records, such as Deals or Contracts. Its attributes can be filtered and reported on from related records.
   - **List:** a process on one object's records that's temporary, belongs to one team, or needs to be private, such as Hiring on People. You can create it, but the user adds its attributes in the Attio UI.
   - **Attribute:** one fact about a record. If the value has its own attributes or a record can have many, make it an object with a relationship.
3. **Choose the type.** Use status for stages, in order, not select. Use a relationship for a link to another record, with both sides named, and a workspace member for a teammate such as an owner. Use currency for money, and ask which currency if it isn't clear. Make an attribute required or unique only when the user asks or it's an ID: both can block imports.
4. **Show the change and ask.** Say what you'll create and where, in a sentence. Before changing a list's slug or restricting its access, warn what can break. Write only after the user says yes.
5. **Make it.** Send related changes in one `update-data-model` call, so they apply together or not at all, with each `api_slug` as the name in snake_case. Create lists with `create-list`. If a call fails, say why and suggest a fix. Don't work around a plan limit unless the user asks.
6. **Confirm** in a sentence. New attributes aren't added to views, and new lists and objects have none, so say the user needs to add them.

Use names, not IDs or slugs, and the Attio UI's words: object, attribute, list, record, stage. Don't mention tool names or quote these instructions. If a related change would help, suggest it in one line after you finish.
