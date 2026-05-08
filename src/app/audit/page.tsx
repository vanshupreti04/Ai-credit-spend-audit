"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AuditHeader from "@/components/audit/AuditHeader";
import AuditInputForm from "@/components/audit/AuditInputForm";
import GenerateAuditCard from "@/components/audit/GenerateAuditCard";

import {
  AITool,
  WorkflowType,
  createDefaultTool,
} from "@/data/audit-options";

import { generateAuditResult } from "@/lib/audit-engine";

export default function AuditPage() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState("10");
  const [workflow, setWorkflow] = useState<WorkflowType>("Engineering");
  const [monthlyBudget, setMonthlyBudget] = useState(500);
  const [growth, setGrowth] = useState("Stable");
  const [concern, setConcern] = useState("");
  const [tools, setTools] = useState<AITool[]>([createDefaultTool()]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("credex-audit-form");

    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      setTeamName(data.teamName ?? "");
      setTeamSize(data.teamSize ?? "10");
      setWorkflow(data.workflow ?? "Engineering");
      setMonthlyBudget(data.monthlyBudget ?? 500);
      setGrowth(data.growth ?? "Stable");
      setConcern(data.concern ?? "");
      setTools(data.tools?.length ? data.tools : [createDefaultTool()]);
    } catch {
      localStorage.removeItem("credex-audit-form");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "credex-audit-form",
      JSON.stringify({
        teamName,
        teamSize,
        workflow,
        monthlyBudget,
        growth,
        concern,
        tools,
      }),
    );
  }, [teamName, teamSize, workflow, monthlyBudget, growth, concern, tools]);

  const totals = useMemo(() => {
    const monthly = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
    const seats = tools.reduce((sum, tool) => sum + tool.seats, 0);

    return {
      monthly,
      seats,
      potentialSavings: Math.round(monthly * 0.25),
    };
  }, [tools]);

  const updateTool = (id: string, updates: Partial<AITool>) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, ...updates } : tool,
      ),
    );
  };

  const addTool = () => {
    setTools((prev) => [...prev, createDefaultTool()]);
  };

  const removeTool = (id: string) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    const auditInput = {
      teamName,
      teamSize: Number(teamSize) || 1,
      workflow,
      monthlyBudget,
      growth,
      concern,
      tools,
    };

    const auditResult = generateAuditResult(auditInput);

    localStorage.setItem("credex-audit-input", JSON.stringify(auditInput));
    localStorage.setItem("credex-audit-result", JSON.stringify(auditResult));

    setTimeout(() => {
      setIsGenerating(false);
      router.push("/results");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(circle,#f5d0fe_1px,transparent_1px)] bg-[size:32px_32px] text-slate-950">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <AuditHeader
          toolsCount={tools.length}
          monthly={totals.monthly}
          seats={totals.seats}
          savings={totals.potentialSavings}
        />

        <AuditInputForm
          teamName={teamName}
          setTeamName={setTeamName}
          teamSize={teamSize}
          setTeamSize={setTeamSize}
          workflow={workflow}
          setWorkflow={setWorkflow}
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}
          growth={growth}
          setGrowth={setGrowth}
          concern={concern}
          setConcern={setConcern}
          tools={tools}
          addTool={addTool}
          removeTool={removeTool}
          updateTool={updateTool}
        />

        <div className="mt-8">
          <GenerateAuditCard
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        </div>
      </main>
    </div>
  );
}