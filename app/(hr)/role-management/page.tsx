import CustomLink from "@/components/ui/CustomLink";
import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllRoleListings } from "@/lib/database/roleListings";
import RoleListingHRTable from "./roleListingHRTable";

const JobListingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const data = await getAllRoleListings(page, limit, search);

  return (
    <>
      <div className="w-full flex flex-col space-y-4 mb-4">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
          <h1 className="text-2xl font-bold">Role Listings Management</h1>
          <CustomLink
            href={DEFAULT_REDIRECTS.roleLisitingCreation}
            variant="primary"
            className="w-full sm:w-fit"
            text="Create"
          />
        </div>
        <div className="text-sm text-gray-500 w-full flex flex-row justify-between items-center space-x-2">
          <Search
            placeholder="Search by role"
            search={search}
            callback={DEFAULT_REDIRECTS.roleManagement}
          />
          <Filter></Filter>
        </div>
      </div>
      <RoleListingHRTable className="hidden md:flex flex-col" jobData={data} />
    </>
  );
};

export default JobListingPage;
