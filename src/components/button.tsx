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
        "rounded-lg bg-[#8B8078] px-3.5 py-2 text-sm/6 font-semibold text-[#B0ADA5] hover:bg-[#C15F3C] hover:text-[#F7F6F2] focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-[#C15F3C] active:text-[#F7F6F2]",
      )}
      {...props}
    />
  );
}
