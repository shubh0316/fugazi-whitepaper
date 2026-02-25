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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!phone || phone.length !== 12) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    try {
      // Send OTP
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
            className="block w-full text-sm font-medium    text-gray-950 dark:text-white text-wrap leading-[26px]"
          >
            Enter your 10-digit mobile number to receive a verification code. Access is limited to approved users. If you do not yet have access, you can send a request to <Link href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</Link>
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
            <p className="mt-2 text-start text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
       
        </div>
        <Button type="submit" className="mt-6 w-full hover:text-black" disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>
        <p className="mt-4 block w-full text-sm font-medium text-gray-950 dark:text-white text-wrap leading-[26px]">
          By continuing you are consenting to receive a one-time passcode via SMS and agree to the{" "}
          <Link href="/privacy-policy" className="text-[#52D593] hover:underline">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/terms-and-conditions" className="text-[#52D593] hover:underline">
            Terms & Conditions
          </Link>
          . Fugazi will never send you marketing or promotional messages. SMS messages are used strictly for verification purposes only. Messaging and data rates may apply. Check with your carrier for details.
        </p>
      </form>
    </>
  );
}
