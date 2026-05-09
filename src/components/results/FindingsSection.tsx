"use client";

import {
  AlertTriangle,
  BadgeDollarSign,
  CreditCard,
  Layers3,
  ShieldAlert,
  UsersRound,
  Zap,
} from "lucide-react";
import { ResultCard, RiskBadge, SectionTitle } from "./ResultShared";

type Finding = {
  title: string;
  description: string;
  severity: string;
  category: string;
};

type Props = {
  findings: Finding[];
};

const categoryMeta: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    gradient: string;
  }
> = {
  DUPLICATE_TOOLS: {
    label: "Tool overlap",
    icon: Layers3,
    gradient: "from-violet-50 to-magenta-50",
  },
  SEAT_WASTE: {
    label: "Seat waste",
    icon: UsersRound,
    gradient: "from-red-50 to-orange-50",
  },
  OVER_PROVISIONING: {
    label: "Plan fit",
    icon: CreditCard,
    gradient: "from-amber-50 to-orange-50",
  },
  API_VOLATILITY: {
    label: "API volatility",
    icon: Zap,
    gradient: "from-blue-50 to-cyan-50",
  },
  BILLING: {
    label: "Billing",
    icon: BadgeDollarSign,
    gradient: "from-emerald-50 to-teal-50",
  },
  CREDITS: {
    label: "Credits",
    icon: ShieldAlert,
    gradient: "from-magenta-50 to-fuchsia-50",
  },
  BENCHMARK: {
    label: "Benchmark",
    icon: AlertTriangle,
    gradient: "from-slate-50 to-slate-100",
  },
};

export default function FindingsSection({ findings }: Props) {
  return (
    <ResultCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          title="Audit Findings"
          subtitle="Engine-generated risk signals grouped by source of waste, governance, and billing exposure."
        />

        <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600">
          {findings.length} findings detected
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {findings.map((finding, index) => {
          const meta = categoryMeta[finding.category] ?? categoryMeta.BENCHMARK;
          const Icon = meta.icon;

          return (
            <div
              key={`${finding.title}-${index}`}
              className={`group relative overflow-hidden rounded-[28px] border border-slate-100 bg-gradient-to-br ${meta.gradient} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-magenta-100/40`}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60 blur-2xl" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-magenta-600 shadow-sm transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {meta.label}
                      </span>

                      <RiskBadge value={finding.severity} />
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-950">
                      {finding.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {finding.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 rounded-2xl bg-white/75 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-magenta-600">
                  Signal
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {finding.category.replaceAll("_", " ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ResultCard>
  );
}