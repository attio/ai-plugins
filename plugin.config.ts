// The source for every manifest and marketplace file in this repo.
// After changing it, run `pnpm generate` and commit the result.
import { defineConfig } from "./scripts/lib/config.ts";

const keywords = [
  "attio",
  "crm",
  "sales",
  "pipeline",
  "deals",
  "accounts",
  "meetings",
  "email",
  "revops",
  "customer-success",
];

const chatgptLongDescription = [
  "Attio is the CRM for agentic revenue.",
  "",
  "Access your revenue context directly from ChatGPT: deals, calls, emails, and the full activity for every account. Records and meetings show up as Attio cards right in the chat, so you can see where things stand without switching tabs.",
  "",
  "Type @ to bring any Attio company or person into the conversation. Prep for your next call, summarize recent calls and what they mean for the deal, or find patterns across calls, like the pricing objections that keep coming up.",
  "",
  "Ask what's closing this month, what's at risk, or what needs attention in your pipeline. At the end of the day, run /end-of-day to turn your calls into deal updates, follow-up tasks and follow-up emails, saved once you approve.",
  "",
  "Describe how you want your workspace set up, and ChatGPT adds the objects, attributes, lists and views your team needs once you approve.",
].join("\n");

export default defineConfig({
  version: "1.0.16",
  repository: "attio/ai-plugins",
  author: { name: "Attio", url: "https://attio.com" },
  links: {
    website: "https://attio.com",
    documentation: "https://docs.attio.com",
    support: "https://attio.com/help",
    privacyPolicy: "https://attio.com/legal/privacy",
    termsOfService: "https://attio.com/legal/services-agreement",
  },
  marketplace: {
    name: "attio",
    displayName: "Attio",
    description: "Attio plugins for Claude.",
  },
  plugins: [
    {
      name: "attio",
      displayName: "Attio",
      description: "Build pipeline, advance deals, and grow accounts.",
      keywords,
      category: "Business & Operations",
      claudeCategory: "sales",
      mcpServers: { attio: { url: "https://mcp.attio.com/mcp" } },
      listed: true,
      icon: "./assets/icon.png",
      openai: {
        shortDescription: "Run your sales from ChatGPT",
        longDescription: chatgptLongDescription,
        capabilities: ["Interactive", "Read", "Write"],
        defaultPrompts: [
          "Prep me for my next call",
          "What needs attention in my pipeline?",
          "Update my deals from today's calls",
        ],
        brandColor: "#1D1E20",
        brandColorDark: "#FFFFFF",
        logo: "./assets/icon.png",
        composerIcon: "./assets/icon.png",
        onboardingSkill: "onboarding",
      },
    },
    {
      name: "attio-dev",
      displayName: "Attio for developers",
      description: "Build and review Attio apps with the App SDK, REST API and MCP.",
      keywords: [...keywords, "app-sdk", "rest-api", "mcp", "developer-tools"],
      category: "Developer Tools",
      listed: false,
      termsOfService: "https://attio.com/legal/attio-developer-terms",
      openai: {
        shortDescription: "Build Attio apps",
        longDescription: "Build, debug and review Attio apps and integrations with the App SDK, REST API and MCP.",
      },
    },
  ],
});
