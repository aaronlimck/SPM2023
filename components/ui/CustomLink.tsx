"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function CustomLink({
  href,
  variant = "ghost",
  text,
  className,
  icon,
}: {
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  text?: string;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all ease-in-out focus:outline-none",
        {
          "w-fit h-fit bg-primary hover:bg-secondary text-white text-sm font-medium border-primary rounded-xl px-4 py-2":
            variant === "primary",
          "w-fit h-fit bg-white hover:bg-accent text-primary text-sm font-medium border-white hover:border rounded-xl px-4 py-2":
            variant === "secondary",
          "w-fit h-fit bg-white hover:bg-accent text-primary text-sm font-medium border rounded-xl px-4 py-2":
            variant === "outline",
          "w-fit h-fit bg-none text-primary hover:text-secondary text-sm font-medium border-none":
            variant === "ghost",
        },
        className
      )}
    >
      {icon}
      {text}
    </Link>
  );
}
