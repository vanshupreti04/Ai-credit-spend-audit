"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import AuditReport from "@/components/landing/AuditReport";
import Benchmarks from "@/components/landing/Benchmarks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-magenta-100 selection:text-magenta-900">
      <Navbar />

      <main>
        <Hero />

        <section className="border-y border-slate-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale saturate-0 md:justify-between">
              <span className="font-display text-xl font-black tracking-tighter">OPENAI</span>
              <span className="font-display text-xl font-black tracking-tighter">ANTHROPIC</span>
              <span className="font-display text-xl font-black tracking-tighter">CURSOR</span>
              <span className="font-display text-xl font-black tracking-tighter">REPLICATE</span>
              <span className="font-display text-xl font-black tracking-tighter">PINECONE</span>
              <span className="font-display text-xl font-black tracking-tighter">PERPLEXITY</span>
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <AuditReport />
        <Benchmarks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>

      <Footer />

      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-magenta-500"
        style={{ scaleX }}
      />
    </div>
  );
}