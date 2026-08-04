"use client";

import { ExternalLink, Info } from "lucide-react";
import Link from "next/link";

export default function OthersPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Others
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Additional information and links.</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="https://sites.google.com/globalprestasi.sch.id/gpjhsinfo/non-academic-activities" 
          target="_blank"
          className="flex items-center gap-4 p-5 rounded-xl glass border-l-4 border-l-blue-500 hover:shadow-md transition-all group"
        >
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Info className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Info from SA</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Non-academic activities and updates</p>
          </div>
          <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
