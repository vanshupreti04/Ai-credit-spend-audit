"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check, Download, Share2 } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AuditReport() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-magenta-600">
                Interactive Reports
              </span>

              <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Actionable insights, <br />
                not just data dumps.
              </h2>

              <p className="text-lg leading-relaxed text-slate-500">
                Our reports don&apos;t just tell you that you&apos;re spending money.
                They give your ops team a 1-click execution list to save thousands.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Automated seat reclamation",
                "Plan mismatch alerts",
                "Unused subscription shadow-lock",
                "Team-wide benchmark sharing",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 font-semibold text-slate-700"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-magenta-50 text-magenta-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-bold text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 hover:bg-slate-900">
                <Download size={18} />
                Download PDF
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-50">
                <Share2 size={18} />
                Share Link
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 bg-magenta-100/30 blur-[120px]" />

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass relative overflow-hidden rounded-[40px] border border-magenta-100 p-6 shadow-[0_32px_64px_-16px_rgba(217,70,239,0.15)] md:p-10"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-bold text-white">
                    C
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-950">Quarterly AI Audit</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Q3 2026 • Acme Tech Inc.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  Optimized
                </div>
              </div>

              <div className="mb-10 grid gap-6 sm:grid-cols-3">
                {[
                  { label: "Total AI Spend", val: "$42.1k", trend: "+12%" },
                  {
                    label: "Waste Found",
                    val: "$14.2k",
                    trend: "-24%",
                    highlight: true,
                  },
                  { label: "Seats Inspected", val: "1,204", trend: "Audit OK" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {stat.label}
                    </span>

                    <span
                      className={cn(
                        "font-display text-2xl font-extrabold",
                        stat.highlight ? "text-magenta-600" : "text-slate-900",
                      )}
                    >
                      {stat.val}
                    </span>

                    <span
                      className={cn(
                        "text-[10px] font-bold",
                        stat.trend.includes("-")
                          ? "text-emerald-500"
                          : "text-slate-400",
                      )}
                    >
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-10 space-y-6">
                <div className="flex h-32 items-end justify-between gap-2">
                  {[40, 70, 45, 90, 65, 80, 55, 75, 95, 60].map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="group flex flex-1 flex-col items-center gap-2"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 1 }}
                        className={cn(
                          "w-full rounded-t-lg transition-all duration-300",
                          index === 8
                            ? "bg-magenta-500 shadow-lg shadow-magenta-200"
                            : "bg-slate-100 group-hover:bg-slate-200",
                        )}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-400">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                  <span>Tue</span>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Critical Actions
                </h5>

                {[
                  {
                    tool: "Midjourney",
                    action: "Downgrade to Pro",
                    save: "$420",
                    status: "pending",
                  },
                  {
                    tool: "GitHub Copilot",
                    action: "Consolidate 12 seats",
                    save: "$2,100",
                    status: "alert",
                  },
                ].map((item) => (
                  <div
                    key={item.tool}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold">
                        {item.tool[0]}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-950">{item.tool}</p>
                        <p className="text-[10px] font-medium text-slate-500">
                          {item.action}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-magenta-600">
                        -{item.save}/mo
                      </p>

                      {item.status === "alert" && (
                        <AlertCircle
                          size={10}
                          className="ml-auto mt-1 text-magenta-500"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}