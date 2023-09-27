"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const validStatusValues = ["All", "Active", "Expired"];

  const setStatusParams = (newStatusValue: string) => {
    router.push(`?status=${newStatusValue}`);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center pt-4 pb-2">
        <p className="text-sm text-primary font-medium">Filters</p>
        <button
          onClick={() => setStatusParams("all")}
          className="text-xs text-gray-500 hover:text-gray-800 hover:underline hover:underline-offset-2 cursor-pointer"
        >
          Reset All
        </button>
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-row justify-between items-center pt-2">
        <p className="text-md text-primary font-semibold">Status</p>
      </div>

      <div className="flex flex-row bg-accent space-x-1 p-1 rounded-lg">
        {validStatusValues.map((value, index) => (
          <button
            key={index}
            className={`text-sm font-medium py-1 px-2 rounded-md w-full ${
              value.toLowerCase() === searchParams.get("status")
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-200 hover:text-primary"
            }`}
            onClick={() => setStatusParams(value.toLowerCase())}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
}
