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
        "rounded-lg bg-[#8B8078] px-3.5 py-2 text-sm/6 font-semibold text-[#F7F6F2] hover:bg-[#C15F3C] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-gray-700 dark:hover:bg-[#C15F3C] active:bg-[#C15F3C] dark:active:bg-[#C15F3C] aria-selected:bg-[#C15F3C] dark:aria-selected:bg-[#C15F3C] data-selected:bg-[#C15F3C] dark:data-selected:bg-[#C15F3C]",
      )}
      {...props}
    />
  );
}
