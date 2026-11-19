# Objects and attributes

## Model the sales motion, not the product

For a user-research platform:

- Wrong: objects for Study, Participant and Test Session, which are how the product works.
- Right: its customers as companies, its champions as people, and each customer's plan as a select on Workspaces.

## Standard objects first

Attio has five standard objects: Companies, People, Deals, Users and Workspaces. Use them as much as you can: Companies and People also get enrichment, email and calendar sync, and interaction dates, which custom objects don't.

| Object                                   | Include when                                                                                                                                                                      | Not when                                                                                                                                                      | If unsure                                                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| People, Companies                        | Always                                                                                                                                                                            |                                                                                                                                                               |                                                                                                                                                               |
| Deals                                    | The team sells to organizations or people one opportunity at a time. Product-led companies and marketplaces count.                                                                | The business mainly sells in high volume without a sales conversation, such as e-commerce, or it's an investor tracking investments on an Investments object. | Ask, and recommend including Deals, since it's very common.                                                                                                   |
| Users and Workspaces                     | The user sells software that businesses or teams sign up for and use through their own accounts, product-led or sales-led, so there's usage, account or billing data to bring in. | The business sells services or a consumer app.                                                                                                                | Ask whether their product has usage, account or billing data they'd want in Attio. Recommend both for a product-led business, and leaving them out otherwise. |
| Products and Line items (custom objects) | The team builds quotes in Attio from a fixed catalog or set of plans.                                                                                                             | One product at one price, self-serve checkout, or bespoke services.                                                                                           | Ask where they build quotes (`questions.md`), and recommend leaving them out.                                                                                 |
| Contracts (custom object)                | The team drafts, renews or tracks contracts in Attio, with terms, dates and an owner, and links them to deals and companies.                                                      | Contracts live in contract or e-signature software.                                                                                                           | Ask where contracts are managed, and recommend a Contract end date on the company or deal.                                                                    |
| Events (custom object)                   | The team runs its own events, such as conferences, dinners or webinars, and tracks each one's date, owner, budget and attendees.                                                  | The team only goes to events that others run.                                                                                                                 | Ask whether they run their own events, and recommend leaving it out.                                                                                          |

Subscription data, such as the plan and billing status, often lives on the workspace.

## The custom object test

Make a custom object only if the answers to the first two questions are no and the answer to the third is yes:

1. **Is it really a company or a person?** Clients, accounts, vendors, agencies and MSPs are companies. Contacts, champions, stakeholders and attendees are people. Mark a group of them with a select or multi-select, such as Relationship type, or a list, not a new object. The organization or individual behind a partnership, investment or LP is a company or person too, and the Partnerships, Investments or LPs record links to it.
2. **Is it really a user or a workspace?** Seats are users. A customer's account or tenant in the product is a workspace.
3. **Does it stand on its own?** It has its own lifecycle, attributes and identity, and folding it into a standard object would lose information. Good examples are Partnerships, Investments, LPs, Funds, Projects, Properties, Events and Loans, and Products, Line items, Contracts or Invoices when the team manages them in Attio. A custom Subscription object is right only when billing is tracked as its own thing, separate from the workspace.
