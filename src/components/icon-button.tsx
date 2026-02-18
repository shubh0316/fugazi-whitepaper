import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import type React from "react";

export function IconButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      type="button"
      className={clsx(
        className,
        "relative *:relative",
        "before:absolute before:top-1/2 before:left-1/2 before:size-8 before:-translate-1/2 before:rounded-md",
        "before:bg-white/75 before:backdrop-blur-sm dark:before:bg-gray-950/75",
        "data-hover:before:bg-[#30C67B]/20 dark:data-hover:before:bg-[#30C67B]/20",
        "data-active:before:bg-[#30C67B]/30 dark:data-active:before:bg-[#30C67B]/30",
        "data-selected:before:bg-[#30C67B]/30 dark:data-selected:before:bg-[#30C67B]/30",
        "aria-selected:before:bg-[#30C67B]/30 dark:aria-selected:before:bg-[#30C67B]/30",
        "focus:outline-hidden data-focus:before:outline-2 data-focus:before:outline-blue-700 data-focus:before:outline-solid",
      )}
      {...props}
    />
  );
}
