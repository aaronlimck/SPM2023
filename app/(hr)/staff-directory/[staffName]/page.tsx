import { getSpecificStaffByName } from "@/lib/database/staffDirectory";
import { Info } from "lucide-react";
import { notFound } from "next/navigation";
import PersonalDetailsForm from "./personalDetailsForm";

interface StaffPageProps {
  staffName: string;
}

const SpecificStaffPage = async ({ params }: { params: StaffPageProps }) => {
  const Staff_FullName = params.staffName;

  const staffData = await getSpecificStaffByName(Staff_FullName);

  if (!staffData) {
    return notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold w-fit mb-4">Staff Details</h1>
      <div
        className="flex items-center p-4 text-sm text-gray-500 rounded-lg bg-gray-50 mb-4"
        role="alert"
      >
        <Info className="w-5 h-5 mr-2" />
        <div className="text-sm text-gray-500">
          To update your personal details, kindly access the{" "}
          <span className="text-primary font-medium">
            HR Management Systems (HRMS)
          </span>
          .
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium">Personal Details</p>
        <PersonalDetailsForm userData={staffData} />
      </div>

      {/* <RoleApplicationsTable applications={[]} /> */}
    </div>
  );
};

export default SpecificStaffPage;
