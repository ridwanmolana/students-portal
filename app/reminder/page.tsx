"use client";

import { useState } from "react";
import { useRemindersData } from "@/hooks/useRemindersData";
import { ReminderList } from "@/components/reminders/ReminderList";
import { ReminderPagination } from "@/components/reminders/ReminderPagination";
import { Skeleton } from "@/components/ui/Skeleton";
import { CalendarClock } from "lucide-react";

export default function ReminderPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRemindersData(page);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
          <CalendarClock className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Reminders</h1>
          <p className="text-slate-500 text-sm">Stay on top of upcoming tasks</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load reminders.</p>
          <p className="text-slate-500 text-sm mt-2">Ensure your Google API credentials are correct.</p>
        </div>
      ) : (
        <>
          <ReminderList groupedReminders={data?.groupedReminders || []} />
          <ReminderPagination 
            page={page} 
            totalPages={data?.totalPages || 1} 
            onPageChange={setPage} 
          />
        </>
      )}
    </div>
  );
}
