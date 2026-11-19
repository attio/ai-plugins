# Lists

A list is a segment of existing records of one object, such as target accounts, or a process the team runs on them, such as onboarding customers, raising a round or hiring. If a filter on the object describes the group, and it needs no attributes or access of its own, use a view instead. If each item is its own thing, such as a deal, a partnership or an investment, make it an object. For renewals or partner deals, follow the pipeline rule in SKILL.md. Put the list on the object whose records it holds.

If you're not sure a list applies, ask, and recommend leaving it out. Lists are easy to add later.

The attributes and views in the table are examples. Suggest only the ones the team needs. In the table, → separates stages in order, and · separates the possible outcomes at the end.

| List                | On                                                       | Attributes on the object | Attributes on the list                                                                                                                               | Views                                                                                             |
| ------------------- | -------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Customer Success    | Companies, or Workspaces if product data is synced there | Primary CSM, ARR, Health | Stage, such as Onboarding → Active → At risk → Churned                                                                                               | All accounts (every entry), Accounts by stage (kanban), Onboarding (stage is Onboarding)          |
| Startup Fundraising | Companies, or People if most investors are angels        | Investor type, Focus     | Stage, such as Contacted → Meeting → Due diligence → Committed · Passed. Amount committed, Passed reason                                             | Pipeline (kanban), Committed (stage is Committed), All (every entry)                              |
| Recruiting          | People                                                   |                          | Stage, such as Applied → Screen → Interview → Offer → Hired · Rejected. Applying for, Role level, Team, Hiring manager, Potential start date, Source | Candidate pipeline (kanban), All applications (every entry), one view per team (filtered by Team) |

Offer Customer Success when the user works in customer success, account management, onboarding or support. Offer Startup Fundraising for an early-stage startup that's raising, but not for an investor raising its own fund, which needs LPs, Funds and Commitments. Offer Recruiting when the team hires and wants to track candidates in Attio. For the events a team runs, recommend an Events object (`objects.md`), not a list. A list on People fits one particular event, when the team wants to track something about each guest that doesn't belong on the person record, such as whether they registered or attended, or their dietary needs. Name it after the event, and draft it only when the user describes that event.

## Example

A Customer Success list for a team that already marks customers with a Relationship type:

```
| Change | On | Type | Details |
| --- | --- | --- | --- |
| Create attribute Primary CSM | Companies | Workspace member | |
| Create attribute ARR | Companies | Currency | USD |
| Create attribute Health | Companies | Select | Healthy, Watch, Unhealthy. How likely the customer is to renew |
| Create list Customer Success | Companies | List | Only you, Sam and Priya can see it |
| Add 18 companies | Customer Success | List entries | Companies whose Relationship type is Customer |
| Create view All accounts | Customer Success | Table | Every company in the list, with Primary CSM, ARR and Health |

Please add this attribute to Customer Success in Attio:
- Stage (status): Onboarding → Active → At risk → Churned

Once you've added Stage, I can create the Accounts by stage and Onboarding views.

Make these changes?
```
