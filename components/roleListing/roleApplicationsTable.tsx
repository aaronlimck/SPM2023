import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ApplicationsProps {
  Role_Listing_Application_Id: number;
  Role_Listing_Id: number;
  Role_Listing_createdAt: Date;
  Staff_ID: number;
  Staff_FName: string;
  Staff_LName: string;
}

interface RoleApplicationsTableProps {
  applications: ApplicationsProps[];
}

export function RoleApplicationsTable({
  applications,
}: RoleApplicationsTableProps) {
  return (
    <div>
      <p className="text-lg font-medium mb-3">Applications</p>
      <table className={`w-full text-sm text-left text-gray-500 mb-4`}>
        {applications.length === 0 ? (
          <div className="w-full border border-gray-200 rounded-lg text-gray-500 text-sm flex justify-center items-center p-6 select-none">
            No applications
          </div>
        ) : (
          <thead className="text-xs text-gray-700 uppercase bg-accent">
            <tr>
              <th scope="col" className="px-4 py-3">
                <span className="flex items-center px-2">
                  Applicant Full Name
                </span>
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="flex flex-row items-center">Applied On</span>
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="flex flex-row items-center">Score</span>
              </th>
            </tr>
          </thead>
        )}

        <tbody>
          {applications.map((application, index) => (
            <tr key={index} className={`bg-white border-b`}>
              <td className="px-4 py-3">
                <Link
                  href={`${DEFAULT_REDIRECTS.staffDirectory}/${application.Staff_FName}-${application.Staff_LName}`}
                >
                  <span className="flex items-center px-2">
                    {application.Staff_FName} {application.Staff_LName}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-3">
                <span className="flex flex-row items-center">
                  {/* @ts-ignore */}
                  {formatDate(application.Role_Listing_createdAt)}
                </span>
              </td>

              <td className="px-6 py-3">
                <span className="flex flex-row items-center"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
