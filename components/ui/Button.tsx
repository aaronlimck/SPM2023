"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export default function Button({
  text,
  variant = "primary",
  className,
  onClick,
  disabled,
  loading,
  icon,
}: {
  text: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      // if onClick is passed, it's a "button" type, otherwise it's being used in a form, hence "submit"
      type={onClick ? "button" : "submit"}
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none",
        disabled || loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : {
              "w-fit h-fit bg-primary hover:bg-secondary text-white text-sm font-medium border-primary rounded-xl px-4 py-2":
                variant === "primary",
              "w-fit h-fit bg-white hover:bg-accent text-primary text-sm font-medium border-white hover:border rounded-xl px-4 py-2":
                variant === "secondary",
              "w-fit h-fit bg-white hover:bg-accent text-primary text-sm font-medium border rounded-xl px-4 py-2":
                variant === "outline",
              "w-fit h-fit bg-none text-primary hover:text-secondary text-sm font-medium border-none px-4 py-2":
                variant === "ghost",
            },
        className
      )}
      {...(onClick ? { onClick } : {})}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      <p>{text}</p>
    </button>
  );
}
