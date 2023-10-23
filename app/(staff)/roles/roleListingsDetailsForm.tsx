"use client";
import SkillBadge from "@/components/roleListing/SkillsBadge";
import Button from "@/components/ui/Button";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { formatDateDifference, isLessThanDayAgo } from "@/lib/utils";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Toaster, toast } from "sonner";

interface roleListingsDetailsFormProps {
  Role_Listing_ID: number;
  Role_Listing_Name: string;
  Role_Listing_Desc: string;
  Role_Name: string;
  Role_Desc?: string;
  Role_Skills?: string[];
  Role_ExpiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function RoleListingsDetailsForm({
  data,
  staffSkills,
  direct,
}: {
  data: roleListingsDetailsFormProps;
  staffSkills?: string[];
  direct?: boolean;
}) {
  // GET USER ID
  const { data: session } = useSession();
  const userId = parseInt(session?.user.id!);

  const apiUrl = "http://localhost:3000/api/createRoleApplication";

  const postData = {
    Role_Listing_Id: data?.Role_Listing_ID,
    Staff_ID: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleSubmit = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Check for success in the response and show toast only if successful
        if (data && data.success) {
          toast.success("Application submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
        // Optionally, show an error toast
        toast.error("Error submitting application");
      });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          {direct ? (
            <h2 className="text-xl font-semibold group-hover:underline">
              {data?.Role_Listing_Name}
            </h2>
          ) : (
            <Link
              className="flex flex-row items-center group"
              target="_blank"
              href={`${DEFAULT_REDIRECTS.roleListing}/${data?.Role_Listing_ID}`}
            >
              <h2 className="text-xl font-semibold group-hover:underline">
                {data?.Role_Listing_Name}
              </h2>
              <ExternalLinkIcon className="text-primary w-4 h-4 ml-2" />
            </Link>
          )}

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
              Posted {formatDateDifference(data?.createdAt)}
            </div>
            <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
            <div
              role="meta-item"
              className="text-sm text-gray-500 tracking-tight"
            >
              {data?.Role_Name}
            </div>

            <div role="meta-item">
              {isLessThanDayAgo(data?.createdAt) ? (
                <div className="flex flex-row items-center">
                  <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    New
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <Button
          className="hidden sm:flex"
          variant="primary"
          type="button"
          text="Apply"
          onClick={handleSubmit}
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold">Role Listing Description</h3>
        <p className="text-primary tracking-tight">{data?.Role_Listing_Desc}</p>
      </div>

      {data?.Role_Skills && data?.Role_Skills.length > 0 ? (
        <div className="space-y-1">
          <h3 className="text-sm font-bold">
            Skills Required for Role Listing
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.Role_Skills.map((skill, index) => {
              // Check if the skill is in StaffSkill
              const isSkillInStaffSkill = staffSkills?.includes(skill);

              return (
                <SkillBadge
                  key={index}
                  hasSkill={isSkillInStaffSkill!}
                  skill={skill}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Display for Mobile */}
      <Button
        className="w-full sm:hidden"
        variant="primary"
        type="button"
        text="Apply"
        onClick={handleSubmit}
      />

      <Toaster position="top-right" />
    </div>
  );
}
