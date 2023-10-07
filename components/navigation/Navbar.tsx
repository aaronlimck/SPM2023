import { authConfig } from "@/lib/auth";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown";
import Logout from "./Logout";
import { LogoToggle } from "./LogoToggle";

export default async function NavBar() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return null;
  }

  // @ts-ignore
  const userName = session?.user.name;
  const initials = userName ? userName.substring(0, 1).toUpperCase() : "";
  const role = session?.user.role;
  // @ts-ignore
  const userEmail = session?.user.email;

  return (
    <header
      className={`sticky top-0 inset-x-0 z-1 w-full bg-white mx-auto max-w-[1440px] safeMargin border-b border-gray-100`}
    >
      <div className="flex h-16 items-center justify-between space-x-3 md:space-x-0">
        <div className="flex gap-6 md:gap-8 items-center">
          {/* <a className="font-bold text-lg" href="/">
            <img className="w-8 h-auto" src="../logoIcon.png" alt="" />
          </a> */}
          <LogoToggle />

          {role === "HR" ? (
            <nav className="hidden gap-6 md:flex">
              <Link
                className="flex items-center text-lg font-medium transition-colors hover:text-primary/80 sm:text-sm text-primary/60"
                href={DEFAULT_REDIRECTS.staffDirectory}
              >
                Staff Directory
              </Link>
              <Link
                className="flex items-center text-lg font-medium transition-colors hover:text-primary/80 sm:text-sm text-primary/60"
                href={DEFAULT_REDIRECTS.roleManagement}
              >
                Role Listings Management
              </Link>
              <Link
                className="flex items-center text-lg font-medium transition-colors hover:text-primary/80 sm:text-sm text-primary/60"
                href={DEFAULT_REDIRECTS.roleListing}
              >
                Role Listings
              </Link>
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full select-none">
                <span className="font-medium text-gray-600">{initials}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white w-full max-w-[250px]"
              align="end"
            >
              <div className="flex flex-col text-sm text-slate-500 px-2 py-1.5">
                <span className="font-medium text-slate-900">{userName}</span>
                <span>{userEmail}</span>
              </div>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem>
                <Link
                  href={DEFAULT_REDIRECTS.applications}
                  className="text-primary font-medium "
                >
                  My Applications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Logout className="w-full items-start justify-start p-0" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
