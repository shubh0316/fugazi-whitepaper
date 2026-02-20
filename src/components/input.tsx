"use client";

import { clsx } from "clsx";
import {
  OTPInput as BaseOTPInput,
  SlotProps as BaseOTPSlotProps,
  REGEXP_ONLY_DIGITS,
} from "input-otp";
import type React from "react";

export function TextInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={clsx(
        className,
        "block w-full rounded-lg bg-white px-3 py-1.5",
        "text-base/6 text-gray-950 sm:text-sm/6 dark:text-white",
        "outline -outline-offset-1 outline-gray-950/15 focus:outline-2 focus:outline-blue-500 dark:bg-white/10 dark:outline-white/15",
      )}
      {...props}
    />
  );
}

function OTPSlot({ isActive, char, hasFakeCaret }: BaseOTPSlotProps) {
  return (
    <div
      data-active={isActive ? "" : undefined}
      className={clsx(
        "relative flex h-[47px] w-[46px] items-center justify-center",
        "bg-gray-700 dark:bg-gray-700",
        "text-2xl/7 text-white",
        "rounded-md",
        "border border-gray-600 dark:border-gray-600",
        "shadow-sm",
        "data-active:z-10 data-active:outline-2 data-active:outline-blue-500 data-active:outline-offset-2",
      )}
    >
      {hasFakeCaret ? (
        <span
          aria-hidden="true"
          className="animate-caret-blink h-8 w-px bg-white"
        />
      ) : (
        char
      )}
    </div>
  );
}

export function OTPInput({
  className,
  maxLength,
  name,
}: {
  className?: string;
  maxLength: number;
  name?: string;
}) {
  return (
    <BaseOTPInput
      required
      name={name}
      containerClassName={className}
      maxLength={maxLength}
      spellCheck={false}
      pattern={REGEXP_ONLY_DIGITS}
      render={({ slots }) => (
        <div className="isolate flex w-full justify-center gap-2">
          {slots.map((slot, index) => (
            <OTPSlot key={index} {...slot} />
          ))}
        </div>
      )}
    />
  );
}
