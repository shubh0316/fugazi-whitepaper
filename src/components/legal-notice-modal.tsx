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
        <DialogPanel className="w-full  rounded-2xl bg-gray-950 p-6 shadow-xl sm:p-8 mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#30C67B] sm:text-3xl">
            LEGAL NOTICE
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white sm:text-base">
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleExit}
              className="w-full rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 sm:w-auto"
            >
              Exit
            </button>
            <button
              onClick={onAgree}
              className="w-full rounded-full bg-[#30C67B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#30C67B]/90 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 sm:w-auto"
            >
              I agree
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
