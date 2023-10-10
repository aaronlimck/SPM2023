import Search from "@/components/ui/Search";
import { getAllStaffDirectory } from "@/lib/database/staffDirectory";
import Filter from "@/components/ui/Filter";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import StaffListingTable from "./staffListingTable";
import StaffLisitingCard from "./staffListingCard";

const StaffDirectoryPage = async ({
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

  const data = await getAllStaffDirectory(page, limit, search);

  return (
    <div className="w-full flex flex-col space-y-4 mb-4">
      <h1 className="text-2xl font-bold w-fit">Staff Directory</h1>
      <div className="text-sm text-gray-500 w-full flex flex-row justify-between items-center space-x-2">
        <Search
          placeholder="Search by name"
          search={search}
          callback={DEFAULT_REDIRECTS.staffDirectory}
        />
        <Filter></Filter>
      </div>
      <StaffLisitingCard className="md:hidden" staffData={data} />
      <StaffListingTable search={search} staffData={data} />
    </div>
  );
};

export default StaffDirectoryPage;
