"use client";

import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  EmptyState,
  ErrorBox,
  ResultCard,
  RiskBadge,
  SectionTitle,
} from "./ResultShared";

export type AIReport = {
  executiveSummary: string;
  scoreExplanation: string;
  keyRisks: {
    title: string;
    description: string;
    severity: string;
  }[];
  recommendedActions: {
    title: string;
    description: string;
    impact: string;
  }[];
  finalVerdict: string;
};

type Props = {
  aiReport: AIReport | null;
  isGeneratingReport: boolean;
  reportError: string;
};

export default function AIReportSection({
  aiReport,
  isGeneratingReport,
  reportError,
}: Props) {
  return (
    <ResultCard className="border-magenta-100 shadow-xl shadow-magenta-100/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SectionTitle
          title="AI Executive Report"
          subtitle="Short narrative generated from the audit engine output."
        />

        {isGeneratingReport && (
          <div className="inline-flex items-center gap-2 rounded-full bg-magenta-50 px-4 py-2 text-sm font-bold text-magenta-600">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Generating...
          </div>
        )}
      </div>

      {reportError && <ErrorBox message={reportError} />}

      {!aiReport && !isGeneratingReport && !reportError && (
        <EmptyState
          title="Waiting for AI report"
          description="The AI narrative will appear after generation finishes."
        />
      )}

      {aiReport && (
        <div className="space-y-7">
          <div className="grid gap-5 lg:grid-cols-2">
            <ArticleBlock
              icon={<Bot className="h-5 w-5" />}
              title="Executive Summary"
              text={aiReport.executiveSummary}
            />

            <ArticleBlock
              icon={<FileText className="h-5 w-5" />}
              title="Score Explanation"
              text={aiReport.scoreExplanation}
            />
          </div>

          <div>
            <SectionTitle title="Key Risks" />

            <div className="grid gap-4 md:grid-cols-3">
              {aiReport.keyRisks.map((risk, index) => (
                <div
                  key={`${risk.title}-${index}`}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <RiskBadge value={risk.severity} />
                  </div>

                  <h4 className="font-bold text-slate-950">{risk.title}</h4>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle title="AI Recommended Actions" />

            <div className="grid gap-4 md:grid-cols-2">
              {aiReport.recommendedActions.map((action, index) => (
                <div
                  key={`${action.title}-${index}`}
                  className="rounded-3xl bg-magenta-50 p-6"
                >
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-magenta-600" />

                    <div>
                      <h4 className="font-bold text-slate-950">
                        {action.title}
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {action.description}
                      </p>

                      <p className="mt-3 text-sm font-bold text-magenta-700">
                        {action.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 rounded-3xl bg-slate-950 p-7 text-white md:grid-cols-[auto_1fr]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-magenta-500">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold">
                Final AI Verdict
              </h3>

              <p className="mt-3 text-lg leading-relaxed text-slate-300">
                {aiReport.finalVerdict}
              </p>
            </div>
          </div>
        </div>
      )}
    </ResultCard>
  );
}

function ArticleBlock({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-6">
      <div className="mb-4 flex items-center gap-3 text-slate-950">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-magenta-600 shadow-sm">
          {icon}
        </div>

        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>

      <p className="text-base leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}