"use client";
import { formatDate, isDateInPast } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface JobListingStaffProps {
  className?: string;
  jobData: Job[];
}

export default function JobListingHRTwo({
  className,
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
        sortBy === "createdDate" ? a.createdAt : a.Role_ExpiryDate
      );
      const dateB = new Date(
        sortBy === "createdDate" ? b.createdAt : b.Role_ExpiryDate
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
    <div className={className}>
      <table className={`w-full text-sm text-left text-gray-500 mb-4`}>
        <thead className="text-xs text-gray-700 uppercase bg-accent">
          <tr>
            <th
              scope="col"
              className="cursor-pointer px-4 py-3"
              onClick={() => {
                setSortBy("roleName");
                toggleSortOrder();
              }}
            >
              <span className="flex items-center px-2">
                Role Listing Name
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th scope="col" className="px-6 py-3">
              <span className="flex flex-row items-center">Role</span>
            </th>

            <th
              scope="col"
              className="cursor-pointer py-3"
              onClick={() => {
                setSortBy("createdDate");
                toggleSortOrder();
              }}
            >
              <span className="flex justify-center items-center pl-3">
                Created Date
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th
              scope="col"
              className="cursor-pointer py-3"
              onClick={() => {
                setSortBy("expiredDate");
                toggleSortOrder();
              }}
            >
              <span className="flex justify-center items-center pl-3">
                Expired On
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>

            <th scope="col" className="px-6 py-3">
              <span className="flex flex-row justify-center">Status</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedJobs.length === 0 ? (
            <tr className="bg-green-100 w-full">
              <td className="text-center py-4">No jobs found.</td>
            </tr>
          ) : (
            sortedJobs.map((job, index) => (
              <tr key={index} className={`bg-white border-b`}>
                <td
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Link
                    className="hover:underline"
                    // href={`${pathname}/${encodeURIComponent(
                    //   job.Role_Listing_Name.toLowerCase()
                    // )}`}
                    href={`${pathname}/${job.Role_Listing_ID}`}
                  >
                    {job.Role_Listing_Name}
                  </Link>
                </td>

                <td className="text-center px-6 py-3 ">
                  <span className="flex flexx-row">{job.Role_Name}</span>
                </td>

                <td className="text-center px-6 py-3 ">
                  <span className="flex flex-row justify-center">
                    {formatDate(job.createdAt)}
                  </span>
                </td>

                <td className="text-center px-6 py-3">
                  <span className="flex flex-row justify-center">
                    {formatDate(job.Role_ExpiryDate)}
                  </span>
                </td>

                <td className="px-6 py-3">
                  <span className="flex flex-row justify-center">
                    {isDateInPast(job.Role_ExpiryDate) ? (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Expired
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {
        <p className="text-sm text-gray-500 mb-3">
          Showing{" "}
          <span className="text-primary font-medium">{sortedJobs.length}</span>{" "}
          of{" "}
          <span className="text-primary font-medium">{sortedJobs.length}</span>
        </p>
      }
    </div>
  );
}
