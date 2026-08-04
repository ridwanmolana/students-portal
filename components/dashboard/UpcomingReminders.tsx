"use client";

import { Calendar } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/Skeleton";

export function UpcomingReminders() {
  const { data, isLoading, isError } = useDashboardData();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Upcoming</h2>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="p-4 text-center">
            <p className="text-red-500 text-sm">Failed to load upcoming reminders.</p>
          </div>
        ) : data?.upcomingReminders && data.upcomingReminders.length > 0 ? (
          data.upcomingReminders.map((item, index) => (
            <div 
              key={item.id} 
              className={`p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                index !== data.upcomingReminders.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.date}</p>
                </div>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${
                item.tag === 'Important' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 
                item.tag === 'Event' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 
                'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
              }`}>
                {item.tag || "Activity"}
              </span>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-slate-500 text-sm">No upcoming reminders!</p>
          </div>
        )}
      </div>
    </section>
  );
}
