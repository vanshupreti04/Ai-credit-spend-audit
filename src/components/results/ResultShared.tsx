"use client";

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

export function getRiskStyle(value: string) {
  if (value === "HIGH") {
    return "border-red-100 bg-red-50 text-red-600";
  }

  if (value === "MEDIUM") {
    return "border-orange-100 bg-orange-50 text-orange-600";
  }

  return "border-emerald-100 bg-emerald-50 text-emerald-600";
}

export function RiskBadge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${getRiskStyle(
        value,
      )}`}
    >
      {value}
    </span>
  );
}

export function ResultCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/60 md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold text-slate-950 md:text-3xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ScoreRangeGuide() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <h3 className="font-bold">AI Efficiency Score</h3>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p><b>80–100:</b> Optimized</p>
          <p><b>60–79:</b> Scaling</p>
          <p><b>40–59:</b> At Risk</p>
          <p><b>0–39:</b> Critical</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-magenta-500" />
          <h3 className="font-bold">Spend Waste Index</h3>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p><b>0–20:</b> Low waste</p>
          <p><b>21–45:</b> Moderate waste</p>
          <p><b>46–70:</b> High waste</p>
          <p><b>71–100:</b> Critical waste</p>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
      <Info className="mx-auto h-8 w-8 text-slate-400" />
      <h3 className="mt-3 font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
      <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}