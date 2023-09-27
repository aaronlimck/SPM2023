"use client";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface StaffListingTableProps {
  search: string | undefined;
  staffData: Staff[];
}

export default function StaffListingTable({
  search,
  staffData,
}: StaffListingTableProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 'asc' or 'desc'
  const pathname = usePathname();

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the jobData based on the selected sorting criteria
  const sortedStaff = [...staffData].sort((a, b) => {
    if (sortBy === "staffName") {
      const staffNameA = (a.Staff_FName + a.Staff_LName).toLowerCase();
      const staffNameB = (b.Staff_FName + b.Staff_LName).toLowerCase();

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
          {sortedStaff.length} results found
        </p>
      }
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-accent">
          <tr>
            <th
              scope="col"
              className="md:text-left md:px-4 md:py-3"
              onClick={() => {
                setSortBy("staffName");
                toggleSortOrder();
              }}
            >
              <span className="flex items-center cursor-pointer">
                Full Name
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>
            <th scope="col" className="md:text-left md:py-3">
              Email
            </th>
            <th scope="col" className="md:text-left md:py-3">
              Department
            </th>
            <th scope="col" className="md:py-3">
              Access
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedStaff.map((staff, index) => (
            <tr key={index} className="bg-white border-b">
              <td
                scope="row"
                data-label="Full Name"
                className="md:text-left md:px-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <Link
                  className="hover:underline"
                  href={`${pathname}/${encodeURIComponent(
                    staff.Staff_FName.toLowerCase() +
                      "-" +
                      staff.Staff_LName.toLowerCase()
                  )}`}
                >
                  {staff.Staff_FName + " " + staff.Staff_LName}
                </Link>
              </td>
              <td data-label="Email" className="md:text-left">
                <a
                  className="hover:text-gray-800"
                  href={"mailto:" + staff.Email}
                >
                  {staff.Email}
                </a>
              </td>
              <td data-label="Department" className="md:text-left">
                {staff.Dept}
              </td>
              <td data-label="Role">{staff.Access_Rights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
