"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder @ SynthOps",
    content:
      "Credex helped us identify duplicate Cursor and Claude subscriptions across teams. We reduced AI tooling costs within the first week.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rotate: -2,
  },
  {
    name: "Marcus Miller",
    role: "CTO @ CloudScale",
    content:
      "The benchmarking insight was incredibly useful. We discovered our AI spend-per-engineer was far above comparable startups.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    rotate: 1,
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Finance @ Veldt",
    content:
      "The audit reports are clean, fast, and easy to share internally. It feels purpose-built for modern AI-heavy teams.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    rotate: -1,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 space-y-4 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Trusted by the{" "}
            <span className="text-magenta-600">next generation</span> of AI
            startups.
          </h2>

          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500">
            Teams use Credex to eliminate AI waste, benchmark spending, and
            optimize operational efficiency.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                rotate: 0,
                y: -5,
              }}
              style={{
                rotate: `${testimonial.rotate}deg`,
              }}
              className="group flex flex-col justify-between rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-magenta-50 text-magenta-500">
                  <Quote size={20} fill="currentColor" />
                </div>

                <p className="font-medium leading-relaxed text-slate-700">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-magenta-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-slate-950">
                    {testimonial.name}
                  </h4>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}