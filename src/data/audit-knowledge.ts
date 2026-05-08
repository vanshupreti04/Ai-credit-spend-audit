import type { ToolName, PlanOption, WorkflowType } from "./audit-options";

export type PlanPricing = {
  plan: PlanOption;
  monthlyPricePerSeat: number | null;
  notes: string;
  officialSource: string;
};

export type ToolPricingProfile = {
  tool: ToolName;
  category:
    | "general-ai"
    | "coding"
    | "api"
    | "research"
    | "productivity";
  bestFor: WorkflowType[];
  pricing: PlanPricing[];
  overlapGroup: "chat-assistant" | "coding-assistant" | "api-provider" | "research";
};

export const TOOL_PRICING_PROFILES: Record<ToolName, ToolPricingProfile> = {
  ChatGPT: {
    tool: "ChatGPT",
    category: "general-ai",
    bestFor: ["Engineering", "Research", "Content", "Mixed"],
    overlapGroup: "chat-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Free individual plan.",
        officialSource: "https://chatgpt.com/pricing/",
      },
      {
        plan: "Plus",
        monthlyPricePerSeat: 20,
        notes: "Individual paid plan.",
        officialSource: "https://chatgpt.com/pricing/",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 200,
        notes: "High-usage individual plan.",
        officialSource: "https://chatgpt.com/pricing/",
      },
      {
        plan: "Team",
        monthlyPricePerSeat: 25,
        notes: "Team/Business pricing may vary by billing cycle.",
        officialSource: "https://openai.com/business/chatgpt-pricing/",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: null,
        notes: "Custom pricing.",
        officialSource: "https://chatgpt.com/pricing/",
      },
    ],
  },

  Claude: {
    tool: "Claude",
    category: "general-ai",
    bestFor: ["Engineering", "Research", "Content", "Mixed"],
    overlapGroup: "chat-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Free Claude access.",
        officialSource: "https://claude.com/pricing",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 20,
        notes: "Claude Pro monthly plan.",
        officialSource: "https://claude.com/pricing",
      },
      {
        plan: "Team",
        monthlyPricePerSeat: 30,
        notes: "Team plan pricing should be verified at submission time.",
        officialSource: "https://claude.com/pricing",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: null,
        notes: "Custom enterprise pricing.",
        officialSource: "https://claude.com/pricing",
      },
    ],
  },

  Cursor: {
    tool: "Cursor",
    category: "coding",
    bestFor: ["Engineering", "Mixed"],
    overlapGroup: "coding-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Hobby/free plan.",
        officialSource: "https://cursor.com/pricing",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 20,
        notes: "Individual Pro plan.",
        officialSource: "https://cursor.com/pricing",
      },
      {
        plan: "Business",
        monthlyPricePerSeat: 40,
        notes: "Team/business features.",
        officialSource: "https://cursor.com/pricing",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: null,
        notes: "Custom pricing.",
        officialSource: "https://cursor.com/pricing",
      },
    ],
  },

  "GitHub Copilot": {
    tool: "GitHub Copilot",
    category: "coding",
    bestFor: ["Engineering", "Mixed"],
    overlapGroup: "coding-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Limited free plan.",
        officialSource: "https://github.com/features/copilot/plans",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 10,
        notes: "Individual Pro plan. Verify before submission.",
        officialSource: "https://github.com/features/copilot/plans",
      },
      {
        plan: "Business",
        monthlyPricePerSeat: 19,
        notes: "Business seat price.",
        officialSource: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: 39,
        notes: "Enterprise seat price.",
        officialSource: "https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/",
      },
    ],
  },

  Gemini: {
    tool: "Gemini",
    category: "general-ai",
    bestFor: ["Research", "Content", "Mixed"],
    overlapGroup: "chat-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Free Gemini access.",
        officialSource: "https://gemini.google/subscriptions/",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 20,
        notes: "Use current Google AI plan pricing before final submission.",
        officialSource: "https://gemini.google/subscriptions/",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: null,
        notes: "Workspace/enterprise pricing varies.",
        officialSource: "https://workspace.google.com/pricing.html",
      },
    ],
  },

  Windsurf: {
    tool: "Windsurf",
    category: "coding",
    bestFor: ["Engineering", "Mixed"],
    overlapGroup: "coding-assistant",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Free plan.",
        officialSource: "https://windsurf.com/pricing",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 15,
        notes: "Verify current pricing before submission.",
        officialSource: "https://windsurf.com/pricing",
      },
      {
        plan: "Team",
        monthlyPricePerSeat: 30,
        notes: "Verify current pricing before submission.",
        officialSource: "https://windsurf.com/pricing",
      },
    ],
  },

  "OpenAI API": {
    tool: "OpenAI API",
    category: "api",
    bestFor: ["Engineering", "Research", "Mixed"],
    overlapGroup: "api-provider",
    pricing: [
      {
        plan: "API Usage",
        monthlyPricePerSeat: null,
        notes: "Usage-based token pricing; calculate from monthly spend.",
        officialSource: "https://openai.com/api/pricing/",
      },
    ],
  },

  "Anthropic API": {
    tool: "Anthropic API",
    category: "api",
    bestFor: ["Engineering", "Research", "Mixed"],
    overlapGroup: "api-provider",
    pricing: [
      {
        plan: "API Usage",
        monthlyPricePerSeat: null,
        notes: "Usage-based token pricing; calculate from monthly spend.",
        officialSource: "https://www.anthropic.com/pricing#anthropic-api",
      },
    ],
  },

  Perplexity: {
    tool: "Perplexity",
    category: "research",
    bestFor: ["Research", "Content", "Mixed"],
    overlapGroup: "research",
    pricing: [
      {
        plan: "Free",
        monthlyPricePerSeat: 0,
        notes: "Free plan.",
        officialSource: "https://www.perplexity.ai/pricing",
      },
      {
        plan: "Pro",
        monthlyPricePerSeat: 20,
        notes: "Pro plan. Verify before submission.",
        officialSource: "https://www.perplexity.ai/pricing",
      },
      {
        plan: "Enterprise",
        monthlyPricePerSeat: null,
        notes: "Custom or organization pricing.",
        officialSource: "https://www.perplexity.ai/pricing",
      },
    ],
  },
};

export const AUDIT_RULES = {
  highSpendPerSeat: 120,
  moderateSpendPerSeat: 60,

  rareUsageWasteMultiplier: 0.5,
  weeklyUsageWasteMultiplier: 0.25,

  annualBillingPotentialDiscount: 0.15,

  duplicateToolSavingsRate: 0.3,
  enterpriseSmallTeamThreshold: 10,
  teamPlanSmallTeamThreshold: 3,

  apiVolatilityThreshold: 500,
  highMonthlySpendThreshold: 500,
  highSavingsCredexThreshold: 500,
};

export const BENCHMARKS = {
  efficientSpendPerEmployee: 40,
  normalSpendPerEmployee: 100,
  expensiveSpendPerEmployee: 150,

  healthySeatUtilization: 0.8,
  riskySeatUtilization: 0.5,
};

export const RECOMMENDATION_LABELS = {
  downgrade: "Downgrade plan",
  consolidate: "Consolidate duplicate tools",
  reclaimSeats: "Reclaim unused seats",
  annualBilling: "Switch to annual billing",
  apiControl: "Add API usage controls",
  credits: "Explore discounted AI credits",
};