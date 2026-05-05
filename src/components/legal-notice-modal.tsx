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
    <Dialog open={open} onClose={() => { }} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-[#171613]/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-lg rounded-lg bg-[#171613] dark:bg-[#171613] p-6 shadow-xl">
          <h2 className="text-left text-xl font-bold text-[#C15F3C] mb-6">
            LEGAL NOTICE
          </h2>
          <div className="space-y-4 text-sm text-[#F7F6F2] leading-[26px] text-left">
            <p>
            The materials available through https://whitepaper.augle.com are confidential and 
            proprietary to Augle, Inc. and are provided solely for informational and evaluation 
            purposes.
            </p>
            <p>
            By proceeding, you acknowledge that you will not reproduce, distribute, or disclose 
            this material, in whole or in part, without prior written consent from Augle, Inc.
            </p>
          </div>
          <div className="mt-8 flex gap-3 justify-between items-center">
            <button
              onClick={handleExit}
              className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-[#F7F6F2] hover:bg-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
            >
              Exit
            </button>
            <button
              onClick={onAgree}
              disabled={loading}
              className="rounded-md bg-[#C15F3C] px-4 py-2.5 text-sm font-semibold text-[#F7F6F2] hover:bg-[#C15F3C] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
            >
              {loading ? "..." : "I agree"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
