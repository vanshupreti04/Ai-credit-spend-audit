import Link from "next/link";
import { supabase } from "@/lib/supabase";

import AIReportSection from "@/components/results/AIReportSection";
import FindingsSection from "@/components/results/FindingsSection";
import OptimizationTimeline from "@/components/results/OptimizationTimeline";
import PerToolBreakdown from "@/components/results/PerToolBreakdown";
import RecommendationsSection from "@/components/results/RecommendationsSection";
import ScoreOverview from "@/components/results/ScoreOverview";
import SpendRiskSummary from "@/components/results/SpendRiskSummary";
import VisualInsights from "@/components/results/VisualInsights";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PublicReportPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("audit_reports")
    .select("*")
    .eq("public_id", id)
    .single();

  if (error || !data) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Report not found</h1>

          <p className="mt-3 text-slate-500">
            This report link is invalid or no longer available.
          </p>

          <Link
            href="/audit"
            className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"
          >
            Run New Audit
          </Link>
        </div>
      </main>
    );
  }

  const result = data.audit_result;
  const aiReport = data.ai_report;
  const auditInput = data.audit_input;

  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(circle,#f5d0fe_1px,transparent_1px)] bg-[size:32px_32px] px-6 py-20 text-slate-950">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[36px] border border-magenta-100 bg-slate-950 p-8 text-white shadow-2xl shadow-magenta-100/40">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-magenta-400">
                Public AI Spend Audit
              </p>

              <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-6xl">
                {auditInput?.teamName || "Saved Audit Report"}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                This is a shareable version of the audit report. Private lead
                details such as email, company contact, and role are hidden.
              </p>
            </div>

            <Link
              href="/audit"
              className="rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-1"
            >
              Run Free Audit
            </Link>
          </div>
        </section>

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

        {auditInput?.tools && (
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
          isGeneratingReport={false}
          reportError=""
        />

        <FindingsSection findings={result.findings} />

        <RecommendationsSection recommendations={result.recommendations} />

      </div>
    </main>
  );
}