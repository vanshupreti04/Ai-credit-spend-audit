"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  Code2,
  DatabaseZap,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { ResultCard, RiskBadge, SectionTitle } from "./ResultShared";

type AITool = {
  id: string;
  name: string;
  plan: string;
  monthlySpend: number;
  seats: number;
  frequency: string;
  billingCycle: string;
  ownerTeam: string;
  importance: string;
};

type Props = {
  tools: AITool[];
  teamSize: number;
};

function getToolIcon(name: string) {
  if (name.includes("Cursor") || name.includes("Copilot") || name.includes("Windsurf")) {
    return Code2;
  }

  if (name.includes("API")) {
    return DatabaseZap;
  }

  if (name.includes("Perplexity")) {
    return Search;
  }

  return Bot;
}

function getToolRisk(tool: AITool, teamSize: number) {
  let points = 0;

  if (tool.frequency === "Rarely") points += 45;
  if (tool.frequency === "Weekly") points += 25;
  if (tool.seats > teamSize) points += 35;
  if (tool.plan === "Enterprise" && teamSize <= 10) points += 30;
  if (tool.importance === "Experimental" && tool.monthlySpend > 0) points += 25;
  if (tool.name.includes("API") && tool.monthlySpend >= 500) points += 45;

  if (points >= 70) return "HIGH";
  if (points >= 35) return "MEDIUM";
  return "LOW";
}

function getRecommendedAction(tool: AITool, teamSize: number) {
  if (tool.name.includes("API") && tool.monthlySpend >= 500) {
    return {
      action: "Add API budget controls",
      reason: "Usage-based AI API spend can scale quickly without alerts, caps, and monthly review.",
      savings: Math.round(tool.monthlySpend * 0.15),
    };
  }

  if (tool.frequency === "Rarely") {
    return {
      action: "Reduce seats or downgrade",
      reason: "This tool has low usage but still carries active paid spend.",
      savings: Math.round(tool.monthlySpend * 0.45),
    };
  }

  if (tool.frequency === "Weekly") {
    return {
      action: "Review adoption before renewal",
      reason: "Weekly usage may not justify the current seat count or plan level.",
      savings: Math.round(tool.monthlySpend * 0.25),
    };
  }

  if (tool.seats > teamSize) {
    return {
      action: "Reclaim excess seats",
      reason: "The number of paid seats is higher than the provided team size.",
      savings: Math.round((tool.monthlySpend / Math.max(tool.seats, 1)) * (tool.seats - teamSize)),
    };
  }

  if (tool.billingCycle === "Monthly" && tool.frequency === "Daily" && tool.importance === "Critical") {
    return {
      action: "Consider annual billing",
      reason: "Daily critical tools are stable enough to evaluate annual billing discounts.",
      savings: Math.round(tool.monthlySpend * 0.15),
    };
  }

  return {
    action: "Keep current plan",
    reason: "This tool appears aligned with current usage and business importance.",
    savings: 0,
  };
}

export default function PerToolBreakdown({ tools, teamSize }: Props) {
  return (
    <ResultCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          title="Per-Tool Breakdown"
          subtitle="Each tool is evaluated for usage fit, seat efficiency, billing risk, and savings opportunity."
        />

        <div className="rounded-2xl bg-magenta-50 px-5 py-3 text-sm font-bold text-magenta-600">
          {tools.length} tools analyzed
        </div>
      </div>

      <div className="grid gap-5">
        {tools.map((tool) => {
          const Icon = getToolIcon(tool.name);
          const risk = getToolRisk(tool, teamSize);
          const recommendation = getRecommendedAction(tool, teamSize);
          const spendPerSeat = Math.round(tool.monthlySpend / Math.max(tool.seats, 1));

          return (
            <div
              key={tool.id}
              className="overflow-hidden rounded-[30px] border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-magenta-50/60 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-magenta-100/40"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl font-bold text-slate-950">
                        {tool.name}
                      </h3>

                      <RiskBadge value={risk} />
                    </div>

                    <p className="text-sm text-slate-500">
                      {tool.plan} plan · {tool.ownerTeam} · {tool.importance}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <MiniStat label="Spend" value={`$${tool.monthlySpend}`} />
                      <MiniStat label="Seats" value={tool.seats.toString()} />
                      <MiniStat label="Per seat" value={`$${spendPerSeat}`} />
                      <MiniStat label="Usage" value={tool.frequency} />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-magenta-500" />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Recommended action
                    </p>
                  </div>

                  <h4 className="font-bold text-slate-950">
                    {recommendation.action}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {recommendation.reason}
                  </p>

                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-magenta-600">
                    <ArrowRight className="h-4 w-4" />
                    Review before next renewal
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="mb-3 flex items-center gap-2">
                    <BadgeDollarSign className="h-5 w-5 text-magenta-300" />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Est. savings
                    </p>
                  </div>

                  <p className="font-display text-4xl font-bold text-magenta-300">
                    ${recommendation.savings}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">per month</p>

                  <div className="mt-5 rounded-2xl bg-white/10 p-3">
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                      <UsersRound className="h-4 w-4" />
                      Seat fit
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-magenta-400"
                        style={{
                          width: `${Math.min((tool.seats / Math.max(teamSize, 1)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ResultCard>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-bold text-slate-950">{value}</p>
    </div>
  );
}