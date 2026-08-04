"use client";

import { FileText, Download, Eye } from "lucide-react";
import { PdfDocument } from "@/services/api";

interface PdfCardProps {
  pdf: PdfDocument;
  onPreview: (pdf: PdfDocument) => void;
}

export function PdfCard({ pdf, onPreview }: PdfCardProps) {
  return (
    <div className="glass rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 shrink-0">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2" title={pdf.name}>
            {pdf.name.replace(".pdf", "")}
          </h3>
          <span className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">PDF Document</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => onPreview(pdf)}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:text-primary-400 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        {pdf.webContentLink && (
          <a 
            href={pdf.webContentLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        )}
      </div>
    </div>
  );
}
