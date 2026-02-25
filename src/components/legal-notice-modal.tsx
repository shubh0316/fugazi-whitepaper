"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface LegalNoticeModalProps {
  open: boolean;
  onAgree: () => void;
}

export function LegalNoticeModal({ open, onAgree }: LegalNoticeModalProps) {
  const router = useRouter();

  const handleExit = () => {
    router.push("/login");
  };

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-lg rounded-lg bg-gray-950 dark:bg-gray-950 p-6 shadow-xl">
          <h2 className="text-left text-xl font-bold text-[#3CC383] mb-6">
            LEGAL NOTICE
          </h2>
          <div className="space-y-4 text-sm text-white leading-[26px] text-left">
            <p>
              The materials available through https://whitepaper.fugazi.fun are
              confidential and proprietary to Fugazi Labs, LLC and are provided
              solely for informational and evaluation purposes.
            </p>
            <p>
              By proceeding, you acknowledge that you will not reproduce,
              distribute, or disclose this material, in whole or in part, without
              prior written consent from Fugazi Labs, LLC.
            </p>
          </div>
          <div className="mt-8 flex gap-3 justify-end">
            <button
              onClick={handleExit}
              className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
            >
              Exit
            </button>
            <button
              onClick={onAgree}
              className="rounded-md bg-[#3CC383] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3CC383] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
            >
              I agree
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
