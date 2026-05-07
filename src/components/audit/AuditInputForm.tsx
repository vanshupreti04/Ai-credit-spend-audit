"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

import {
  AITool,
  BILLING_CYCLES,
  FREQUENCIES,
  IMPORTANCE_LEVELS,
  OWNER_TEAMS,
  PLAN_OPTIONS,
  SUPPORTED_TOOLS,
  TOOL_INITIALS,
  WORKFLOWS,
  BillingCycle,
  Frequency,
  Importance,
  OwnerTeam,
  PlanOption,
  ToolName,
  WorkflowType,
} from "@/data/audit-options";

import { cn, Input, SectionCard, Select } from "./AuditShared";

type Props = {
  teamName: string;
  setTeamName: (value: string) => void;
  teamSize: string;
  setTeamSize: (value: string) => void;
  workflow: WorkflowType;
  setWorkflow: (value: WorkflowType) => void;

  monthlyBudget: number;
  setMonthlyBudget: (value: number) => void;
  growth: string;
  setGrowth: (value: string) => void;
  concern: string;
  setConcern: (value: string) => void;

  tools: AITool[];
  addTool: () => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<AITool>) => void;
};

export default function AuditInputForm({
  teamName,
  setTeamName,
  teamSize,
  setTeamSize,
  workflow,
  setWorkflow,
  monthlyBudget,
  setMonthlyBudget,
  growth,
  setGrowth,
  concern,
  setConcern,
  tools,
  addTool,
  removeTool,
  updateTool,
}: Props) {
  return (
    <div className="space-y-8">
      <SectionCard
        number="01"
        title="Team Details"
        description="Tell us who is using these tools so the audit can compare plan fit against team size and workflow."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Company or Team Name"
            placeholder="e.g. Acme AI"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
          />

          <Input
            label="Total Team Size"
            type="number"
            placeholder="25"
            value={teamSize}
            onChange={(event) => setTeamSize(event.target.value)}
          />
        </div>

        <div className="mt-8">
          <p className="mb-3 ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            Primary Use Case
          </p>

          <div className="flex flex-wrap gap-3">
            {WORKFLOWS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setWorkflow(item)}
                className={cn(
                  "rounded-2xl border px-5 py-3 text-sm font-bold transition-all",
                  workflow === item
                    ? "border-magenta-500 bg-magenta-500 text-white shadow-lg shadow-magenta-100"
                    : "border-slate-200 bg-white text-slate-600 hover:border-magenta-200 hover:bg-magenta-50",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        number="02"
        title="AI Tool Stack"
        description="Add each AI subscription or API tool your team currently pays for. Include seats and usage so the audit can find downgrade, consolidation, and credit opportunities."
      >
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-[28px] border border-slate-100 bg-slate-50/60 p-5 transition-all hover:border-magenta-100 hover:bg-white hover:shadow-xl hover:shadow-magenta-100/30 md:p-6"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-magenta-100 bg-white text-sm font-black text-magenta-600 shadow-sm">
                      {TOOL_INITIALS[tool.name]}
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-950">
                        Tool #{index + 1}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Subscription, seats, usage, and ownership
                      </p>
                    </div>
                  </div>

                  {tools.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTool(tool.id)}
                      className="rounded-2xl bg-red-50 p-3 text-red-400 transition-all hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Select
                    label="AI Tool"
                    options={SUPPORTED_TOOLS}
                    value={tool.name}
                    onChange={(value) =>
                      updateTool(tool.id, { name: value as ToolName })
                    }
                  />

                  <Select
                    label="Current Plan"
                    options={PLAN_OPTIONS}
                    value={tool.plan}
                    onChange={(value) =>
                      updateTool(tool.id, { plan: value as PlanOption })
                    }
                  />

                  <Input
                    label="Monthly Spend ($)"
                    type="number"
                    value={tool.monthlySpend}
                    onChange={(event) =>
                      updateTool(tool.id, {
                        monthlySpend:
                          Number.parseFloat(event.target.value) || 0,
                      })
                    }
                  />

                  <Input
                    label="Paid Seats"
                    type="number"
                    value={tool.seats}
                    onChange={(event) =>
                      updateTool(tool.id, {
                        seats: Number.parseInt(event.target.value) || 1,
                      })
                    }
                  />

                  <Select
                    label="Usage Frequency"
                    options={FREQUENCIES}
                    value={tool.frequency}
                    onChange={(value) =>
                      updateTool(tool.id, { frequency: value as Frequency })
                    }
                  />

                  <Select
                    label="Billing Cycle"
                    options={BILLING_CYCLES}
                    value={tool.billingCycle}
                    onChange={(value) =>
                      updateTool(tool.id, {
                        billingCycle: value as BillingCycle,
                      })
                    }
                  />

                  <Select
                    label="Owner Team"
                    options={OWNER_TEAMS}
                    value={tool.ownerTeam}
                    onChange={(value) =>
                      updateTool(tool.id, { ownerTeam: value as OwnerTeam })
                    }
                  />

                  <Select
                    label="Business Importance"
                    options={IMPORTANCE_LEVELS}
                    value={tool.importance}
                    onChange={(value) =>
                      updateTool(tool.id, { importance: value as Importance })
                    }
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={addTool}
            className="flex min-h-24 w-full items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-magenta-200 bg-magenta-50/40 text-sm font-bold text-magenta-500 transition-all hover:border-magenta-400 hover:bg-magenta-50 hover:shadow-xl hover:shadow-magenta-100/50"
          >
            <Plus className="h-5 w-5" />
            Add Another AI Tool
          </motion.button>
        </div>
      </SectionCard>

      <SectionCard
        number="03"
        title="Spend Context"
        description="These optional details help make the recommendation more realistic and finance-friendly."
      >
        <div className="space-y-8">
          <div>
            <div className="mb-3 flex items-end justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Monthly AI Budget
              </label>

              <span className="font-display text-xl font-bold text-magenta-500">
                ${monthlyBudget}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={monthlyBudget}
              onChange={(event) =>
                setMonthlyBudget(Number.parseInt(event.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-100 accent-magenta-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Expected 12-Month Growth
              </p>

              <div className="grid grid-cols-2 gap-3">
                {["Stable", "Fast-paced", "Scaling", "Hiring Blitz"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGrowth(item)}
                      className={cn(
                        "rounded-2xl border px-3 py-4 text-sm font-bold transition-all",
                        growth === item
                          ? "border-magenta-200 bg-magenta-50 text-magenta-600 shadow-lg shadow-magenta-100/50"
                          : "border-slate-200 bg-white text-slate-500 hover:border-magenta-200",
                      )}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Biggest AI Expense Concern
              </p>

              <textarea
                value={concern}
                onChange={(event) => setConcern(event.target.value)}
                placeholder="Example: API usage spikes, duplicate subscriptions, too many unused seats..."
                className="min-h-[150px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-950 transition-all placeholder:text-slate-400 focus:border-magenta-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-magenta-100"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}