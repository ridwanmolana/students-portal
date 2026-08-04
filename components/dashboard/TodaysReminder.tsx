"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/Skeleton";

export function TodaysReminder() {
  const { data, isLoading, isError } = useDashboardData();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setCompletedIds(prev => [...prev, id]);
  };

  const visibleReminders = data?.todaysReminders?.filter(r => !completedIds.includes(r.id)) || [];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Today's Reminders</h2>
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : isError ? (
          <div className="p-4 text-center glass rounded-xl border-red-500/30">
            <p className="text-red-500 text-sm">Failed to load reminders. Please check your connection.</p>
          </div>
        ) : visibleReminders.length > 0 ? (
          visibleReminders.map((reminder) => (
            <div key={reminder.id} className="flex items-start gap-4 p-4 rounded-xl glass border-l-4 border-l-primary-500 hover:shadow-md transition-shadow">
              <div className="mt-1">
                <CheckCircle2 
                  onClick={() => handleCheck(reminder.id)}
                  className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-green-500 transition-colors cursor-pointer" 
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">{reminder.title}</p>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{reminder.time || "All day"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center glass rounded-xl">
            <p className="text-slate-500">No reminders for today!</p>
          </div>
        )}
      </div>
    </section>
  );
}
