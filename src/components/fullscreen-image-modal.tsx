"use client";

import { AugleLoader } from "@/components/augle-loader";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the full-res image so it's cached before the user clicks
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full cursor-pointer block -mx-2 sm:-mx-4"
        type="button"
      >
        <Image
          src={src}
          alt={alt}
          width={width ?? 1920}
          height={height ?? 1080}
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
            {!imageLoaded ? (
              <div className="flex items-center justify-center w-[60vw] h-[60vh]">
                <AugleLoader size={100} />
              </div>
            ) : (
              <div className="relative max-w-[90vw] max-h-[90vh]">
                <Image
                  src={src}
                  alt={alt}
                  width={width || 9600}
                  height={height || 5400}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-none"
                  style={{ borderRadius: 0, border: "none" }}
                />
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
