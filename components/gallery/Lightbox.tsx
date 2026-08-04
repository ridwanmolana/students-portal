"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { GalleryImage } from "@/services/api";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!currentImage) return null;

  // Use the full resolution thumbnail or webContentLink if thumbnailLink isn't enough
  // `thumbnailLink` can usually be customized by replacing `=s...` parameter
  const highResUrl = currentImage.thumbnailLink ? currentImage.thumbnailLink.replace(/=s\d+/, '=s2048') : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 text-white z-10">
        <div className="text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex items-center gap-4">
          {currentImage.webContentLink && (
            <a 
              href={currentImage.webContentLink} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8">
        <button 
          onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
          className={`absolute left-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all z-10 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {highResUrl && (
            <Image
              src={highResUrl}
              alt={currentImage.name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
        </div>

        <button 
          onClick={() => currentIndex < images.length - 1 && onNavigate(currentIndex + 1)}
          className={`absolute right-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all z-10 ${currentIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
