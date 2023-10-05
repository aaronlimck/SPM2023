import Button from "@/components/ui/Button";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { isLessThanDayAgo } from "@/lib/utils";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface roleListingsDetailsFormProps {
  Role_Listing_ID: number;
  Role_Listing_Name: string;
  Role_Listing_Desc: string;
  Role_Name: string;
  Role_Desc: string;
  Role_ExpiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function RoleListingsDetailsForm({
  className,
  data,
}: {
  className?: string;
  data: roleListingsDetailsFormProps;
}) {
  console.log(data);
  return (
    <div
      role="roleDetails"
      className={`hidden lg:flex lg:flex-col lg:col-span-2 border border-gray-200 rounded-lg space-y-4 p-4 w-full h-fit ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <Link
            className="flex flex-row items-center"
            target="_blank"
            href={`${DEFAULT_REDIRECTS.roleListing}/${data?.Role_Listing_ID}`}
          >
            <h2 className="text-xl font-semibold hover:underline">
              {data?.Role_Listing_Name}
            </h2>
            <ExternalLinkIcon className="text-primary w-4 h-4 ml-2" />
          </Link>
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
        <Button variant="primary" type="button" text="Apply" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium">Job Description</h3>
        <p className="text-sm text-primary">{data?.Role_Listing_Desc}</p>
      </div>
    </div>
  );
}