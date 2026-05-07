"use client";

import { motion } from "framer-motion";
import {
  BarChart4,
  CheckCircle2,
  MousePointer2,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const steps = [
  {
    icon: MousePointer2,
    title: "Add Your AI Stack",
    description:
      "Select the AI tools, plans, seats, and monthly spend your company currently uses.",
    color: "bg-magenta-100 text-magenta-600",
  },
  {
    icon: BarChart4,
    title: "Analyze Spending",
    description:
      "Our audit engine checks plan fit, duplicate subscriptions, and benchmark efficiency.",
    color: "bg-slate-100 text-slate-900",
  },
  {
    icon: CheckCircle2,
    title: "Reduce Waste",
    description:
      "Get clear recommendations to downgrade plans, consolidate seats, and save instantly.",
    color: "bg-magenta-500 text-white shadow-xl shadow-magenta-200",
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-slate-50/50 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 space-y-4 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            From audit to{" "}
            <span className="text-magenta-600">action</span> in 30 seconds.
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Most expense tools only show categories. Credex understands AI
            pricing structures, seat management, and plan efficiency.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 top-10 z-0 hidden h-px w-full md:block">
            <svg className="h-8 w-full overflow-visible" fill="none">
              <motion.path
                d="M 16.66% 0 L 50% 0 L 83.33% 0"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                strokeDasharray="10 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />

              <defs>
                <linearGradient
                  id="gradient-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group relative z-10 flex flex-col items-center text-center"
              >
                <div className="relative mb-8 flex w-full justify-center">
                  <div className="pointer-events-none absolute inset-0 scale-50 rounded-full bg-magenta-400/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                      "relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg transition-all duration-300",
                      step.color,
                      "group-hover:ring-4 group-hover:ring-magenta-50 group-hover:shadow-magenta-200",
                    )}
                  >
                    <Icon size={32} />
                  </motion.div>

                  <div className="absolute -right-2 -top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-xs font-bold text-magenta-600 shadow-sm">
                    {index + 1}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-slate-950 transition-colors group-hover:text-magenta-600">
                    {step.title}
                  </h3>

                  <p className="font-medium leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}