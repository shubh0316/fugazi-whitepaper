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
  const [modalImageReady, setModalImageReady] = useState(false);

  // Preload so the browser has it cached before user clicks
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
  }, [src]);

  const handleOpen = () => {
    setModalImageReady(false);
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
            {/* Loader shown until image is ready */}
            {!modalImageReady && (
              <div className="flex items-center justify-center w-[60vw] h-[60vh]">
                <AugleLoader size={100} />
              </div>
            )}

            {/* Image always renders so it starts loading immediately; hidden until ready */}
            <div
              className={`relative max-w-[90vw] max-h-[90vh] transition-opacity duration-300 ${
                modalImageReady ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <Image
                src={src}
                alt={alt}
                width={width || 9600}
                height={height || 5400}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-none"
                style={{ borderRadius: 0, border: "none" }}
                onLoad={() => setModalImageReady(true)}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
