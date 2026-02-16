"use client";

import { Button } from "@/components/button";
import { PhoneInput } from "@/components/phone-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
        </div>
        <Button type="submit" className="mt-6 w-full hover:text-black" disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>
      </form>
    </>
  );
}
