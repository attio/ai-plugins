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
  "Attio is the CRM for agentic revenue. Access your revenue context and run sales directly from ChatGPT, working with live data to keep your pipeline moving.",
  "",
  "The Attio plugin comes with pre-built sales skills for your key workflows like meeting prep, forecasting, pipeline review, and follow-ups.",
  "",
  "- Start in the sidebar to browse open tasks, today’s meetings, and starter prompts",
  "- Run the /end-of-day skill to check your pipeline, update deals, and action next steps",
  "- Bring any company or person into the chat with @ mentions so the chat is up to speed",
].join("\n");

export default defineConfig({
  version: "1.0.20",
  repository: "attio/ai-plugins",
  author: { name: "Attio", url: "https://attio.com" },
  license: "PolyForm-Shield-1.0.0",
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
