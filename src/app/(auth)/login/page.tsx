"use client";

import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import { FullscreenLoader } from "@/components/augle-loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Show loader immediately — don't wait for API
    setLoading(true);
    setShowLoader(true);

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setShowLoader(false);
        setLoading(false);
        setError(data.error || "Failed to send OTP");
        return;
      }

      router.push(`/otp?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    } catch {
      setShowLoader(false);
      setLoading(false);
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <>
      <FullscreenLoader visible={showLoader} message="Sending passcode…" />
      <h1 className="sr-only">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block w-full text-sm font-medium text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[26px]"
          >
            Enter your email address to receive your passcode to access the Augle whitepaper. Access is limited to approved users only.
          </label>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 bg-[#524C48] font-IBM-Plex-Sans"
            placeholder="you@example.com"
          />
          {error && (
            <p className="mt-2 text-start text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full cursor-pointer" disabled={loading}>
          Continue
        </Button>
        <p className="mt-4 block w-full text-sm font-medium text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[25px]">
          By continuing you agree to the{" "}
          <Link href="/privacy-policy" className="text-[#C15F3C] hover:underline">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/terms-and-conditions" className="text-[#C15F3C] hover:underline">
            Terms & Conditions
          </Link>
          . Email addresses are used strictly for verification purposes only.
        </p>
      </form>
    </>
  );
}
