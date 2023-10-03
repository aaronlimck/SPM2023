import { isDateInPast, isLessThanDayAgo } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobListing({
  RoleListingName,
  RoleDesc,
  RoleSkills,
  ExpiredOn,
  createdAt,
}: {
  RoleListingName: string;
  RoleDesc: string;
  RoleSkills?: string[];
  ExpiredOn: Date;
  createdAt: Date;
}) {
  const maxSkillsToShow = 2;
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${encodeURIComponent(RoleListingName.toLowerCase())}`}
    >
      <div className="border border-gray-200 hover:border-gray-400 rounded-lg space-y-3 p-4">
        <div className="space-y-1">
          <div className="flex flex-row items-center space-x-2">
            <h2 className="text-xl text-primary font-medium line-clamp-1">
              {RoleListingName}
            </h2>
            {isLessThanDayAgo(createdAt) ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                New
              </span>
            ) : null}

            {isDateInPast(ExpiredOn) ? (
              <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                Expired
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{RoleDesc}</p>
        </div>
        {/* <div role="roleSkillsGroup" className="flex flex-wrap gap-2">
        {RoleSkills.slice(0, maxSkillsToShow).map((skill, index) => (
          <span
            key={index}
            className="bg-accent text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {skill}
          </span>
        ))}
        {RoleSkills.length > maxSkillsToShow && (
          <span className="bg-accent text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded">
            +{RoleSkills.length - maxSkillsToShow} more
          </span>
        )}
      </div> */}
      </div>
    </Link>
  );
}
