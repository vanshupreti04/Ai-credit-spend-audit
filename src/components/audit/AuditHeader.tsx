"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";

type Props = {
  toolsCount: number;
  monthly: number;
  seats: number;
  savings: number;
};

export default function AuditHeader({
  toolsCount,
  monthly,
  seats,
  savings,
}: Props) {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-magenta-100/40 bg-white/85 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
              <div className="h-3.5 w-3.5 rotate-45 border-2 border-magenta-500" />
            </div>

            <span className="font-display text-xl font-bold tracking-tight">
              Credex <span className="text-magenta-500">Audit</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Privacy-first
            </span>

            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Zap className="h-4 w-4 text-amber-500" />
              No login
            </span>
          </div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="mb-5 inline-flex rounded-full border border-magenta-100 bg-magenta-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-magenta-600">
          Free AI spend audit
        </div>

        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          Audit Your{" "}
          <span className="bg-gradient-to-br from-magenta-500 via-magenta-600 to-magenta-400 bg-clip-text text-transparent">
            AI Stack.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
          Add your current AI tools, plans, seats, usage, and business context
          to generate an instant savings audit.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Tools" value={toolsCount} />
          <StatCard label="Spend/mo" value={`$${monthly}`} />
          <StatCard label="Seats" value={seats} />
          <StatCard
            label="Est. save/mo"
            value={`$${savings}`}
            magenta
          />
        </div>
      </motion.div>
    </>
  );
}

function StatCard({
  label,
  value,
  magenta,
}: {
  label: string;
  value: string | number;
  magenta?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 shadow-sm ${
        magenta
          ? "border-magenta-100 bg-magenta-50"
          : "border-slate-100 bg-white"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-widest ${
          magenta ? "text-magenta-500" : "text-slate-400"
        }`}
      >
        {label}
      </p>

      <p
        className={`font-display text-2xl font-bold ${
          magenta ? "text-magenta-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}