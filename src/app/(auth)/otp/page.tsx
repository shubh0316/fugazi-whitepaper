"use client";

import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import { FullscreenLoader } from "@/components/augle-loader";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState<string>("");
  const [showLoader, setShowLoader] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const verifyingRef = useRef(false);

  const verifyOTPWithCode = async (otpCode: string) => {
    if (verifyingRef.current) return;
    verifyingRef.current = true;
    setError("");

    if (!email) {
      setError("Email address is missing");
      verifyingRef.current = false;
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to verify OTP");
        verifyingRef.current = false;
        return;
      }

      // Store email so AugleOverviewWrapper can record legal acceptance server-side
      sessionStorage.setItem("pending-legal-email", email);
      setShowLoader(true);
      await new Promise((r) => setTimeout(r, 3000));
      router.push("/augle-overview");
    } catch {
      setError("Failed to verify OTP. Please try again.");
      setShowLoader(false);
      verifyingRef.current = false;
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
    if (val.length === 6 && !verifyingRef.current) {
      verifyOTPWithCode(val);
    }
  };

  return (
    <>
      <FullscreenLoader visible={showLoader} message="Verifying…" />
      <h1 className="sr-only">Enter OTP</h1>
      <p className="text-start text-sm/7 text-gray-950 dark:text-[#F7F6F2]">
        Enter the 6-digit passcode sent to your email.
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
