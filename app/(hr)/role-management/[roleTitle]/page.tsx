import CustomLink from "@/components/ui/CustomLink";
import { getAllRoleApplicationsByRoleListingId } from "@/lib/database/roleApplications";
import { getSpecificRoleListing } from "@/lib/database/roleListings";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import { RoleApplicationsTable } from "../../../../components/roleListing/roleApplicationsTable";

interface RoleListingsProps {
  roleTitle: string;
}

const SpecificRolePage = async ({ params }: { params: RoleListingsProps }) => {
  const Role_Listing_ID = params.roleTitle;

  const data = await getSpecificRoleListing(parseInt(Role_Listing_ID));

  const applications = await getAllRoleApplicationsByRoleListingId(
    parseInt(Role_Listing_ID)
  );

  if (!data) {
    return notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-2xl font-bold capitalize">
              {data?.Role_Listing_Name}
            </h1>
            <div role="meta-list" className="flex flex-row items-center">
              <div
                role="meta-item"
                className="text-sm text-gray-500 tracking-tight"
              >
                Job ID {data?.Role_Listing_ID}
              </div>
              <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
              <div
                role="meta-item"
                className="text-sm text-gray-500 tracking-tight"
              >
                Posted 6 days ago
              </div>
              <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
              <div
                role="meta-item"
                className="text-sm text-gray-500 tracking-tight"
              >
                {data?.Role_Name}
              </div>
            </div>
          </div>

          <CustomLink
            href={`update/${[data?.Role_Listing_ID]}`}
            variant="primary"
            className="w-full sm:w-fit"
            text="Edit"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium">Job Description</h3>
          <p className="text-primary">{data?.Role_Listing_Desc}</p>
        </div>
      </div>

      <RoleApplicationsTable applications={applications} />
    </div>
  );
};

export default SpecificRolePage;
