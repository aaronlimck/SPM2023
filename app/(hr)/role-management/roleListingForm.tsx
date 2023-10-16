"use client";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { dateTimeToDate, dateToDateTime, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { usePathname } from "next/navigation";
import { format } from "path";

type RoleListing = {
  Role_Listing_ID: number;
  Role_Listing_Name: string;
  Role_Listing_Desc: string;
  Role_Name: string;
  Role_ExpiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

function TempForm({
  availableRoles,
  updateRoleListingData,
}: {
  availableRoles: string[];
  updateRoleListingData?: RoleListing | null;
}) {
  const [formData, setFormData] = useState({
    selectedRole: updateRoleListingData?.Role_Name || "",
    roleName: updateRoleListingData?.Role_Listing_Name || "",
    roleDescription: updateRoleListingData?.Role_Listing_Desc || "",
    expiryDate: updateRoleListingData?.Role_ExpiryDate
      ? dateTimeToDate(updateRoleListingData?.Role_ExpiryDate)
      : "",
  });

  const router = useRouter();
  const pathname = usePathname();
  const isUpdate = pathname.includes("/role-management/update");

  // Get the current date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];

  const handleSelectChange = (selectedValue: string) => {
    setFormData({ ...formData, selectedRole: selectedValue });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      Role_Listing_Name: formData.roleName,
      Role_Listing_Desc: formData.roleDescription,
      Role_Name: formData.selectedRole,
      // @ts-ignore
      Role_ExpiryDate: dateToDateTime(formData.expiryDate),
    };
    createRoleListing(data);
  };

  const updateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    const todayDate = new Date().toISOString().split("T")[0];
    const data = {
      Role_Listing_ID: updateRoleListingData?.Role_Listing_ID,
      Role_Listing_Name: formData?.roleName,
      Role_Listing_Desc: formData?.roleDescription,
      Role_Name: formData?.selectedRole,
      Role_ExpiryDate: dateToDateTime(formData?.expiryDate),
      createdAt: updateRoleListingData?.createdAt,
      updatedAt: dateToDateTime(todayDate),
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/updateRoleListing",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.status === 200 && result.success) {
        // Show toast for successful update
        toast.success("Role listing updated successfully!");
        router.push(`${DEFAULT_REDIRECTS.roleManagement}`);
      }

      return result;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create role listing. Please try again.");
    }
  };

  const createRoleListing = async (data: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/createRoleListing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.status === 201 && result.success) {
        // Show toast for successful creation
        toast.success("Role listing created successfully!");
        router.push(`${DEFAULT_REDIRECTS.roleManagement}`);
      } else {
        // Handle other cases if needed
      }

      return result;
    } catch (error) {
      // Handle errors and show toast if necessary
      console.error(error);
      toast.error("Failed to create role listing. Please try again.");
    }
  };

  return (
    <form className="mt-3 space-y-8">
      <div>
        <div className="space-y-2">
          <h2 className="tracking-tight text-gray-500 font-medium">
            Tell us more about the role
          </h2>
          <hr className="pb-4" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Select Role
          </label>
          <Select onValueChange={(value) => handleSelectChange(value)}>
            <SelectTrigger className="outline-none">
              <SelectValue
                className="placeholder:text-gray-500 text-gray-500"
                placeholder={
                  formData.selectedRole !== ""
                    ? formData.selectedRole
                    : "Select a role"
                }
              />
            </SelectTrigger>
            <SelectContent className="bg-white h-[200px]" align="start">
              {availableRoles.map((role) => {
                return (
                  <SelectItem
                    key={role}
                    className="cursor-pointer"
                    value={role}
                  >
                    {role}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <h2 className="tracking-tight text-gray-500 font-medium">
            Tell us more about the role
          </h2>
          <hr className="pb-4" />
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="roleName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Role Listing Name
            </label>
            <input
              type="text"
              id="roleName"
              name="roleName"
              value={formData.roleName}
              onChange={handleInputChange}
              className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Role Name"
            />
          </div>
          <div>
            <label
              htmlFor="roleDescription"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Role Listing Description
            </label>
            <textarea
              id="roleDescription"
              name="roleDescription"
              value={formData.roleDescription}
              onChange={handleInputChange}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="roleExpiry"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Role Listing Expiry
            </label>
            <input
              type="date"
              id="roleExpiry"
              name="expiryDate"
              min={today}
              // @ts-ignore
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        text={isUpdate ? "Update" : "Create"}
        className="w-full md:w-fit"
        onClick={isUpdate ? updateListing : handleSubmit}
      />

      <Toaster position="top-right" />
    </form>
  );
}

export default TempForm;
