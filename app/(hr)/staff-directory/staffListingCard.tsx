"use client";
import CustomLink from "@/components/ui/CustomLink";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StaffListingCardProps {
  className?: string;
  staffData: Staff[];
}

export default function StaffListingCard({
  className,
  staffData,
}: StaffListingCardProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {staffData.length === 0 ? (
        <div className="w-full text-center py-4">
          No records found.
          <CustomLink
            variant="primary"
            className=" text-white mx-auto mt-2"
            href={DEFAULT_REDIRECTS.staffDirectory}
            text="Clear filters"
          />
        </div>
      ) : (
        staffData.map((staff) => (
          <Link
            href={`${pathname}/${encodeURIComponent(
              staff.Staff_FName.toLowerCase() +
                "-" +
                staff.Staff_LName.toLowerCase()
            )}`}
          >
            <div
              key={staff.Staff_ID}
              className="border border-gray-200 hover:border-gray-400 rounded-lg cursor-pointer text-sm p-4 mb-3"
            >
              <p className="flex flex-row justify-between">
                <span>Name: </span>
                <span className="font-medium">
                  {staff.Staff_FName + " " + staff.Staff_LName}
                </span>
              </p>
              <p className="flex flex-row justify-between">
                <span>Email: </span>
                <span className="font-medium">{staff.Email}</span>
              </p>
              <p className="flex flex-row justify-between">
                <span>Department: </span>
                <span className="font-medium">{staff.Dept}</span>
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
