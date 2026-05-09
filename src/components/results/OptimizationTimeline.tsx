"use client";

import { CalendarCheck, CircleDollarSign, ShieldCheck } from "lucide-react";
import { ResultCard, SectionTitle } from "./ResultShared";

type Props = {
  monthlySavings: number;
};

export default function OptimizationTimeline({ monthlySavings }: Props) {
  const steps = [
    {
      label: "30 Days",
      title: "Stop visible leakage",
      icon: ShieldCheck,
      actions: ["Remove inactive seats", "Add API spend alerts"],
      impact: Math.round(monthlySavings * 0.35),
    },
    {
      label: "60 Days",
      title: "Consolidate vendors",
      icon: CalendarCheck,
      actions: ["Standardize assistant tools", "Downgrade low-usage plans"],
      impact: Math.round(monthlySavings * 0.35),
    },
    {
      label: "90 Days",
      title: "Lock savings",
      icon: CircleDollarSign,
      actions: ["Move stable tools annual", "Negotiate credits"],
      impact: Math.round(monthlySavings * 0.3),
    },
  ];

  return (
    <ResultCard>
      <SectionTitle
        title="90-Day Optimization Timeline"
        subtitle="A simple execution roadmap to convert audit insights into real savings."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="relative rounded-3xl border border-magenta-100 bg-magenta-50/50 p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-magenta-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-magenta-600">
                  Step {index + 1}
                </span>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-magenta-500">
                {step.label}
              </p>

              <h3 className="mt-2 font-display text-xl font-bold text-slate-950">
                {step.title}
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {step.actions.map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Estimated unlocked savings
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-magenta-600">
                  ${step.impact}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ResultCard>
  );
}