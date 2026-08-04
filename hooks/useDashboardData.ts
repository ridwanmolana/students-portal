import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData, DashboardData } from "@/services/api";

export function useDashboardData() {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes (Google Sheet cache from PRD)
    retry: 2,
  });
}
