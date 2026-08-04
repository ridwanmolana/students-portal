"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { Search, Loader2, FileText, CalendarDays, BookOpen, ImageIcon, Activity } from "lucide-react";
import Image from "next/image";

export function GlobalSearchBar() {
  const { query, setQuery, results, isLoading } = useGlobalSearch(300);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "Reminder": return <Activity className="w-4 h-4 text-rose-500" />;
      case "Topic": return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "Schedule": return <CalendarDays className="w-4 h-4 text-purple-500" />;
      case "Materials": return <FileText className="w-4 h-4 text-amber-500" />;
      case "Gallery": return <ImageIcon className="w-4 h-4 text-emerald-500" />;
      default: return <Search className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
          placeholder="Search reminders, topics, gallery..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length === 0 && !isLoading ? (
            <div className="p-4 text-center text-sm text-slate-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="flex flex-col">
              {results.map((result) => (
                <Link 
                  href={result.url} 
                  key={result.id}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  {result.thumbnail ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image 
                        src={result.thumbnail} 
                        alt={result.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      {getIcon(result.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                      {result.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {result.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
