"use client";

import { useGalleryFolders } from "@/hooks/useGalleryFolders";
import { FolderCard } from "@/components/gallery/FolderCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { data: folders, isLoading, isError } = useGalleryFolders();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl text-primary-600 dark:text-primary-400">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Gallery Albums</h1>
          <p className="text-slate-500 text-sm">View photos and events</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="aspect-square w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <div className="p-6 text-center glass rounded-2xl border-red-500/30">
          <p className="text-red-500 font-medium">Failed to load albums.</p>
          <p className="text-slate-500 text-sm mt-2">Check your Google Drive API connection and folder ID.</p>
        </div>
      ) : folders && folders.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center glass rounded-2xl mt-6">
          <p className="text-slate-500">No albums found in this folder.</p>
        </div>
      )}
    </div>
  );
}
