"use client";

import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import { LegalNoticeModal } from "@/components/legal-notice-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [checkingLegalNotice, setCheckingLegalNotice] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [legalNoticeAccepting, setLegalNoticeAccepting] = useState(false);

  const checkLegalNoticeStatus = async () => {
    if (!phone) return;

    setCheckingLegalNotice(true);
    try {
      const response = await fetch(`/api/accept-legal-notice?phone=${encodeURIComponent(phone)}`);
      const data = await response.json();

      if (response.ok) {
        if (!data.accepted) {
          setShowLegalModal(true);
        } else {
          router.push("/augle-overview");
        }
      }
    } catch (err) {
      console.error("Error checking legal notice status:", err);
      setShowLegalModal(true);
    } finally {
      setCheckingLegalNotice(false);
    }
  };

  const verifyOTPWithCode = async (otpCode: string) => {
    setError("");
    setLoading(true);

    if (!phone) {
      setError("Phone number is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to verify OTP");
        setLoading(false);
        return;
      }

      await checkLegalNoticeStatus();
      setLoading(false);
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpValue.length === 6) {
      verifyOTPWithCode(otpValue);
    } else {
      setError("Please enter a valid 6-digit OTP");
    }
  };

  const handleOTPChange = (val: string) => {
    setOtpValue(val);
    if (val.length === 6 && !loading && !checkingLegalNotice) {
      verifyOTPWithCode(val);
    }
  };

  const handleAgree = async () => {
    if (!phone) return;

    setLegalNoticeAccepting(true);

    try {
      const response = await fetch("/api/accept-legal-notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        setShowLegalModal(false);
        router.push("/augle-overview");
      } else {
        console.error("Failed to accept legal notice");
        setShowLegalModal(false);
        router.push("/augle-overview");
      }
    } catch (err) {
      console.error("Error accepting legal notice:", err);
      setShowLegalModal(false);
      router.push("/augle-overview");
    } finally {
      setLegalNoticeAccepting(false);
    }
  };

  return (
    <>
      <h1 className="sr-only">Enter OTP</h1>
      <p className="text-start text-sm/7 text-gray-950 dark:text-[#F7F6F2]">
        Enter the 6-digit passcode sent to your phone.
      </p>
      <form onSubmit={handleSubmit} className="mt-2">
        <OTPInput
          maxLength={6}
          name="otp"
          value={otpValue}
          onChange={handleOTPChange}
        />
        {error && (
          <p className="mt-4 text-start text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </form>
      <Button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-4 w-full bg-[#C15F3C] text-[#F7F6F2] cursor-pointer"
      >
        Request a new passcode
      </Button>
      <LegalNoticeModal
        open={showLegalModal}
        onAgree={handleAgree}
        loading={legalNoticeAccepting}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="text-center text-sm/7 text-gray-950 dark:text-[#F7F6F2]">
        Loading...
      </div>
    }>
      <OTPForm />
    </Suspense>
  );
}
