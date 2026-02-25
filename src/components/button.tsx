import { clsx } from "clsx";
import type React from "react";

export function Button({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={clsx(
        className,
        "rounded-lg bg-gray-950 px-3.5 py-2 text-sm/6 font-semibold text-white hover:bg-[#3CC383] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-700 dark:hover:bg-[#3CC383] active:bg-[#3CC383] dark:active:bg-[#3CC383] aria-selected:bg-[#3CC383] dark:aria-selected:bg-[#3CC383] data-selected:bg-[#3CC383] dark:data-selected:bg-[#3CC383]",
      )}
      {...props}
    />
  );
}
