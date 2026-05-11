"use client";

import Lottie from "lottie-react";
import animationData from "@/assets/augle-loader.json";

interface AugleLoaderProps {
  className?: string;
  size?: number;
}

export function AugleLoader({ className, size = 80 }: AugleLoaderProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

interface FullscreenLoaderProps {
  visible: boolean;
  message?: string;
}

export function FullscreenLoader({ visible, message }: FullscreenLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1612] transition-opacity duration-300 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <AugleLoader size={120} />
      {message && (
        <p className="mt-4 text-sm font-medium tracking-wide text-[#F7F6F2]/70">
          {message}
        </p>
      )}
    </div>
  );
}
