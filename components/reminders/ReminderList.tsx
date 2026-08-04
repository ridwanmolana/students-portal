"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { GroupedReminder } from "@/services/api";

export function ReminderList({ groupedReminders }: { groupedReminders: GroupedReminder[] }) {
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setCompletedIds(prev => [...prev, id]);
  };

  if (groupedReminders.length === 0) {
    return (
      <div className="p-8 text-center glass rounded-2xl">
        <p className="text-slate-500">No reminders for this period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedReminders.map((group, index) => {
        const visibleReminders = group.reminders.filter(r => !completedIds.includes(r.id));
        return (
          <div key={index} className="glass rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <span className="font-semibold text-primary-700 dark:text-primary-400">{group.day || "Day"}</span>
              <span className="text-xs text-slate-500 font-medium">{group.date}</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {visibleReminders.length > 0 ? (
                visibleReminders.map((reminder) => (
                  <div key={reminder.id} className="p-4 flex items-start gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <div className="mt-0.5">
                      <CheckCircle2 
                        onClick={() => handleCheck(reminder.id)}
                        className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-green-500 transition-colors cursor-pointer" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-700 dark:text-slate-300">{reminder.title}</p>
                      {reminder.details && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 whitespace-pre-wrap">{reminder.details}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-slate-400 text-sm italic">Nothing planned (or all completed!)</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
