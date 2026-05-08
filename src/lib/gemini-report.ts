import type { AuditResult } from "@/lib/audit-engine";

export function buildGeminiAuditPrompt(result: AuditResult) {
  return `
You are an expert AI FinOps auditor for a SaaS product called Credex Audit.

Your task:
Generate a professional AI spend audit report from the structured audit data below.

IMPORTANT RULES:
- Do not invent numbers.
- Only use the provided audit data.
- Be clear, business-friendly, and practical.
- Write like a real SaaS audit report.
- Avoid generic motivational language.
- Focus on spend optimization, tool overlap, seat waste, API risk, and next actions.

Return ONLY valid JSON in this exact shape:

{
  "executiveSummary": "A detailed paragraph summarizing the team's AI spend situation.",
  "scoreExplanation": "A paragraph explaining the overall score and waste score.",
  "keyRisks": [
    {
      "title": "Risk title",
      "description": "Short explanation",
      "severity": "LOW | MEDIUM | HIGH"
    }
  ],
  "recommendedActions": [
    {
      "title": "Action title",
      "description": "Practical action explanation",
      "impact": "Expected business impact"
    }
  ],
  "finalVerdict": "A final paragraph explaining what the team should do next."
}

AUDIT DATA:
Overall Score: ${result.overallScore}/100
Waste Score: ${result.wasteScore}/100
Maturity Level: ${result.maturityLevel}
Monthly Spend: $${result.monthlySpend}
Yearly Spend: $${result.yearlySpend}
Estimated Monthly Savings: $${result.estimatedMonthlySavings}
Estimated Yearly Savings: $${result.estimatedYearlySavings}
Spend Per Employee: $${result.spendPerEmployee}
Benchmark: ${result.benchmarkLabel}
Duplicate Tool Risk: ${result.duplicateToolRisk}
Seat Waste Risk: ${result.seatWasteRisk}
API Volatility Risk: ${result.apiVolatilityRisk}
Credex Fit: ${result.credexFit ? "Yes" : "No"}

Findings:
${result.findings
  .map(
    (finding) =>
      `- ${finding.title} (${finding.severity}): ${finding.description}`,
  )
  .join("\n")}

Recommendations:
${result.recommendations
  .map(
    (rec) =>
      `- ${rec.title}: ${rec.description}. Action: ${rec.action}. Estimated Monthly Savings: $${rec.estimatedMonthlySavings}. Priority: ${rec.priority}`,
  )
  .join("\n")}
`;
}