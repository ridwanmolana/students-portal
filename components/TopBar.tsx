"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, User } from "lucide-react";
import Image from "next/image";
import { useDashboardData } from "@/hooks/useDashboardData";

import { GlobalSearchBar } from "./layout/GlobalSearchBar";

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasReadNotifications, setHasReadNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = useDashboardData();

  // Determine if there are notifications
  const hasReminders = data?.todaysReminders && data.todaysReminders.length > 0;
  const hasAnnouncements = data?.announcements && data.announcements.length > 0;
  const hasNotifications = hasReminders || hasAnnouncements;

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass px-4 py-3 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex md:hidden items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          <h1 className="text-lg font-bold text-primary-700 dark:text-primary-400">Class 8A Hub</h1>
        </div>
        <div className="flex-1 max-w-md hidden md:block">
          <GlobalSearchBar />
        </div>
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasReadNotifications(true);
            }}
            className={`p-2 transition-colors relative rounded-full ${showNotifications ? "bg-slate-100 dark:bg-slate-800 text-primary-600" : "text-slate-500 hover:text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && !hasReadNotifications && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            )}
          </button>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Notifications</h3>
              </div>
              <div className="p-4">
                {hasNotifications ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Please check, you have new reminders or announcements!
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {hasAnnouncements && (
                        <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md font-medium">
                          Announcements
                        </span>
                      )}
                      {hasReminders && (
                        <span className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-md font-medium">
                          Reminders
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No new notifications
                  </p>
                )}
              </div>
            </div>
          )}

          <button className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 overflow-hidden hover:opacity-80 transition-opacity ml-1">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
