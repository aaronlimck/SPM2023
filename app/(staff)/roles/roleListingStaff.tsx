"use client";
import JobListingCard from "@/components/roleListing/roleListingCard";

interface JobListingStaffProps {
  search: string | undefined;
  jobData: Job[];
}

export default function JobListingStaff({
  search,
  jobData,
}: JobListingStaffProps) {
  const filteredJobs = search
    ? jobData.filter((job) =>
        job.Role_Name.toLowerCase().includes(search.toLowerCase())
      )
    : jobData;

  return (
    <div className="mb-6">
      {filteredJobs.length > 0 && (
        <p className="text-sm text-gray-500 ml-1 mb-3">
          {filteredJobs.length} results found
        </p>
      )}
      <div className="grid content-start [--column-gap:12px] md:[--column-gap:16px] gap-x-[--column-gap] gap-y-4 [--min-column-width:260px] md:[--min-column-width:320px] lg:[--min-column-width:320px] [--max-column-count:6] [--total-gap-width:calc((var(--max-column-count)-1)*var(--column-gap))] [--max-column-width:calc((100%-var(--total-gap-width))/var(--max-column-count))] grid-cols-[repeat(auto-fill,minmax(max(var(--min-column-width),var(--max-column-width)),1fr))]">
        {filteredJobs.length > 0 && (
          <>
            {filteredJobs.map((job, index) => (
              <JobListingCard
                key={index}
                RoleListingName={job.Role_Listing_Name}
                RoleDesc={job.Role_Desc || "Default Description"} // Provide a default value or handle undefined case
                ExpiredOn={job.Role_ExpiryDate}
                createdAt={job.createdAt}
              />
            ))}
          </>
        )}
      </div>

      {filteredJobs.length === 0 && (
        <>
          <p className="text-sm text-gray-500 ml-1 mb-3">
            {filteredJobs.length} results found
          </p>

          <div className="flex flex-col justify-center items-center text-center w-full max-w-xs md:max-w-lg mx-auto px-8 md:px-0 py-20 space-y-2">
            <p className="font-medium text-lg">
              Sorry, we couldn't find any roles matching your criteria.
            </p>
            <p className="text-gray-500">
              Try using simpler search terms and then filtering the results.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
