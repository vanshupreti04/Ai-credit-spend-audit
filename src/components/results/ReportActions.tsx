"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { generateAuditPdf } from "@/lib/pdf-report";
import LeadCaptureModal from "./LeadCaptureModal";

type ActionType = "download" | "send" | "contact";

type LeadData = {
  email: string;
  companyName: string;
  role: string;
  teamSize: string;
};

type Props = {
  credexFit: boolean;
  annualSavings: number;
  result: any;
  aiReport: any;
  auditInput: any;
};

export default function ReportActions({
  credexFit,
  annualSavings,
  result,
  aiReport,
  auditInput,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const openLeadModal = (action: ActionType) => {
    setPendingAction(action);
    setModalError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleLeadSubmit = async (leadData: LeadData) => {
    try {
      setIsSubmitting(true);
      setModalError("");
      setSuccessMessage("");

      const saveResponse = await fetch("/api/save-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: leadData.email,
          companyName: leadData.companyName,
          role: leadData.role,
          teamSize: leadData.teamSize,
          actionType: pendingAction,
          auditInput,
          auditResult: result,
          aiReport,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(saveData?.error || "Failed to save report");
      }

      const reportUrl = saveData?.reportUrl;

      if (!reportUrl) {
        throw new Error("Report saved, but no public report link was returned");
      }

      setIsModalOpen(false);

      if (pendingAction === "download") {
        generateAuditPdf({
          result,
          aiReport,
          auditInput,
        });

        setSuccessMessage("Report saved and PDF downloaded successfully.");
      }

      if (pendingAction === "send") {
        const emailResponse = await fetch("/api/send-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: leadData.email,
            reportUrl,
            monthlySavings: result.estimatedMonthlySavings,
            annualSavings: result.estimatedYearlySavings,
          }),
        });

        const emailData = await emailResponse.json();

        if (!emailResponse.ok) {
          throw new Error(emailData?.error || "Failed to send report email");
        }

        setSuccessMessage("Report saved and emailed successfully.");
      }

      if (pendingAction === "contact") {
        setSuccessMessage(
          "Thanks! Your audit was saved and Credex can follow up about this savings opportunity.",
        );
      }

      console.log("Saved report URL:", reportUrl);
    } catch (error) {
      setModalError(
        error instanceof Error ? error.message : "Failed to process request",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="rounded-[36px] border border-magenta-100 bg-slate-950 p-8 text-white shadow-2xl shadow-magenta-100/40">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-magenta-400">
              Next step
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold">
              Turn this audit into a shareable savings report.
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
              Your estimated annual optimization opportunity is{" "}
              <span className="font-bold text-white">${annualSavings}</span>.
              {credexFit
                ? " This stack is a strong fit for deeper Credex-assisted optimization."
                : " This stack looks manageable, but recurring review is still recommended."}
            </p>

            {successMessage && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm font-semibold text-emerald-300">
                {successMessage}
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openLeadModal("download")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-slate-950 transition hover:-translate-y-1"
            >
              <Download className="h-5 w-5" />
              Download Report
            </button>

            <button
              type="button"
              onClick={() => openLeadModal("send")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-slate-700"
            >
              <Mail className="h-5 w-5" />
              Send Report
            </button>

            <button
              type="button"
              onClick={() => openLeadModal("contact")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-magenta-500 px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-magenta-600 sm:col-span-2"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Credex
            </button>

            <Link
              href="/audit"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/10 sm:col-span-2"
            >
              <RotateCcw className="h-5 w-5" />
              Run New Audit
            </Link>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isModalOpen}
        actionType={pendingAction}
        isSubmitting={isSubmitting}
        error={modalError}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleLeadSubmit}
      />
    </>
  );
}