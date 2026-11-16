# Relationships

## Link records instead of typing them

The biggest mistake is turning a relationship into a text or select attribute. A good Attio workspace is linked records, not a spreadsheet, and it changes how the workspace feels to use: a Champion that links to a person reads very differently from a typed name.

Before making a text or select attribute, ask:

1. Could this value have its own attributes, owner or history? Then it's a record, and needs a relationship.
2. Would the team look at it the other way round, such as "all deals for this champion"? Then make it two-way.
3. Is it only a flat label, such as priority, or a region with no territory data? Then a select is fine.

When in doubt, use the relationship. It's easy to swap one for a select later, and a missing relationship is hard to spot. A relationship should still point at a standard object where it can: Account to Companies, Champion to People, Subscription to Workspaces. Making something a relationship doesn't mean creating a new object to point at.

Teammates, such as an account owner, CSM or partner manager on the user's team, are workspace members, not people records, so the team can filter for their own records.

## Common traps

These look like text or selects but should be relationships: Champion, Economic buyer, Account owner, CSM, Partner manager, Subscription plan, Source campaign, Parent company (Companies to itself), Referring partner, Renewal of and Upsell of (Deals to itself), Territory when it has owner or quota data, and Products sold. Industry is usually fine as a select.

## One-way or two-way

Make a relationship two-way when both sides will be common views, and name both sides. Keep one-way links, a record reference attribute, for simple lookups.

## Links Attio already has

Leave out links Attio already has: people to their company, deals to their company and people, users to their person and workspaces, and workspaces to their company. Names such as "Primary company", "Contacts" or "Deal contacts" copy links that already exist.

## Link to Deals

For each custom object, ask: does a record of this result from a deal, drive one, get billed against one, or get tracked per deal? If so, link it to Deals, two-way. This is the link most often missed. Typical cases are subscriptions, invoices, workspaces, funds, marketing campaigns and events.

Lookups such as Industry or Territory don't need a Deals link. Link them to Companies if anything, and say in the draft why there's no Deals link.
