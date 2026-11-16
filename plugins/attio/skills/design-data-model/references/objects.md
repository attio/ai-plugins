# Objects and attributes

## Model the sales motion, not the product

The model shows how the user's sales, partnerships and customer success teams use Attio as a CRM, not what their software does inside. Ask "What does the revenue team track?", not "What does the platform do?".

- Wrong: a user-research platform as Study, Participant and Test Session.
- Right: a user-research platform as Agency partner, Subscription plan and Champion.

## Standard objects first

Attio has five standard objects: Companies, People, Deals, Users and Workspaces. Use them as much as you can. Unnecessary custom objects are the most common way a model goes wrong: they split the data, break the links between records, and leave a mess to clean up later. Decide object by object.

| Object                                  | Include when                                                                                                                                                                                                                                                                              | Not when                                                                                                                                                              | If unsure                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| People, Companies                       | Always                                                                                                                                                                                                                                                                                    |                                                                                                                                                                       |                                                                                               |
| Deals                                   | The team sells to, partners with or invests in organizations or people one opportunity at a time. Product-led companies and marketplaces count.                                                                                                                                           | The business mainly sells in high volume without a sales conversation, such as e-commerce.                                                                            | Ask, and recommend including Deals, since it's very common.                                   |
| Users and Workspaces                    | The user sells software that businesses or teams sign up for and use through their own accounts, product-led or sales-led, so there's usage, account or billing data to bring in.                                                                                                         | Services businesses and consumer apps.                                                                                                                                | Ask whether they track individual users or customer accounts, and recommend leaving both out. |
| Products and Line items, custom objects | Deals is on, and the team sells more than one product from a fixed catalogue or set of plans with set prices, so one customer can buy several items with quantities and discounts, such as licences sold by a sales team, equipment or packaged services. Common in sales-led businesses. | One product at one price, self-serve checkout only, bespoke or hourly services, investing, recruiting fees, marketplace commissions, or quotes built in another tool. | Ask where they build quotes, and recommend leaving them out.                                  |

Users are individual end users or seats. Workspaces are customers' tenants or accounts, often what people loosely call a subscription.

## Where the work happens

Sales-led businesses often want Products, Line items, Contracts and Invoices in their CRM, and these can be good custom objects. Before adding any of them, check the team will create and update these records in Attio. If billing, quoting or contract software already owns them, modelling them in Attio means duplicate data to keep in sync, and a summary attribute on the company or deal, such as ARR or Contract end date, is usually enough.

## The custom object test

A thing has to pass every check before it becomes a custom object:

1. **Is it really a company or a person?** Clients, accounts, vendors, portfolio companies, partner organizations, agencies and MSPs are companies. Contacts, champions, stakeholders and attendees are people. Mark the group with a select, such as Relationship type, or a list, not a new object.
2. **Is it really a user or a workspace?** Seats are users. A customer's tenant or subscription is a workspace.
3. **Only if both answers are no:** it has its own lifecycle, attributes and identity, and folding it into a standard object would lose information. Good examples are LPs, Funds, Projects, Facility agreements, Insurance policies, Properties, Loans and Vessels, plus Products, Line items, Contracts or Invoices when the team works them in Attio. A custom Subscription object is right only when billing is tracked as its own thing, separate from the workspace.

Before adding an object, consider attributes on a standard object, or a select or list to mark a group. The ceiling is about 4 to 6 custom objects, counting Products and Line items, and zero is often right. Never add objects to reach a number.

## Every attribute traces to evidence

Each custom attribute should trace to something real: something the user said, a named thing on their website, an attribute the workspace already has, or a pricing or buyer fact. There's no minimum, and a lean object beats one padded with guessed attributes. Name options in the team's own words, not Low, Medium and High. In regulated industries, add only the one or two attributes the regulator requires, such as a licence number or assets under management.
