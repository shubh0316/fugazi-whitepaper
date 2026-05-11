"use client";

import Lottie from "lottie-react";
import animationData from "@/assets/augle-loader.json";
import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 3000;

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
  const [show, setShow] = useState(visible);
  const shownAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (visible) {
      shownAtRef.current = Date.now();
      setShow(true);
    } else {
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : MIN_VISIBLE_MS;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      timerRef.current = setTimeout(() => setShow(false), remaining);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1612] transition-opacity duration-300 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[16vmin] min-w-[80px] aspect-square">
        <Lottie animationData={animationData} loop autoplay />
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium tracking-wide text-[#F7F6F2]/70">
          {message}
        </p>
      )}
    </div>
  );
}
