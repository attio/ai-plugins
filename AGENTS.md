# Agent instructions

## Checks

CI runs these checks. Run them before you push.

| Command                          | Checks                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `pnpm typecheck`                 | TypeScript types.                                                                     |
| `pnpm test`                      | Unit tests for the scripts.                                                           |
| `pnpm generate --check`          | Skills are valid, and generated files match `plugin.config.ts` and the skills.        |
| `pnpm format:check`              | Prettier formatting.                                                                  |
| `pnpm validate:hosts`            | Claude Code and Codex install the plugins and load their skills. Skips a missing CLI. |
| `pnpm build:openai-zip`          | The OpenAI upload ZIP builds.                                                         |
| `pnpm check:version origin/main` | A change to `plugins/` raises `version` in `plugin.config.ts`.                        |

To fix generated files, run `pnpm generate`. To fix formatting, run `pnpm format`.

## Rules

- Don't edit generated files by hand. Change `plugin.config.ts` or the skills, then run `pnpm generate`.
- When you change anything in `plugins/`, raise `version` in `plugin.config.ts` and run `pnpm generate`.
