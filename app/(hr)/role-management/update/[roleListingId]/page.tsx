import { getAllRolesCategoryName } from "@/lib/database/roles";
import RoleListingForm from "../../roleListingForm";
import { getSpecificRoleListing } from "@/lib/database/roleListings";

interface UpdateRoleListingProps {
  roleListingId: string;
}

const UpdateRoleListingPage = async ({
  params: { roleListingId },
}: {
  params: UpdateRoleListingProps;
}) => {
  try {
    const [availableRoles, roleListingData] = await Promise.all([
      getAllRolesCategoryName(),
      getSpecificRoleListing(parseInt(roleListingId)),
    ]);

    return (
      <div className="w-full max-w-5xl mx-auto">
        <RoleListingForm
          availableRoles={availableRoles}
          updateRoleListingData={roleListingData}
        />
      </div>
    );
  } catch (error) {
    // Handle errors here
    console.error("Error fetching data:", error);
  }
};

export default UpdateRoleListingPage;
