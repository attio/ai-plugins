# Objects and attributes

## Model the sales motion, not the product

The model shows how the user's sales, partnerships and customer success teams use Attio as a CRM, not what their software does inside. Ask "What does the revenue team track?", not "What does the platform do?".

- Wrong: a user-research platform as Study, Participant and Test Session.
- Right: a user-research platform as the agencies it partners with (companies), its champions (people) and each customer's plan (a select on Workspaces).

## Standard objects first

Attio has five standard objects: Companies, People, Deals, Users and Workspaces. Use them as much as you can: Companies and People also get enrichment, email and calendar sync, and interaction dates, which custom objects don't. Unnecessary custom objects are the most common way a model goes wrong: they split the data, break the links between records, and leave a mess to clean up later. Decide object by object.

| Object                                   | Include when                                                                                                                                                                                                                                                                            | Not when                                                                                                                                | If unsure                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| People, Companies                        | Always                                                                                                                                                                                                                                                                                  |                                                                                                                                         |                                                                                               |
| Deals                                    | The team sells to, partners with or invests in organizations or people one opportunity at a time. Product-led companies and marketplaces count.                                                                                                                                         | The business mainly sells in high volume without a sales conversation, such as e-commerce.                                              | Ask, and recommend including Deals, since it's very common.                                   |
| Users and Workspaces                     | The user sells software that businesses or teams sign up for and use through their own accounts, product-led or sales-led, so there's usage, account or billing data to bring in.                                                                                                       | The business sells services or a consumer app.                                                                                          | Ask whether they track individual users or customer accounts, and recommend leaving both out. |
| Products and Line items (custom objects) | Deals is on, and the team sells more than one product from a fixed catalog or set of plans with set prices, so one customer can buy several items with quantities and discounts, such as licenses sold by a sales team, equipment or packaged services. Common in sales-led businesses. | One product at one price, self-serve checkout only, bespoke or hourly services, investing, recruiting fees, or marketplace commissions. | Ask where they build quotes (`questions.md`), and recommend leaving them out.                 |
| Contracts (custom object)                | The team drafts, renews or tracks contracts in Attio, with terms, dates and an owner, and links them to deals and companies.                                                                                                                                                            | Contracts live in contract or e-signature software.                                                                                     | Ask where contracts are managed, and recommend a Contract end date on the company or deal.    |

Users are individual end users or seats. Workspaces are customers' accounts or tenants in the product. Subscription data, such as the plan and billing status, often lives on the workspace.

## Where the work happens

Sales-led businesses often want Products, Line items, Contracts and Invoices in their CRM, and these can be good custom objects. Before adding any of them, check the team will create and update these records in Attio. If billing, quoting or contract software already owns them, modeling them in Attio means duplicate data to keep in sync, and a summary attribute on the company or deal, such as ARR or Contract end date, is the default. Make a custom object when the team will work these records in Attio.

## The custom object test

Make a custom object only if the answer to the first two questions is no, and the third holds:

1. **Is it really a company or a person?** Clients, accounts, vendors, agencies and MSPs are companies, and so are the organizations behind partnerships and investments. Contacts, champions, stakeholders and attendees are people. Mark a group of them with a select or multi-select, such as Relationship type, or a list, not a new object. A partner that can be either a company or a person needs its own object. And a partnership or an investment with its own stage, value and owner is often worth its own object, linked to the company (point 3 below).
2. **Is it really a user or a workspace?** Seats are users. A customer's account or tenant in the product is a workspace.
3. **Does it stand on its own?** It has its own lifecycle, attributes and identity, and folding it into a standard object would lose information. Good examples are Partnerships, Investments, LPs, Funds, Projects, Facility agreements, Insurance policies, Properties, Loans and Vessels, plus Products, Line items, Contracts or Invoices when the team works them in Attio. A custom Subscription object is right only when billing is tracked as its own thing, separate from the workspace.

Before adding an object, check whether an attribute, view or list would do: when in doubt, choose the lighter structure. Use at most 6 custom objects, counting Products and Line items, and fewer on smaller plans, which limit how many objects a workspace can have. Zero is often right. Never add objects to reach a number.

## Every attribute traces to evidence

Each custom attribute should trace to something real: something the user said, a named thing on their website, an attribute the workspace already has, or a pricing or buyer fact. There's no minimum, and a lean object beats one padded with guessed attributes. Name options in the team's own words, not Low, Medium and High. In regulated industries, add only the one or two attributes the regulator requires, such as a license number or assets under management.
