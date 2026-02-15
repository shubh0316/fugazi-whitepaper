"use client";

import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ALLOWED_EMAILS = [
  "steve@ptsi.com",
  "Cory@fuza.ai",
  "shubhankersaxena5@gmail.com",
];

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      setError("Email is required");
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const isAllowed = ALLOWED_EMAILS.some(
      (allowed) => allowed.toLowerCase() === normalizedEmail
    );

    if (!isAllowed) {
      setError("This email is not authorized to login");
      return;
    }

    setError("");
    router.push(`/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <h1 className="sr-only">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block w-full text-sm/7 font-medium text-gray-950 dark:text-white"
          >
            Email
          </label>
          <TextInput
            type="email"
            id="email"
            name="email"
            required
            className="mt-2"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="mt-6 w-full">
          Continue
        </Button>
      </form>
    </>
  );
}
