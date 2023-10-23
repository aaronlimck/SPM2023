import CustomLink from "@/components/ui/CustomLink";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { isDateInPast } from "@/lib/utils";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface RoleListingHRCardProps {
  className?: string;
  jobData: Job[];
}

export default function RoleListingHRCard({
  className,
  jobData,
}: RoleListingHRCardProps) {
  return (
    <div role="roleContainer" className={className}>
      {jobData.length === 0 ? (
        <>
          <div className="w-full text-center">No records found.</div>
          <CustomLink
            variant="primary"
            className=" text-white mx-auto mt-2"
            href={DEFAULT_REDIRECTS.roleManagement}
            text="Clear filters"
          />
        </>
      ) : (
        jobData.map((job, index) => (
          <Link
            href={`${DEFAULT_REDIRECTS.roleManagement}/${job.Role_Listing_ID}`}
          >
            <div
              key={index}
              role="roleCards"
              className="border border-gray-200 hover:border-gray-400 rounded-lg cursor-pointer p-4 mb-3"
            >
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex flex-row items-center space-x-2">
                    <h2 className="text-xl text-primary font-semibold line-clamp-1">
                      {job.Role_Listing_Name}
                    </h2>
                    <div className="text-xs text-gray-500">
                      {isDateInPast(job.Role_ExpiryDate) ? (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Expired
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    role="meta-list"
                    className="flex flex-row items-center tracking-tight"
                  >
                    <div role="meta-item" className="text-xs text-gray-500">
                      Posted 6 days ago
                    </div>
                    <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
                    <div
                      role="meta-item"
                      className="text-xs text-gray-500 line-clamp-1"
                    >
                      {job.Role_Name}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {job.Role_Listing_Desc}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
