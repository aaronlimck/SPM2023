import prisma from "@/lib/prisma";
import { Role_Listing } from "@prisma/client";

export async function getAllRoleListings(
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery: string,
  roleFilter: string,
  status: string | null = null // 'expired' or 'active', or null for all
) {
  try {
    const skip = (pageNumber - 1) * pageLimit;
    const currentDate = new Date();

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
        // Filter by RoleName in roleFilter
        ...(roleFilter && {
          Role_Name: {
            in: roleFilter.split("&").map((role) => role.trim()),
          },
        }),
        // Additional conditions based on statusType
        ...(status === "expired" && {
          Role_ExpiryDate: {
            lt: currentDate,
          },
        }),
        ...(status === "active" && {
          Role_ExpiryDate: {
            gt: currentDate,
          },
        }),
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
                Skill_Name: true,
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
      include: {
        Role: {
          select: {
            Role_Desc: true,
            roleSkills: {
              select: {
                Skill_Name: true,
              },
            },
          },
        },
      },
    });

    const remappedResult = role
      ? {
          Role_Listing_ID: role.Role_Listing_ID,
          Role_Listing_Name: role.Role_Listing_Name,
          Role_Listing_Desc: role.Role_Listing_Desc,
          Role_Name: role.Role_Name,
          Role_Desc: role.Role && role.Role.Role_Desc,
          Role_Skills:
            role.Role && role.Role.roleSkills.map((skill) => skill.Skill_Name),
          Role_ExpiryDate: role.Role_ExpiryDate,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        }
      : null;
    return remappedResult;
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
