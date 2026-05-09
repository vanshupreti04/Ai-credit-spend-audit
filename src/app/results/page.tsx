"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { AuditResult } from "@/lib/audit-engine";

import AIReportSection, {
  AIReport,
} from "@/components/results/AIReportSection";
import FindingsSection from "@/components/results/FindingsSection";
import OptimizationTimeline from "@/components/results/OptimizationTimeline";
import PerToolBreakdown from "@/components/results/PerToolBreakdown";
import RecommendationsSection from "@/components/results/RecommendationsSection";
import ReportActions from "@/components/results/ReportActions";
import ResultsHeader from "@/components/results/ResultsHeader";
import ScoreOverview from "@/components/results/ScoreOverview";
import SpendRiskSummary from "@/components/results/SpendRiskSummary";
import VisualInsights from "@/components/results/VisualInsights";

type AuditInput = {
  teamName: string;
  teamSize: number;
  workflow: string;
  monthlyBudget: number;
  growth: string;
  concern: string;
  tools: {
    id: string;
    name: string;
    plan: string;
    monthlySpend: number;
    seats: number;
    frequency: string;
    billingCycle: string;
    ownerTeam: string;
    importance: string;
  }[];
};

export default function ResultsPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [auditInput, setAuditInput] = useState<AuditInput | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState("");

  useEffect(() => {
    const savedResult = localStorage.getItem("credex-audit-result");
    const savedInput = localStorage.getItem("credex-audit-input");

    if (!savedResult) return;

    const parsedResult = JSON.parse(savedResult) as AuditResult;

    queueMicrotask(() => {
      setResult(parsedResult);

      if (savedInput) {
        setAuditInput(JSON.parse(savedInput) as AuditInput);
      }
    });

    async function generateReport() {
      try {
        setIsGeneratingReport(true);
        setReportError("");

        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ result: parsedResult }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to generate AI report");
        }

        setAiReport(data.report);
      } catch (error) {
        setReportError(
          error instanceof Error
            ? error.message
            : "Failed to generate AI report",
        );
      } finally {
        setIsGeneratingReport(false);
      }
    }

    generateReport();
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">No audit result found.</h1>

          <p className="mt-3 text-slate-500">Please generate an audit first.</p>

          <Link
            href="/audit"
            className="mt-6 inline-block rounded-xl bg-black px-5 py-3 font-semibold text-white"
          >
            Go to Audit Form
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(circle,#f5d0fe_1px,transparent_1px)] bg-[size:32px_32px] px-6 py-20 text-slate-950">
      <div id="audit-report-content" className="mx-auto max-w-7xl space-y-8">
        <ResultsHeader />

        <ScoreOverview
          overallScore={result.overallScore}
          wasteScore={result.wasteScore}
          monthlySavings={result.estimatedMonthlySavings}
          annualSavings={result.estimatedYearlySavings}
        />

        <SpendRiskSummary
          monthlySpend={result.monthlySpend}
          yearlySpend={result.yearlySpend}
          spendPerEmployee={result.spendPerEmployee}
          maturityLevel={result.maturityLevel}
          benchmarkLabel={result.benchmarkLabel}
          credexFit={result.credexFit}
          duplicateToolRisk={result.duplicateToolRisk}
          seatWasteRisk={result.seatWasteRisk}
          apiVolatilityRisk={result.apiVolatilityRisk}
        />

        <VisualInsights
          monthlySpend={result.monthlySpend}
          monthlySavings={result.estimatedMonthlySavings}
          wasteScore={result.wasteScore}
          recommendations={result.recommendations}
        />

        {auditInput && (
          <PerToolBreakdown
            tools={auditInput.tools}
            teamSize={auditInput.teamSize}
          />
        )}

        <OptimizationTimeline
          monthlySavings={result.estimatedMonthlySavings}
        />

        <AIReportSection
          aiReport={aiReport}
          isGeneratingReport={isGeneratingReport}
          reportError={reportError}
        />

        <FindingsSection findings={result.findings} />

        <RecommendationsSection recommendations={result.recommendations} />

        <ReportActions
          credexFit={result.credexFit}
          annualSavings={result.estimatedYearlySavings}
          result={result}
          aiReport={aiReport}
          auditInput={auditInput}
        />
      </div>
    </main>
  );
}