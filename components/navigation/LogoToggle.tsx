"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import Link from "next/link";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { useSession } from "next-auth/react";

export function LogoToggle() {
  const { data: session } = useSession();
  const role = session?.user.role;

  // Get the device type
  const { device } = useMediaQuery();

  return (
    <div className="flex flex-row">
      {device !== "desktop" && role === "HR" && (
        <Sheet>
          <SheetTrigger className="focus:outline-none">
            <Menu className="w-5 h-5 mr-4 md:hidden" />
          </SheetTrigger>

          <SheetContent side="left" className="w-full sm:w-[540px]">
            <Link href="/">
              <img
                className="max-w-[90px] h-auto"
                src="../logoPlaceholder.png"
              />
            </Link>
            <nav className="flex flex-col mt-6 gap-4">
              <Link
                className="flex items-center text-sm font-medium transition-colors hover:text-primary/80 text-primary"
                href={DEFAULT_REDIRECTS.staffDirectory}
              >
                Staff Directory
              </Link>
              <Link
                className="flex items-center text-sm font-medium transition-colors hover:text-primary/80 text-primary"
                href={DEFAULT_REDIRECTS.roleManagement}
              >
                Role Listings Management
              </Link>
              <Link
                className="flex items-center text-sm font-medium transition-colors hover:text-primary/80 text-primary"
                href={DEFAULT_REDIRECTS.roleListing}
              >
                Role Listings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      )}

      <a className="font-bold text-lg" href="/">
        <img className="w-8 h-auto" src="../logoIcon.png" alt="" />
      </a>
    </div>
  );
}
