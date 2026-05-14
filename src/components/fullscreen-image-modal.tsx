"use client";

import { AugleLoader } from "@/components/augle-loader";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useRef, useState } from "react";

export function FullscreenImageModal({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImageReady, setModalImageReady] = useState(false);
  const preloadRef = useRef<HTMLImageElement | null>(null);

  // Start preloading on hover — gives a head start before the click
  const handleMouseEnter = () => {
    if (preloadRef.current) return;
    const img = new window.Image();
    img.src = src;
    preloadRef.current = img;
  };

  const handleOpen = () => {
    setModalImageReady(false);
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        onMouseEnter={handleMouseEnter}
        className="w-full cursor-pointer block -mx-2 sm:-mx-4"
        type="button"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-none"
          style={{ borderRadius: 0, border: "none" }}
        />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/90 backdrop-blur-sm transition duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative max-w-full max-h-full transition duration-300 ease-out data-closed:opacity-0 data-closed:scale-95"
          >
            {!modalImageReady && (
              <div className="flex items-center justify-center w-[60vw] h-[60vh]">
                <AugleLoader size={100} />
              </div>
            )}

            {/* Always rendered so loading starts immediately on open */}
            <div
              className={`relative max-w-[90vw] max-h-[90vh] transition-opacity duration-300 ${
                modalImageReady ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-none"
                onLoad={() => setModalImageReady(true)}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
