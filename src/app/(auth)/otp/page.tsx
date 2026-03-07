"use client";

import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import { LegalNoticeModal } from "@/components/legal-notice-modal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [checkingLegalNotice, setCheckingLegalNotice] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [legalNoticeAccepting, setLegalNoticeAccepting] = useState(false);

  // Check if user has already accepted legal notice after OTP verification
  const checkLegalNoticeStatus = async () => {
    if (!email) return;

    setCheckingLegalNotice(true);
    try {
      const response = await fetch(`/api/accept-legal-notice?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        // If user hasn't accepted, show modal
        if (!data.accepted) {
          setShowLegalModal(true);
        } else {
          // User has already accepted, redirect to fugazi-overview
          router.push("/fugazi-overview");
        }
      }
    } catch (err) {
      console.error("Error checking legal notice status:", err);
      // On error, show modal to be safe
      setShowLegalModal(true);
    } finally {
      setCheckingLegalNotice(false);
    }
  };

  const verifyOTPWithCode = async (otpCode: string) => {
    setError("");
    setLoading(true);

    if (!email) {
      setError("Email address is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to verify OTP");
        setLoading(false);
        return;
      }

      // OTP verified successfully, check legal notice status
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
    if (!email) return;

    setLegalNoticeAccepting(true);

    try {
      const response = await fetch("/api/accept-legal-notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Legal notice accepted, redirect to fugazi-overview
        setShowLegalModal(false);
        router.push("/fugazi-overview");
      } else {
        console.error("Failed to accept legal notice");
        // Still redirect even if API call fails
        setShowLegalModal(false);
        router.push("/fugazi-overview");
      }
    } catch (err) {
      console.error("Error accepting legal notice:", err);
      // Still redirect even if API call fails
      setShowLegalModal(false);
      router.push("/fugazi-overview");
    } finally {
      setLegalNoticeAccepting(false);
    }
  };

  return (
    <>
      <h1 className="sr-only">Enter OTP</h1>
      <p className="text-start text-sm/7 text-gray-950 dark:text-white">
        Enter your 6-digit passcode
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
        <Button type="submit" className="mt-6 w-full hover:text-black" disabled={loading || checkingLegalNotice}>
          {loading || checkingLegalNotice ? "Verifying..." : "Verify"}
        </Button>
      </form>
      <Button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-4 w-full  hover:text-black bg-[#3CC383]"
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
      <div className="text-center text-sm/7 text-gray-950 dark:text-white">
        Loading...
      </div>
    }>
      <OTPForm />
    </Suspense>
  );
}
