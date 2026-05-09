"use client";

import { RiskBadge, ResultCard, ScoreRangeGuide, SectionTitle } from "./ResultShared";

type Props = {
  monthlySpend: number;
  yearlySpend: number;
  spendPerEmployee: number;
  maturityLevel: string;
  benchmarkLabel: string;
  credexFit: boolean;
  duplicateToolRisk: string;
  seatWasteRisk: string;
  apiVolatilityRisk: string;
};

export default function SpendRiskSummary({
  monthlySpend,
  yearlySpend,
  spendPerEmployee,
  maturityLevel,
  benchmarkLabel,
  credexFit,
  duplicateToolRisk,
  seatWasteRisk,
  apiVolatilityRisk,
}: Props) {
  return (
    <ResultCard>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            title="Spend Summary"
            subtitle="Core financial metrics calculated from your current AI stack input."
          />

          <div className="grid gap-3 text-slate-700">
            <Metric label="Monthly Spend" value={`$${monthlySpend}`} />
            <Metric label="Yearly Spend" value={`$${yearlySpend}`} />
            <Metric label="Spend Per Employee" value={`$${spendPerEmployee}`} />
            <Metric label="Maturity Level" value={maturityLevel} />
            <Metric label="Benchmark" value={benchmarkLabel} />
            <Metric label="Credex Fit" value={credexFit ? "Yes" : "No"} />
          </div>
        </div>

        <div>
          <SectionTitle
            title="Risk Levels"
            subtitle="Risk ratings generated from duplicate tools, seat waste, and API volatility."
          />

          <div className="space-y-4">
            <RiskRow label="Duplicate Tool Risk" value={duplicateToolRisk} />
            <RiskRow label="Seat Waste Risk" value={seatWasteRisk} />
            <RiskRow label="API Volatility Risk" value={apiVolatilityRisk} />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-100 pt-8">
        <SectionTitle
          title="Score Meaning"
          subtitle="These ranges explain how to read your AI Efficiency Score and Spend Waste Index."
        />

        <ScoreRangeGuide />
      </div>
    </ResultCard>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}

function RiskRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
      <span className="font-semibold text-slate-950">{label}</span>
      <RiskBadge value={value} />
    </div>
  );
}