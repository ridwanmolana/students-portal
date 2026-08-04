"use client";

import { Megaphone, ExternalLink } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

export function AnnouncementsCard() {
  const { data, isLoading, isError } = useDashboardData();

  const announcements = data?.announcements || [];

  if (!isLoading && !isError && announcements.length === 0) {
    return null; // Do not show anything if there are no announcements
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Announcements</h2>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-24 w-full rounded-xl" />
          </>
        ) : isError ? (
          <div className="p-4 text-center glass rounded-xl border-red-500/30">
            <p className="text-red-500 text-sm">Failed to load announcements.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 rounded-xl glass border-l-4 border-l-blue-500 hover:shadow-md transition-shadow flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Megaphone className="w-5 h-5" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{announcement.title}</h3>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {announcement.description}
              </p>
              
              {announcement.link && (
                <Link href={announcement.link} target="_blank" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1 w-fit">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Details
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
