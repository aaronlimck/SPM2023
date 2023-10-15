import { getSpecificRoleListing } from "@/lib/database/roleListings";
import RoleListingsDetailsForm from "../roleListingsDetailsForm";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getSpecificStaffSkillsByID } from "@/lib/database/staffDirectory";

interface SpecificRoleDetailsPageProps {
  roleId: string;
}

const SpecificRoleDetailsPage = async ({
  params,
}: {
  params: SpecificRoleDetailsPageProps;
}) => {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  const Role_Listing_ID = params.roleId;

  const data = await getSpecificRoleListing(parseInt(Role_Listing_ID));
  const { Staff_Skills } = await getSpecificStaffSkillsByID(parseInt(userId!));

  if (!data) {
    return notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <RoleListingsDetailsForm
        data={data}
        staffSkills={Staff_Skills}
        direct={true}
      />
    </div>
  );
};

export default SpecificRoleDetailsPage;
