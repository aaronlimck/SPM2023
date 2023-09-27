import NavBar from "@/components/navigation/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className="w-full max-w-[1440px] mx-auto safeMargin">
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </>
  );
}
