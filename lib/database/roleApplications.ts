import { Role_Listing_Application } from "@prisma/client";
import prisma from "@/lib/prisma";

export const createRoleApplication = async (data: Role_Listing_Application) => {
  try {
    // Check if an entry with the same staff ID and Role_Listing_Id already exists
    const existingApplication = await prisma.role_Listing_Application.findFirst(
      {
        where: {
          Staff_ID: data.Staff_ID,
          Role_Listing_Id: data.Role_Listing_Id,
        },
      }
    );

    if (existingApplication) {
      // Handle the case where an entry with the same staff ID and Role_Listing_Id already exists
      console.error(
        "Error: Entry with the same staff ID and Role_Listing_Id already exists"
      );
      throw new Error("Duplicate entry");
    }

    // If no duplicate entry, create a new entry
    const roleApplication = await prisma.role_Listing_Application.create({
      data,
    });

    return roleApplication;
  } catch (error) {
    console.error("Error creating role application:", error);
    throw error;
  }
};
