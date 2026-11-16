# Relationships

## Use relationships, not text

The biggest mistake is turning a relationship into a text or select attribute. A good Attio workspace is linked records, not a spreadsheet. A Champion that links to a person is far more useful than a typed name.

Before making a text or select attribute, ask:

1. Could this value have its own attributes, owner or history? Then it's a record, and needs a relationship.
2. Would the team look at it from the other side too, such as "all deals for this champion"? Then make it a relationship. If only one side matters, a record reference attribute is enough.
3. Is it only a flat label, such as priority, or a region with no territory data? Then a select is fine.

When in doubt between text and a link to an object that already exists, use the relationship. A missing relationship is hard to spot later. A relationship should still point at a standard object where it can: Account to Companies, Champion to People. Making something a relationship doesn't mean creating a new object to point at.

Teammates, such as an account owner, CSM or partner manager on the user's team, are workspace members (type `actor-reference`), not people records, so the team can filter for their own records.

## Common traps

These look like text or selects but should be relationships, because they point at standard objects: Champion, Economic buyer, Parent company (Companies to itself), Referring partner, and Renewal of and Upsell of (Deals to itself). Subscription plan, Source campaign, Territory when it has owner or quota data, and Products sold are relationships only if the object they'd point at passes the test in `objects.md`. Otherwise use a select. Industry is usually fine as a select.

## Relationship or record reference

A relationship always links both sides: it adds an attribute to each object, named for its role there, such as Referring partner on Deals and Referred deals on Companies. A record reference attribute links one way, from one object only. Use a relationship when the team will look from both sides, and a record reference for a simple lookup.

## Links Attio already has

Leave out links Attio already has: people to their company, deals to their company and people, users to their person and workspaces, and workspaces to their company. Names such as "Primary company", "Contacts" or "Deal contacts" copy links that already exist.

## Link to Deals

For each custom object, and for Workspaces, ask: do its records come from a deal, lead to one, get billed against one, or get tracked per deal? If so, link it to Deals with a relationship. This is the link most often missed. Typical cases are subscriptions, invoices, workspaces, funds, marketing campaigns and events.

A reference object, such as Territory, is linked from Companies, not Deals.
