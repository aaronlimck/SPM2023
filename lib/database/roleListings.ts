import prisma from "@/lib/prisma";
import { skip } from "node:test";

export async function getAllRoleListings(
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery: string
) {
  try {
    const skip = (pageNumber - 1) * pageLimit;

    const roles = await prisma.role.findMany({
      orderBy: [
        {
          Role_Name: "asc",
        },
      ],
      skip: skip,
      take: pageLimit,
      where: {
        Role_Name: {
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

export const getSpecificRoleListing = async (Role_Name: string) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        Role_Name: Role_Name,
      },
    });
    return role;
  } catch (error) {
    console.error("Error fetching role listing:", error);
    throw error;
  }
};

export const getAllActiveRoleListings = async (
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery: string
) => {
  try {
    const skip = (pageNumber - 1) * pageLimit;
    const currentDate = new Date();

    const roles = await prisma.role.findMany({
      where: {
        Role_ExpiryDate: {
          gte: currentDate, // Filter out roles with expiry dates greater than or equal to the current date
        },
      },
      orderBy: {
        createdDate: "asc", // Sort by createdAt in descending order
      },
    });

    return roles;
  } catch (error) {
    console.error("Error fetching role listings:", error);
    throw error;
  }
};
