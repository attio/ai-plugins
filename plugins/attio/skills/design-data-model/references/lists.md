# Lists

A list is a process the team runs on some existing records, usually with stages: onboarding customers, raising a round, hiring, managing a portfolio. When the thing being tracked is a process run on companies or people, use a list, not a custom object. Put the list on the object the team works.

A good list tracks a stage, an owner, an amount where money is involved, and a reason for losing or passing. These belong on the list, not the object, because a record can go through the process more than once, such as a person applying for two roles. Give the list one kanban view grouped by its stage, plus 2 or 3 filtered table views.

You can create a list, add records to it and create its views, but you can't create attributes on a list. So create the list, and in the draft name its attributes, with their types, options and stages, for the user to add in Attio. Don't put them on the object instead. Create the views that don't need those attributes, such as a table of every entry, and list the rest to create once the user has added the attributes.

If you're not sure a list applies, ask, and recommend leaving it out. Lists are easy to add later.

The attributes in the table are examples. Suggest only the ones the team needs. In the table, → separates stages in order, and · separates the possible outcomes at the end.

| List                | Include when                                                                                                     | Not when                                                    | Attributes on the list                                                                                                                                                            | Views                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer Success    | The user works in customer success, account management, onboarding or support                                    |                                                             | Stage, such as Onboarding → Active → At risk → Churned. Primary CSM, ARR, Health                                                                                                  | Accounts by stage (kanban), Onboarding (stage is Onboarding), Steady accounts (Active and healthy), High revenue accounts (ARR over an amount the user picks) |
| Portfolio           | The business mainly invests, such as a VC fund, private equity firm, angel group, accelerator or family office   | A startup raising money                                     | Stage, such as Sourced → Screening → Due diligence → Invested · Passed. Sector, Funding round, Target raise, Valuation, Owner, Amount invested, Date of investment, Passed reason | Pipeline (kanban), Invested (stage is Invested), All deals (every entry)                                                                                      |
| Startup Fundraising | An early-stage startup, such as stealth, pre-seed or seed, where the user is a founder or the company is raising | An investor raising its own fund, which needs LPs and Funds | Stage, such as Contacted → Meeting → Due diligence → Committed · Passed. Investor type, Focus, Fit, Funding round, Amount funded, Passed reason                                   | Pipeline (kanban), Funded (stage is Committed), All (every entry)                                                                                             |
| Recruiting          | The user works in recruiting, talent acquisition or HR, or the business is a recruiting or staffing agency       |                                                             | Stage, such as Applied → Screen → Interview → Offer → Hired · Rejected. Applying for, Role level, Team, Manager, Employment status, Potential start date, Source, Source type     | Candidate pipeline (kanban), All applications (every entry), one view per team (filtered by Team)                                                             |

Customer Success sits on Companies, or on Workspaces if product data is synced there. Portfolio and Startup Fundraising sit on Companies, and Recruiting on People.

## Example

A Customer Success list for a team that already marks customers with a Relationship type:

```
| Change | On | Type | Details |
| --- | --- | --- | --- |
| Create list Customer Success | Companies | List | Everyone in the workspace has full access |
| Add 18 companies | Customer Success | List entries | Companies whose Relationship type is Customer |
| Create view All accounts | Customer Success | Table | Every company in the list |

I can't add attributes to a list, so please add these to Customer Success in Attio:
- Stage (status): Onboarding → Active → At risk → Churned
- Primary CSM (workspace member)
- ARR (currency, USD)
- Health (select): Healthy, Watch, At risk. How likely the customer is to renew

Once you have, I can create the Accounts by stage, Onboarding and High revenue accounts views.

Make these changes?
```
