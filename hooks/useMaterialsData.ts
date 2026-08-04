import { useQuery } from "@tanstack/react-query";
import { fetchMaterials, PdfDocument } from "@/services/api";

export function useMaterialsData() {
  return useQuery<PdfDocument[], Error>({
    queryKey: ["materialsPdfs"],
    queryFn: fetchMaterials,
    staleTime: 10 * 60 * 1000,
  });
}
