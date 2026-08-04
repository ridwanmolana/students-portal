import { Filter } from "lucide-react";

interface TopicFilterProps {
  availableMonths: string[];
  availableWeeks: string[];
  selectedMonth: string;
  selectedWeek: string;
  onMonthChange: (month: string) => void;
  onWeekChange: (week: string) => void;
}

export function TopicFilter({ 
  availableMonths, 
  availableWeeks, 
  selectedMonth, 
  selectedWeek, 
  onMonthChange, 
  onWeekChange 
}: TopicFilterProps) {
  return (
    <div className="glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center gap-2 text-slate-500 mb-2 sm:mb-0">
        <Filter className="w-5 h-5" />
        <span className="font-medium text-sm">Filters:</span>
      </div>
      
      <div className="flex flex-1 gap-4">
        <select 
          value={selectedMonth} 
          onChange={(e) => onMonthChange(e.target.value)}
          className="flex-1 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 outline-none transition-colors"
        >
          <option value="All">All Months</option>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <select 
          value={selectedWeek} 
          onChange={(e) => onWeekChange(e.target.value)}
          className="flex-1 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 outline-none transition-colors"
        >
          <option value="All">All Weeks</option>
          {availableWeeks.map(week => (
            <option key={week} value={week}>{week}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
