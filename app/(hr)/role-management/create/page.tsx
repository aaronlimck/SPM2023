import { getAllRolesCategoryName } from "@/lib/database/roles";
import RoleListingForm from "../roleListingForm";

export default async function CreateRoleListings() {
  const availableRoles = await getAllRolesCategoryName();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold w-fit mb-4">Create Role Listings</h1>
      <RoleListingForm availableRoles={availableRoles} />
    </div>
  );
}
