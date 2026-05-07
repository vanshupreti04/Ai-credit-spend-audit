"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Benchmarks",
    href: "#benchmarks",
  },
  {
    label: "Reports",
    href: "#reports",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-300",
        isScrolled
          ? "border-b border-magenta-100 bg-white/70 py-3 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-magenta-600 to-magenta-400 font-bold text-white shadow-lg shadow-magenta-200">
            C
          </div>

          <span className="font-display text-xl font-bold tracking-tight">
            Credex <span className="text-magenta-600">Audit</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-slate-600 transition-colors hover:text-magenta-600"
            >
              {item.label}

              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-magenta-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-magenta-600 sm:block">
            Docs
          </button>

          <Link href="/audit">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-colors hover:bg-slate-900"
            >
                Run Free Audit
                <ArrowRight size={16} />
            </motion.button>
            </Link>
        </div>
      </div>
    </nav>
  );
}