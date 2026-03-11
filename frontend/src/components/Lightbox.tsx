'use client';

import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  images: { url: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="lightbox-overlay"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all cursor-pointer ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all cursor-pointer ${
                currentIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full flex items-center justify-center p-4 sm:p-20"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImage && (
            <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
              <Image
                src={currentImage.url}
                alt={currentImage.alt || 'Project image'}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to this index
                  if (index > currentIndex) {
                    for (let i = 0; i < index - currentIndex; i++) onNext();
                  } else if (index < currentIndex) {
                    for (let i = 0; i < currentIndex - index; i++) onPrevious();
                  }
                }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'ring-2 ring-purple-500 scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
