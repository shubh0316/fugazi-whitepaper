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
        "rounded-full bg-gray-950 px-3.5 py-2 text-sm/6 font-semibold text-white hover:bg-[#30C67B] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-700 dark:hover:bg-[#30C67B] active:bg-[#30C67B] dark:active:bg-[#30C67B] aria-selected:bg-[#30C67B] dark:aria-selected:bg-[#30C67B] data-selected:bg-[#30C67B] dark:data-selected:bg-[#30C67B]",
      )}
      {...props}
    />
  );
}
