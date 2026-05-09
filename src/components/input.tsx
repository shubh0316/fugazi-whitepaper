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
        "block w-full rounded-lg bg-[#524C48] px-3 py-1.5",
        "text-base/6 text-gray-950 sm:text-sm/6 dark:text-[#F7F6F2]",
        "outline -outline-offset-1 outline-gray-950/15 focus:outline-2  dark:bg-white/10 dark:outline-white/15",
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
        "bg-[#524C48]",
        "text-2xl/7 text-[#F7F6F2]",
        "rounded-md",
        "border border-transparent",
        "shadow-sm",
        "data-active:z-10 data-active:border-[#C15F3C] data-active:outline-none",
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
  value,
  onChange,
}: {
  className?: string;
  maxLength: number;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <BaseOTPInput
      required
      name={name}
      containerClassName={className}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
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
