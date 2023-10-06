import { getSpecificStaffByName } from "@/lib/database/staffDirectory";
import PersonalDetailsForm from "./personalDetailsForm";
import { Info } from "lucide-react";
import { notFound } from "next/navigation";

interface StaffPageProps {
  staffName: string;
}

const SpecificStaffPage = async ({ params }: { params: StaffPageProps }) => {
  const Staff_FullName = params.staffName;

  const data = await getSpecificStaffByName(Staff_FullName);

  if (!data) {
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
        <PersonalDetailsForm userData={data} />
      </div>

      <div>
        <p className="text-lg font-medium mb-3">Applications</p>
        <div className="border border-gray-200 rounded-lg text-gray-500 text-sm flex justify-center items-center p-6 select-none">
          No Applications
        </div>
      </div>
    </div>
  );
};

export default SpecificStaffPage;
