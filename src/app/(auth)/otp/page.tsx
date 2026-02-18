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
  const phone = searchParams.get("phone") || "";
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [checkingLegalNotice, setCheckingLegalNotice] = useState(false);

  // Check if user has already accepted legal notice after OTP verification
  const checkLegalNoticeStatus = async () => {
    if (!phone) return;

    setCheckingLegalNotice(true);
    try {
      const response = await fetch(`/api/accept-legal-notice?phone=${encodeURIComponent(phone)}`);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

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
        body: JSON.stringify({ phone, otp }),
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

  const handleAgree = async () => {
    if (!phone) return;

    try {
      const response = await fetch("/api/accept-legal-notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
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
    }
  };

  return (
    <>
      <h1 className="sr-only">Enter OTP</h1>
      <p className="text-center text-sm/7 text-gray-950 dark:text-white">
        Please enter the 6-digit verification code sent to{" "}
        <span className="font-semibold">{phone || "your phone number"}</span>.
      </p>
      <form onSubmit={handleSubmit} className="mt-6">
        <OTPInput maxLength={6} name="otp" />
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-6 w-full hover:text-black" disabled={loading || checkingLegalNotice}>
          {loading || checkingLegalNotice ? "Verifying..." : "Verify code"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm/7 dark:text-gray-400">
        <Link
          href="/login"
          className="font-semibold text-gray-950 dark:text-white  hover:underline hover:text-[#30C67B]"
        >
          Use a different phone number
        </Link>
      </p>
      <LegalNoticeModal open={showLegalModal} onAgree={handleAgree} />
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
