"use client";

import { signOut } from "next-auth/react";
import Button from "../ui/Button";

export default function Logout({ className }: { className?: string }) {
  const handleLogOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleLogOut}
      text="Log Out"
    />
  );
}
