"use client";

import { X } from "lucide-react";
import { PdfDocument } from "@/services/api";

interface PdfPreviewModalProps {
  pdf: PdfDocument | null;
  onClose: () => void;
}

export function PdfPreviewModal({ pdf, onClose }: PdfPreviewModalProps) {
  if (!pdf) return null;

  // Google Drive provides a preview link based on the file ID.
  const previewUrl = `https://drive.google.com/file/d/${pdf.id}/preview`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 md:p-8">
      <div className="flex items-center justify-between text-white mb-4">
        <h3 className="font-semibold text-lg line-clamp-1 flex-1 pr-4">{pdf.name}</h3>
        <button 
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
        <iframe 
          src={previewUrl} 
          className="w-full h-full border-0"
          allow="autoplay"
          title={`Preview of ${pdf.name}`}
        ></iframe>
      </div>
    </div>
  );
}
