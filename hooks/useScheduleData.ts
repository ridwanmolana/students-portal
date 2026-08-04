import { useQuery } from "@tanstack/react-query";
import { fetchSchedule, PdfDocument } from "@/services/api";

export function useScheduleData() {
  return useQuery<PdfDocument[], Error>({
    queryKey: ["schedulePdfs"],
    queryFn: fetchSchedule,
    staleTime: 10 * 60 * 1000, // 10 minutes cache as per PRD
  });
}
