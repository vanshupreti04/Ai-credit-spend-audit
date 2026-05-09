"use client";

import { FormEvent, useState } from "react";
import {
  Building2,
  Loader2,
  LockKeyhole,
  Mail,
  Send,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type LeadData = {
  email: string;
  companyName: string;
  role: string;
  teamSize: string;
};

type Props = {
  isOpen: boolean;
  actionType: "download" | "send" | "contact" | null;
  isSubmitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (data: LeadData) => Promise<void>;
};

const actionCopy = {
  download: {
    title: "Download your audit report",
    description:
      "Enter your email to save this audit and download the PDF report.",
    button: "Save & Download Report",
  },
  send: {
    title: "Send this audit report",
    description:
      "Enter your email so we can attach this report to your saved audit.",
    button: "Save & Send Report",
  },
  contact: {
    title: "Talk to Credex",
    description:
      "Share your details so Credex can follow up about your savings opportunity.",
    button: "Save & Contact Credex",
  },
};

export default function LeadCaptureModal({
  isOpen,
  actionType,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");

  if (!isOpen || !actionType) return null;

  const copy = actionCopy[actionType];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      email,
      companyName,
      role,
      teamSize,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-magenta-100 bg-white shadow-2xl shadow-magenta-950/20">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-magenta-200/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-100 blur-3xl" />

        <div className="relative z-10 p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-magenta-100">
                {actionType === "download" ? (
                  <Mail className="h-6 w-6" />
                ) : actionType === "send" ? (
                  <Send className="h-6 w-6" />
                ) : (
                  <UserRound className="h-6 w-6" />
                )}
              </div>

              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">
                {copy.title}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                {copy.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-50 p-3 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<Mail className="h-4 w-4" />}
              label="Work Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              required
              onChange={setEmail}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                icon={<Building2 className="h-4 w-4" />}
                label="Company Name"
                placeholder="NovaStack AI"
                value={companyName}
                onChange={setCompanyName}
              />

              <InputField
                icon={<UserRound className="h-4 w-4" />}
                label="Role"
                placeholder="Founder / CTO / Finance"
                value={role}
                onChange={setRole}
              />
            </div>

            <InputField
              icon={<UsersRound className="h-4 w-4" />}
              label="Team Size"
              type="number"
              placeholder="22"
              value={teamSize}
              onChange={setTeamSize}
            />

            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving report...
                </>
              ) : (
                <>
                  {copy.button}
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="flex items-start gap-2 rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-magenta-500" />
              We store your report so you can download, send, or share it later.
              No password or account required.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </span>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition-within focus-within:border-magenta-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-magenta-100">
        <span className="text-slate-400">{icon}</span>

        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}