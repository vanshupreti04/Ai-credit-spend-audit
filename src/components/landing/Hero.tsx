"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  TrendingDown,
  Zap,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white pb-20 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-magenta-100/40 blur-[120px]" />

        <div className="absolute right-[-10%] top-[20%] h-[50%] w-[50%] rounded-full bg-magenta-50/50 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-magenta-100 bg-magenta-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-magenta-600"
          >
            <Sparkles size={14} className="animate-pulse" />
            AI Spend Intelligence v2.0 is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-slate-950 md:text-7xl"
          >
            Your AI Stack Is <br />
            <span className="text-gradient">Bleeding Money.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl"
          >
            Fast-growing startups waste money on overlapping subscriptions,
            oversized plans, and unused AI seats. Instantly audit your stack
            and reclaim your runway.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-magenta-600 to-magenta-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-magenta-200/50 sm:w-auto"
            >
              Run Free Audit

              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
                y: -2,
                backgroundColor: "rgba(241, 245, 249, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-8 py-4 text-lg font-semibold text-slate-700 transition-colors sm:w-auto"
            >
              See Example Report
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Integrating with
            </span>

            <div className="group flex items-center gap-4 opacity-40 grayscale transition-all duration-700 hover:grayscale-0">
              <div className="font-bold tracking-tighter text-slate-900">
                CURSOR
              </div>

              <div className="font-bold tracking-tighter text-slate-900">
                OPENAI
              </div>

              <div className="font-bold tracking-tighter text-slate-900">
                CLAUDE
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="glass relative z-20 overflow-hidden rounded-[32px] p-8 shadow-2xl ring-1 ring-magenta-100">
            <div className="mb-8 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold">Overview</h3>

                <p className="text-xs font-medium tracking-tight text-slate-500">
                  AI & SaaS Expenditure Matrix
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-200" />
                <div className="h-2 w-2 rounded-full bg-slate-200" />
                <div className="h-2 w-2 rounded-full bg-magenta-400" />
              </div>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-2xl border border-magenta-100 bg-magenta-50/50 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-magenta-600">
                  Potential Savings
                </span>

                <span className="font-display text-2xl font-extrabold text-slate-900">
                  $12,480
                  <span className="text-sm font-medium opacity-50">/yr</span>
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Efficiency Score
                </span>

                <span className="font-display text-2xl font-extrabold text-slate-900">
                  92%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Spend Distribution</span>

                <TrendingDown size={14} className="text-emerald-500" />
              </div>

              {[
                {
                  name: "Developer Tools",
                  value: 85,
                  color: "bg-magenta-500",
                },
                {
                  name: "LLM APIs",
                  value: 62,
                  color: "bg-slate-900",
                },
                {
                  name: "Productivity",
                  value: 45,
                  color: "bg-magenta-200",
                },
              ].map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{item.name}</span>

                    <span className="text-slate-400">{item.value}%</span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className={cn("h-full rounded-full", item.color)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-200"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                        item + 10
                      }`}
                      alt="avatar"
                    />
                  </div>
                ))}
              </div>

              <span className="text-xs font-bold text-magenta-600">
                Review recommendations
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass absolute -right-6 -top-10 z-30 flex items-center gap-3 rounded-2xl border border-magenta-100 p-4 shadow-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Target size={20} />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Recommendation
              </span>

              <span className="text-sm font-bold">
                Consolidate Seats
              </span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="glass absolute -left-20 bottom-10 z-30 flex items-center gap-3 rounded-2xl border border-magenta-100 p-5 shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-magenta-500 to-magenta-400 text-white shadow-lg shadow-magenta-100">
              <Zap size={24} />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Instant Fix
              </span>

              <span className="text-sm font-bold">
                Save $4,200/mo
              </span>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute left-[-3rem] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-magenta-200/20 blur-[100px]" />
        </motion.div>
      </div>
    </section>
  );
}