import { Topic } from "@/services/api";
import { BookOpen, Target, CheckSquare } from "lucide-react";

interface TopicListProps {
  topics: Topic[];
}

export function TopicList({ topics }: TopicListProps) {
  if (topics.length === 0) {
    return (
      <div className="p-8 text-center glass rounded-2xl mt-6">
        <p className="text-slate-500">No topics found for the selected period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {topics.map((topic) => (
        <div key={topic.id} className="glass rounded-2xl p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
                {topic.subject}
              </span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-2">{topic.topic}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{topic.month}</p>
              <p className="text-xs text-slate-500">{topic.week}</p>
            </div>
          </div>

          <div className="space-y-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
            {topic.activities && (
              <div className="flex items-start gap-3 text-sm">
                <Target className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Activities:</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{topic.activities}</p>
                </div>
              </div>
            )}
            
            {topic.task && (
              <div className="flex items-start gap-3 text-sm">
                <CheckSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Task:</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">{topic.task}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
