"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function ResultsHeader() {
  return (
    <div>
      <Link href="/audit" className="text-sm font-semibold text-magenta-600">
        ← Back to Audit
      </Link>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-magenta-100 bg-magenta-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-magenta-600">
            <Sparkles className="h-4 w-4" />
            AI-generated report
          </div>

          <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
            AI Spend Audit Report
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
            A structured report based on deterministic audit scoring, savings
            analysis, risk detection, and AI-generated business interpretation.
          </p>
        </div>
      </div>
    </div>
  );
}