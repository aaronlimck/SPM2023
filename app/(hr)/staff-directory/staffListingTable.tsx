"use client";
import CustomLink from "@/components/ui/CustomLink";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
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
    <div className="hidden md:flex md:flex-col space-y-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-accent">
          <tr>
            <th
              scope="col"
              className="cursor-pointer px-4 py-3"
              onClick={() => {
                setSortBy("staffName");
                toggleSortOrder();
              }}
            >
              <span className="flex items-center px-2">
                Full Name
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
              </span>
            </th>
            <th scope="col" className="py-3">
              Email
            </th>
            <th scope="col" className="py-3">
              Department
            </th>
            <th scope="col" className="py-3">
              Access
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedStaff.length === 0 ? (
            <tr className="w-full">
              <td colSpan={99} className="w-full text-center py-4">
                No records found.
                <CustomLink
                  variant="primary"
                  className=" text-white mx-auto mt-2"
                  href={DEFAULT_REDIRECTS.staffDirectory}
                  text="Clear filters"
                />
              </td>
            </tr>
          ) : (
            sortedStaff.map((staff, index) => (
              <tr key={index} className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
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
                    className="hover:text-gray-800 lowercase"
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
            ))
          )}
        </tbody>
      </table>

      {sortedStaff.length > 0 && (
        <p className="text-sm text-gray-500 mb-3">
          Showing{" "}
          <span className="text-primary font-medium">{sortedStaff.length}</span>{" "}
          of{" "}
          <span className="text-primary font-medium">{sortedStaff.length}</span>
        </p>
      )}
    </div>
  );
}
