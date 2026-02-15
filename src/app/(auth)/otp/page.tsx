"use client";

import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PASSWORD = "091120";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password !== PASSWORD) {
      setError("Incorrect password");
      return;
    }

    setError("");
    router.push("/");
  };

  return (
    <>
      <h1 className="sr-only">Enter password</h1>
      <p className="text-center text-sm/7 text-gray-950 dark:text-white">
        Please enter your password for{" "}
        <span className="font-semibold">{email || "your account"}</span>.
      </p>
      <form onSubmit={handleSubmit} className="mt-6">
        <OTPInput maxLength={6} name="password" />
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-6 w-full">
          Login
        </Button>
      </form>
      <p className="mt-6 text-center text-sm/7 dark:text-gray-400">
        <Link
          href="/login"
          className="font-semibold text-gray-950 dark:text-white"
        >
          Use a different email
        </Link>
      </p>
    </>
  );
}
