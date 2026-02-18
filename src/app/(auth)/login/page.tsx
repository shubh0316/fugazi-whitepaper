"use client";

import { Button } from "@/components/button";
import { PhoneInput } from "@/components/phone-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!phone || phone.length !== 12) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    if (!acceptedPrivacyPolicy) {
      setError("Please accept the privacy policy to continue");
      setLoading(false);
      return;
    }

    try {
      // First, accept the privacy policy
      const privacyResponse = await fetch("/api/accept-privacy-policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!privacyResponse.ok) {
        const privacyData = await privacyResponse.json();
        setError(privacyData.error || "Failed to accept privacy policy");
        setLoading(false);
        return;
      }

      // Then send OTP
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // OTP sent successfully, redirect to OTP page
      router.push(`/otp?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="sr-only">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="phone"
            className="block w-full  text-xs font-medium text-gray-950 dark:text-white text-wrap"
          >
            Enter your mobile number to receive your 6-digit verification code. You must be on the approved list for access. To get added to the approved list, please send an email to whitepaper@fugazi.fun.
          </label>
          <PhoneInput
            id="phone"
            name="phone"
            value={phone}
            onChange={setPhone}
            required
            className="mt-2"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedPrivacyPolicy}
                onChange={(e) => setAcceptedPrivacyPolicy(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#30C67B] focus:ring-[#30C67B] focus:ring-2"
                required
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                I accept the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#30C67B] hover:underline"
                  target="_blank"
                >
                  privacy policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full hover:text-black" disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>
      </form>
    </>
  );
}
