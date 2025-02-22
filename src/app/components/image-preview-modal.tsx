"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImagePreviewModal({ src, alt, onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 rounded-full bg-background p-2 shadow-lg hover:bg-accent"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-xl"
        />
      </div>
    </div>
  );
} 