import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReminderPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function ReminderPagination({ page, totalPages, onPageChange }: ReminderPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6 glass px-4 py-3 rounded-xl">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition-colors flex items-center text-slate-600 dark:text-slate-400"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">Prev</span>
      </button>
      
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Page {page} of {Math.max(1, totalPages)}
      </span>
      
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition-colors flex items-center text-slate-600 dark:text-slate-400"
      >
        <span className="text-sm font-medium">Next</span>
        <ChevronRight className="w-5 h-5 ml-1" />
      </button>
    </div>
  );
}
