"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GalleryImage } from "@/services/api";

interface MasonryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function MasonryGrid({ images, onImageClick, fetchNextPage, hasNextPage, isFetchingNextPage }: MasonryGridProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
            onClick={() => onImageClick(index)}
          >
            <div 
              style={{ paddingBottom: `${(image.height / image.width) * 100}%` }} 
              className="w-full relative"
            >
              {image.thumbnailLink && (
                <Image
                  src={image.thumbnailLink.replace('=s220', '=s800')} // Request higher res thumbnail
                  alt={image.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
      
      {/* Invisible element for Intersection Observer */}
      <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
        {isFetchingNextPage && <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />}
      </div>
    </div>
  );
}
