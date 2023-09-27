"use client";

import { ListFilterIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

export default function Filter({
  sheetTitle,
  sheetDesc,
  children,
}: {
  sheetTitle?: string;
  sheetDesc?: string;
  children?: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger className="focus:outline-none">
        <div className="border rounded-lg flex flex-row items-center cursor-pointer text-base sm:text-sm text-gray-500 hover:text-gray-800 py-2 px-3">
          <ListFilterIcon className="w-4 h-4 mr-1" />
          <p>Filter</p>
        </div>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDesc}</SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
