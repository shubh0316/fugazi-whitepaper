"use client";

import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export function PhoneInput({
  className,
  value,
  onChange,
  ...props
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Format phone number: (XXX) XXX-XXXX (no +1 prefix)
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Remove leading 1 if present (country code)
    const cleanedDigits = digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
    
    // Limit to 10 digits (US phone number)
    const limitedDigits = cleanedDigits.slice(0, 10);
    
    // Format based on length
    if (limitedDigits.length === 0) return "";
    if (limitedDigits.length <= 3) return `(${limitedDigits}`;
    if (limitedDigits.length <= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    }
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
  };

  // Convert formatted display value to full phone number with +1
  const getFullPhoneNumber = (display: string): string => {
    // Extract digits from formatted display
    const digits = display.replace(/\D/g, "");
    
    // Remove leading 1 if present (country code)
    const cleanedDigits = digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
    
    // Always add +1 prefix for API (10 digits)
    if (cleanedDigits.length === 10) {
      return `+1${cleanedDigits}`;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setDisplayValue(formatted);
    
    // Call onChange with full phone number (+1XXXXXXXXXX)
    if (onChange) {
      const fullNumber = getFullPhoneNumber(formatted);
      onChange(fullNumber);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined) {
      // Extract digits from value (remove +1 if present)
      const digits = value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
      setDisplayValue(formatPhoneNumber(digits));
    }
  }, [value]);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base/6 text-gray-950 dark:text-white sm:text-sm/6 pointer-events-none z-10 leading-none">
        +1
      </span>
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        className={clsx(
          className,
          "block w-full rounded-lg bg-white pl-10 pr-3 py-1.5",
          "text-base/6 text-gray-950 sm:text-sm/6 dark:text-white",
          "outline -outline-offset-1 outline-gray-950/15 focus:outline-2 focus:outline-blue-500 dark:bg-white/10 dark:outline-white/15",
          "placeholder:text-[#444954]",
        )}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder=""
        maxLength={14} // (XXX) XXX-XXXX
        {...props}
      />
    </div>
  );
}
