"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CircleDot,
  Clock3,
  Target,
} from "lucide-react";
import { ResultCard, RiskBadge, SectionTitle } from "./ResultShared";

type Recommendation = {
  title: string;
  description: string;
  action: string;
  estimatedMonthlySavings: number;
  priority: string;
};

type Props = {
  recommendations: Recommendation[];
};

function getPhase(index: number) {
  if (index === 0) return "Immediate";
  if (index === 1) return "Next 30 days";
  if (index === 2) return "Next 60 days";
  return "Later";
}

function getPriorityTone(priority: string) {
  if (priority === "HIGH") {
    return {
      border: "border-red-100",
      bg: "from-red-50 via-white to-magenta-50",
      iconBg: "bg-red-50 text-red-500",
    };
  }

  if (priority === "MEDIUM") {
    return {
      border: "border-orange-100",
      bg: "from-orange-50 via-white to-magenta-50",
      iconBg: "bg-orange-50 text-orange-500",
    };
  }

  return {
    border: "border-emerald-100",
    bg: "from-emerald-50 via-white to-magenta-50",
    iconBg: "bg-emerald-50 text-emerald-500",
  };
}

export default function RecommendationsSection({ recommendations }: Props) {
  const totalMonthlySavings = recommendations.reduce(
    (sum, rec) => sum + rec.estimatedMonthlySavings,
    0,
  );

  return (
    <ResultCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          title="Recommendation Roadmap"
          subtitle="A prioritized action plan showing what to fix first and how much each step can recover."
        />

        <div className="rounded-3xl bg-slate-950 px-6 py-4 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Total monthly opportunity
          </p>
          <p className="font-display text-3xl font-bold text-magenta-300">
            ${totalMonthlySavings}
          </p>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-magenta-400 via-magenta-200 to-transparent md:block" />

        <div className="space-y-6">
          {recommendations.map((rec, index) => {
            const tone = getPriorityTone(rec.priority);

            return (
              <div
                key={`${rec.title}-${index}`}
                className="relative grid gap-4 md:grid-cols-[64px_1fr]"
              >
                <div className="relative z-10 hidden md:flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-magenta-100">
                    {index === 0 ? (
                      <Target className="h-6 w-6" />
                    ) : (
                      <CircleDot className="h-6 w-6" />
                    )}
                  </div>
                </div>

                <div
                  className={`group overflow-hidden rounded-[30px] border ${tone.border} bg-gradient-to-br ${tone.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-magenta-100/50`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm">
                          <Clock3 className="h-3.5 w-3.5 text-magenta-500" />
                          {getPhase(index)}
                        </span>

                        <RiskBadge value={rec.priority} />

                        {index === 0 && (
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                            Highest impact
                          </span>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone.iconBg}`}
                        >
                          <CheckCircle2 className="h-6 w-6" />
                        </div>

                        <div>
                          <h3 className="font-display text-2xl font-bold text-slate-950">
                            {rec.title}
                          </h3>

                          <p className="mt-2 text-base leading-relaxed text-slate-600">
                            {rec.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl bg-white/80 p-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                          Recommended action
                        </p>

                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <ArrowRight className="h-4 w-4 text-magenta-500" />
                          {rec.action}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-white p-5 text-left shadow-sm lg:min-w-[220px] lg:text-right">
                      <div className="mb-3 flex items-center gap-2 lg:justify-end">
                        <BadgeDollarSign className="h-5 w-5 text-magenta-500" />
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Monthly savings
                        </p>
                      </div>

                      <p className="font-display text-4xl font-bold text-magenta-600">
                        ${rec.estimatedMonthlySavings}
                      </p>

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        ${rec.estimatedMonthlySavings * 12}/year potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ResultCard>
  );
}