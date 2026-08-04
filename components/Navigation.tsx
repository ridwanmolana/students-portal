"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, CalendarClock, BookOpen, Image as ImageIcon, ShieldAlert, CalendarRange, MoreHorizontal } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Reminder", href: "/reminder", icon: CalendarClock },
  { name: "Topic", href: "/topic", icon: BookOpen },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Behaviour", href: "/behaviour", icon: ShieldAlert },
  { name: "Schedule", href: "/schedule", icon: CalendarRange },
  { name: "Others", href: "/others", icon: MoreHorizontal },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-40">
        <div className="p-6 flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          <h1 className="text-xl font-bold text-primary-700 dark:text-primary-400">Class 8A Hub</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== "/";
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-600 dark:text-primary-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass z-50 border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== "/";
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-[64px] ${
                  isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <div className={`p-1.5 rounded-full mb-1 transition-colors ${isActive ? "bg-primary-50 dark:bg-primary-900/50" : ""}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
