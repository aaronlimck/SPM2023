"use client";
import { formatDate, isDateInPast } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface JobListingStaffProps {
  page: number;
  search: string | undefined;
  jobData: Job[];
}

export default function JobListingHRTwo({
  page,
  search,
  jobData,
}: JobListingStaffProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 'asc' or 'desc'
  const pathname = usePathname();

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the jobData based on the selected sorting criteria
  const sortedJobs = [...jobData].sort((a, b) => {
    if (sortBy === "createdDate" || sortBy === "expiredDate") {
      const dateA = new Date(
        sortBy === "createdDate" ? a.createdDate : a.Role_ExpiryDate
      );
      const dateB = new Date(
        sortBy === "createdDate" ? b.createdDate : b.Role_ExpiryDate
      );

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime(); // Descending order
      } else {
        return dateA.getTime() - dateB.getTime(); // Ascending order (default)
      }
    }

    if (sortBy === "roleName") {
      const staffNameA = (a.Role_Name + a.Role_Name).toLowerCase();
      const staffNameB = (b.Role_Name + b.Role_Name).toLowerCase();

      if (sortOrder === "desc") {
        if (staffNameA < staffNameB) return 1; // Descending order
        if (staffNameA > staffNameB) return -1;
        return 0;
      } else {
        if (staffNameA < staffNameB) return -1; // Ascending order (default)
        if (staffNameA > staffNameB) return 1;
        return 0;
      }
    }

    // Default case: No sorting (Sort via DB query by role name alpha order)
    return 0;
  });

  return (
    <>
      {
        <p className="text-sm text-gray-500 ml-1 mb-3">
          {sortedJobs.length} results found
        </p>
      }

      <table className="w-full text-sm text-left text-gray-500 mb-6">
        <thead className="text-xs text-gray-700 uppercase bg-accent">
          <tr>
            <th
              scope="col"
              className="cursor-pointer md:py-3"
              onClick={() => {
                setSortBy("roleName");
                toggleSortOrder();
              }}
            >
              <span className="flex md:text-left items-center md:px-2">
                Role
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th
              scope="col"
              className="cursor-pointer md:py-3"
              onClick={() => {
                setSortBy("createdDate");
                toggleSortOrder();
              }}
            >
              <span className="flex justify-center items-center md:pl-3">
                Created Date
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th
              scope="col"
              className="cursor-pointer md:py-3"
              onClick={() => {
                setSortBy("expiredDate");
                toggleSortOrder();
              }}
            >
              <span className="flex justify-center items-center md:pl-3">
                Expired On
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th scope="col" className="md:py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job, index) => (
            <tr key={index} className="bg-white border-b">
              <td
                scope="row"
                data-label="Role"
                className="font-medium text-gray-900 md:text-left md:px-4 whitespace-nowrap"
              >
                <Link
                  className="hover:underline"
                  href={`${pathname}/${encodeURIComponent(
                    job.Role_Name.toLowerCase()
                  )}`}
                >
                  {job.Role_Name}
                </Link>
              </td>

              <td data-label="Created Date">{formatDate(job.createdDate)}</td>

              <td data-label="Expiry Date">
                {formatDate(job.Role_ExpiryDate)}
              </td>

              <td data-label="Status">
                {isDateInPast(job.Role_ExpiryDate) ? (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Expired
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {sortedJobs.length > 0 && (
        <div className="w-full flex justify-end mt-4">
          <div className="border py-1 px-1.5 rounded-xl">
            <Link
              href={{
                pathname: DEFAULT_REDIRECTS.roleManagement,
                query: {
                  ...(search ? { search } : {}),
                  page: page > 1 ? page - 1 : 1,
                },
              }}
              className={`text-sm font-medium py-1 px-2 rounded-md w-fit ${
                page <= 1 && "pointer-events-none opacity-50"
              }`}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: DEFAULT_REDIRECTS.roleManagement,
                query: {
                  ...(search ? { search } : {}),
                  page: page + 1,
                },
              }}
              className={` text-sm font-medium py-1 px-2 rounded-md w-fit `}
            >
              Next
            </Link>
          </div>
        </div>
      )} */}
    </>
  );
}
