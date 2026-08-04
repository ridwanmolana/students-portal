import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "@/services/api";

export function useGalleryImages(folderId: string) {
  return useInfiniteQuery({
    queryKey: ["galleryImages", folderId],
    queryFn: ({ pageParam }) => fetchGalleryImages(folderId, pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: undefined as string | undefined,
    staleTime: 10 * 60 * 1000, // 10 mins cache
  });
}
