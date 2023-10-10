import CustomLink from "@/components/ui/CustomLink";
import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllRoleListings } from "@/lib/database/roleListings";
import RoleListingHRTable from "./roleListingHRTable";
import RoleListingHRCard from "./roleListingHRCard";
import { PlusCircle } from "lucide-react";

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
            className="hidden sm:flex sm:w-fit"
            icon={<PlusCircle className="text-white w-4 h-4 mr-2" />}
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
      <RoleListingHRCard className="md:hidden" jobData={data} />
    </>
  );
};

export default JobListingPage;
