import prisma from "@/lib/prisma";

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
        Role_Name: {
          contains: searchRoleQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdDate: "asc",
      },
      include: {
        Role: {
          select: {
            Role_Desc: true,
          },
        },
      },
    });

    const roleListingsWithDescriptions = roles.map((roleListing) => ({
      ...roleListing,
      Role_Desc: roleListing.Role?.Role_Desc || "",
    }));

    return roleListingsWithDescriptions;
  } catch (error) {
    console.error("Error fetching role listings:", error);
    throw error;
  }
};

export const getSpecificRoleListing = async (Role_Name: string) => {
  try {
    const role = await prisma.role_Listing.findFirst({
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
