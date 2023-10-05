import { getSpecificRoleListing } from "@/lib/database/roleListings";
import RoleListingsDetailsForm from "../roleListingsDetailsForm";
import { notFound } from "next/navigation";

interface SpecificRoleDetailsPageProps {
  roleId: string;
}

const SpecificRoleDetailsPage = async ({
  params,
}: {
  params: SpecificRoleDetailsPageProps;
}) => {
  const Role_Listing_ID = params.roleId;

  const data = await getSpecificRoleListing(parseInt(Role_Listing_ID));
  if (!data) {
    return notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <RoleListingsDetailsForm data={data} />
    </div>
  );
};

export default SpecificRoleDetailsPage;
