"use client";

import { useState } from "react";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import { PdfCard } from "@/components/ui/PdfCard";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Library, Search } from "lucide-react";
import { PdfDocument } from "@/services/api";

export default function MaterialsPage() {
  const { data: pdfs, isLoading, isError } = useMaterialsData();
  const [previewPdf, setPreviewPdf] = useState<PdfDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPdfs = pdfs?.filter(pdf => 
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Materials</h1>
            <p className="text-slate-500 text-sm">Learning resources and documents</p>
          </div>
        </div>
        
        {/* Local Search */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load materials.</p>
          <p className="text-slate-500 text-sm mt-2">Check your Google Drive API connection and folder ID.</p>
        </div>
      ) : filteredPdfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPdfs.map(pdf => (
            <PdfCard key={pdf.id} pdf={pdf} onPreview={setPreviewPdf} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center glass rounded-2xl mt-6">
          <p className="text-slate-500">
            {searchQuery ? "No materials found matching your search." : "No materials available yet."}
          </p>
        </div>
      )}

      {/* PDF Preview Modal */}
      <PdfPreviewModal pdf={previewPdf} onClose={() => setPreviewPdf(null)} />
    </div>
  );
}
