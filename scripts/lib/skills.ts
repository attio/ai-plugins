import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { parseDocument } from "yaml";

/** Returns the YAML frontmatter, or undefined if it is missing or invalid. */
export function parseSkillFile(source: string): Record<string, unknown> | undefined {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const end = frontmatterEnd(lines);
  if (lines[0]?.trimEnd() !== "---" || end === -1) return undefined;
  const doc = parseDocument(lines.slice(1, end).join("\n"));
  const data = doc.errors.length > 0 ? undefined : (doc.toJS() as unknown);
  if (data === null || typeof data !== "object" || Array.isArray(data)) return undefined;
  return data as Record<string, unknown>;
}

// Clients treat the first `---` line as the end of frontmatter, even if it is indented.
function frontmatterEnd(lines: readonly string[]): number {
  return lines.findIndex((line, i) => i > 0 && line.trim() === "---");
}

export interface Skill {
  plugin: string;
  name: string;
  frontmatter: Record<string, unknown> | undefined;
}

/** Loads skills from each plugin's skills directory, skipping folders without SKILL.md. */
export async function loadSkills(root: string, plugins: readonly string[]): Promise<Skill[]> {
  const skills: Skill[] = [];
  for (const plugin of plugins) {
    const base = join(root, "plugins", plugin, "skills");
    let entries;
    try {
      entries = await readdir(base, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (!entry.isDirectory()) continue;
      const file = join(base, entry.name, "SKILL.md");
      let text;
      try {
        text = await readFile(file, "utf8");
      } catch {
        continue;
      }
      skills.push({ plugin, name: entry.name, frontmatter: parseSkillFile(text) });
    }
  }
  return skills;
}

/** Problems that stop a client from loading the skill's name and description. */
export function skillProblems(skill: Skill): string[] {
  const { frontmatter } = skill;
  if (frontmatter === undefined) return ["frontmatter is missing or isn't valid YAML"];
  const problems: string[] = [];
  if (frontmatter["name"] !== skill.name) problems.push(`name must be "${skill.name}", the folder name`);
  const description = frontmatter["description"];
  if (typeof description !== "string" || description.trim() === "") problems.push("description is missing");
  return problems;
}

/**
 * Problems with a skill's `agents/openai.yaml`, which sets the name, description and icons that ChatGPT and Codex show.
 * It must declare the plugin's MCP servers, so Codex can offer to set them up when the skill is used without the plugin.
 * @see https://learn.chatgpt.com/docs/build-skills#optional-metadata
 */
export async function openaiProblems(
  root: string,
  skill: Skill,
  mcpServers: Readonly<Record<string, { url: string }>> = {},
): Promise<string[]> {
  const dir = join(root, "plugins", skill.plugin, "skills", skill.name);
  const text = await readFile(join(dir, "agents", "openai.yaml"), "utf8").catch(() => undefined);
  if (text === undefined) return ["is missing"];
  const doc = parseDocument(text);
  const data = (doc.errors.length > 0 ? undefined : doc.toJS()) as
    { interface?: unknown; dependencies?: { tools?: unknown } } | null | undefined;
  const ui = data?.interface;
  if (ui === null || typeof ui !== "object" || Array.isArray(ui)) return ["needs an interface section"];
  const fields = ui as Record<string, unknown>;
  const problems: string[] = [];
  const name = fields["display_name"];
  if (typeof name !== "string" || name.trim() === "") problems.push("interface.display_name is missing");
  const description = fields["short_description"];
  if (typeof description !== "string" || description.length < 25 || description.length > 64) {
    problems.push("interface.short_description must be 25 to 64 characters");
  }
  // Official plugins keep skill icons in the skill's own folder.
  for (const key of ["icon_small", "icon_large"]) {
    const icon = fields[key];
    if (icon === undefined) continue;
    const path = typeof icon === "string" ? resolve(dir, icon) : undefined;
    const inside = path !== undefined && !relative(dir, path).startsWith("..");
    if (!inside || !(await isFile(path))) {
      problems.push(`interface.${key} must be a file in the skill folder, such as ./assets/icon.png`);
    }
  }
  const tools = Array.isArray(data?.dependencies?.tools) ? (data.dependencies.tools as Record<string, unknown>[]) : [];
  for (const [server, { url }] of Object.entries(mcpServers)) {
    const declared = tools.some(
      (t) => t["type"] === "mcp" && t["value"] === server && t["transport"] === "streamable_http" && t["url"] === url,
    );
    if (!declared) {
      problems.push(`dependencies.tools must declare the ${server} MCP server: streamable_http at ${url}`);
    }
  }
  return problems;
}

/** First sentence of a skill description, for tables. */
export function summary(description: string): string {
  const text = description.replace(/\s+/g, " ").trim();
  const match = /^(.+?(?<!\b(?:e\.g|i\.e|vs|cf|incl))[.!?])(?=\s+[A-Z`"'(\[]|$)/.exec(text);
  return match?.[1] ?? text;
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
