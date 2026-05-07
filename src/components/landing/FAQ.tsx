"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const faqs = [
  {
    question: "Is my data private?",
    answer:
      "Yes. Public reports remove identifying details like email and company name. The audit only shows tool names, plans, spend ranges, recommendations, and savings.",
  },
  {
    question: "Does this require a login?",
    answer:
      "No login is required. Users can run the audit first, see value instantly, and only then choose to submit their email to receive or save the report.",
  },
  {
    question: "How accurate are the recommendations?",
    answer:
      "Recommendations are based on current vendor pricing, team size, seat count, use case, and plan-fit rules. Every pricing number is traced back to official vendor pricing pages.",
  },
  {
    question: "Which AI tools are supported?",
    answer:
      "The MVP supports Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, and one additional AI tool such as Windsurf or v0.",
  },
  {
    question: "Can agencies use this?",
    answer:
      "Yes. Agencies can use the audit to quickly identify unnecessary AI spend across client teams and generate a clean shareable report.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50/30 py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">
            Common questions.
          </h2>

          <p className="font-medium text-slate-500">
            Everything you need to know before running your AI spend audit.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={cn(
                "group rounded-2xl border transition-all duration-300",
                openIndex === index
                  ? "border-magenta-100 bg-white"
                  : "border-slate-100 bg-transparent hover:border-slate-200",
              )}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-6 p-6 text-left"
              >
                <span className="font-bold text-slate-900">{faq.question}</span>

                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-slate-400 transition-transform duration-300",
                    openIndex === index && "rotate-180 text-magenta-500",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 font-medium leading-relaxed text-slate-500">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}