"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Flame,
  Search,
  Users,
  Zap,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const features = [
  {
    title: "AI Spend Audit",
    description:
      "Map your AI tools, plans, seats, and spend to uncover avoidable monthly waste.",
    icon: Search,
    className: "lg:col-span-2 lg:row-span-2",
    color: "text-magenta-600",
    bg: "bg-magenta-50",
  },
  {
    title: "Benchmarking",
    description:
      "Compare your AI spend per team member against similar startup teams.",
    icon: BarChart3,
    className: "lg:col-span-1 lg:row-span-1",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Plan Fit Checks",
    description:
      "Detect when a team is paying for an oversized plan or unused seats.",
    icon: Users,
    className: "lg:col-span-1 lg:row-span-1",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Shareable Reports",
    description:
      "Create clean public audit links with private company details removed.",
    icon: FileText,
    className: "lg:col-span-2 lg:row-span-1",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    title: "Savings Calculator",
    description:
      "See monthly and annual savings from downgrades, switches, and credits.",
    icon: Flame,
    className: "lg:col-span-2 lg:row-span-1",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "AI Spend Score",
    description:
      "Get a simple health score showing how efficiently your team buys AI tools.",
    icon: Zap,
    className: "lg:col-span-2 lg:row-span-1",
    color: "text-magenta-600",
    bg: "bg-magenta-50",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Complete <span className="text-magenta-600">visibility</span>{" "}
              into your <br className="hidden md:block" />
              expanding AI stack.
            </h2>

            <p className="text-lg text-slate-500">
              Find duplicate subscriptions, oversized team plans, and retail
              pricing gaps before they turn into runaway AI bills.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200"
          >
            Explore all capabilities
          </motion.button>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 p-8 transition-all duration-300 hover:border-magenta-100 hover:shadow-2xl hover:shadow-magenta-100/30",
                  feature.className,
                  feature.bg,
                )}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={cn(
                      "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110",
                      feature.color,
                    )}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                  </div>

                  <div className="mt-auto space-y-2">
                    <h3 className="font-display text-xl font-bold text-slate-950">
                      {feature.title}
                    </h3>

                    <p className="max-w-[280px] text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 opacity-10 transition-opacity group-hover:opacity-20">
                  <Icon size={120} strokeWidth={1} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}