"use client";

import { useState, useEffect } from "react";
import { useTopicsData } from "@/hooks/useTopicsData";
import { TopicList } from "@/components/topics/TopicList";
import { TopicFilter } from "@/components/topics/TopicFilter";
import { Skeleton } from "@/components/ui/Skeleton";
import { BookOpen } from "lucide-react";

export default function TopicPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedWeek, setSelectedWeek] = useState<string>("All");
  const [isInitialized, setIsInitialized] = useState(false);

  // We initially fetch without filters to get all available dropdown options
  const { data, isLoading, isError } = useTopicsData(
    selectedMonth === "All" ? undefined : selectedMonth,
    selectedWeek === "All" ? undefined : selectedWeek
  );

  // Set default to current month/week once data loads
  useEffect(() => {
    if (data && !isInitialized) {
      const currentMonthIndex = new Date().getMonth(); 
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const currentMonthStr = monthNames[currentMonthIndex];

      // If the current month exists in the spreadsheet, select it.
      if (data.availableMonths.includes(currentMonthStr)) {
        setSelectedMonth(currentMonthStr);
      } else if (data.availableMonths.length > 0) {
        // Fallback to the first available month if current month has no data
        setSelectedMonth(data.availableMonths[0]);
      }
      
      // Simple logic for current week (could be more complex, but we'll default to Week 1 or first available)
      if (data.availableWeeks.includes("Week 1")) {
        setSelectedWeek("Week 1");
      } else if (data.availableWeeks.length > 0) {
        setSelectedWeek(data.availableWeeks[0]);
      }
      
      setIsInitialized(true);
    }
  }, [data, isInitialized]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Learning Topics</h1>
          <p className="text-slate-500 text-sm">Track subjects and weekly activities</p>
        </div>
      </div>

      {isLoading && !isInitialized ? (
        <div className="space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load topics.</p>
          <p className="text-slate-500 text-sm mt-2">Ensure your Google API credentials are correct.</p>
        </div>
      ) : (
        <>
          <TopicFilter 
            availableMonths={data?.availableMonths || []}
            availableWeeks={data?.availableWeeks || []}
            selectedMonth={selectedMonth}
            selectedWeek={selectedWeek}
            onMonthChange={setSelectedMonth}
            onWeekChange={setSelectedWeek}
          />
          
          {isLoading ? (
             <div className="space-y-6 mt-6">
               <Skeleton className="h-32 w-full rounded-2xl" />
               <Skeleton className="h-32 w-full rounded-2xl" />
             </div>
          ) : (
             <TopicList topics={data?.topics || []} />
          )}
        </>
      )}
    </div>
  );
}
