"use client";

import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string>("+1 ");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // US E.164: +1 followed by 10 digits, area code can't start with 0 or 1
    const usPhoneRegex = /^\+1[2-9]\d{2}[2-9]\d{6}$/;
    const cleaned = phone.replace(/\s+/g, "");
    if (!usPhoneRegex.test(cleaned)) {
      setError("Please enter a valid US phone number (e.g. +1 212 555 1234).");
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
            className="block w-full text-sm font-medium    text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[26px]"
          >
            Enter your phone number to receive your passcode to access the Augle whitepaper. Access is limited to approved users only.
          </label>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-2 bg-[#524C48] font-IBM-Plex-Sans"
            placeholder="XXX XXX XXXX"
          />
          {error && (
            <p className="mt-2 text-start text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full cursor-pointer" disabled={loading}>
          {loading ? "Sending OTP..." : "Continue"}
        </Button>
        <p className="mt-4 block w-full text-sm font-medium text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[25px]">
          By continuing you are consenting to receive a one-time passcode via SMS and agree to the{" "}
          <Link href="/privacy-policy" className="text-[#C15F3C] hover:underline">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/terms-and-conditions" className="text-[#C15F3C] hover:underline">
            Terms & Conditions
          </Link>
          . Augle will never send you marketing or promotional messages. Phone numbers are used strictly for verification purposes only.
        </p>
      </form>
    </>
  );
}
