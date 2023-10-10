import prisma from "@/lib/prisma";
import { Role_Listing } from "@prisma/client";

export async function getAllRoleListings(
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery: string
) {
  try {
    const skip = (pageNumber - 1) * pageLimit;

    const roles = await prisma.role_Listing.findMany({
      orderBy: [
        {
          Role_Listing_Name: "asc",
        },
      ],
      skip: skip,
      take: pageLimit,
      where: {
        Role_Listing_Name: {
          contains: searchRoleQuery, // Use 'contains' to perform a partial match
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    return roles;
  } catch (error) {
    // Handle the error here, you can log it or return an error message as needed.
    console.error("Error fetching role listings:", error);
    throw error; // Rethrow the error to propagate it to the caller.
  }
}

export const getAllActiveRoleListings = async (
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery = ""
) => {
  try {
    const skip = (pageNumber - 1) * pageLimit;
    const currentDate = new Date();

    const roles = await prisma.role_Listing.findMany({
      where: {
        Role_ExpiryDate: {
          gte: currentDate,
        },
        Role_Listing_Name: {
          contains: searchRoleQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Role: {
          select: {
            Role_Desc: true,
            roleSkills: {
              select: {
                // Include the fields you need from the Role_Skill table
                // For example:
                Skill_Name: true,
                // Add other fields as needed
              },
            },
          },
        },
      },
    });

    const remappedResult = roles.map((role) => ({
      Role_Listing_ID: role.Role_Listing_ID,
      Role_Listing_Name: role.Role_Listing_Name,
      Role_Listing_Desc: role.Role_Listing_Desc,
      Role_Name: role.Role_Name,
      Role_Desc: role.Role.Role_Desc,
      Role_Skills: role.Role.roleSkills.map((skill) => skill.Skill_Name),
      Role_ExpiryDate: role.Role_ExpiryDate,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    }));

    return remappedResult;
  } catch (error) {
    console.error("Error fetching role listings:", error);
    throw error;
  }
};

export const getSpecificRoleListing = async (Role_Listing_ID: number) => {
  try {
    const role = await prisma.role_Listing.findFirst({
      where: {
        Role_Listing_ID: Role_Listing_ID,
      },
    });
    return role;
  } catch (error) {
    console.error("Error fetching role listing:", error);
    throw error;
  }
};

export const createRoleListing = async (data: Role_Listing) => {
  try {
    const newRoleListing = await prisma.role_Listing.create({
      data,
    });
    return newRoleListing;
  } catch (error) {
    console.error("Error creating role listing:", error);
    throw error;
  }
};
