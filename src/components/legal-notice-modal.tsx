"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface LegalNoticeModalProps {
  open: boolean;
  onAgree: () => void;
  loading?: boolean;
}

export function LegalNoticeModal({ open, onAgree, loading }: LegalNoticeModalProps) {
  const router = useRouter();

  const handleExit = () => {
    router.push("/login");
  };

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <DialogPanel className="mx-auto w-full max-w-2xl rounded-2xl bg-[#2a2520] p-10 shadow-2xl">
          <h2 className="text-left text-2xl font-extrabold uppercase tracking-wide text-[#C15F3C] mb-8">
            Legal Notice
          </h2>
          <div className="space-y-6 text-base text-[#F7F6F2] leading-relaxed text-left">
            <p>
              The materials available through https://whitepaper.augle.com are confidential and
              proprietary to Augle, Inc. and are provided solely for informational and evaluation
              purposes.
            </p>
            <p>
              By proceeding, you acknowledge that you will not reproduce, distribute, or disclose
              this material, in whole or in part, without prior written consent from Augle, Inc.
            </p>
          </div>
          <div className="mt-12 flex gap-4 justify-center items-center">
            <button
              onClick={handleExit}
              className="w-44 rounded-xl border border-[#F7F6F2]/30 bg-transparent px-6 py-3.5 text-base font-bold text-[#F7F6F2] hover:bg-white/5 focus:outline-none cursor-pointer transition-colors"
            >
              Exit
            </button>
            <button
              onClick={onAgree}
              disabled={loading}
              className="w-44 rounded-xl bg-[#C15F3C] px-6 py-3.5 text-base font-bold text-[#F7F6F2] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "..." : "I agree"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
