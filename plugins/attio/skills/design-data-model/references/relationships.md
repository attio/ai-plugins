# Relationships

## Link records instead of typing them

The biggest mistake is turning a relationship into a text or select attribute. A good Attio workspace is linked records, not a spreadsheet. A Champion that links to a person is far more useful than a typed name.

Before making a text or select attribute, ask:

1. Could this value have its own attributes, owner or history? Then it's a record, and needs a relationship.
2. Would the team look at it the other way around, such as "all deals for this champion"? Then make it two-way.
3. Is it only a flat label, such as priority, or a region with no territory data? Then a select is fine.

When in doubt, use the relationship. A missing relationship is hard to spot later. A relationship should still point at a standard object where it can: Account to Companies, Champion to People, Subscription to Workspaces. Making something a relationship doesn't mean creating a new object to point at.

Teammates, such as an account owner, CSM or partner manager on the user's team, are workspace members, not people records, so the team can filter for their own records.

## Common traps

These look like text or selects but should be relationships, because they point at standard objects: Champion, Economic buyer, Parent company (Companies to itself), Referring partner, and Renewal of and Upsell of (Deals to itself). Subscription plan, Source campaign, Territory when it has owner or quota data, and Products sold are relationships only if the object they'd point at passes the test in `objects.md`. Otherwise use a select. Account owner, CSM and Partner manager look like text too, but are workspace members. Industry is usually fine as a select.

## One-way or two-way

Make a relationship two-way when the team will look at it from both sides, and name both sides. Use a one-way link (a record reference attribute) for simple lookups.

## Links Attio already has

Leave out links Attio already has: people to their company, deals to their company and people, users to their person and workspaces, and workspaces to their company. Names such as "Primary company", "Contacts" or "Deal contacts" copy links that already exist.

## Link to Deals

For each custom object, and for Workspaces, ask: do its records come from a deal, lead to one, get billed against one, or get tracked per deal? If so, link it to Deals, two-way. This is the link most often missed. Typical cases are subscriptions, invoices, workspaces, funds, marketing campaigns and events.

Lookup objects, such as Territory, link to Companies, not Deals.
