"use client";
import { usePathname } from "next/navigation";
import CustomLink from "../ui/CustomLink";

interface SwitchPortalProps {
  userType: string;
}

export default function SwitchPortal({ userType }: SwitchPortalProps) {
  const pathname = usePathname();

  function isPathInHr(path: string): boolean {
    return path.startsWith("/hr/");
  }

  if (isPathInHr(pathname) && userType === "HR") {
    return (
      <CustomLink
        href="/staff/roles"
        className="w-full items-start justify-start p-0 focusL"
        text="Staff Portal"
      />
    );
  } else {
    return (
      <CustomLink
        href="/hr/staff-directory"
        className="w-full items-start justify-start p-0"
        text="HR Portal"
      />
    );
  }
}
