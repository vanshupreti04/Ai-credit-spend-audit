"use client";

import { DollarSign, Gauge, PiggyBank, TrendingDown } from "lucide-react";

type Props = {
  overallScore: number;
  wasteScore: number;
  monthlySavings: number;
  annualSavings: number;
};

export default function ScoreOverview({
  overallScore,
  wasteScore,
  monthlySavings,
  annualSavings,
}: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <KpiCard
        label="AI Efficiency Score"
        value={overallScore}
        suffix="/100"
        icon={<Gauge className="h-5 w-5" />}
      />

      <KpiCard
        label="Spend Waste Index"
        value={wasteScore}
        suffix="/100"
        icon={<TrendingDown className="h-5 w-5" />}
        accent
      />

      <KpiCard
        label="Monthly Savings"
        value={`$${monthlySavings}`}
        subtext="estimated"
        icon={<DollarSign className="h-5 w-5" />}
        green
      />

      <KpiCard
        label="Annual Savings"
        value={`$${annualSavings}`}
        subtext="estimated"
        icon={<PiggyBank className="h-5 w-5" />}
        magenta
      />
    </section>
  );
}

function KpiCard({
  label,
  value,
  suffix,
  subtext,
  icon,
  accent,
  green,
  magenta,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  subtext?: string;
  icon: React.ReactNode;
  accent?: boolean;
  green?: boolean;
  magenta?: boolean;
}) {
  const valueColor = green
    ? "text-emerald-600"
    : magenta || accent
      ? "text-magenta-600"
      : "text-slate-950";

  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
        magenta
          ? "border-magenta-100 bg-magenta-50"
          : "border-slate-100 bg-white"
      }`}
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className={`mt-2 font-display text-4xl font-bold ${valueColor}`}>
        {value}
        {suffix && <span className="text-lg text-slate-400">{suffix}</span>}
      </p>

      {subtext && <p className="mt-1 text-sm text-slate-400">{subtext}</p>}
    </div>
  );
}