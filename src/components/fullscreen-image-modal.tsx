"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full cursor-pointer block -mx-2 sm:-mx-4"
        type="button"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-none"
          style={{ borderRadius: 0, border: "none" }}
        />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative max-w-full max-h-full">
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
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
