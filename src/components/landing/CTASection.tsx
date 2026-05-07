"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="group relative mx-auto max-w-7xl">
        <div className="absolute inset-0 overflow-hidden rounded-[48px] bg-slate-950">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 bg-magenta-500/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 bg-magenta-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10 space-y-10 px-6 py-20 text-center md:px-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl">
              Find out where your AI budget is{" "}
              <span className="text-magenta-400">leaking.</span>
            </h2>

            <p className="text-xl font-medium text-slate-400">
              Join the audit and reclaim your runaway costs today.{" "}
              <br className="hidden md:block" />
              No credit card required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 font-display text-lg font-bold text-slate-950 shadow-2xl shadow-white/10 sm:w-auto"
            >
              Start Free Audit
              <ArrowRight size={20} />
            </motion.button>

            <button className="w-full rounded-2xl border border-white/10 bg-slate-800/50 px-10 py-5 font-bold text-white transition-all hover:bg-slate-800 sm:w-auto">
              Talk to Sales
            </button>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 opacity-30 grayscale md:gap-10">
            <div className="font-display text-xl font-black text-white md:text-2xl">
              Y COMBINATOR
            </div>
            <div className="font-display text-xl font-black text-white md:text-2xl">
              A16Z
            </div>
            <div className="font-display text-xl font-black text-white md:text-2xl">
              SEQUOIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}