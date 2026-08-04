import { useQuery } from "@tanstack/react-query";
import { fetchBehaviour, BehaviourRecord } from "@/services/api";

export function useBehaviourData(studentId: string | undefined) {
  return useQuery<BehaviourRecord[], Error>({
    queryKey: ["behaviour", studentId],
    queryFn: () => fetchBehaviour(studentId!),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
  });
}
