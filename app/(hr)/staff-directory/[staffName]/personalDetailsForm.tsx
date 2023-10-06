"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";

function PersonalDetailsForm({ userData }: { userData: Staff }) {
  // Initialize state to store form input values
  const Staff_ID = userData?.Staff_ID;

  const [formData, setFormData] = useState({
    fName: userData.Staff_FName || "",
    lName: userData.Staff_LName || "",
    dept: userData.Dept || "",
    email: userData.Email || "",
    accessRights: userData.Access_Rights || "",
    skills: userData.Staff_Skills || "",
  });

  return (
    <form className="mt-3 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            id="fName"
            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            placeholder="First Name"
            value={formData.fName} // Set input value from state
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="lName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lName"
            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            placeholder="Last Name"
            value={formData.lName} // Set input value from state
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            placeholder="Email"
            value={formData.email} // Set input value from state
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="dept"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Department
          </label>
          <input
            type="text"
            id="dept"
            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            placeholder="Access Right"
            value={formData.dept} // Set input value from state
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="accessRights"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Access Right
          </label>
          <input
            type="text"
            id="accessRights"
            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            placeholder="Access Right"
            value={formData.accessRights} // Set input value from state
            disabled
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="skills"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Skills
        </label>
        <div className="bg-[#fafafa] border border-gray-200 rounded-lg cursor-not-allowed p-2.5">
          {Array.isArray(formData.skills) && formData.skills.length > 0 ? (
            formData.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No skills provided</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        text="Update"
        className="w-full md:w-fit cursor-not-allowed"
        disabled
      />
    </form>
  );
}

export default PersonalDetailsForm;
