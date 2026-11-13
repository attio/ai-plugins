import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fixtureRepo, skillFile } from "./fixtures.ts";
import { loadSkills, openaiProblems, parseSkillFile, skillProblems, summary } from "./skills.ts";

describe("parseSkillFile", () => {
  it("parses frontmatter", () => {
    const parsed = parseSkillFile("---\nname: a\ndescription: >-\n  one\n  two\n---\n\n# Body\n");
    assert.deepEqual(parsed, { name: "a", description: "one two" });
  });

  it("reads CRLF files", () => {
    assert.deepEqual(parseSkillFile("---\r\nname: a\r\ndescription: b\r\n---\r\nbody\r\n"), {
      name: "a",
      description: "b",
    });
  });

  it("returns no data without valid frontmatter", () => {
    for (const text of ["# Skill\n", "---\nname: a\n", "---\ndescription: Use when: x\n---\n", "---\n- a\n---\n"]) {
      assert.equal(parseSkillFile(text), undefined);
    }
  });
});

describe("skillProblems", () => {
  const skill = (frontmatter: Record<string, unknown> | undefined) => ({ plugin: "crm", name: "intro", frontmatter });

  it("accepts a name that matches the folder and a description", () => {
    assert.deepEqual(skillProblems(skill({ name: "intro", description: "Does a thing." })), []);
  });

  it("reports frontmatter that isn't valid YAML", () => {
    const frontmatter = parseSkillFile("---\nname: intro\ndescription: Writes a brief: where things stand\n---\n");
    assert.deepEqual(skillProblems(skill(frontmatter)), ["frontmatter is missing or isn't valid YAML"]);
  });

  it("reports a wrong name and a missing description", () => {
    assert.deepEqual(skillProblems(skill({ name: "other" })), [
      'name must be "intro", the folder name',
      "description is missing",
    ]);
  });
});

describe("openaiProblems", () => {
  const skill = { plugin: "crm", name: "intro", frontmatter: undefined };
  const yaml = (fields: string) => ({ "plugins/crm/skills/intro/agents/openai.yaml": `interface:\n${fields}` });
  const valid = '  display_name: "Intro"\n  short_description: "Introduce the CRM to a new user"\n';

  it("accepts a name and a description", async () => {
    assert.deepEqual(await openaiProblems(await fixtureRepo(yaml(valid)), skill), []);
  });

  it("reports a missing file", async () => {
    assert.deepEqual(await openaiProblems(await fixtureRepo({}), skill), ["is missing"]);
  });

  it("accepts icons in the skill folder and reports ones outside it or missing", async () => {
    const good = '  icon_small: "./assets/small.svg"\n  icon_large: "./assets/large.png"\n';
    const root = await fixtureRepo({
      ...yaml(valid + good),
      "plugins/crm/skills/intro/assets/small.svg": "svg",
      "plugins/crm/skills/intro/assets/large.png": "png",
    });
    assert.deepEqual(await openaiProblems(root, skill), []);
    const bad = '  icon_small: "../../assets/icon.png"\n  icon_large: "./none.png"\n';
    const outside = await fixtureRepo({ ...yaml(valid + bad), "plugins/crm/assets/icon.png": "png" });
    assert.deepEqual(await openaiProblems(outside, skill), [
      "interface.icon_small must be a file in the skill folder, such as ./assets/icon.png",
      "interface.icon_large must be a file in the skill folder, such as ./assets/icon.png",
    ]);
  });

  it("reports a missing name and a description of the wrong length", async () => {
    const root = await fixtureRepo(yaml('  short_description: "Too short"\n'));
    assert.deepEqual(await openaiProblems(root, skill), [
      "interface.display_name is missing",
      "interface.short_description must be 25 to 64 characters",
    ]);
  });

  it("checks the skill declares the plugin's MCP server", async () => {
    const servers = { crm: { url: "https://mcp.example.com/mcp" } };
    const dependency = (url: string) =>
      `dependencies:\n  tools:\n    - type: "mcp"\n      value: "crm"\n      transport: "streamable_http"\n      url: "${url}"\n`;
    const declared = await fixtureRepo(yaml(valid + dependency("https://mcp.example.com/mcp")));
    assert.deepEqual(await openaiProblems(declared, skill, servers), []);
    const wrongUrl = await fixtureRepo(yaml(valid + dependency("https://old.example.com/mcp")));
    assert.deepEqual(await openaiProblems(wrongUrl, skill, servers), [
      "dependencies.tools must declare the crm MCP server: streamable_http at https://mcp.example.com/mcp",
    ]);
  });

  it("reports a file without an interface", async () => {
    const root = await fixtureRepo({
      "plugins/crm/skills/intro/agents/openai.yaml": "policy:\n  allow_implicit_invocation: false\n",
    });
    assert.deepEqual(await openaiProblems(root, skill), ["needs an interface section"]);
  });
});

describe("summary", () => {
  it("takes the first sentence", () => {
    assert.equal(summary("Does a thing. Use when asked."), "Does a thing.");
    assert.equal(summary("Uses `attio.com` links. Then more."), "Uses `attio.com` links.");
    assert.equal(summary("No full stop"), "No full stop");
    assert.equal(summary("Builds widgets, e.g. tabs. Then more."), "Builds widgets, e.g. tabs.");
  });
});

describe("loadSkills", () => {
  it("loads skills in name order and skips folders without SKILL.md", async () => {
    const root = await fixtureRepo({
      "plugins/crm/skills/setup/SKILL.md": skillFile("setup"),
      "plugins/crm/skills/intro/SKILL.md": skillFile("intro"),
      "plugins/crm/skills/references/guide.md": "# Guide\n",
      "plugins/crm-dev/skills/build-apps/SKILL.md": skillFile("build-apps"),
    });
    const skills = await loadSkills(root, ["crm", "crm-dev", "missing"]);
    assert.deepEqual(
      skills,
      [
        { plugin: "crm", name: "intro" },
        { plugin: "crm", name: "setup" },
        { plugin: "crm-dev", name: "build-apps" },
      ].map((skill) => ({
        ...skill,
        frontmatter: { name: skill.name, description: "Does the thing. Use when the user asks for the thing." },
      })),
    );
  });
});
