import { DEFAULT_REDIRECTS } from "@/lib/constants";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { formatDateDifference, isLessThanDayAgo } from "@/lib/utils";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface roleListingCardProps {
  roleId: number;
  roleTitle: string;
  roleDescription: string;
  roleName: string;
  roleExpiredOn: Date;
  roleCreatedAt: Date;
  onClick: (roleId: number) => void;
  deviceType: string | null;
}

export default function RoleListingCard({
  roleId,
  roleTitle,
  roleDescription,
  roleName,
  roleExpiredOn,
  roleCreatedAt,
  onClick,
  deviceType,
}: roleListingCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // Call the function passed from the parent with the roleId parameter
    if (deviceType !== "tablet") onClick(roleId);

    if (deviceType === "tablet" || deviceType === "mobile")
      router.push(`${DEFAULT_REDIRECTS.roleListing}/${roleId}`);
  };

  return (
    <div
      key={roleId}
      className="border border-gray-200 hover:border-gray-400 rounded-lg cursor-pointer p-4 mb-3"
      onClick={handleClick}
    >
      <div className="space-y-2">
        <div className="space-y-0.5">
          <div className="flex flex-row items-center space-x-2">
            <h2 className="text-xl text-primary font-semibold line-clamp-1">
              {roleTitle}
            </h2>
            {isLessThanDayAgo(roleCreatedAt) ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                New
              </span>
            ) : null}
          </div>
          <div
            role="meta-list"
            className="flex flex-row items-center tracking-tight"
          >
            <div role="meta-item" className="text-xs text-gray-500">
              Job ID {roleId}
            </div>
            <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
            <div role="meta-item" className="text-xs text-gray-500">
              Posted {formatDateDifference(roleCreatedAt)}
            </div>
            <DividerVerticalIcon className="text-gray-500 w-4 h-4" />
            <div
              role="meta-item"
              className="text-xs text-gray-500 line-clamp-1"
            >
              {roleName}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">{roleDescription}</p>
      </div>
    </div>
  );
}
