import CustomLink from "@/components/ui/CustomLink";
import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllRoleListings } from "@/lib/database/roleListings";
import { PlusCircle } from "lucide-react";
import RoleListingHRCard from "./roleListingHRCard";
import RoleListingHRTable from "./roleListingHRTable";
import RoleManagementFilterForm from "./roleManagementFilterForm";
import { getAllRolesCategoryName } from "@/lib/database/roles";

const JobListingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 1000;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const roleFilter =
    typeof searchParams.roles === "string" ? searchParams.roles : "";
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "";

  const data = await getAllRoleListings(
    page,
    limit,
    search,
    roleFilter,
    status
  );
  const roles = await getAllRolesCategoryName();

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

          <Filter>
            <RoleManagementFilterForm roles={roles} params={searchParams} />
          </Filter>
        </div>
      </div>

      <RoleListingHRTable className="hidden md:flex flex-col" jobData={data} />
      <RoleListingHRCard className="md:hidden" jobData={data} />
    </>
  );
};

export default JobListingPage;
