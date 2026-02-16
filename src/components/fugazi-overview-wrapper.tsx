"use client";

import { LegalNoticeModal } from "@/components/legal-notice-modal";
import { useEffect, useState } from "react";

const LEGAL_AGREEMENT_KEY = "fugazi-legal-agreed";

export function FugaziOverviewWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem(LEGAL_AGREEMENT_KEY) === "true";
    if (hasAgreed) {
      setIsBlurred(false);
      setShowModal(false);
    } else {
      setShowModal(true);
      setIsBlurred(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem(LEGAL_AGREEMENT_KEY, "true");
    setShowModal(false);
    setIsBlurred(false);
  };

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          isBlurred ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
        {children}
      </div>
      <LegalNoticeModal open={showModal} onAgree={handleAgree} />
    </>
  );
}
