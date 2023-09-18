"use client";
import { usePathname } from "next/navigation";

function useMatchPath(pathToMatch: string): boolean {
  const currentPath = usePathname();

  const isMatch = (): boolean => {
    return currentPath === pathToMatch;
  };

  return isMatch();
}

export default useMatchPath;
