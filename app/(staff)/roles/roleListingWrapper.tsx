"use client";
import CustomLink from "@/components/ui/CustomLink";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import RoleListingCard from "./roleListingCard";
import RoleListingsDetailsForm from "./roleListingsDetailsForm";

interface RoleListingWrapperProps {
  jobData: Job[];
}

export default function RoleListingWrapper({
  jobData,
}: RoleListingWrapperProps) {
  const [selectedItem, setSelectedItem] = useState(
    jobData.length > 0 ? jobData[0] : null
  );

  // Get the device type
  const { device } = useMediaQuery();

  const handleCardClick = (roleId: number) => {
    // Set the selected item to user click
    const selectedJob = jobData.find((item) => item.Role_Listing_ID === roleId);
    // Check if selectedJob is defined, otherwise use first item in the array results
    setSelectedItem(selectedJob || jobData[0]);
  };

  return (
    <>
      {jobData.length === 0 ? (
        <div className="text-center">
          No records found.
          <CustomLink
            variant="primary"
            className=" text-white mx-auto mt-2"
            href={DEFAULT_REDIRECTS.roleListing}
            text="Clear filters"
          />
        </div>
      ) : (
        <div className="grid grid-col-1 lg:grid-cols-3 gap-3">
          <div role="roleItems">
            {jobData.map((item, index) => (
              <RoleListingCard
                key={index}
                roleId={item.Role_Listing_ID}
                roleTitle={item.Role_Listing_Name}
                roleDescription={item.Role_Listing_Desc}
                roleName={item.Role_Name}
                roleExpiredOn={item.Role_ExpiryDate}
                roleCreatedAt={item.createdAt}
                onClick={handleCardClick}
                deviceType={device}
              />
            ))}
          </div>
          <div
            role="roleDetails"
            className={`hidden lg:flex lg:flex-col lg:col-span-2 border border-gray-200 rounded-lg space-y-4 p-4 w-full h-fit`}
          >
            {/* @ts-ignore */}
            <RoleListingsDetailsForm data={selectedItem} />
          </div>
        </div>
      )}
    </>
  );
}
