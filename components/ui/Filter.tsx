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
        <div className="flex flex-row items-center cursor-pointer text-sm text-gray-500 hover:text-gray-800">
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
