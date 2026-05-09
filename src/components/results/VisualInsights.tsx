"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart3, PieChartIcon, TrendingDown } from "lucide-react";
import { ResultCard, SectionTitle } from "./ResultShared";

type Recommendation = {
  title: string;
  estimatedMonthlySavings: number;
  priority: string;
};

type Props = {
  monthlySpend: number;
  monthlySavings: number;
  wasteScore: number;
  recommendations: Recommendation[];
};

const CHART_COLORS = ["#0f172a", "#d946ef", "#f97316", "#10b981", "#8b5cf6"];

function formatShortTitle(title: string) {
  return title
    .replace("Reclaim unused seats", "Unused seats")
    .replace("Move stable tools to annual billing", "Annual billing")
    .replace("Explore discounted AI credits", "AI credits")
    .replace("Add API spend controls", "API controls")
    .replace("Consolidate overlapping tools", "Tool overlap")
    .replace("Downgrade oversized plans", "Downgrade");
}

export default function VisualInsights({
  monthlySpend,
  monthlySavings,
  wasteScore,
  recommendations,
}: Props) {
  const optimizedSpend = Math.max(monthlySpend - monthlySavings, 0);

  const savingsData = recommendations
    .filter((item) => item.estimatedMonthlySavings > 0)
    .slice(0, 5)
    .map((item) => ({
      name: formatShortTitle(item.title),
      value: item.estimatedMonthlySavings,
    }));

  const benchmarkData = [
    { name: "Current", spend: monthlySpend },
    { name: "Optimized", spend: optimizedSpend },
  ];

  const projectionData = [
    { month: "Now", current: monthlySpend, optimized: monthlySpend },
    {
      month: "30d",
      current: Math.round(monthlySpend * 1.08),
      optimized: Math.round(monthlySpend - monthlySavings * 0.35),
    },
    {
      month: "60d",
      current: Math.round(monthlySpend * 1.16),
      optimized: Math.round(monthlySpend - monthlySavings * 0.7),
    },
    {
      month: "90d",
      current: Math.round(monthlySpend * 1.25),
      optimized: optimizedSpend,
    },
  ];

  return (
    <ResultCard>
      <SectionTitle
        title="Visual Spend Intelligence"
        subtitle="A quick visual breakdown of savings, waste pressure, and optimization impact."
      />

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="rounded-3xl bg-slate-50 p-6 xl:col-span-2">
          <Header
            icon={<PieChartIcon className="h-5 w-5" />}
            title="Savings Breakdown"
            subtitle="By opportunity type"
          />

          <div className="flex flex-col items-center">
            <div className="relative h-[260px] w-full max-w-[320px]">
                <ResponsiveContainer>
                <PieChart>
                    <Pie
                    data={savingsData}
                    innerRadius={72}
                    outerRadius={112}
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {savingsData.map((_, index) => (
                        <Cell
                        key={index}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                    ))}
                    </Pie>

                    <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Savings
                    </p>
                    <p className="font-display text-3xl font-bold text-slate-950">
                    ${monthlySavings}
                    </p>
                </div>
                </div>
            </div>

            <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                {savingsData.map((item, index) => (
                <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm"
                >
                    <div className="flex items-center gap-2">
                    <span
                        className="h-3 w-3 rounded-full"
                        style={{
                        backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                        }}
                    />

                    <span className="font-semibold text-slate-700">
                        {item.name}
                    </span>
                    </div>

                    <span className="font-bold text-slate-950">${item.value}</span>
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 xl:col-span-3">
          <Header
            icon={<TrendingDown className="h-5 w-5" />}
            title="90-Day Spend Projection"
            subtitle="Current trajectory vs optimized path"
          />

          <div className="h-[340px]">
            <ResponsiveContainer>
              <AreaChart
                data={projectionData}
                margin={{ top: 20, right: 24, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Math.round(Number(value))}`} />
                <Legend verticalAlign="bottom" height={36} />

                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#0f172a"
                  fill="#cbd5e1"
                  name="Current spend"
                  strokeWidth={2}
                />

                <Area
                  type="monotone"
                  dataKey="optimized"
                  stroke="#d946ef"
                  fill="#f5d0fe"
                  name="Optimized spend"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <MetricCard
              label="Current 90d Projection"
              value={`$${Math.round(monthlySpend * 1.25)}`}
            />

            <MetricCard
              label="Optimized 90d Projection"
              value={`$${optimizedSpend}`}
              magenta
            />
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 xl:col-span-3">
          <Header
            icon={<BarChart3 className="h-5 w-5" />}
            title="Spend Comparison"
            subtitle="Before and after optimization"
          />

          <div className="h-[340px]">
            <ResponsiveContainer>
              <BarChart
                data={benchmarkData}
                margin={{ top: 45, right: 24, bottom: 0, left: 0 }}
                barCategoryGap="35%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, Math.round(monthlySpend * 1.15)]} />
                <Tooltip formatter={(value) => `$${value}`} />

                <Bar
                    dataKey="spend"
                    radius={[18, 18, 0, 0]}
                    barSize={150}
>
                <LabelList
                    dataKey="spend"
                    position="top"
                    formatter={(value: number) => `$${value}`}
                    style={{
                    fill: "#0f172a",
                    fontSize: 22,
                    fontWeight: 800,
                    }}
                />

                <Cell fill="#0f172a" />
                <Cell fill="#d946ef" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white xl:col-span-2">
          <Header
            icon={<Activity className="h-5 w-5" />}
            title="Waste Pressure"
            subtitle="Current waste index"
            dark
          />

          <div className="flex h-[270px] items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[16px] border-magenta-500/20">
              <div
                className="absolute inset-[-16px] rounded-full border-[16px] border-magenta-500"
                style={{
                  clipPath: `inset(${100 - wasteScore}% 0 0 0)`,
                }}
              />

              <div className="text-center">
                <p className="font-display text-5xl font-bold">{wasteScore}</p>
                <p className="text-xs text-slate-400">/100</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-sm text-slate-300">
              Higher score means more recoverable waste.
            </p>
          </div>
        </div>
      </div>
    </ResultCard>
  );
}

function Header({
  icon,
  title,
  subtitle,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div
        className={`rounded-2xl p-3 shadow-sm ${
          dark ? "bg-white/10 text-magenta-300" : "bg-white text-magenta-600"
        }`}
      >
        {icon}
      </div>

      <div>
        <h3 className={`font-bold ${dark ? "text-white" : "text-slate-950"}`}>
          {title}
        </h3>
        <p className={dark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  magenta,
}: {
  label: string;
  value: string;
  magenta?: boolean;
}) {
  return (
    <div className={magenta ? "rounded-2xl bg-magenta-50 p-4" : "rounded-2xl bg-white p-4"}>
      <p
        className={
          magenta
            ? "text-xs font-bold uppercase tracking-widest text-magenta-500"
            : "text-xs font-bold uppercase tracking-widest text-slate-400"
        }
      >
        {label}
      </p>
      <p
        className={
          magenta
            ? "mt-1 font-display text-2xl font-bold text-magenta-600"
            : "mt-1 font-display text-2xl font-bold text-slate-950"
        }
      >
        {value}
      </p>
    </div>
  );
}