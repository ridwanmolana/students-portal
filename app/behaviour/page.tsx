"use client";

import { useBehaviourAuth } from "@/hooks/useBehaviourAuth";
import { useBehaviourData } from "@/hooks/useBehaviourData";
import { PinEntry } from "@/components/behaviour/PinEntry";
import { BehaviourTimeline } from "@/components/behaviour/BehaviourTimeline";
import { Skeleton } from "@/components/ui/Skeleton";
import { Activity, LogOut } from "lucide-react";

export default function BehaviourPage() {
  const { student, isLoading: isAuthLoading, login, logout } = useBehaviourAuth();
  
  // We only fetch data if we have an authenticated studentId
  const { 
    data: behaviourRecords, 
    isLoading: isDataLoading, 
    isError 
  } = useBehaviourData(student?.studentId);

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-32 h-4" />
      </div>
    );
  }

  // If no student is authenticated, show PIN entry
  if (!student) {
    return <PinEntry onLogin={login} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {student.name}'s Records
            </h1>
            <p className="text-slate-500 text-sm">Behaviour timeline and teacher notes</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl font-medium transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {isDataLoading ? (
        <div className="space-y-6 mt-8">
          <Skeleton className="w-full h-32 rounded-2xl md:w-1/2" />
          <Skeleton className="w-full h-32 rounded-2xl md:w-1/2 md:ml-auto" />
          <Skeleton className="w-full h-32 rounded-2xl md:w-1/2" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load timeline.</p>
          <p className="text-slate-500 text-sm mt-2">There was an error communicating with the server.</p>
        </div>
      ) : (
        <BehaviourTimeline records={behaviourRecords || []} />
      )}
    </div>
  );
}
