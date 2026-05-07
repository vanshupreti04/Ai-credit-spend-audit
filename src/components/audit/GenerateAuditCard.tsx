"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  isGenerating: boolean;
  onGenerate: () => void;
};

export default function GenerateAuditCard({
  isGenerating,
  onGenerate,
}: Props) {
  return (
    <div className="rounded-[36px] border border-magenta-100 bg-white p-8 text-center shadow-2xl shadow-magenta-100/40">
      <h2 className="font-display text-3xl font-bold text-slate-950">
        Ready to generate your audit?
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        We’ll calculate plan-fit issues, seat waste, possible downgrades, and
        estimated monthly + annual savings.
      </p>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating}
        className="group relative mx-auto mt-8 flex items-center gap-3 overflow-hidden rounded-3xl bg-black px-10 py-5 font-display text-lg font-bold text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-magenta-600 to-magenta-400 opacity-0 transition-opacity group-hover:opacity-100" />

        <span className="relative z-10 flex items-center gap-3">
          {isGenerating ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating Audit...
            </>
          ) : (
            <>
              Generate AI Spend Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </span>
      </motion.button>

      <p className="mt-4 text-sm font-medium text-slate-400">
        Results generated instantly • No account required
      </p>
    </div>
  );
}