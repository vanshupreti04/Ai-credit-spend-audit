import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 font-bold text-white">
                C
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Credex <span className="text-magenta-600">Audit</span>
              </span>
            </div>

            <p className="max-w-xs text-sm font-medium leading-relaxed text-slate-500">
              The intelligence layer for optimizing AI tool spending across
              modern startup teams and engineering organizations.
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-400 transition-all hover:border-magenta-100 hover:text-magenta-500">
                <FaXTwitter size={17} />
              </a>

              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-400 transition-all hover:border-slate-300 hover:text-slate-950">
                <FaGithub size={18} />
              </a>

              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-400 transition-all hover:border-blue-100 hover:text-blue-600">
                <FaLinkedinIn size={17} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950">Product</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#features" className="hover:text-magenta-600">Features</a></li>
              <li><a href="#benchmarks" className="hover:text-magenta-600">Benchmarks</a></li>
              <li><a href="#faq" className="hover:text-magenta-600">FAQ</a></li>
              <li><a href="#" className="hover:text-magenta-600">Share Reports</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950">Resources</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-magenta-600">Pricing Data</a></li>
              <li><a href="#" className="hover:text-magenta-600">Case Studies</a></li>
              <li><a href="#" className="hover:text-magenta-600">Audit Logic</a></li>
              <li><a href="#" className="hover:text-magenta-600">API Reference</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-magenta-600">About</a></li>
              <li><a href="#" className="hover:text-magenta-600">Careers</a></li>
              <li><a href="#" className="hover:text-magenta-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-magenta-600">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-50 pt-10 md:flex-row">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            © {currentYear} Credex Labs Inc. All rights reserved.
          </p>

          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}