import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllActiveRoleListings } from "@/lib/database/roleListings";
import RoleListingWrapper from "./roleListingWrapper";
import { getSpecificStaffSkillsByID } from "@/lib/database/staffDirectory";
import { ListFilterIcon } from "lucide-react";

const RoleListingsPage = async ({
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

  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  const data = await getAllActiveRoleListings(page, limit, search);
  // @ts-ignore
  const { Staff_Skills } = await getSpecificStaffSkillsByID(parseInt(userId));

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
          <div className="border rounded-lg flex flex-row items-center cursor-pointer text-base sm:text-sm text-gray-500 hover:text-gray-800 py-2 px-3">
            <ListFilterIcon className="w-4 h-4 mr-1" />
            <p>Filter</p>
          </div>
        </div>

        <RoleListingWrapper jobData={data} staffSkills={Staff_Skills} />
      </div>
    </>
  );
};

export default RoleListingsPage;
