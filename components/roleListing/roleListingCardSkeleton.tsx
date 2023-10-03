import React from "react";

interface JobListingCardSkeletonProps {
  // Define any props if needed
}

const JobListingCardSkeleton: React.FC<JobListingCardSkeletonProps> = () => {
  // Create an array with 10 elements to represent each card
  const skeletons = Array.from({ length: 8 }, (_, index) => (
    <div
      key={index}
      className="border border-gray-200 rounded-lg space-y-3 p-4"
    >
      <div className="animate-pulse">
        <div className="h-5 w-3/4 bg-gray-200 rounded-full mb-3"></div>
        <div className="h-2.5 bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {skeletons}
    </div>
  );
};

export default JobListingCardSkeleton;
