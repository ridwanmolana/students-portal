"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChevronLeft } from "lucide-react";

export default function GalleryFolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const router = useRouter();
  // Unwrap the promise with React 19 `use` 
  const { folderId } = use(params);
  
  const { 
    data, 
    isLoading, 
    isError, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGalleryImages(folderId);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten the pages from infinite query into a single array
  const allImages = data?.pages.flatMap(page => page.images) || [];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 glass rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
          Album Photos
        </h1>
      </div>

      {isLoading ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load images.</p>
        </div>
      ) : allImages.length > 0 ? (
        <MasonryGrid 
          images={allImages}
          onImageClick={setLightboxIndex}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div className="p-8 text-center glass rounded-2xl">
          <p className="text-slate-500">No images found in this album.</p>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <Lightbox 
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
