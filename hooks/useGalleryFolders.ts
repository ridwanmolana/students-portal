import { useQuery } from "@tanstack/react-query";
import { fetchGalleryFolders, GalleryFolder } from "@/services/api";

export function useGalleryFolders() {
  return useQuery<GalleryFolder[], Error>({
    queryKey: ["galleryFolders"],
    queryFn: fetchGalleryFolders,
    staleTime: 10 * 60 * 1000, // 10 minutes cache as per PRD
  });
}
