"use client";
import Button from "@/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

// Define the type for the component state
interface FormData {
  sort: string;
  roles: string[];
}

const RoleListingFilterForm = ({
  roles,
  params,
  onClose,
}: {
  roles: string[];
  params?: object;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [displayCount, setDisplayCount] = useState(8);
  const handleShowMoreClick = () => {
    // Increase the display count to show all roles
    setDisplayCount(roles.length);
  };

  const [formData, setFormData] = useState<FormData>({
    sort: searchParams.get("sort") || "latest",
    roles: searchParams.get("roles")?.split("&") || [],
  });

  const handleCheckboxChange = (role: string) => {
    // Toggle the selection of the role
    const updatedRoles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];

    setFormData({
      ...formData,
      roles: updatedRoles,
    });
  };

  // Handler for sort click
  const handleStatusClick = (selectedStatus: string) => {
    setFormData({
      ...formData,
      sort: selectedStatus,
    });
  };

  // Handler for Apply button click
  const handleApplyClick = () => {
    // Update params with the new status value
    if (params) {
      const updatedSearchParams = {
        ...params,
        sort: formData.sort,
        roles: formData.roles.join("&"),
      };

      // Convert the updatedSearchParams object to a query string
      const stringified = queryString.stringify(updatedSearchParams);

      router.push(`?${stringified}`, { scroll: true });
      // Call the onClose callback to close the dialog in the parent
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="space-y-6 px-4 pb-4">
      <div className="space-y-2 ">
        <p className="text-sm font-medium">Status</p>
        <div className="w-full flex flex-row items-center rounded-lg bg-accent cursor-pointer">
          <div
            className={`w-full text-sm text-center py-2.5 px-5 ${
              formData.sort === "latest"
                ? "bg-primary text-white rounded-lg"
                : null
            }`}
            onClick={() => handleStatusClick("latest")}
          >
            Latest
          </div>
          <div
            className={`w-full text-sm text-center py-2.5 px-5 ${
              formData.sort === "alphabeticalAsc"
                ? "bg-primary text-white rounded-lg"
                : null
            }`}
            onClick={() => handleStatusClick("alphabeticalAsc")}
          >
            Alphabetical (A-Z)
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Role</p>
        <div className="overflow-y-auto max-h-80">
          {roles.slice(0, displayCount).map((role, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                id={`checkbox-${index}`}
                type="checkbox"
                value={role}
                checked={formData.roles.includes(role)}
                onChange={() => handleCheckboxChange(role)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="ml-2 text-sm font-medium text-gray-900"
              >
                {role}
              </label>
            </div>
          ))}
          {displayCount < roles.length && (
            <button
              onClick={handleShowMoreClick}
              className="text-primary text-sm underline cursor-pointer"
            >
              Show More
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <p
          className="text-sm"
          onClick={() => setFormData({ sort: "latest", roles: [] })}
        >
          Reset
        </p>

        <Button
          variant="primary"
          type="button"
          text="Apply"
          onClick={handleApplyClick}
        />
      </div>
    </div>
  );
};

export default RoleListingFilterForm;
