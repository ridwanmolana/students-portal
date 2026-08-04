import Link from "next/link";
import { Folder } from "lucide-react";
import { GalleryFolder } from "@/services/api";

export function FolderCard({ folder }: { folder: GalleryFolder }) {
  return (
    <Link href={`/gallery/${folder.id}`}>
      <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center aspect-square text-center">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mb-4">
          <Folder className="w-8 h-8 text-primary-500 dark:text-primary-400" />
        </div>
        <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2">{folder.name}</h3>
        {folder.modifiedTime && (
          <p className="text-xs text-slate-500 mt-2">
            {new Date(folder.modifiedTime).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  );
}
