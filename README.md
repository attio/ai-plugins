# Attio AI plugins

> [!NOTE]
> Work in progress: the skills in these plugins are still being written.

Plugins that bring [Attio](https://attio.com) to AI assistants and coding agents, including Claude, Claude
Code, ChatGPT and Codex. Each plugin bundles [Agent Skills](https://agentskills.io) and, where it needs
workspace access, the [Attio MCP server](https://docs.attio.com/mcp/overview).

<!-- BEGIN GENERATED: plugins -->

| Plugin                           | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| [`attio`](plugins/attio)         | Build pipeline, advance deals, and grow accounts.               |
| [`attio-dev`](plugins/attio-dev) | Build and review Attio apps with the App SDK, REST API and MCP. |

<!-- END GENERATED: plugins -->

## Skills

<!-- BEGIN GENERATED: skills -->

| Plugin  | Skill                                                                            | Description                                                                                                                                                                               |
| ------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attio` | [`analyze-call-recording`](plugins/attio/skills/analyze-call-recording/SKILL.md) | Analyze a recorded call in Attio.                                                                                                                                                         |
| `attio` | [`create-follow-up-task`](plugins/attio/skills/create-follow-up-task/SKILL.md)   | Create the follow-up task in Attio for one deal, company or person.                                                                                                                       |
| `attio` | [`draft-follow-up-email`](plugins/attio/skills/draft-follow-up-email/SKILL.md)   | Draft a follow-up email after a call or meeting, in the user's own voice, from what was actually said.                                                                                    |
| `attio` | [`end-of-day`](plugins/attio/skills/end-of-day/SKILL.md)                         | Update the user's Attio deals from a day of sales calls.                                                                                                                                  |
| `attio` | [`get-deal-context`](plugins/attio/skills/get-deal-context/SKILL.md)             | Gather what's happening on one deal in Attio.                                                                                                                                             |
| `attio` | [`get-my-pipeline`](plugins/attio/skills/get-my-pipeline/SKILL.md)               | Show the user's open Attio deals, from whichever object or list holds their pipeline, grouped by stage, with totals, each deal's next task or meeting, and the deals that need attention. |
| `attio` | [`get-sales-context`](plugins/attio/skills/get-sales-context/SKILL.md)           | Work out how the user sells in Attio, so you or another skill can work in their workspace.                                                                                                |
| `attio` | [`humanize-text`](plugins/attio/skills/humanize-text/SKILL.md)                   | Edit a draft so it reads as written by a person, not an AI, without changing what it says.                                                                                                |
| `attio` | [`log-activity`](plugins/attio/skills/log-activity/SKILL.md)                     | Log something that happened, such as a phone call or site visit, as an activity in the user's Attio workspace, linked to the right deal, company and people.                              |
| `attio` | [`onboarding`](plugins/attio/skills/onboarding/SKILL.md)                         | Get a new user started with the Attio plugin.                                                                                                                                             |
| `attio` | [`prepare-for-call`](plugins/attio/skills/prepare-for-call/SKILL.md)             | Prepare the user for an upcoming call or meeting with a prospect or customer.                                                                                                             |

<!-- END GENERATED: skills -->

## Install

This repository is a plugin marketplace for Claude Code and Codex. Install the plugins you want from it:

<!-- BEGIN GENERATED: install -->

In Claude Code:

```
/plugin install attio --marketplace attio/ai-plugins
/plugin install attio-dev --marketplace attio/ai-plugins
```

In Codex:

```
codex plugin marketplace add attio/ai-plugins
codex plugin add attio@attio
codex plugin add attio-dev@attio
```

<!-- END GENERATED: install -->

The `attio` plugin connects to the Attio MCP server. Sign in with your Attio account when your client
asks. The assistant can only see and change what your Attio permissions allow.

## Updates

To get the latest version of a plugin:

- **Claude Code:** run `claude plugin update <plugin>@attio` in a terminal, or turn on auto-update for the
  `attio` marketplace in `/plugin` under Marketplaces. Run `/reload-plugins` to load the new version.
- **Codex:** checks for updates when it starts. Run `codex plugin marketplace upgrade attio` to check now.
