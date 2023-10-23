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

export const getAllRoleApplicationsByRoleListingId = async (
  RoleListingID: number
) => {
  try {
    const roleApplications = await prisma.role_Listing_Application.findMany({
      where: {
        Role_Listing_Id: RoleListingID,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Staff: {
          select: {
            Staff_FName: true,
            Staff_LName: true,
            Staff_Skills: {
              // Include the Staff_Skills table
              select: {
                Skill_Name: true, // Select the Skill_Name field
              },
            },
          },
        },
      },
    });

    // Remap the result
    const remappedResult = roleApplications.map((application) => ({
      Role_Listing_Application_Id: application.Role_Listing_Application_Id,
      Role_Listing_Id: application.Role_Listing_Id,
      Role_Listing_createdAt: application.createdAt,
      Staff_ID: application.Staff_ID,
      Staff_FName: application.Staff.Staff_FName,
      Staff_LName: application.Staff.Staff_LName,
      Staff_Skills: application.Staff.Staff_Skills.map(
        (skill) => skill.Skill_Name
      ),
    }));

    return remappedResult;
  } catch (error) {
    console.error("Error fetching role applications:", error);
    throw error;
  }
};