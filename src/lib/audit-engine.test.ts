import { describe, expect, it } from "vitest";
import { generateAuditResult } from "./audit-engine";
import type { AITool, WorkflowType } from "@/data/audit-options";

const baseTool = (overrides: Partial<AITool> = {}): AITool => ({
  id: crypto.randomUUID(),
  name: "ChatGPT",
  plan: "Pro",
  monthlySpend: 20,
  seats: 1,
  frequency: "Daily",
  billingCycle: "Monthly",
  ownerTeam: "Engineering",
  importance: "Critical",
  ...overrides,
});

const createInput = (tools: AITool[]) => ({
  teamName: "TestCo",
  teamSize: 10,
  workflow: "Engineering" as WorkflowType,
  monthlyBudget: 1000,
  growth: "Stable",
  concern: "Testing audit behavior",
  tools,
});

describe("generateAuditResult", () => {
  it("returns a healthy score for a simple optimized stack", () => {
    const result = generateAuditResult(
      createInput([
        baseTool({
          name: "ChatGPT",
          plan: "Pro",
          monthlySpend: 20,
          seats: 1,
          frequency: "Daily",
          importance: "Critical",
        }),
      ]),
    );

    expect(result.overallScore).toBeGreaterThanOrEqual(80);
    expect(result.duplicateToolRisk).toBe("LOW");
    expect(result.seatWasteRisk).toBe("LOW");
    expect(result.apiVolatilityRisk).toBe("LOW");
  });

  it("detects duplicate assistant tools", () => {
    const result = generateAuditResult(
      createInput([
        baseTool({
          name: "ChatGPT",
          monthlySpend: 180,
          seats: 9,
          frequency: "Daily",
        }),
        baseTool({
          name: "Claude",
          monthlySpend: 120,
          seats: 6,
          frequency: "Weekly",
          importance: "Useful",
        }),
      ]),
    );

    expect(["MEDIUM", "HIGH"]).toContain(result.duplicateToolRisk);
    expect(
      result.findings.some((finding) =>
        finding.category.includes("DUPLICATE_TOOLS"),
      ),
    ).toBe(true);
  });

  it("detects high seat waste for rarely used paid seats", () => {
    const result = generateAuditResult(
      createInput([
        baseTool({
          name: "Cursor",
          plan: "Business",
          monthlySpend: 520,
          seats: 22,
          frequency: "Rarely",
          importance: "Critical",
        }),
      ]),
    );

    expect(result.seatWasteRisk).toBe("HIGH");
    expect(result.estimatedMonthlySavings).toBeGreaterThan(0);
    expect(
      result.recommendations.some((rec) =>
        rec.title.toLowerCase().includes("seat"),
      ),
    ).toBe(true);
  });

  it("detects API volatility for high API spend", () => {
    const result = generateAuditResult({
      ...createInput([
        baseTool({
          name: "OpenAI API",
          plan: "API Usage",
          monthlySpend: 1100,
          seats: 1,
          frequency: "Daily",
          ownerTeam: "Product",
          importance: "Critical",
        }),
      ]),
      growth: "Hiring Blitz",
    });

    expect(result.apiVolatilityRisk).toBe("HIGH");
    expect(
      result.findings.some((finding) =>
        finding.category.includes("API_VOLATILITY"),
      ),
    ).toBe(true);
  });

  it("marks high-savings audits as a Credex fit", () => {
    const result = generateAuditResult(
      createInput([
        baseTool({
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: 420,
          seats: 18,
          frequency: "Daily",
        }),
        baseTool({
          name: "Claude",
          plan: "Pro",
          monthlySpend: 180,
          seats: 7,
          frequency: "Weekly",
          importance: "Useful",
        }),
        baseTool({
          name: "Cursor",
          plan: "Business",
          monthlySpend: 520,
          seats: 22,
          frequency: "Rarely",
        }),
        baseTool({
          name: "OpenAI API",
          plan: "API Usage",
          monthlySpend: 1100,
          seats: 1,
          frequency: "Daily",
          ownerTeam: "Product",
        }),
      ]),
    );

    expect(result.estimatedMonthlySavings).toBeGreaterThanOrEqual(500);
    expect(result.credexFit).toBe(true);
  });
});