"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Input({
  label,
  helper,
  ...props
}: {
  label: string;
  helper?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-950 transition-all placeholder:text-slate-400 focus:border-magenta-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-magenta-100"
      />

      {helper && <p className="ml-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

export function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative space-y-2">
      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-slate-950 transition-all hover:border-slate-300 focus:border-magenta-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-magenta-100"
      >
        <span>{value}</span>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-magenta-50 hover:text-magenta-700"
                >
                  {option}

                  {value === option && (
                    <Check className="h-4 w-4 text-magenta-500" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SectionCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/60 md:p-8"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-magenta-500">
          {number}
        </p>

        <h2 className="font-display text-2xl font-bold text-slate-950">
          {title}
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </motion.section>
  );
}