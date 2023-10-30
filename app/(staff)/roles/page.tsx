import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { authConfig } from "@/lib/auth";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllActiveRoleListings } from "@/lib/database/roleListings";
import { getAllRolesCategoryName } from "@/lib/database/roles";
import { getSpecificStaffSkillsByID } from "@/lib/database/staffDirectory";
import { getServerSession } from "next-auth";
import RoleListingFilterForm from "./roleListingFilterForm";
import RoleListingWrapper from "./roleListingWrapper";

const RoleListingsPage = async ({
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
  const sortBy =
    typeof searchParams.sort === "string" ? searchParams.sort : "latest";

  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  const data = await getAllActiveRoleListings(
    page,
    limit,
    search,
    roleFilter,
    sortBy
  );
  const { Staff_Skills } = await getSpecificStaffSkillsByID(parseInt(userId!));
  const roles = await getAllRolesCategoryName();

  return (
    <>
      <div className="w-full flex flex-col mb-4 space-y-4">
        <h1 className="text-2xl font-bold w-fit">Role Listings</h1>
        <div className="text-sm text-gray-500 w-full flex flex-row justify-between items-center space-x-2">
          <Search
            placeholder="Search by role"
            search={search}
            callback={DEFAULT_REDIRECTS.roleListing}
          />

          <Filter>
            <RoleListingFilterForm roles={roles} params={searchParams} />
          </Filter>
        </div>

        <RoleListingWrapper jobData={data} staffSkills={Staff_Skills} />
      </div>
    </>
  );
};

export default RoleListingsPage;
