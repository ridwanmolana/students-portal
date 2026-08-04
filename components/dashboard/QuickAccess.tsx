import Link from "next/link";
import { CalendarClock, BookOpen, Image as ImageIcon, CalendarRange } from "lucide-react";

const quickLinks = [
  { name: "Reminders", href: "/reminder", icon: CalendarClock, color: "bg-blue-500", shadow: "shadow-blue-500/30" },
  { name: "Topics", href: "/topic", icon: BookOpen, color: "bg-emerald-500", shadow: "shadow-emerald-500/30" },
  { name: "Gallery", href: "/gallery", icon: ImageIcon, color: "bg-purple-500", shadow: "shadow-purple-500/30" },
  { name: "Schedule", href: "/schedule", icon: CalendarRange, color: "bg-amber-500", shadow: "shadow-amber-500/30" },
];

export function QuickAccess() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Quick Access</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center p-4 rounded-2xl glass hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className={`p-4 rounded-full text-white mb-3 shadow-lg ${link.color} ${link.shadow}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
