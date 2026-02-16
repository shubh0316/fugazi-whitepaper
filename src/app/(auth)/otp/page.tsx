"use client";

import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

      // OTP verified successfully, redirect to fugazi-overview
      router.push("/fugazi-overview");
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="sr-only">Enter OTP</h1>
      <p className="text-center text-sm/7 text-gray-950 dark:text-white">
        Please enter the 6-digit OTP sent to{" "}
        <span className="font-semibold">{phone || "your phone"}</span>.
      </p>
      <form onSubmit={handleSubmit} className="mt-6">
        <OTPInput maxLength={6} name="otp" />
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm/7 dark:text-gray-400">
        <Link
          href="/login"
          className="font-semibold text-gray-950 dark:text-white"
        >
          Use a different phone number
        </Link>
      </p>
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
