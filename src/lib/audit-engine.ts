import type { AITool, WorkflowType } from "@/data/audit-options";
import {
  AUDIT_RULES,
  BENCHMARKS,
  TOOL_PRICING_PROFILES,
} from "@/data/audit-knowledge";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type AuditFinding = {
  title: string;
  description: string;
  severity: RiskLevel;
  category:
    | "DUPLICATE_TOOLS"
    | "SEAT_WASTE"
    | "OVER_PROVISIONING"
    | "API_VOLATILITY"
    | "BENCHMARK"
    | "BILLING"
    | "CREDITS";
};

export type AuditRecommendation = {
  title: string;
  description: string;
  action: string;
  estimatedMonthlySavings: number;
  priority: RiskLevel;
};

export type AuditResult = {
  overallScore: number;
  wasteScore: number;
  maturityLevel: "Early" | "Scaling" | "Optimized";
  monthlySpend: number;
  yearlySpend: number;
  estimatedMonthlySavings: number;
  estimatedYearlySavings: number;
  spendPerEmployee: number;
  benchmarkLabel: string;
  duplicateToolRisk: RiskLevel;
  seatWasteRisk: RiskLevel;
  apiVolatilityRisk: RiskLevel;
  credexFit: boolean;
  findings: AuditFinding[];
  recommendations: AuditRecommendation[];
  summaryInputForLLM: string;
};

export type AuditEngineInput = {
  teamName: string;
  teamSize: number;
  workflow: WorkflowType;
  monthlyBudget: number;
  growth: string;
  concern: string;
  tools: AITool[];
};

function riskFromScore(score: number): RiskLevel {
  if (score >= 70) return "HIGH";
  if (score >= 35) return "MEDIUM";
  return "LOW";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function money(value: number) {
  return Math.round(value);
}

function getMonthlySpend(tools: AITool[]) {
  return tools.reduce((sum, tool) => sum + Number(tool.monthlySpend || 0), 0);
}

function getTotalSeats(tools: AITool[]) {
  return tools.reduce((sum, tool) => sum + Number(tool.seats || 0), 0);
}

function getSeatPrice(tool: AITool) {
  return tool.monthlySpend / Math.max(tool.seats, 1);
}

function detectDuplicateTools(tools: AITool[]) {
  const groups: Record<string, AITool[]> = {};

  for (const tool of tools) {
    const profile = TOOL_PRICING_PROFILES[tool.name];
    if (!profile) continue;

    const group = profile.overlapGroup;
    groups[group] = [...(groups[group] || []), tool];
  }

  const duplicateGroups = Object.entries(groups).filter(
    ([, groupTools]) => groupTools.length > 1,
  );

  let estimatedSavings = 0;
  let riskPoints = 0;

  for (const [, groupTools] of duplicateGroups) {
    const sortedByUsage = [...groupTools].sort((a, b) => {
      const usageWeight = { Rarely: 1, Weekly: 2, Daily: 3 };
      return usageWeight[a.frequency] - usageWeight[b.frequency];
    });

    const weakestTool = sortedByUsage[0];
    const groupSpend = groupTools.reduce((sum, tool) => sum + tool.monthlySpend, 0);

    estimatedSavings += Math.max(
      weakestTool.monthlySpend,
      groupSpend * AUDIT_RULES.duplicateToolSavingsRate,
    );

    riskPoints += 35;

    const rarelyUsedInGroup = groupTools.some((tool) => tool.frequency === "Rarely");
    if (rarelyUsedInGroup) riskPoints += 20;

    const sameOwnerTeams = new Set(groupTools.map((tool) => tool.ownerTeam)).size === 1;
    if (sameOwnerTeams) riskPoints += 15;
  }

  return {
    duplicateGroups,
    estimatedSavings: money(estimatedSavings),
    risk: riskFromScore(riskPoints),
    riskPoints,
  };
}

function detectSeatWaste(tools: AITool[], teamSize: number) {
  let estimatedSavings = 0;
  let riskPoints = 0;

  for (const tool of tools) {
    const seatPrice = getSeatPrice(tool);

    if (tool.seats > teamSize) {
      const excessSeats = tool.seats - teamSize;
      riskPoints += 45;
      estimatedSavings += seatPrice * excessSeats;
    }

    if (tool.frequency === "Rarely") {
      riskPoints += tool.importance === "Critical" ? 20 : 35;
      estimatedSavings += tool.monthlySpend * AUDIT_RULES.rareUsageWasteMultiplier;
    }

    if (tool.frequency === "Weekly") {
      riskPoints += tool.importance === "Critical" ? 10 : 20;
      estimatedSavings += tool.monthlySpend * AUDIT_RULES.weeklyUsageWasteMultiplier;
    }

    if (tool.seats >= Math.max(teamSize * 0.8, 3) && tool.frequency !== "Daily") {
      riskPoints += 20;
      estimatedSavings += tool.monthlySpend * 0.15;
    }
  }

  return {
    estimatedSavings: money(estimatedSavings),
    risk: riskFromScore(riskPoints),
    riskPoints,
  };
}

function detectOverProvisioning(tools: AITool[], teamSize: number) {
  let estimatedSavings = 0;
  let count = 0;
  let riskPoints = 0;

  for (const tool of tools) {
    if (
      tool.plan === "Enterprise" &&
      teamSize <= AUDIT_RULES.enterpriseSmallTeamThreshold
    ) {
      count += 1;
      riskPoints += 45;
      estimatedSavings += tool.monthlySpend * 0.35;
    }

    if (
      (tool.plan === "Team" || tool.plan === "Business") &&
      teamSize <= AUDIT_RULES.teamPlanSmallTeamThreshold
    ) {
      count += 1;
      riskPoints += 30;
      estimatedSavings += tool.monthlySpend * 0.25;
    }

    if (tool.importance === "Experimental" && tool.frequency !== "Daily") {
      count += 1;
      riskPoints += 35;
      estimatedSavings += tool.monthlySpend * 0.4;
    }

    if (
      (tool.plan === "Business" || tool.plan === "Team") &&
      tool.frequency === "Rarely"
    ) {
      count += 1;
      riskPoints += 25;
      estimatedSavings += tool.monthlySpend * 0.2;
    }
  }

  return {
    count,
    estimatedSavings: money(estimatedSavings),
    risk: riskFromScore(riskPoints),
    riskPoints,
  };
}

function detectApiVolatility(tools: AITool[], growth: string) {
  const apiTools = tools.filter(
    (tool) => tool.name === "OpenAI API" || tool.name === "Anthropic API",
  );

  const apiSpend = apiTools.reduce((sum, tool) => sum + tool.monthlySpend, 0);

  let riskPoints = 0;

  if (apiSpend >= AUDIT_RULES.apiVolatilityThreshold) riskPoints += 50;
  if (growth === "Scaling" || growth === "Hiring Blitz") riskPoints += 25;
  if (apiTools.length > 1) riskPoints += 20;

  return {
    apiSpend,
    risk: riskFromScore(riskPoints),
    estimatedSavings: money(apiSpend * 0.15),
    riskPoints,
  };
}

function detectAnnualBillingOpportunity(tools: AITool[]) {
  const monthlyBilledTools = tools.filter(
    (tool) =>
      tool.billingCycle === "Monthly" &&
      tool.importance === "Critical" &&
      tool.frequency === "Daily",
  );

  const spend = monthlyBilledTools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0,
  );

  return money(spend * AUDIT_RULES.annualBillingPotentialDiscount);
}

function getBenchmarkLabel(benchmarkPressure: number) {
  if (benchmarkPressure <= BENCHMARKS.efficientSpendPerEmployee) {
    return "Efficient, but with some optimization opportunities";
  }

  if (benchmarkPressure <= BENCHMARKS.normalSpendPerEmployee) {
    return "Moderate AI spend for your team size";
  }

  if (benchmarkPressure <= BENCHMARKS.expensiveSpendPerEmployee) {
    return "Above-normal AI spend pressure";
  }

  return "High AI spend pressure for this team profile";
}

export function generateAuditResult(input: AuditEngineInput): AuditResult {
  const monthlySpend = money(getMonthlySpend(input.tools));
  const yearlySpend = monthlySpend * 12;
  const totalSeats = getTotalSeats(input.tools);
  const teamSize = Math.max(input.teamSize || 1, 1);

  const duplicateAnalysis = detectDuplicateTools(input.tools);
  const seatWaste = detectSeatWaste(input.tools, teamSize);
  const overProvisioning = detectOverProvisioning(input.tools, teamSize);
  const apiVolatility = detectApiVolatility(input.tools, input.growth);
  const annualBillingSavings = detectAnnualBillingOpportunity(input.tools);

  const spendPerEmployee = money(monthlySpend / teamSize);
  const toolDensity = input.tools.length / teamSize;

  const benchmarkPressure = money(
    spendPerEmployee +
      toolDensity * 40 +
      duplicateAnalysis.duplicateGroups.length * 20 +
      (totalSeats / teamSize) * 10,
  );

  const benchmarkLabel = getBenchmarkLabel(benchmarkPressure);

  const estimatedMonthlySavingsRaw =
    duplicateAnalysis.estimatedSavings +
    seatWaste.estimatedSavings +
    overProvisioning.estimatedSavings +
    apiVolatility.estimatedSavings +
    annualBillingSavings;

  const estimatedMonthlySavings = money(
    Math.min(estimatedMonthlySavingsRaw, monthlySpend * 0.65),
  );

  const estimatedYearlySavings = estimatedMonthlySavings * 12;

  const wasteScore = clamp(
    Math.round((estimatedMonthlySavings / Math.max(monthlySpend, 1)) * 100),
    0,
    100,
  );

  const duplicatePenalty =
    duplicateAnalysis.risk === "HIGH"
      ? 18
      : duplicateAnalysis.risk === "MEDIUM"
        ? 10
        : 0;

  const seatPenalty =
    seatWaste.risk === "HIGH" ? 18 : seatWaste.risk === "MEDIUM" ? 10 : 0;

  const overProvisionPenalty =
    overProvisioning.risk === "HIGH"
      ? 14
      : overProvisioning.risk === "MEDIUM"
        ? 8
        : 0;

  const apiPenalty =
    apiVolatility.risk === "HIGH"
      ? 12
      : apiVolatility.risk === "MEDIUM"
        ? 6
        : 0;

  const benchmarkPenalty =
    benchmarkPressure > BENCHMARKS.expensiveSpendPerEmployee
      ? 12
      : benchmarkPressure > BENCHMARKS.normalSpendPerEmployee
        ? 7
        : benchmarkPressure > BENCHMARKS.efficientSpendPerEmployee
          ? 3
          : 0;

  const overallScore = clamp(
    100 -
      duplicatePenalty -
      seatPenalty -
      overProvisionPenalty -
      apiPenalty -
      benchmarkPenalty,
    35,
    98,
  );

  const findings: AuditFinding[] = [];
  const recommendations: AuditRecommendation[] = [];

  if (duplicateAnalysis.risk !== "LOW") {
    findings.push({
      title: "Overlapping AI tools detected",
      description:
        "Your stack includes multiple tools serving similar use cases. This creates avoidable spend and makes ownership harder to manage.",
      severity: duplicateAnalysis.risk,
      category: "DUPLICATE_TOOLS",
    });

    recommendations.push({
      title: "Consolidate overlapping tools",
      description:
        "Review overlapping assistant tools and standardize around the one with the strongest usage and workflow fit.",
      action: "Pick one primary assistant per team or workflow.",
      estimatedMonthlySavings: duplicateAnalysis.estimatedSavings,
      priority: duplicateAnalysis.risk,
    });
  }

  if (seatWaste.risk !== "LOW") {
    findings.push({
      title: "Possible unused or underused seats",
      description:
        "Some tools have rare or weekly usage while still carrying multiple paid seats.",
      severity: seatWaste.risk,
      category: "SEAT_WASTE",
    });

    recommendations.push({
      title: "Reclaim unused seats",
      description:
        "Review seat activity before renewal and remove low-usage users from paid plans.",
      action: "Reduce seats for tools with rare or weekly usage.",
      estimatedMonthlySavings: seatWaste.estimatedSavings,
      priority: seatWaste.risk,
    });
  }

  if (overProvisioning.risk !== "LOW") {
    findings.push({
      title: "Potential plan over-provisioning",
      description:
        "Some tools appear to be on higher plans than current usage patterns justify.",
      severity: overProvisioning.risk,
      category: "OVER_PROVISIONING",
    });

    recommendations.push({
      title: "Downgrade oversized plans",
      description:
        "Move low-usage or experimental tools to lower tiers unless advanced controls are required.",
      action: "Compare paid plan features against actual usage.",
      estimatedMonthlySavings: overProvisioning.estimatedSavings,
      priority: overProvisioning.risk,
    });
  }

  if (apiVolatility.risk !== "LOW") {
    findings.push({
      title: "API cost volatility risk",
      description:
        "Usage-based API spend can grow quickly as team usage or product volume scales.",
      severity: apiVolatility.risk,
      category: "API_VOLATILITY",
    });

    recommendations.push({
      title: "Add API spend controls",
      description:
        "Set usage alerts, budget caps, and monthly reviews for OpenAI or Anthropic API usage.",
      action: "Add API budget thresholds and alerting.",
      estimatedMonthlySavings: apiVolatility.estimatedSavings,
      priority: apiVolatility.risk,
    });
  }

  if (annualBillingSavings > 0) {
    findings.push({
      title: "Annual billing discount opportunity",
      description:
        "Stable, daily-used critical tools billed monthly may qualify for annual billing discounts.",
      severity: "LOW",
      category: "BILLING",
    });

    recommendations.push({
      title: "Move stable tools to annual billing",
      description:
        "Apply this only to tools your team uses daily and expects to keep for the next year.",
      action: "Switch stable critical tools from monthly to annual billing.",
      estimatedMonthlySavings: annualBillingSavings,
      priority: "LOW",
    });
  }

  if (estimatedMonthlySavings >= AUDIT_RULES.highSavingsCredexThreshold) {
    findings.push({
      title: "High savings opportunity",
      description:
        "Your estimated monthly savings is large enough to justify discounted AI credit sourcing or vendor negotiation.",
      severity: "HIGH",
      category: "CREDITS",
    });

    recommendations.push({
      title: "Explore discounted AI credits",
      description:
        "For high AI spend, discounted credits may capture savings beyond plan downgrades.",
      action: "Book a Credex consultation.",
      estimatedMonthlySavings: Math.round(monthlySpend * 0.1),
      priority: "HIGH",
    });
  }

  if (findings.length === 0) {
    findings.push({
      title: "Your AI stack looks efficient",
      description:
        "No major waste patterns were detected from the current inputs.",
      severity: "LOW",
      category: "BENCHMARK",
    });

    recommendations.push({
      title: "Keep monitoring usage",
      description:
        "Your current stack appears reasonable. Review usage again when team size or API volume changes.",
      action: "Set a quarterly AI spend review.",
      estimatedMonthlySavings: 0,
      priority: "LOW",
    });
  }

  recommendations.sort(
    (a, b) => b.estimatedMonthlySavings - a.estimatedMonthlySavings,
  );

  const maturityLevel =
    overallScore >= 80 ? "Optimized" : overallScore >= 60 ? "Scaling" : "Early";

  const credexFit = estimatedMonthlySavings >= AUDIT_RULES.highSavingsCredexThreshold;

  const summaryInputForLLM = `
Team: ${input.teamName || "Unnamed team"}
Team size: ${teamSize}
Workflow: ${input.workflow}
Monthly AI spend: $${monthlySpend}
Yearly AI spend: $${yearlySpend}
Spend per employee: $${spendPerEmployee}
Benchmark pressure score: ${benchmarkPressure}
Benchmark: ${benchmarkLabel}
Estimated monthly savings: $${estimatedMonthlySavings}
Estimated yearly savings: $${estimatedYearlySavings}
Waste score: ${wasteScore}/100
Overall score: ${overallScore}/100
Duplicate tool risk: ${duplicateAnalysis.risk}
Seat waste risk: ${seatWaste.risk}
API volatility risk: ${apiVolatility.risk}
Top findings: ${findings.map((finding) => finding.title).join(", ")}
Top recommendations: ${recommendations
    .map((recommendation) => recommendation.title)
    .join(", ")}
User concern: ${input.concern || "Not provided"}
`;

  return {
    overallScore,
    wasteScore,
    maturityLevel,
    monthlySpend,
    yearlySpend,
    estimatedMonthlySavings,
    estimatedYearlySavings,
    spendPerEmployee,
    benchmarkLabel,
    duplicateToolRisk: duplicateAnalysis.risk,
    seatWasteRisk: seatWaste.risk,
    apiVolatilityRisk: apiVolatility.risk,
    credexFit,
    findings,
    recommendations,
    summaryInputForLLM,
  };
}