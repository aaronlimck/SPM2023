import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getAllActiveRoleListings } from "@/lib/database/roleListings";
import RoleListingWrapper from "./roleListingWrapper";

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

  const data = await getAllActiveRoleListings(page, limit, search);
  console.log(data);
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
          <Filter></Filter>
        </div>

        <RoleListingWrapper jobData={data} />
      </div>
    </>
  );
};

export default RoleListingsPage;
