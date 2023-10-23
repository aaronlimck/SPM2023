"use client";

import { ListFilterIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { useState } from "react";
import React from "react";

export default function Filter({
  title = "Filter",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="border rounded-lg flex flex-row items-center cursor-pointer text-base sm:text-sm text-gray-500 hover:text-gray-800 py-2 px-3">
          <ListFilterIcon className="w-4 h-4 mr-1" />
          <p>Filter</p>
        </div>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0">
        <DialogTitle className="text-base text-center pt-4">
          {title}
        </DialogTitle>
        <hr />
        {/* Pass the handleClose function to the children */}
        {React.cloneElement(children as React.ReactElement, {
          onClose: handleClose,
        })}
      </DialogContent>
    </Dialog>
  );
}
