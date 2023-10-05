"use client";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
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

      <RoleListingsDetailsForm data={selectedItem} />
    </div>
  );
}
