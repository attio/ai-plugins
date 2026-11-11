import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fixtureRepo, skillFile } from "./fixtures.ts";
import { loadSkills, parseSkillFile, skillProblems, summary } from "./skills.ts";

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
