"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const stats = [
  {
    label: "Avg Weekly Spend",
    value: "$2,840",
    description: "37% higher than median peers",
    icon: Zap,
  },
  {
    label: "Seat Utilization",
    value: "64%",
    description: "Industry benchmark is 82%",
    icon: Users,
  },
  {
    label: "Tool Consolidation",
    value: "Low",
    description: "High overlap in developer stack",
    icon: Target,
  },
];

export default function Benchmarks() {
  return (
    <section
      id="benchmarks"
      className="relative overflow-hidden bg-slate-950 py-32 text-white"
    >
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-magenta-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-magenta-400">
                Industry Benchmarking
              </span>

              <h2 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
                How does your AI spend <br />
                measure up?
              </h2>

              <p className="max-w-lg text-xl leading-relaxed text-slate-400">
                Most companies don&apos;t know if they&apos;re overpaying because
                AI pricing is opaque. We use metadata from 2,000+ companies to
                give you context.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: "Data Points", val: "4M+" },
                { label: "Trust Score", val: "99.8" },
                { label: "Global Rank", val: "#1" },
                { label: "Updates", val: "Hourly" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {item.label}
                  </p>

                  <p className="font-display text-3xl font-bold text-white">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">Your Performance</h3>

                <div className="rounded-full bg-magenta-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white">
                  LIVE PREVIEW
                </div>
              </div>

              <div className="space-y-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div key={stat.label} className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-magenta-400" />
                          <span className="text-sm font-semibold">
                            {stat.label}
                          </span>
                        </div>

                        <span className="text-sm font-bold">{stat.value}</span>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              index === 1
                                ? "64%"
                                : index === 0
                                  ? "85%"
                                  : "40%",
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className={cn(
                            "h-full rounded-full",
                            index === 1 ? "bg-orange-500" : "bg-magenta-500",
                          )}
                        />
                      </div>

                      <p className="text-xs text-slate-500">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Efficiency Percentile
                    </p>

                    <p className="font-display text-2xl font-bold text-magenta-400">
                      Bottom 12%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Saving Potential
                    </p>

                    <p className="font-display text-2xl font-bold text-emerald-400">
                      $32,400
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-12 w-12 overflow-hidden rounded-full border-4 border-slate-950 bg-slate-800"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                        item + 40
                      }`}
                      alt="User avatar"
                    />
                  </div>
                ))}
              </div>

              <p className="text-sm font-medium text-slate-400">
                Join{" "}
                <span className="font-bold text-white">2,400+ ops teams</span>{" "}
                measuring their stacks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}