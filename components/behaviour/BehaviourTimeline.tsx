"use client";

import { BehaviourRecord } from "@/services/api";
import { CheckCircle2, AlertTriangle, Info, Calendar } from "lucide-react";

interface BehaviourTimelineProps {
  records: BehaviourRecord[];
}

export function BehaviourTimeline({ records }: BehaviourTimelineProps) {
  if (!records || records.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center mt-6">
        <p className="text-slate-500">No behaviour records found.</p>
      </div>
    );
  }

  // Define icon mapping based on basic string matching
  const getIcon = (behaviourStr: string) => {
    const lower = behaviourStr.toLowerCase();
    if (lower.includes("excellent") || lower.includes("good") || lower.includes("positive") || lower.includes("achievement")) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
    if (lower.includes("warning") || lower.includes("issue") || lower.includes("negative") || lower.includes("disruptive")) {
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
    return <Info className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
      <div className="relative space-y-8">
        {records.map((record, idx) => (
          <div key={record.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-white dark:bg-slate-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {getIcon(record.behaviour)}
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-primary-500 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <time>{new Date(record.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</time>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">
                {record.behaviour}
              </h3>
              {record.notes && (
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {record.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
