"use client";

import { PartyPopper } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";

export function BirthdayCard() {
  const { data, isLoading, isError } = useDashboardData();
  
  if (isLoading || isError || !data?.birthdayStudent) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg shadow-purple-500/20 transform hover:scale-[1.02] transition-transform duration-300">
      {/* Decorative background elements */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute right-10 bottom-2 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
      
      <div className="relative flex items-center justify-between z-10">
        <div>
          <h3 className="font-semibold text-white/90 text-sm mb-1 uppercase tracking-wider">Birthday Alert</h3>
          <p className="text-xl font-bold">Happy Birthday, {data.birthdayStudent}! 🎂</p>
          <p className="text-purple-100 text-sm mt-1">Wishing you a fantastic day ahead.</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0">
          <PartyPopper className="w-6 h-6 text-white animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </div>
  );
}
