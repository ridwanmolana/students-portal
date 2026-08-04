import { useQuery } from "@tanstack/react-query";
import { fetchReminders, RemindersPageData } from "@/services/api";

export function useRemindersData(page: number) {
  return useQuery<RemindersPageData, Error>({
    queryKey: ["reminders", page],
    queryFn: () => fetchReminders(page),
    staleTime: 5 * 60 * 1000,
  });
}
