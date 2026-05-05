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
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("This email is not on our approved access list.");
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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // OTP sent successfully, redirect to OTP page
      router.push(`/otp?email=${encodeURIComponent(email)}`);
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
            htmlFor="email"
            className="block w-full text-sm font-medium    text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[26px]"
          >
             Enter your email to receive your passcode to access the Augle whitepaper.  Access is limited to approved users only.          </label>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 bg-[#524C48] font-IBM-Plex-Sans"
            placeholder="Email"
            
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
        <p className="mt-4 block w-full text-sm font-medium text-gray-950 dark:text-[#F7F6F2] text-wrap leading-[25px]">
          By continuing you are consenting to receive a one-time passcode via email and agree to the{" "}
          <Link href="/privacy-policy" className="text-[#C15F3C] hover:underline">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/terms-and-conditions" className="text-[#C15F3C] hover:underline">
            Terms & Conditions
          </Link>
          . Augle will never send you marketing or promotional messages. Emails are used strictly for verification purposes only.
        </p>
      </form>
    </>
  );
}
