"use client";

import { useState } from "react";
import { useScheduleData } from "@/hooks/useScheduleData";
import { PdfCard } from "@/components/ui/PdfCard";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";
import { Skeleton } from "@/components/ui/Skeleton";
import { CalendarDays } from "lucide-react";
import { PdfDocument } from "@/services/api";

export default function SchedulePage() {
  const { data: pdfs, isLoading, isError } = useScheduleData();
  const [previewPdf, setPreviewPdf] = useState<PdfDocument | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Schedule</h1>
          <p className="text-slate-500 text-sm">Class timetables and academic calendars</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load schedules.</p>
          <p className="text-slate-500 text-sm mt-2">Check your Google Drive API connection and folder ID.</p>
        </div>
      ) : pdfs && pdfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfs.map(pdf => (
            <PdfCard key={pdf.id} pdf={pdf} onPreview={setPreviewPdf} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center glass rounded-2xl mt-6">
          <p className="text-slate-500">No schedule documents available yet.</p>
        </div>
      )}

      {/* PDF Preview Modal */}
      <PdfPreviewModal pdf={previewPdf} onClose={() => setPreviewPdf(null)} />
    </div>
  );
}
