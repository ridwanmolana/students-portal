import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { TodaysReminder } from "@/components/dashboard/TodaysReminder";
import { UpcomingReminders } from "@/components/dashboard/UpcomingReminders";
import { BirthdayCard } from "@/components/dashboard/BirthdayCard";
import { AnnouncementsCard } from "@/components/dashboard/AnnouncementsCard";

export default function Home() {
  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Section */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
          {greeting}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here is the update for your child today.</p>
      </section>

      {/* Birthday Alert */}
      <BirthdayCard />

      {/* Quick Access */}
      <QuickAccess />

      {/* Announcements */}
      <AnnouncementsCard />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TodaysReminder />
        <UpcomingReminders />
      </div>

    </div>
  );
}
