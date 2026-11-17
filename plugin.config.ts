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
  "Access your revenue context directly from ChatGPT: deals, calls, emails, and the full activity for every account.",
  "",
  "Work with your live data from Attio to keep your pipeline moving. Records and meetings show up as Attio cards right in the chat, so you can see where things stand without switching tabs.",
  "",
  "The Attio plugin comes with pre-built sales skills for your key workflows like meeting prep, pipeline review, call analysis, and follow-ups.",
  "",
  "Attio permissions carry over to the plugin, so ChatGPT only ever sees what you can see.",
  "",
  "How it works",
  "",
  "New to the plugin? Run the onboarding skill to see what Attio can do in ChatGPT.",
  "",
  "Start in the sidebar",
  "Open Attio from the ChatGPT sidebar to browse your open tasks, today's meetings, and starter prompts. Ask what needs your attention, or try the Prep me for my next call prompt to get the full account rundown before a call.",
  "",
  "Bring any record into the chat",
  "Type @ to pull any Attio company or person into the conversation, so ChatGPT is up to speed right away. Research key contacts, summarize recent calls and what they mean for the deal, or find patterns across calls, like the pricing objections that keep coming up.",
  "",
  "Wrap up your day in one prompt",
  "Run the /end-of-day skill to check the day's calls against your pipeline. It proposes deal updates and next steps, follow-up tasks and follow-up emails, and saves them once you approve.",
  "",
  "Get ahead of forecast",
  "Ask what's closing this month, what's at risk, or what's in a teammate's pipeline, and ChatGPT pulls the numbers from Attio, by stage, with totals. Then turn the answer into a ChatGPT Site to share before the next forecast call.",
  "",
  "Set up Attio by asking",
  "Describe how you want your Attio workspace set up, and ChatGPT drafts the changes and updates the data model once you approve. Add new objects, attributes and lists, or create filtered and sorted views for how your team works. The /design-data-model skill uses best practices to structure your workspace for success.",
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
