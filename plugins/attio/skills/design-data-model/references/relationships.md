# Relationships

## Use relationships, not text

Before making a text or select attribute, ask:

1. Could this value have its own attributes, owner or history? Then it's a record, and needs a relationship.
2. Would the team look at it from the other side too, such as "all deals for this champion"? Then make it a relationship.
3. Is it only a flat label, such as priority, or a region with no territory data? Then a select is fine.

When in doubt between text and a link to an object that already exists, use the relationship.

## Often mistaken for text or a select

These look like text or selects but should be relationships, because they point at standard objects: Champion, Economic buyer, Parent company (Companies to itself), Renewal of and Upsell of (both Deals to itself). A referring partner links to the partnership, or to the partner's company if there's no Partnerships object. Subscription plan, Source campaign, Territory when it has owner or quota data, and Products sold are relationships only if the object they'd point at passes the test in `objects.md`. Otherwise use a select. Industry is usually fine as a select.

## Relationship or record reference

A relationship always links both sides: it adds an attribute to each object, named for its role there, such as Champion on Deals and Championed deals on People. A record reference attribute links one way, from one object only. Use a relationship when the team will look from both sides, and a record reference for a simple lookup.

## Links Attio already has

Leave out links Attio already has: people to their company, deals to their company and people, users to their person and workspaces, and workspaces to their company. Names such as "Primary company", "Contacts" or "Deal contacts" copy links that already exist.

## Link to Deals

Objects that usually link to Deals include subscriptions, invoices, workspaces, marketing campaigns and events.

An object that only classifies records, such as Territory, is linked from Companies, not Deals.
