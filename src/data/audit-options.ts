export type WorkflowType =
  | "Engineering"
  | "Design"
  | "Research"
  | "Content"
  | "Mixed";

export type ToolName =
  | "ChatGPT"
  | "Claude"
  | "Cursor"
  | "GitHub Copilot"
  | "Gemini"
  | "Windsurf"
  | "OpenAI API"
  | "Anthropic API"
  | "Perplexity";

export type PlanOption =
  | "Free"
  | "Plus"
  | "Pro"
  | "Team"
  | "Business"
  | "Enterprise"
  | "API Usage";

export type Frequency = "Daily" | "Weekly" | "Rarely";

export type BillingCycle = "Monthly" | "Annual";

export type OwnerTeam =
  | "Engineering"
  | "Product"
  | "Design"
  | "Marketing"
  | "Research"
  | "Company-wide";

export type Importance = "Critical" | "Useful" | "Experimental";

export interface AITool {
  id: string;
  name: ToolName;
  plan: PlanOption;
  monthlySpend: number;
  seats: number;
  frequency: Frequency;
  billingCycle: BillingCycle;
  ownerTeam: OwnerTeam;
  importance: Importance;
}

export const WORKFLOWS: WorkflowType[] = [
  "Engineering",
  "Design",
  "Research",
  "Content",
  "Mixed",
];

export const SUPPORTED_TOOLS: ToolName[] = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "Windsurf",
  "OpenAI API",
  "Anthropic API",
  "Perplexity",
];

export const PLAN_OPTIONS: PlanOption[] = [
  "Free",
  "Plus",
  "Pro",
  "Team",
  "Business",
  "Enterprise",
  "API Usage",
];

export const FREQUENCIES: Frequency[] = ["Daily", "Weekly", "Rarely"];

export const BILLING_CYCLES: BillingCycle[] = ["Monthly", "Annual"];

export const OWNER_TEAMS: OwnerTeam[] = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Research",
  "Company-wide",
];

export const IMPORTANCE_LEVELS: Importance[] = [
  "Critical",
  "Useful",
  "Experimental",
];

export const TOOL_INITIALS: Record<ToolName, string> = {
  ChatGPT: "CG",
  Claude: "CL",
  Cursor: "CU",
  "GitHub Copilot": "GH",
  Gemini: "GE",
  Windsurf: "WS",
  "OpenAI API": "OA",
  "Anthropic API": "AA",
  Perplexity: "PX",
};

export const createDefaultTool = (): AITool => ({
  id: crypto.randomUUID(),
  name: "ChatGPT",
  plan: "Pro",
  monthlySpend: 20,
  seats: 1,
  frequency: "Daily",
  billingCycle: "Monthly",
  ownerTeam: "Engineering",
  importance: "Critical",
});