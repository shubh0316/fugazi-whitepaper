"use client";

import { FullscreenLoader } from "@/components/augle-loader";
import { LegalNoticeModal } from "@/components/legal-notice-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AugleOverviewWrapper({
  children,
  hasAccepted,
}: {
  children: React.ReactNode;
  hasAccepted: boolean;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(!hasAccepted);
  const [isBlurred, setIsBlurred] = useState(!hasAccepted);
  const [pageLoading, setPageLoading] = useState(true);
  const [legalLoading, setLegalLoading] = useState(false);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll("img")) as HTMLImageElement[];
    const unloaded = images.filter((img) => !img.complete);

    if (unloaded.length === 0) {
      setTimeout(() => setPageLoading(false), 800);
      return;
    }

    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (loaded >= unloaded.length) {
        setTimeout(() => setPageLoading(false), 400);
      }
    };

    unloaded.forEach((img) => {
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onLoad, { once: true });
    });

    const fallback = setTimeout(() => setPageLoading(false), 4000);

    return () => {
      clearTimeout(fallback);
      unloaded.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, []);

  const handleAgree = async () => {
    setLegalLoading(true);

    const pendingEmail = sessionStorage.getItem("pending-legal-email");
    if (pendingEmail) {
      try {
        await fetch("/api/accept-legal-notice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: pendingEmail }),
        });
        sessionStorage.removeItem("pending-legal-email");
      } catch {
        // proceed regardless
      }
    }

    setPageLoading(true);
    setShowModal(false);
    setIsBlurred(false);

    await new Promise((r) => setTimeout(r, 700));
    setPageLoading(false);
    setLegalLoading(false);
  };

  const handleExit = () => {
    setPageLoading(true);
    setShowModal(false);
    setTimeout(() => router.push("/login"), 300);
  };

  return (
    <>
      <FullscreenLoader visible={pageLoading} message="Loading…" />
      <div
        className={`transition-all duration-300 ${
          isBlurred ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
        {children}
      </div>
      <LegalNoticeModal
        open={showModal}
        onAgree={handleAgree}
        onExit={handleExit}
        loading={legalLoading}
      />
    </>
  );
}
