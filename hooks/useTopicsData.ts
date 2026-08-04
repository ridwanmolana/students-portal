import { useQuery } from "@tanstack/react-query";
import { fetchTopics, TopicsPageData } from "@/services/api";

export function useTopicsData(month?: string, week?: string) {
  return useQuery<TopicsPageData, Error>({
    queryKey: ["topics", month, week],
    queryFn: () => fetchTopics(month, week),
    staleTime: 5 * 60 * 1000,
  });
}
